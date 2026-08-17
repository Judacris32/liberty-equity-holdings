"use client";

import * as React from "react";
import { DepositAddressCard } from "./deposit-address-card";
import { DepositProofForm } from "./deposit-proof-form";
import type { CryptoDepositOption, BankTransferDetails } from "@/lib/queries/deposit-settings";

export function DepositFlow({
  cryptoOptions,
  bankDetails,
}: {
  cryptoOptions: CryptoDepositOption[];
  bankDetails: BankTransferDetails | null;
}) {
  const [method, setMethod] = React.useState<"crypto" | "bank">("crypto");

  return (
    <div className="flex flex-col gap-5">
      <DepositAddressCard
        tab={method}
        onTabChange={setMethod}
        cryptoOptions={cryptoOptions}
        bankDetails={bankDetails}
      />
      <DepositProofForm method={method} />
    </div>
  );
}
