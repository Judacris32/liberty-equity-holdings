import { z } from "zod";

export const findAccountSchema = z.object({
  email: z.string().email("Enter a valid email address"),
});

export const adjustBalanceSchema = z.object({
  userId: z.string().uuid(),
  direction: z.enum(["credit", "debit"]),
  amount: z.coerce
    .number({ invalid_type_error: "Enter a valid amount" })
    .positive("Amount must be greater than zero")
    .max(1_000_000, "Amount is too large"),
  reason: z
    .string()
    .min(10, "Give a specific reason (at least 10 characters)")
    .max(500, "Keep the reason under 500 characters"),
});
