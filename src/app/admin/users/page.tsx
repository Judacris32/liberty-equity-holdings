import { getAllAccounts } from "@/lib/queries/admin-users";
import { AdminUsersTable } from "@/components/admin/admin-users-table";

export default async function AdminUsersPage() {
  const accounts = await getAllAccounts();

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-2xl font-semibold text-[rgb(var(--foreground))]">Users</h1>
        <p className="mt-1 text-sm text-[rgb(var(--muted))]">
          Every registered account, including the account type they chose at
          sign-up.
        </p>
      </div>

      <AdminUsersTable accounts={accounts} />
    </div>
  );
}
