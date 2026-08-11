import { z } from "zod";

const amountSchema = z.coerce
  .number({ invalid_type_error: "Enter a valid amount" })
  .positive("Amount must be greater than zero")
  .max(1_000_000, "Amount is too large");

const bankWithdrawalSchema = z.object({
  method: z.literal("bank"),
  amount: amountSchema,
  bankAccountName: z.string().min(2, "Enter the account holder's name"),
  bankAccountNumber: z.string().min(4, "Enter a valid account number"),
  bankName: z.string().min(2, "Enter the bank name"),
  bankSwift: z.string().min(4, "Enter a valid SWIFT/BIC code"),
});

const cryptoWithdrawalSchema = z.object({
  method: z.literal("crypto"),
  amount: amountSchema,
  cryptoAddress: z.string().min(10, "Enter a valid wallet address"),
  cryptoNetwork: z.string().min(1, "Select a network"),
});

export const withdrawalRequestSchema = z.discriminatedUnion("method", [
  bankWithdrawalSchema,
  cryptoWithdrawalSchema,
]);

export type WithdrawalRequestInput = z.infer<typeof withdrawalRequestSchema>;
