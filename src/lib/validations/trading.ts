import { z } from "zod";

export const placeOrderSchema = z.object({
  symbol: z.string().min(1),
  side: z.enum(["buy", "sell"]),
  amount: z.coerce
    .number({ invalid_type_error: "Enter a valid amount" })
    .positive("Amount must be greater than zero"),
  speed: z.enum(["standard", "instant"]),
});

export type PlaceOrderInput = z.infer<typeof placeOrderSchema>;
