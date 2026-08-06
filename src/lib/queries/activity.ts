import { createClient } from "@/lib/supabase/server";

export type ActivityNotification = {
  id: string;
  kind: "deposit" | "withdrawal" | "order" | "kyc";
  message: string;
  detail: string;
  created_at: string;
};

/**
 * Builds a unified, real activity feed from the user's own transactions,
 * orders, and KYC submissions — no fabricated "new login" or "security
 * alert" style notifications, since we don't actually track sessions or
 * devices. Every item here reflects something that genuinely happened.
 */
export async function getRecentActivity(limit = 8): Promise<ActivityNotification[]> {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) return [];

  const [{ data: transactions }, { data: orders }, { data: kyc }] = await Promise.all([
    supabase
      .from("transactions")
      .select("id, type, amount, status, created_at")
      .eq("user_id", user.id)
      .order("created_at", { ascending: false })
      .limit(limit),
    supabase
      .from("orders")
      .select("id, symbol, side, amount, status, created_at")
      .eq("user_id", user.id)
      .order("created_at", { ascending: false })
      .limit(limit),
    supabase
      .from("kyc_submissions")
      .select("id, document_type, status, submitted_at")
      .eq("user_id", user.id)
      .order("submitted_at", { ascending: false })
      .limit(limit),
  ]);

  const items: ActivityNotification[] = [];

  for (const t of transactions ?? []) {
    items.push({
      id: `txn-${t.id}`,
      kind: t.type === "deposit" ? "deposit" : "withdrawal",
      message: t.type === "deposit" ? "Deposit completed" : "Withdrawal completed",
      detail: `$${parseFloat(t.amount).toLocaleString()}`,
      created_at: t.created_at,
    });
  }

  for (const o of orders ?? []) {
    items.push({
      id: `order-${o.id}`,
      kind: "order",
      message: `${o.side === "buy" ? "Buy" : "Sell"} order ${o.status}`,
      detail: `${o.symbol} · $${parseFloat(o.amount).toLocaleString()}`,
      created_at: o.created_at,
    });
  }

  for (const k of kyc ?? []) {
    const label =
      k.status === "verified"
        ? "Identity verified"
        : k.status === "rejected"
          ? "Verification rejected"
          : "Verification submitted";
    items.push({
      id: `kyc-${k.id}`,
      kind: "kyc",
      message: label,
      detail: k.document_type.replace("_", " "),
      created_at: k.submitted_at,
    });
  }

  return items
    .sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())
    .slice(0, limit);
}
