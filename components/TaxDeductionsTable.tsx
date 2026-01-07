import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function TaxDeductionsTable() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>💰 Tax Reliefs & Deductions</CardTitle>
        <CardDescription>
          Allowable deductions that reduce your taxable income
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <p className="text-sm text-muted-foreground">
          Under the Nigerian tax system, certain contributions and expenses can
          be deducted from your gross income before calculating tax. These
          reduce your taxable income, resulting in lower tax payable.
        </p>

        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b bg-muted/50">
                <th className="text-left py-3 px-4">Deduction Type</th>
                <th className="text-left py-3 px-4">Details</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b">
                <td className="py-3 px-4 font-medium">
                  Pension (PFA) Contribution
                </td>
                <td className="py-3 px-4 text-muted-foreground">
                  Mandatory employee contribution (typically 8% of basic salary)
                </td>
              </tr>
              <tr className="border-b bg-muted/30">
                <td className="py-3 px-4 font-medium">NHIS Contribution</td>
                <td className="py-3 px-4 text-muted-foreground">
                  National Health Insurance Scheme contributions
                </td>
              </tr>
              <tr className="border-b">
                <td className="py-3 px-4 font-medium">NHF Contribution</td>
                <td className="py-3 px-4 text-muted-foreground">
                  National Housing Fund (2.5% of basic salary)
                </td>
              </tr>
              <tr className="border-b bg-muted/30">
                <td className="py-3 px-4 font-medium">Home Loan Interest</td>
                <td className="py-3 px-4 text-muted-foreground">
                  Interest paid on owner-occupied residential property loans
                </td>
              </tr>
              <tr className="border-b">
                <td className="py-3 px-4 font-medium">
                  Life Insurance Premium
                </td>
                <td className="py-3 px-4 text-muted-foreground">
                  Premiums paid on life insurance policies
                </td>
              </tr>
              <tr className="border-b bg-muted/30">
                <td className="py-3 px-4 font-medium">Rent Relief</td>
                <td className="py-3 px-4 text-muted-foreground">
                  <span className="text-orange-600 dark:text-orange-400 font-medium">
                    Capped at ₦500,000 or 20% of annual rent
                  </span>{" "}
                  (whichever is lower)
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  );
}
