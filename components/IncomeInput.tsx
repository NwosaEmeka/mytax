"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { formatCurrency } from "@/lib/tax-calculator";
import { formatAmmount } from "@/lib/utils";

interface IncomeInputProps {
  incomeInput: string;
  calculationType: "monthly" | "annual";
  annualIncome: number;
  onIncomeChange: (value: string) => void;
  onCalculationTypeChange: (type: "monthly" | "annual") => void;
  onQuickAmount: (amount: number) => void;
}

export default function IncomeInput({
  incomeInput,
  calculationType,
  annualIncome,
  onIncomeChange,
  onCalculationTypeChange,
  onQuickAmount,
}: IncomeInputProps) {
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/[^0-9]/g, "");
    if (value) {
      onIncomeChange(parseInt(value).toLocaleString("en-NG"));
    } else {
      onIncomeChange("");
    }
  };

  const income = parseFloat(incomeInput.replace(/,/g, "")) || 0;

  const quickAmounts =
    calculationType === "monthly"
      ? [100000, 250000, 500000, 1000000, 2000000]
      : [1200000, 3000000, 6000000, 12000000, 24000000];

  return (
    <Card className="border-green-200 bg-linear-to-br from-green-50 to-white dark:from-green-950 dark:to-gray-900">
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
          onValueChange={(v) =>
            onCalculationTypeChange(v as "monthly" | "annual")
          }
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
              onChange={handleInputChange}
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
          {quickAmounts.map((amount) => (
            <Button
              key={amount}
              variant="outline"
              size="sm"
              onClick={() => onQuickAmount(amount)}
            >
              {formatAmmount(amount)}
            </Button>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
