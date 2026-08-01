import { z } from "zod";

export const transactionSchema = z.object({
  amount: z.coerce
    .number({ invalid_type_error: "Enter a valid amount" })
    .positive("Amount must be greater than zero")
    .max(1_000_000, "Amount is too large"),
});

export type TransactionInput = z.infer<typeof transactionSchema>;
