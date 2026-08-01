"use client";

import * as React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { UploadCloud, FileText, X, Loader2, CheckCircle2, XCircle } from "lucide-react";
import { submitKycAction } from "@/lib/actions/kyc";
import { KYC_DOCUMENT_TYPES } from "@/lib/validations/kyc";

type UploadResult = { type: "success" | "error"; message: string } | null;

export function KycUploadForm() {
  const [documentType, setDocumentType] = React.useState<string>("passport");
  const [file, setFile] = React.useState<File | null>(null);
  const [isDragging, setIsDragging] = React.useState(false);
  const [isPending, startTransition] = React.useTransition();
  const [result, setResult] = React.useState<UploadResult>(null);
  const inputRef = React.useRef<HTMLInputElement>(null);

  const handleFiles = (files: FileList | null) => {
    if (files && files[0]) {
      setFile(files[0]);
      setResult(null);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!file) {
      setResult({ type: "error", message: "Please select a file to upload." });
      return;
    }

    setResult(null);
    const formData = new FormData();
    formData.set("documentType", documentType);
    formData.set("file", file);

    startTransition(async () => {
      const res = await submitKycAction({ error: null }, formData);
      if (res.error) {
        setResult({ type: "error", message: res.error });
      } else {
        setResult({
          type: "success",
          message: "Document submitted — your verification is now pending review.",
        });
        setFile(null);
      }
    });
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-5">
      <div>
        <label className="mb-1.5 block text-xs font-medium text-[rgb(var(--muted))]">
          Document Type
        </label>
        <div className="grid grid-cols-1 gap-2 sm:grid-cols-3">
          {KYC_DOCUMENT_TYPES.map((type) => (
            <button
              key={type.value}
              type="button"
              onClick={() => setDocumentType(type.value)}
              className={`rounded-xl border px-3 py-2.5 text-xs font-medium transition-colors ${
                documentType === type.value
                  ? "border-bull/40 bg-bull/10 text-bull"
                  : "glass-border glass-surface text-[rgb(var(--muted))] hover:text-[rgb(var(--foreground))]"
              }`}
            >
              {type.label}
            </button>
          ))}
        </div>
      </div>

      <div>
        <label className="mb-1.5 block text-xs font-medium text-[rgb(var(--muted))]">
          Upload Document
        </label>

        <div
          onDragOver={(e) => {
            e.preventDefault();
            setIsDragging(true);
          }}
          onDragLeave={() => setIsDragging(false)}
          onDrop={(e) => {
            e.preventDefault();
            setIsDragging(false);
            handleFiles(e.dataTransfer.files);
          }}
          onClick={() => inputRef.current?.click()}
          className={`flex cursor-pointer flex-col items-center justify-center gap-2 rounded-2xl border border-dashed px-6 py-10 text-center transition-colors ${
            isDragging
              ? "border-bull/50 bg-bull/5"
              : "glass-border glass-surface hover:bg-white/[0.03]"
          }`}
        >
          <input
            ref={inputRef}
            type="file"
            accept="image/jpeg,image/png,image/webp,application/pdf"
            className="hidden"
            onChange={(e) => handleFiles(e.target.files)}
          />

          {file ? (
            <div className="flex items-center gap-2 rounded-lg glass-surface glass-border px-3 py-2">
              <FileText className="h-4 w-4 text-bull" />
              <span className="max-w-[220px] truncate text-xs text-[rgb(var(--foreground))]">
                {file.name}
              </span>
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  setFile(null);
                }}
                aria-label="Remove file"
                className="text-[rgb(var(--muted))] hover:text-bear"
              >
                <X className="h-3.5 w-3.5" />
              </button>
            </div>
          ) : (
            <>
              <UploadCloud className="h-8 w-8 text-[rgb(var(--muted))]" />
              <p className="text-sm text-[rgb(var(--foreground))]">
                Drag & drop, or click to browse
              </p>
              <p className="text-xs text-[rgb(var(--muted))]">
                JPG, PNG, WEBP, or PDF — up to 8MB
              </p>
            </>
          )}
        </div>
      </div>

      <AnimatePresence mode="wait">
        {result && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            className={`flex items-start gap-2 rounded-lg px-3 py-2 text-xs ${
              result.type === "success" ? "bg-bull/10 text-bull" : "bg-bear/10 text-bear"
            }`}
          >
            {result.type === "success" ? (
              <CheckCircle2 className="mt-0.5 h-3.5 w-3.5 shrink-0" />
            ) : (
              <XCircle className="mt-0.5 h-3.5 w-3.5 shrink-0" />
            )}
            {result.message}
          </motion.div>
        )}
      </AnimatePresence>

      <button
        type="submit"
        disabled={isPending}
        className="flex items-center justify-center gap-2 rounded-full bg-bull py-3 text-sm font-semibold text-[#07090e] shadow-glow transition-transform hover:scale-[1.01] disabled:opacity-60 disabled:hover:scale-100"
      >
        {isPending && <Loader2 className="h-4 w-4 animate-spin" />}
        {isPending ? "Uploading..." : "Submit for Verification"}
      </button>
    </form>
  );
}
