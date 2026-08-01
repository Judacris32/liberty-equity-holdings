import { z } from "zod";

export const profileSchema = z.object({
  fullName: z.string().min(2, "Enter your full name").max(80, "Name is too long"),
});

export type ProfileInput = z.infer<typeof profileSchema>;

export const passwordSchema = z
  .object({
    newPassword: z
      .string()
      .min(8, "Password must be at least 8 characters")
      .regex(/[A-Z]/, "Must include at least one uppercase letter")
      .regex(/[0-9]/, "Must include at least one number"),
    confirmPassword: z.string().min(1, "Please confirm your new password"),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

export type PasswordInput = z.infer<typeof passwordSchema>;
