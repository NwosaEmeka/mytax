"use client";

import { useState, useMemo } from "react";
import IncomeInput from "@/components/IncomeInput";
import DeductionsForm from "@/components/DeductionsForm";
import TaxExemptNotice from "@/components/TaxExemptNotice";
import TaxResults from "@/components/TaxResults";
import TaxBreakdownCard from "@/components/TaxBreakdownCard";
import PolicyComparison from "@/components/PolicyComparison";
import {
  calculateTax,
  TaxDeductions,
  emptyDeductions,
} from "@/lib/tax-calculator";
import { exportTaxBreakdownToPDF } from "@/lib/pdf-export";

export default function TaxCalculator() {
  const [incomeInput, setIncomeInput] = useState<string>("");
  const [calculationType, setCalculationType] = useState<"monthly" | "annual">(
    "monthly"
  );
  const [showComparison, setShowComparison] = useState(true);
  const [showDeductions, setShowDeductions] = useState(false);
  const [deductions, setDeductions] = useState<TaxDeductions>(emptyDeductions);

  // Parse and calculate income
  const income = parseFloat(incomeInput.replace(/,/g, "")) || 0;
  const annualIncome = useMemo(() => {
    return calculationType === "monthly" ? income * 12 : income;
  }, [income, calculationType]);

  // Convert monthly deductions to annual (except rent which is always annual)
  const annualDeductions = useMemo<TaxDeductions>(() => {
    if (calculationType === "monthly") {
      return {
        pensionContribution: deductions.pensionContribution * 12,
        nhisContribution: deductions.nhisContribution * 12,
        nhfContribution: deductions.nhfContribution * 12,
        housingLoanInterest: deductions.housingLoanInterest * 12,
        lifeInsurancePremium: deductions.lifeInsurancePremium * 12,
        rentRelief: deductions.rentRelief, // Always annual
      };
    }
    return deductions;
  }, [deductions, calculationType]);

  // Calculate tax for both policies
  const newPolicyResult = useMemo(() => {
    return calculateTax(annualIncome, true, annualDeductions);
  }, [annualIncome, annualDeductions]);

  const oldPolicyResult = useMemo(() => {
    return calculateTax(annualIncome, false, annualDeductions);
  }, [annualIncome, annualDeductions]);

  const savings = oldPolicyResult.totalTax - newPolicyResult.totalTax;

  // Handlers
  const handleQuickAmount = (amount: number) => {
    setIncomeInput(amount.toLocaleString("en-NG"));
  };

  const handleDeductionChange = (field: keyof TaxDeductions, value: string) => {
    const numValue = parseFloat(value.replace(/,/g, "")) || 0;
    setDeductions((prev) => ({ ...prev, [field]: numValue }));
  };

  const handleExportPDF = () => {
    exportTaxBreakdownToPDF({
      calculationType,
      income,
      annualIncome,
      newPolicy: newPolicyResult,
      oldPolicy: oldPolicyResult,
      hasDeductions: newPolicyResult.totalDeductions > 0,
    });
  };

  const displayIncome = calculationType === "monthly" ? income : annualIncome;
  const displayTax =
    calculationType === "monthly"
      ? newPolicyResult.totalTax / 12
      : newPolicyResult.totalTax;
  const displayNet =
    calculationType === "monthly"
      ? newPolicyResult.netIncome / 12
      : newPolicyResult.netIncome;

  return (
    <div className="space-y-6">
      {/* Income Input Section */}
      <IncomeInput
        incomeInput={incomeInput}
        calculationType={calculationType}
        annualIncome={annualIncome}
        onIncomeChange={setIncomeInput}
        onCalculationTypeChange={setCalculationType}
        onQuickAmount={handleQuickAmount}
      />

      {/* Deductions Section */}
      <DeductionsForm
        show={showDeductions}
        calculationType={calculationType}
        deductions={deductions}
        totalDeductions={newPolicyResult.totalDeductions}
        onToggle={() => setShowDeductions(!showDeductions)}
        onDeductionChange={handleDeductionChange}
      />

      {/* Results Section */}
      {income > 0 && (
        <>
          {/* Tax Exemption Notice */}
          {newPolicyResult.isExempt && <TaxExemptNotice />}

          {/* Main Results */}
          {!newPolicyResult.isExempt && (
            <>
              <TaxResults
                calculationType={calculationType}
                income={displayIncome}
                totalTax={displayTax}
                netIncome={displayNet}
              />

              {/* Tax Breakdown */}
              <TaxBreakdownCard
                taxBreakdown={newPolicyResult}
                annualIncome={annualIncome}
                handleExportPDF={handleExportPDF}
              />
              {/* Policy Comparison */}
              <PolicyComparison
                show={showComparison}
                oldPolicy={oldPolicyResult}
                newPolicy={newPolicyResult}
                savings={savings}
                onToggle={() => setShowComparison(!showComparison)}
              />
            </>
          )}
        </>
      )}
    </div>
  );
}
