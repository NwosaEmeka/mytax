import { Card, CardContent } from "@/components/ui/card";

export default function DisclaimerCard() {
  return (
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
              information about the Nigeria Tax Reform 2025. The actual gazetted
              versions may contain variations. Please consult a qualified tax
              professional for official tax advice and planning.
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
