import { z } from "zod";

export const cryptoOptionSchema = z.object({
  symbol: z.string().min(1, "Symbol is required").max(10, "Keep it short, e.g. BTC"),
  network: z.string().min(1, "Network is required"),
  address: z.string().min(10, "Enter a valid address"),
  displayOrder: z.coerce.number().int().default(0),
});

export const bankDetailsSchema = z.object({
  accountName: z.string().min(2, "Account name is required"),
  accountNumber: z.string().min(4, "Enter a valid account number"),
  bankName: z.string().min(2, "Bank name is required"),
  swiftBic: z.string().min(4, "Enter a valid SWIFT/BIC code"),
  routingNumber: z.string().optional(),
  iban: z.string().optional(),
});
