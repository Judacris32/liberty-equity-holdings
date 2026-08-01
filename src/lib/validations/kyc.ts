import { z } from "zod";

export const KYC_DOCUMENT_TYPES = [
  { value: "passport", label: "Passport" },
  { value: "national_id", label: "National ID Card" },
  { value: "drivers_license", label: "Driver's License" },
] as const;

const MAX_FILE_SIZE_BYTES = 8 * 1024 * 1024; // 8MB
const ACCEPTED_TYPES = ["image/jpeg", "image/png", "image/webp", "application/pdf"];

export const kycUploadSchema = z.object({
  documentType: z.enum(["passport", "national_id", "drivers_license"], {
    errorMap: () => ({ message: "Select a document type" }),
  }),
  file: z
    .instanceof(File, { message: "Please select a file to upload" })
    .refine((file) => file.size > 0, "Please select a file to upload")
    .refine(
      (file) => file.size <= MAX_FILE_SIZE_BYTES,
      "File must be smaller than 8MB"
    )
    .refine(
      (file) => ACCEPTED_TYPES.includes(file.type),
      "File must be a JPG, PNG, WEBP, or PDF"
    ),
});
