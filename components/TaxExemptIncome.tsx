import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function TaxExemptIncome() {
  return (
    <Card className="border-blue-200 bg-blue-50 dark:bg-blue-950">
      <CardHeader>
        <CardTitle className="text-blue-800 dark:text-blue-200">
          🛡️ Tax-Exempt Income
        </CardTitle>
        <CardDescription>
          Types of income not subject to personal income tax
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ul className="space-y-2 text-sm">
          <li className="flex items-start gap-2">
            <span className="text-blue-600">•</span>
            <span>
              <strong>Pensions & Gratuities:</strong> Terminal benefits and
              retirement income are exempt
            </span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-blue-600">•</span>
            <span>
              <strong>Compensation for Loss of Office:</strong> Up to
              ₦50,000,000 is tax-exempt
            </span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-blue-600">•</span>
            <span>
              <strong>Dividend Income:</strong> May be subject to withholding
              tax only
            </span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-blue-600">•</span>
            <span>
              <strong>Income Below Threshold:</strong> Earnings ₦800,000 or less
              per year are tax-free
            </span>
          </li>
        </ul>
      </CardContent>
    </Card>
  );
}
