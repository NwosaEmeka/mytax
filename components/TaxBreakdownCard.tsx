import { Download } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { TaxBreakdown, formatCurrency } from "@/lib/tax-calculator";

interface TaxBreakdownCardProps {
  taxBreakdown: TaxBreakdown;
  annualIncome: number;
  handleExportPDF: () => void;
}

export default function TaxBreakdownCard({
  taxBreakdown,
  annualIncome,
  handleExportPDF,
}: TaxBreakdownCardProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          Tax Breakdown (Annual)
          <div>
            <Button
              onClick={handleExportPDF}
              className="w-full bg-green-600 hover:bg-green-700"
            >
              <Download className="mr-2 h-4 w-4" />
              Download
            </Button>
          </div>
        </CardTitle>
        <CardDescription>
          Effective Tax Rate: {taxBreakdown.effectiveTaxRate.toFixed(2)}%
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="md:grid grid-cols-2 gap-4 text-sm">
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
                <span className="text-muted-foreground">Tax-Free Amount:</span>
                <span className="font-medium text-green-600">₦800,000</span>
              </div>
              <div className="flex justify-between border-t pt-2">
                <span className="text-muted-foreground">Taxable Income:</span>
                <span className="font-medium">
                  {formatCurrency(Math.max(0, annualIncome - 800000))}
                </span>
              </div>
            </div>
          </div>

          {/* Tax Brackets Table */}
          {taxBreakdown.taxBrackets.length > 0 && (
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
                    {taxBreakdown.taxBrackets.map((bracket, index) => (
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
                        {formatCurrency(taxBreakdown.totalTax)}
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
  );
}
