import { z } from "zod";

const MAX_FILE_SIZE_BYTES = 8 * 1024 * 1024; // 8MB
const ACCEPTED_TYPES = ["image/jpeg", "image/png", "image/webp", "application/pdf"];

export const depositRequestSchema = z.object({
  amount: z.coerce
    .number({ invalid_type_error: "Enter a valid amount" })
    .positive("Amount must be greater than zero")
    .max(1_000_000, "Amount is too large"),
  method: z.enum(["crypto", "bank"]),
  proof: z
    .instanceof(File, { message: "Please attach proof of your deposit" })
    .refine((file) => file.size > 0, "Please attach proof of your deposit")
    .refine(
      (file) => file.size <= MAX_FILE_SIZE_BYTES,
      "File must be smaller than 8MB"
    )
    .refine(
      (file) => ACCEPTED_TYPES.includes(file.type),
      "File must be a JPG, PNG, WEBP, or PDF"
    ),
});
