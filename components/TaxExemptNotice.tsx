import { Card, CardContent } from "@/components/ui/card";

export default function TaxExemptNotice() {
  return (
    <Card className="border-green-500 bg-green-50 dark:bg-green-950">
      <CardContent className="pt-6">
        <div className="flex items-center gap-3">
          <span className="text-4xl">🎉</span>
          <div>
            <h3 className="text-xl font-bold text-green-800 dark:text-green-400">
              Good News! You&apos;re Tax Exempt
            </h3>
            <p className="text-green-700 dark:text-green-300">
              Under the new 2025 Tax Reform, individuals earning ₦800,000 or
              less annually are exempt from personal income tax.
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
