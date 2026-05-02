"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Building2 } from "lucide-react";

interface Step4Props {
  onNext: () => void;
  updateData: (data: any) => void;
  data: any;
}

export function Step4Payment({ onNext, updateData, data }: Step4Props) {
  const [loading, setLoading] = useState(false);

  const banks = [
    "Access Bank", "GT Bank", "First Bank", "Zenith Bank", "UBA",
    "Kuda", "Opay", "Palmpay", "Moniepoint", "Wema Bank", 
    "Stanbic IBTC", "Fidelity Bank", "Union Bank", "Sterling Bank"
  ];

  const handleSubmit = async () => {
    setLoading(true);
    // In production, save to Prisma via /api/onboarding
    await new Promise(resolve => setTimeout(resolve, 2000));
    onNext();
    setLoading(false);
  };

  const isComplete = data.bankName && data.accountNumber.length === 10 && data.accountName;

  return (
    <Card>
      <CardContent className="pt-6 space-y-6">
        <div className="space-y-4">
          <div className="space-y-1.5">
            <label className="label-kova">Bank Name</label>
            <select
              value={data.bankName}
              onChange={(e) => updateData({ bankName: e.target.value })}
              className="w-full rounded-2xl bg-kova-mist px-4 py-4 text-base font-medium text-kova-navy outline-none border-2 border-transparent focus:border-kova-purple focus:bg-white transition-all appearance-none"
            >
              <option value="" disabled>Select your bank</option>
              {banks.map(bank => (
                <option key={bank} value={bank}>{bank}</option>
              ))}
            </select>
          </div>

          <Input 
            label="Account Number"
            placeholder="10 digits"
            maxLength={10}
            inputMode="numeric"
            value={data.accountNumber}
            onChange={(e) => updateData({ accountNumber: e.target.value.replace(/[^0-9]/g, "") })}
          />

          <Input 
            label="Account Name"
            placeholder="Name on account"
            value={data.accountName}
            onChange={(e) => updateData({ accountName: e.target.value })}
          />

          <Input 
            label="Business Location (Optional)"
            placeholder="e.g. Lagos, Nigeria"
            value={data.location}
            onChange={(e) => updateData({ location: e.target.value })}
          />
        </div>

        <Button 
          className="w-full" 
          onClick={handleSubmit} 
          isLoading={loading}
          disabled={!isComplete}
        >
          Finish Setup
        </Button>
      </CardContent>
    </Card>
  );
}
