"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";
import { placeOrderSchema } from "@/lib/validations/trading";
import { addCurrency, toCents } from "@/lib/money";

export type PlaceOrderState = {
  error: string | null;
  success?: {
    pnl: number;
    newBalance: number;
  };
};

/**
 * Simulates placing a trade order for demo/portfolio purposes.
 *
 * No real exchange or broker is connected — this only ever reads/writes
 * the `accounts` and `orders` tables. The "fill" outcome is a randomized
 * simulated P&L, clearly generated server-side, not a real market
 * execution.
 */
export async function placeOrderAction(
  _prevState: PlaceOrderState,
  formData: FormData
): Promise<PlaceOrderState> {
  const parsed = placeOrderSchema.safeParse({
    symbol: formData.get("symbol"),
    side: formData.get("side"),
    amount: formData.get("amount"),
    speed: formData.get("speed"),
  });

  if (!parsed.success) {
    return { error: parsed.error.issues[0]?.message ?? "Invalid order." };
  }

  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return { error: "You must be logged in to place an order." };
  }

  const { data: account, error: accountError } = await supabase
    .from("accounts")
    .select("available_balance, total_profit")
    .eq("user_id", user.id)
    .single();

  if (accountError || !account) {
    return { error: "Could not load your account. Please refresh and try again." };
  }

  const { symbol, side, amount, speed } = parsed.data;

  if (toCents(amount) > toCents(account.available_balance)) {
    return { error: "Insufficient available balance for this order." };
  }

  // Simulated fill: a randomized P&L between -8% and +12% of the order
  // amount, weighted slightly bullish, purely for demo purposes.
  const outcomeRoll = Math.random();
  const pnlPercent = outcomeRoll < 0.35 ? -(Math.random() * 0.08) : Math.random() * 0.12;
  const pnl = Math.round(amount * pnlPercent * 100) / 100;

  const newBalance = addCurrency(account.available_balance, pnl);
  const newProfit = addCurrency(account.total_profit, pnl);

  const { error: updateError } = await supabase
    .from("accounts")
    .update({
      available_balance: newBalance,
      total_profit: newProfit,
      updated_at: new Date().toISOString(),
    })
    .eq("user_id", user.id);

  if (updateError) {
    return { error: "Failed to settle order. Please try again." };
  }

  await supabase.from("orders").insert({
    user_id: user.id,
    symbol,
    side,
    amount,
    speed,
    pnl,
    status: "filled",
  });

  revalidatePath("/dashboard");
  revalidatePath("/dashboard/trading");

  return { error: null, success: { pnl, newBalance } };
}
