"use client";

import * as React from "react";
import { DepositAddressCard } from "./deposit-address-card";
import { DepositProofForm } from "./deposit-proof-form";

export function DepositFlow() {
  const [method, setMethod] = React.useState<"crypto" | "bank">("crypto");

  return (
    <div className="flex flex-col gap-5">
      <DepositAddressCard tab={method} onTabChange={setMethod} />
      <DepositProofForm method={method} />
    </div>
  );
}
