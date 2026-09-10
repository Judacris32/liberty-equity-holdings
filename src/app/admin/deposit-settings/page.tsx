import { getAllCryptoDepositOptions, getAdminBankTransferDetails } from "@/lib/queries/deposit-settings";
import { AdminDepositSettingsManager } from "@/components/admin/admin-deposit-settings-manager";

export default async function AdminDepositSettingsPage() {
  const [cryptoOptions, bankDetails] = await Promise.all([
    getAllCryptoDepositOptions(),
    getAdminBankTransferDetails(),
  ]);

  return (
    <div className="mx-auto flex max-w-2xl flex-col gap-6">
      <div>
        <h1 className="text-2xl font-semibold text-[rgb(var(--foreground))]">
          Deposit Settings
        </h1>
        <p className="mt-1 text-sm text-[rgb(var(--muted))]">
          Manage the crypto addresses and bank details shown on the deposit
          page. Changes take effect immediately.
        </p>
      </div>

      <AdminDepositSettingsManager cryptoOptions={cryptoOptions} bankDetails={bankDetails} />
    </div>
  );
}
