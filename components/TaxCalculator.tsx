"use client";

import { useState, useMemo } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  calculateTax,
  formatCurrency,
  toAnnual,
  toMonthly,
  TaxBreakdown,
  TaxDeductions,
  emptyDeductions,
} from "@/lib/tax-calculator";
import { formatAmmount } from "@/lib/utils";

export default function TaxCalculator() {
  const [incomeInput, setIncomeInput] = useState<string>("");
  const [calculationType, setCalculationType] = useState<"monthly" | "annual">(
    "monthly"
  );
  const [showComparison, setShowComparison] = useState(false);
  const [showDeductions, setShowDeductions] = useState(false);

  // Deduction states (stored as annual values)
  const [deductions, setDeductions] = useState<TaxDeductions>(emptyDeductions);

  const income = parseFloat(incomeInput.replace(/,/g, "")) || 0;

  const annualIncome = useMemo(() => {
    return calculationType === "monthly" ? toAnnual(income) : income;
  }, [income, calculationType]);

  // Convert monthly deduction inputs to annual if needed (except rent which is always annual)
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

  const newPolicyResult = useMemo<TaxBreakdown>(() => {
    return calculateTax(annualIncome, true, annualDeductions);
  }, [annualIncome, annualDeductions]);

  const oldPolicyResult = useMemo<TaxBreakdown>(() => {
    return calculateTax(annualIncome, false, annualDeductions);
  }, [annualIncome, annualDeductions]);

  const displayMultiplier = calculationType === "monthly" ? 1 / 12 : 1;

  const handleIncomeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/[^0-9]/g, "");
    if (value) {
      setIncomeInput(parseInt(value).toLocaleString("en-NG"));
    } else {
      setIncomeInput("");
    }
  };

  const handleDeductionChange = (field: keyof TaxDeductions, value: string) => {
    const numValue = parseFloat(value.replace(/,/g, "")) || 0;
    setDeductions((prev) => ({ ...prev, [field]: numValue }));
  };

  const formatDeductionInput = (value: number): string => {
    return value > 0 ? value.toLocaleString("en-NG") : "";
  };

  const savings = oldPolicyResult.totalTax - newPolicyResult.totalTax;

  return (
    <div className="space-y-6">
      {/* Input Section */}
      <Card className="border-green-200 ">
        <CardHeader>
          <CardTitle className="text-2xl text-green-800 dark:text-green-400">
            🇳🇬 Nigeria Tax Calculator
          </CardTitle>
          <CardDescription>
            Calculate your personal income tax based on the new 2025 Tax Reform
            Act
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Calculation Type Toggle */}
          <Tabs
            defaultValue="monthly"
            value={calculationType}
            onValueChange={(v) => setCalculationType(v as "monthly" | "annual")}
          >
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="monthly">Monthly Income</TabsTrigger>
              <TabsTrigger value="annual">Annual Income</TabsTrigger>
            </TabsList>
          </Tabs>

          {/* Income Input */}
          <div className="space-y-2">
            <Label htmlFor="income" className="text-lg font-medium">
              Enter your {calculationType} gross income (₦)
            </Label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 text-xl">
                ₦
              </span>
              <Input
                id="income"
                type="text"
                value={incomeInput}
                onChange={handleIncomeChange}
                placeholder={
                  calculationType === "monthly" ? "500,000" : "6,000,000"
                }
                className="pl-10 text-xl h-14"
              />
            </div>
            {calculationType === "monthly" && income > 0 && (
              <p className="text-sm text-muted-foreground">
                Annual equivalent: {formatCurrency(annualIncome)}
              </p>
            )}
          </div>

          {/* Quick Amount Buttons */}
          <div className="flex flex-wrap gap-2">
            {(calculationType === "monthly"
              ? [100000, 250000, 500000, 1000000, 2000000]
              : [1200000, 3000000, 6000000, 12000000, 24000000]
            ).map((amount) => (
              <Button
                key={amount}
                variant="outline"
                size="sm"
                onClick={() => setIncomeInput(amount.toLocaleString("en-NG"))}
              >
                {formatAmmount(amount)}
              </Button>
            ))}
          </div>

          {/* Deductions Toggle */}
          <Button
            variant="outline"
            className="w-full"
            onClick={() => setShowDeductions(!showDeductions)}
          >
            {showDeductions ? "Hide" : "Add"} Tax Reliefs & Deductions
          </Button>

          {/* Deductions Section */}
          {showDeductions && (
            <div className="space-y-4 p-4 bg-blue-50 dark:bg-blue-950 rounded-lg border border-blue-200 dark:border-blue-800">
              <h4 className="font-semibold text-blue-800 dark:text-blue-200">
                💰 Tax Reliefs & Deductions ({calculationType})
              </h4>
              <p className="text-xs text-blue-600 dark:text-blue-400">
                These reduce your taxable income. Enter your {calculationType}{" "}
                contributions.
              </p>

              <div className="grid gap-4 md:grid-cols-2">
                {/* Pension Contribution */}
                <div className="space-y-1">
                  <Label htmlFor="pension" className="text-sm">
                    Pension (PFA) Contribution
                  </Label>
                  <div className="relative">
                    <span className="absolute left-2 top-1/2 -translate-y-1/2 text-gray-500 text-sm">
                      ₦
                    </span>
                    <Input
                      id="pension"
                      type="text"
                      value={formatDeductionInput(
                        deductions.pensionContribution
                      )}
                      onChange={(e) =>
                        handleDeductionChange(
                          "pensionContribution",
                          e.target.value
                        )
                      }
                      placeholder="0"
                      className="pl-6 text-sm"
                    />
                  </div>
                </div>

                {/* NHIS */}
                <div className="space-y-1">
                  <Label htmlFor="nhis" className="text-sm">
                    NHIS Contribution
                  </Label>
                  <div className="relative">
                    <span className="absolute left-2 top-1/2 -translate-y-1/2 text-gray-500 text-sm">
                      ₦
                    </span>
                    <Input
                      id="nhis"
                      type="text"
                      value={formatDeductionInput(deductions.nhisContribution)}
                      onChange={(e) =>
                        handleDeductionChange(
                          "nhisContribution",
                          e.target.value
                        )
                      }
                      placeholder="0"
                      className="pl-6 text-sm"
                    />
                  </div>
                </div>

                {/* NHF */}
                <div className="space-y-1">
                  <Label htmlFor="nhf" className="text-sm">
                    NHF Contribution
                  </Label>
                  <div className="relative">
                    <span className="absolute left-2 top-1/2 -translate-y-1/2 text-gray-500 text-sm">
                      ₦
                    </span>
                    <Input
                      id="nhf"
                      type="text"
                      value={formatDeductionInput(deductions.nhfContribution)}
                      onChange={(e) =>
                        handleDeductionChange("nhfContribution", e.target.value)
                      }
                      placeholder="0"
                      className="pl-6 text-sm"
                    />
                  </div>
                </div>

                {/* Home Loan Interest */}
                <div className="space-y-1">
                  <Label htmlFor="homeLoan" className="text-sm">
                    Home Loan Interest
                  </Label>
                  <div className="relative">
                    <span className="absolute left-2 top-1/2 -translate-y-1/2 text-gray-500 text-sm">
                      ₦
                    </span>
                    <Input
                      id="homeLoan"
                      type="text"
                      value={formatDeductionInput(
                        deductions.housingLoanInterest
                      )}
                      onChange={(e) =>
                        handleDeductionChange(
                          "housingLoanInterest",
                          e.target.value
                        )
                      }
                      placeholder="0"
                      className="pl-6 text-sm"
                    />
                  </div>
                </div>

                {/* Life Insurance */}
                <div className="space-y-1">
                  <Label htmlFor="lifeInsurance" className="text-sm">
                    Life Insurance Premium
                  </Label>
                  <div className="relative">
                    <span className="absolute left-2 top-1/2 -translate-y-1/2 text-gray-500 text-sm">
                      ₦
                    </span>
                    <Input
                      id="lifeInsurance"
                      type="text"
                      value={formatDeductionInput(
                        deductions.lifeInsurancePremium
                      )}
                      onChange={(e) =>
                        handleDeductionChange(
                          "lifeInsurancePremium",
                          e.target.value
                        )
                      }
                      placeholder="0"
                      className="pl-6 text-sm"
                    />
                  </div>
                </div>

                {/* Rent Relief */}
                <div className="space-y-1">
                  <Label htmlFor="rent" className="text-sm">
                    Annual Rent Paid (20% deductible, max ₦500k)
                  </Label>
                  <div className="relative">
                    <span className="absolute left-2 top-1/2 -translate-y-1/2 text-gray-500 text-sm">
                      ₦
                    </span>
                    <Input
                      id="rent"
                      type="text"
                      value={formatDeductionInput(deductions.rentRelief)}
                      onChange={(e) =>
                        handleDeductionChange("rentRelief", e.target.value)
                      }
                      placeholder="0"
                      className="pl-6 text-sm"
                    />
                  </div>
                </div>
              </div>

              {newPolicyResult.totalDeductions > 0 && (
                <div className="mt-3 p-2 bg-green-100 dark:bg-green-900 rounded text-sm">
                  <strong>Total Annual Deductions:</strong>{" "}
                  {formatCurrency(newPolicyResult.totalDeductions)}
                </div>
              )}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Results Section */}
      {income > 0 && (
        <>
          {/* Tax Exemption Notice */}
          {newPolicyResult.isExempt && (
            <Card className="border-green-500 bg-green-50 dark:bg-green-950">
              <CardContent className="pt-6">
                <div className="flex items-center gap-3">
                  <span className="text-4xl">🎉</span>
                  <div>
                    <h3 className="text-xl font-bold text-green-800 dark:text-green-400">
                      Good News! You&apos;re Tax Exempt
                    </h3>
                    <p className="text-green-700 dark:text-green-300">
                      Under the new 2025 Tax Reform, individuals earning
                      ₦800,000 or less annually are exempt from personal income
                      tax.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Main Results Grid */}
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            <Card>
              <CardHeader className="pb-2">
                <CardDescription>
                  Gross Income ({calculationType})
                </CardDescription>
                <CardTitle className="text-2xl">
                  {formatCurrency(income)}
                </CardTitle>
              </CardHeader>
            </Card>

            <Card className="border-red-200">
              <CardHeader className="pb-2">
                <CardDescription>
                  Tax Payable ({calculationType})
                </CardDescription>
                <CardTitle className="text-2xl text-red-600">
                  {formatCurrency(newPolicyResult.totalTax * displayMultiplier)}
                </CardTitle>
              </CardHeader>
            </Card>

            <Card className="border-green-200">
              <CardHeader className="pb-2">
                <CardDescription>
                  Net Income ({calculationType})
                </CardDescription>
                <CardTitle className="text-2xl text-green-600">
                  {formatCurrency(
                    newPolicyResult.netIncome * displayMultiplier
                  )}
                </CardTitle>
              </CardHeader>
            </Card>
          </div>

          {/* Detailed Breakdown */}
          <Card>
            <CardHeader>
              <CardTitle>Tax Breakdown (Annual)</CardTitle>
              <CardDescription>
                Effective Tax Rate:{" "}
                {newPolicyResult.effectiveTaxRate.toFixed(2)}%
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">
                        Gross Annual Income:
                      </span>
                      <span className="font-medium">
                        {formatCurrency(annualIncome)}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">
                        Tax-Free Amount:
                      </span>
                      <span className="font-medium text-green-600">
                        ₦800,000
                      </span>
                    </div>
                    <div className="flex justify-between border-t pt-2">
                      <span className="text-muted-foreground">
                        Taxable Income:
                      </span>
                      <span className="font-medium">
                        {formatCurrency(Math.max(0, annualIncome - 800000))}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Tax Brackets Table */}
                {newPolicyResult.taxBrackets.length > 0 && (
                  <div className="mt-4">
                    <h4 className="font-medium mb-2">Tax by Bracket:</h4>
                    <div className="overflow-x-auto">
                      <table className="w-full text-sm">
                        <thead>
                          <tr className="border-b">
                            <th className="text-left py-2">Income Bracket</th>
                            <th className="text-right py-2">Rate</th>
                            <th className="text-right py-2">Taxable Amount</th>
                            <th className="text-right py-2">Tax</th>
                          </tr>
                        </thead>
                        <tbody>
                          {newPolicyResult.taxBrackets.map((bracket, index) => (
                            <tr key={index} className="border-b">
                              <td className="py-2">{bracket.bracket}</td>
                              <td className="text-right">{bracket.rate}%</td>
                              <td className="text-right">
                                {formatCurrency(bracket.taxableAmount)}
                              </td>
                              <td className="text-right text-red-600">
                                {formatCurrency(bracket.tax)}
                              </td>
                            </tr>
                          ))}
                          <tr className="font-bold">
                            <td colSpan={3} className="py-2">
                              Total Tax
                            </td>
                            <td className="text-right text-red-600">
                              {formatCurrency(newPolicyResult.totalTax)}
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Policy Comparison Toggle */}
          <Button
            variant="outline"
            onClick={() => setShowComparison(!showComparison)}
            className="w-full"
          >
            Old vs New Policy Comparison
          </Button>

          {/* Policy Comparison */}
          <Card className="border-blue-200">
            <CardHeader>
              <CardTitle>Old Policy vs New 2025 Reform</CardTitle>
              <CardDescription>
                See how the new tax reform affects your tax liability
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-6">
                {/* Old Policy */}
                <div className="space-y-3 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                  <h4 className="font-semibold text-gray-600 dark:text-gray-300">
                    Previous Policy (PITA 2011)
                  </h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span>Annual Tax:</span>
                      <span className="font-medium text-red-600">
                        {formatCurrency(oldPolicyResult.totalTax)}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span>Monthly Tax:</span>
                      <span className="font-medium text-red-600">
                        {formatCurrency(toMonthly(oldPolicyResult.totalTax))}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span>Effective Rate:</span>
                      <span className="font-medium">
                        {oldPolicyResult.effectiveTaxRate.toFixed(2)}%
                      </span>
                    </div>
                  </div>
                </div>

                {/* New Policy */}
                <div className="space-y-3 p-4 bg-green-50 dark:bg-green-900 rounded-lg">
                  <h4 className="font-semibold text-green-700 dark:text-green-300">
                    New 2025 Tax Reform ✓
                  </h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span>Annual Tax:</span>
                      <span className="font-medium text-red-600">
                        {formatCurrency(newPolicyResult.totalTax)}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span>Monthly Tax:</span>
                      <span className="font-medium text-red-600">
                        {formatCurrency(toMonthly(newPolicyResult.totalTax))}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span>Effective Rate:</span>
                      <span className="font-medium">
                        {newPolicyResult.effectiveTaxRate.toFixed(2)}%
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Savings */}
              {savings > 0 && (
                <div className="mt-4 p-4 bg-green-100 dark:bg-green-900 rounded-lg text-center">
                  <p className="text-green-800 dark:text-green-300 font-semibold">
                    🎉 You save {formatCurrency(savings)} annually with the new
                    tax reform!
                  </p>
                  <p className="text-green-700 dark:text-green-400 text-sm">
                    That&apos;s {formatCurrency(toMonthly(savings))} extra per
                    month
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        </>
      )}
    </div>
  );
}
