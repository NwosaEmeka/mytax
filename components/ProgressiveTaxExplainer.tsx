import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function ProgressiveTaxExplainer() {
  return (
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
  );
}
