import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function TaxReformOverview() {
  return (
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
          fiscal landscape. The overhaul of existing legislation is designed to
          modernise and simplify the country&apos;s tax system, with the aim of
          enhancing revenue generation and promoting equity.
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
              <strong>Lower Burden:</strong> Middle-income earners benefit from
              higher exemption threshold
            </span>
          </li>
        </ul>
      </CardContent>
    </Card>
  );
}
