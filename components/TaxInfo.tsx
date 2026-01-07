import TaxReformOverview from "@/components/TaxReformOverview";
import TaxBracketsTable from "@/components/TaxBracketsTable";
import ProgressiveTaxExplainer from "@/components/ProgressiveTaxExplainer";
import TaxDeductionsTable from "@/components/TaxDeductionsTable";
import TaxExemptIncome from "@/components/TaxExemptIncome";
import DisclaimerCard from "@/components/DisclaimerCard";

export default function TaxInfo() {
  return (
    <div className="space-y-6">
      <TaxReformOverview />
      <TaxBracketsTable />
      <ProgressiveTaxExplainer />
      <TaxDeductionsTable />
      <TaxExemptIncome />
      <DisclaimerCard />
    </div>
  );
}
