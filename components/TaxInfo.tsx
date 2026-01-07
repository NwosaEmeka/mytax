import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function TaxInfo() {
  return (
    <div className="space-y-6">
      {/* About the New Tax Reform */}
      <Card>
        <CardHeader>
          <CardTitle>📋 About Nigeria Tax Reform 2025</CardTitle>
          <CardDescription>
            Signed into law by President Bola Ahmed Tinubu on June 26, 2025
          </CardDescription>
        </CardHeader>
        <CardContent className="prose dark:prose-invert max-w-none">
          <p className="text-muted-foreground">
            The 2025 Tax Reform marks a transformative chapter in Nigeria&apos;s
            fiscal landscape. The overhaul of existing legislation is designed
            to modernise and simplify the country&apos;s tax system, with the
            aim of enhancing revenue generation and promoting equity.
          </p>

          <h4 className="font-semibold mt-4">Key Changes for Individuals:</h4>
          <ul className="space-y-2 text-sm">
            <li className="flex items-start gap-2">
              <span className="text-green-600">✓</span>
              <span>
                <strong>Tax Exemption:</strong> First ₦800,000 of income is
                completely tax-free
              </span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-green-600">✓</span>
              <span>
                <strong>Progressive Rates:</strong> New simplified tax brackets:
                15%, 18%, 21%, 23%, and 25%
              </span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-green-600">✓</span>
              <span>
                <strong>Simpler Structure:</strong> Tax calculated directly on
                gross income with clear brackets
              </span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-green-600">✓</span>
              <span>
                <strong>Lower Burden:</strong> Middle-income earners benefit
                from higher exemption threshold
              </span>
            </li>
          </ul>
        </CardContent>
      </Card>

      {/* Tax Brackets Table */}
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
              🎉 <strong>First ₦800,000 is TAX FREE!</strong> If you earn
              ₦800,000 or less annually, you pay no income tax.
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
            * This is a progressive tax system - each bracket rate only applies
            to income within that range.
          </p>
        </CardContent>
      </Card>

      {/* How Progressive Tax Works */}
      <Card>
        <CardHeader>
          <CardTitle>🧮 How Progressive Tax Works</CardTitle>
          <CardDescription>
            Understanding how your tax is calculated
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="bg-blue-50 dark:bg-blue-900 p-4 rounded-lg">
            <p className="text-sm text-blue-800 dark:text-blue-200">
              <strong>Progressive taxation</strong> means each tax rate only
              applies to income within that specific bracket, not your entire
              income.
            </p>
          </div>
          <div className="mt-4 space-y-2 text-sm text-muted-foreground">
            <p>
              <strong>Example:</strong> For a gross annual income of ₦5,000,000:
            </p>
            <ul className="list-disc list-inside space-y-1 ml-4">
              <li>
                First ₦800,000 → <strong>₦0</strong> (0% - Tax free)
              </li>
              <li>
                ₦800,001 – ₦3,000,000 (₦2,200,000) → <strong>₦330,000</strong>{" "}
                (15%)
              </li>
              <li>
                ₦3,000,001 – ₦5,000,000 (₦2,000,000) → <strong>₦360,000</strong>{" "}
                (18%)
              </li>
              <li className="mt-2">
                <strong>Total Tax = ₦0 + ₦330,000 + ₦360,000 = ₦690,000</strong>
              </li>
              <li>Effective Tax Rate = 13.8%</li>
            </ul>
          </div>
        </CardContent>
      </Card>

      {/* Tax Reliefs & Deductions */}
      <Card>
        <CardHeader>
          <CardTitle>💰 Tax Reliefs & Deductions</CardTitle>
          <CardDescription>
            Allowable deductions that reduce your taxable income
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-sm text-muted-foreground">
            Under the Nigerian tax system, certain contributions and expenses
            can be deducted from your gross income before calculating tax. These
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
                    Mandatory employee contribution (typically 8% of basic
                    salary)
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

      {/* Tax-Exempt Income */}
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
                <strong>Income Below Threshold:</strong> Earnings ₦800,000 or
                less per year are tax-free
              </span>
            </li>
          </ul>
        </CardContent>
      </Card>

      {/* Disclaimer */}
      <Card className="border-yellow-200 bg-yellow-50 dark:bg-yellow-950">
        <CardContent className="pt-6">
          <div className="flex items-start gap-3">
            <span className="text-2xl">⚠️</span>
            <div className="text-sm">
              <h4 className="font-semibold text-yellow-800 dark:text-yellow-200">
                Disclaimer
              </h4>
              <p className="text-yellow-700 dark:text-yellow-300 mt-1">
                This calculator provides estimates based on publicly available
                information about the Nigeria Tax Reform 2025. The actual
                gazetted versions may contain variations. Please consult a
                qualified tax professional for official tax advice and planning.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
