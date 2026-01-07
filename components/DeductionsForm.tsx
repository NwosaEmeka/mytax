"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { TaxDeductions, formatCurrency } from "@/lib/tax-calculator";

interface DeductionsFormProps {
  show: boolean;
  calculationType: "monthly" | "annual";
  deductions: TaxDeductions;
  totalDeductions: number;
  onToggle: () => void;
  onDeductionChange: (field: keyof TaxDeductions, value: string) => void;
}

export default function DeductionsForm({
  show,
  calculationType,
  deductions,
  totalDeductions,
  onToggle,
  onDeductionChange,
}: DeductionsFormProps) {
  const formatDeductionInput = (value: number): string => {
    return value > 0 ? value.toLocaleString("en-NG") : "";
  };

  const deductionFields = [
    {
      id: "pension",
      label: "Pension (PFA) Contribution",
      field: "pensionContribution" as keyof TaxDeductions,
    },
    {
      id: "nhis",
      label: "NHIS Contribution",
      field: "nhisContribution" as keyof TaxDeductions,
    },
    {
      id: "nhf",
      label: "NHF Contribution",
      field: "nhfContribution" as keyof TaxDeductions,
    },
    {
      id: "homeLoan",
      label: "Home Loan Interest",
      field: "housingLoanInterest" as keyof TaxDeductions,
    },
    {
      id: "lifeInsurance",
      label: "Life Insurance Premium",
      field: "lifeInsurancePremium" as keyof TaxDeductions,
    },
    {
      id: "rent",
      label: "Annual Rent Paid (20% deductible, max ₦500k)",
      field: "rentRelief" as keyof TaxDeductions,
    },
  ];

  return (
    <>
      {/* Deductions Toggle */}
      <Button variant="outline" className="w-full" onClick={onToggle}>
        {show ? "Hide" : "Add"} Tax Reliefs & Deductions
      </Button>

      {/* Deductions Section */}
      {show && (
        <div className="space-y-4 p-4 bg-blue-50 dark:bg-blue-950 rounded-lg border border-blue-200 dark:border-blue-800">
          <h4 className="font-semibold text-blue-800 dark:text-blue-200">
            💰 Tax Reliefs & Deductions ({calculationType})
          </h4>
          <p className="text-xs text-blue-600 dark:text-blue-400">
            These reduce your taxable income. Enter your {calculationType}{" "}
            contributions.
          </p>

          <div className="grid gap-4 md:grid-cols-2">
            {deductionFields.map(({ id, label, field }) => (
              <div key={id} className="space-y-1">
                <Label htmlFor={id} className="text-sm">
                  {label}
                </Label>
                <div className="relative">
                  <span className="absolute left-2 top-1/2 -translate-y-1/2 text-gray-500 text-sm">
                    ₦
                  </span>
                  <Input
                    id={id}
                    type="text"
                    value={formatDeductionInput(deductions[field])}
                    onChange={(e) => onDeductionChange(field, e.target.value)}
                    placeholder="0"
                    className="pl-6 text-sm"
                  />
                </div>
              </div>
            ))}
          </div>

          {totalDeductions > 0 && (
            <div className="mt-3 p-2 bg-green-100 dark:bg-green-900 rounded text-sm">
              <strong>Total Annual Deductions:</strong>{" "}
              {formatCurrency(totalDeductions)}
            </div>
          )}
        </div>
      )}
    </>
  );
}
