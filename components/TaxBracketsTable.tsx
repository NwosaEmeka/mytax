import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function TaxBracketsTable() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>📊 Personal Income Tax Brackets (2025)</CardTitle>
        <CardDescription>
          New progressive tax rates under the Nigeria Tax Reform Act 2025
        </CardDescription>
      </CardHeader>
      <CardContent>
        {/* Exemption Notice */}
        <div className="mb-4 p-3 bg-green-100 dark:bg-green-900 rounded-lg border border-green-200 dark:border-green-800">
          <p className="text-sm font-medium text-green-800 dark:text-green-200">
            🎉 <strong>First ₦800,000 is TAX FREE!</strong> If you earn ₦800,000
            or less annually, you pay no income tax.
          </p>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b bg-muted/50">
                <th className="text-left py-3 px-4">Annual Income (₦)</th>
                <th className="text-right py-3 px-4">Tax Rate</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b bg-green-50 dark:bg-green-950">
                <td className="py-3 px-4 font-medium text-green-700 dark:text-green-400">
                  ₦0 – ₦800,000
                </td>
                <td className="text-right py-3 px-4 font-bold text-green-600">
                  0% (Tax-free)
                </td>
              </tr>
              <tr className="border-b">
                <td className="py-3 px-4">₦800,001 – ₦3,000,000</td>
                <td className="text-right py-3 px-4 font-medium">15%</td>
              </tr>
              <tr className="border-b bg-muted/30">
                <td className="py-3 px-4">₦3,000,001 – ₦12,000,000</td>
                <td className="text-right py-3 px-4 font-medium">18%</td>
              </tr>
              <tr className="border-b">
                <td className="py-3 px-4">₦12,000,001 – ₦25,000,000</td>
                <td className="text-right py-3 px-4 font-medium">21%</td>
              </tr>
              <tr className="border-b bg-muted/30">
                <td className="py-3 px-4">₦25,000,001 – ₦50,000,000</td>
                <td className="text-right py-3 px-4 font-medium">23%</td>
              </tr>
              <tr className="bg-muted/30">
                <td className="py-3 px-4">Above ₦50,000,000</td>
                <td className="text-right py-3 px-4 font-medium text-red-600">
                  25%
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <p className="mt-3 text-xs text-muted-foreground">
          * This is a progressive tax system - each bracket rate only applies to
          income within that range.
        </p>
      </CardContent>
    </Card>
  );
}
