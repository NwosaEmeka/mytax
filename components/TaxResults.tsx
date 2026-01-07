import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { formatCurrency } from "@/lib/tax-calculator";

interface TaxResultsProps {
  calculationType: "monthly" | "annual";
  income: number;
  totalTax: number;
  netIncome: number;
}

export default function TaxResults({
  calculationType,
  income,
  totalTax,
  netIncome,
}: TaxResultsProps) {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      <Card>
        <CardHeader className="pb-2">
          <CardDescription>Gross Income ({calculationType})</CardDescription>
          <CardTitle className="text-2xl">{formatCurrency(income)}</CardTitle>
        </CardHeader>
      </Card>

      <Card className="border-red-200">
        <CardHeader className="pb-2">
          <CardDescription>Tax Payable ({calculationType})</CardDescription>
          <CardTitle className="text-2xl text-red-600">
            {formatCurrency(totalTax)}
          </CardTitle>
        </CardHeader>
      </Card>

      <Card className="border-green-200">
        <CardHeader className="pb-2">
          <CardDescription>Net Income ({calculationType})</CardDescription>
          <CardTitle className="text-2xl text-green-600">
            {formatCurrency(netIncome)}
          </CardTitle>
        </CardHeader>
      </Card>
    </div>
  );
}
