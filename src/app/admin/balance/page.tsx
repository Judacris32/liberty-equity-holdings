import { AdminBalanceAdjuster } from "@/components/admin/admin-balance-adjuster";

export default function AdminBalancePage() {
  return (
    <div className="mx-auto flex max-w-xl flex-col gap-6">
      <div>
        <h1 className="text-2xl font-semibold text-[rgb(var(--foreground))]">
          Balance Adjustment
        </h1>
        <p className="mt-1 text-sm text-[rgb(var(--muted))]">
          Manually credit or debit a user&apos;s balance. Every adjustment is
          logged with a reason and appears in the user&apos;s own transaction
          history.
        </p>
      </div>

      <AdminBalanceAdjuster />
    </div>
  );
}
