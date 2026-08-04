import type { LucideIcon } from "lucide-react";

export function DashboardPanel({
  icon: Icon,
  title,
  action,
  children,
  bodyClassName,
}: {
  icon: LucideIcon;
  title: string;
  action?: React.ReactNode;
  children: React.ReactNode;
  bodyClassName?: string;
}) {
  return (
    <div className="overflow-hidden rounded-2xl glass-surface glass-border">
      <div className="flex items-center justify-between gap-3 border-b glass-border px-5 py-4">
        <div className="flex items-center gap-2.5">
          <Icon className="h-4 w-4 text-bull" />
          <h2 className="text-sm font-semibold text-[rgb(var(--foreground))]">
            {title}
          </h2>
        </div>
        {action}
      </div>
      <div className={bodyClassName ?? "p-1"}>{children}</div>
    </div>
  );
}
