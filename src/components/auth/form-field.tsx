import * as React from "react";

type FormFieldProps = Omit<React.InputHTMLAttributes<HTMLInputElement>, "className"> & {
  label: string;
  name: string;
  error?: string;
  rightElement?: React.ReactNode;
};

export const FormField = React.forwardRef<HTMLInputElement, FormFieldProps>(
  ({ label, name, type = "text", error, rightElement, ...inputProps }, ref) => {
    return (
      <div>
        <label
          htmlFor={name}
          className="mb-1.5 block text-xs font-medium text-[rgb(var(--muted))]"
        >
          {label}
        </label>
        <div className="relative">
          <input
            ref={ref}
            id={name}
            name={name}
            type={type}
            aria-invalid={!!error}
            aria-describedby={error ? `${name}-error` : undefined}
            className={`w-full rounded-xl glass-surface border px-4 py-2.5 text-sm text-[rgb(var(--foreground))] outline-none transition-colors placeholder:text-[rgb(var(--muted))]/60 focus:border-bull/50 ${
              error ? "border-bear/60" : "glass-border"
            }`}
            {...inputProps}
          />
          {rightElement && (
            <div className="absolute right-3 top-1/2 -translate-y-1/2">
              {rightElement}
            </div>
          )}
        </div>
        {error && (
          <p id={`${name}-error`} className="mt-1.5 text-xs text-bear">
            {error}
          </p>
        )}
      </div>
    );
  }
);

FormField.displayName = "FormField";
