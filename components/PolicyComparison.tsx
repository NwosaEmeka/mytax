import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { TaxBreakdown, formatCurrency, toMonthly } from "@/lib/tax-calculator";

interface PolicyComparisonProps {
  show: boolean;
  oldPolicy: TaxBreakdown;
  newPolicy: TaxBreakdown;
  savings: number;
  onToggle: () => void;
}

export default function PolicyComparison({
  show,
  oldPolicy,
  newPolicy,
  savings,
  onToggle,
}: PolicyComparisonProps) {
  return (
    <>
      {/* Policy Comparison Toggle */}
      <Button variant="outline" onClick={onToggle} className="w-full">
        {show ? "Hide" : "Show"} Old vs New Policy Comparison
      </Button>

      {/* Policy Comparison */}
      {show && (
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
                      {formatCurrency(oldPolicy.totalTax)}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span>Monthly Tax:</span>
                    <span className="font-medium text-red-600">
                      {formatCurrency(toMonthly(oldPolicy.totalTax))}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span>Effective Rate:</span>
                    <span className="font-medium">
                      {oldPolicy.effectiveTaxRate.toFixed(2)}%
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
                      {formatCurrency(newPolicy.totalTax)}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span>Monthly Tax:</span>
                    <span className="font-medium text-red-600">
                      {formatCurrency(toMonthly(newPolicy.totalTax))}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span>Effective Rate:</span>
                    <span className="font-medium">
                      {newPolicy.effectiveTaxRate.toFixed(2)}%
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
      )}
    </>
  );
}
