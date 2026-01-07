// Nigeria Tax Calculator based on the 2025 Tax Reform Act
// Signed into law by President Bola Ahmed Tinubu on June 26, 2025

export interface TaxDeductions {
  pensionContribution: number; // PFA contributions
  nhisContribution: number; // National Health Insurance Scheme
  nhfContribution: number; // National Housing Fund
  housingLoanInterest: number; // Interest on owner-occupied home loan
  lifeInsurancePremium: number; // Life insurance or annuity premiums
  rentRelief: number; // House rent (capped at ₦500,000 or 20% of gross)
}

export interface TaxBreakdown {
  grossIncome: number;
  totalDeductions: number;
  deductionsBreakdown: { name: string; amount: number }[];
  taxableIncome: number;
  taxBrackets: TaxBracketResult[];
  totalTax: number;
  effectiveTaxRate: number;
  netIncome: number;
  isExempt: boolean;
}

export interface TaxBracketResult {
  bracket: string;
  rate: number;
  taxableAmount: number;
  tax: number;
}

// New Nigeria Tax Reform 2025 - Personal Income Tax Brackets
// First ₦800,000 is completely tax-free
// Progressive rates applied on income above ₦800,000
const TAX_BRACKETS_2025 = [
  { min: 0, max: 800000, rate: 0 }, // ₦0 – ₦800,000: 0% (Tax-free)
  { min: 800000, max: 3000000, rate: 0.15 }, // ₦800,001 – ₦3,000,000: 15%
  { min: 3000000, max: 12000000, rate: 0.18 }, // ₦3,000,001 – ₦12,000,000: 18%
  { min: 12000000, max: 25000000, rate: 0.21 }, // ₦12,000,001 – ₦25,000,000: 21%
  { min: 25000000, max: 50000000, rate: 0.23 }, // ₦25,000,001 – ₦50,000,000: 23%
  { min: 50000000, max: Infinity, rate: 0.25 }, // Above ₦50,000,000: 25%
];

// Previous tax brackets (PITA 2011)
const TAX_BRACKETS_OLD = [
  { min: 0, max: 300000, rate: 0.07 },
  { min: 300000, max: 600000, rate: 0.11 },
  { min: 600000, max: 1100000, rate: 0.15 },
  { min: 1100000, max: 1600000, rate: 0.19 },
  { min: 1600000, max: 3200000, rate: 0.21 },
  { min: 3200000, max: Infinity, rate: 0.24 },
];

// Calculate house rent relief (20% of rent paid, capped at ₦500,000)
export function calculateRentRelief(rentPaid: number): number {
  const rentRelief = rentPaid * 0.2;
  return Math.min(rentRelief, 500000);
}

// Default empty deductions
export const emptyDeductions: TaxDeductions = {
  pensionContribution: 0,
  nhisContribution: 0,
  nhfContribution: 0,
  housingLoanInterest: 0,
  lifeInsurancePremium: 0,
  rentRelief: 0,
};

export function calculateConsolidatedReliefAllowance(
  grossIncome: number
): number {
  // CRA = NGN 200,000 or 1% of gross income (whichever is higher) + 20% of gross income
  const baseRelief = Math.max(200000, grossIncome * 0.01);
  const additionalRelief = grossIncome * 0.2;
  return baseRelief + additionalRelief;
}

export function calculateTax(
  grossAnnualIncome: number,
  useNewPolicy: boolean = true,
  deductions: TaxDeductions = emptyDeductions
): TaxBreakdown {
  // Calculate total deductions
  const deductionsBreakdown: { name: string; amount: number }[] = [];

  // Apply rent relief (20% of rent paid, capped at ₦500,000)
  const cappedRentRelief = calculateRentRelief(deductions.rentRelief);

  if (deductions.pensionContribution > 0) {
    deductionsBreakdown.push({
      name: "Pension (PFA)",
      amount: deductions.pensionContribution,
    });
  }
  if (deductions.nhisContribution > 0) {
    deductionsBreakdown.push({
      name: "NHIS",
      amount: deductions.nhisContribution,
    });
  }
  if (deductions.nhfContribution > 0) {
    deductionsBreakdown.push({
      name: "NHF",
      amount: deductions.nhfContribution,
    });
  }
  if (deductions.housingLoanInterest > 0) {
    deductionsBreakdown.push({
      name: "Home Loan Interest",
      amount: deductions.housingLoanInterest,
    });
  }
  if (deductions.lifeInsurancePremium > 0) {
    deductionsBreakdown.push({
      name: "Life Insurance",
      amount: deductions.lifeInsurancePremium,
    });
  }
  if (cappedRentRelief > 0) {
    deductionsBreakdown.push({ name: "Rent Relief", amount: cappedRentRelief });
  }

  const totalDeductions =
    deductions.pensionContribution +
    deductions.nhisContribution +
    deductions.nhfContribution +
    deductions.housingLoanInterest +
    deductions.lifeInsurancePremium +
    cappedRentRelief;

  // Income after deductions
  const incomeAfterDeductions = Math.max(
    0,
    grossAnnualIncome - totalDeductions
  );

  // New 2025 Tax Reform: Individuals earning NGN 800,000 or less are exempt
  const EXEMPTION_THRESHOLD = 800000;
  const isExempt = useNewPolicy && incomeAfterDeductions <= EXEMPTION_THRESHOLD;

  if (isExempt) {
    return {
      grossIncome: grossAnnualIncome,
      totalDeductions,
      deductionsBreakdown,
      taxableIncome: 0,
      taxBrackets: [],
      totalTax: 0,
      effectiveTaxRate: 0,
      netIncome: grossAnnualIncome,
      isExempt: true,
    };
  }

  // For new policy: Tax is calculated on income after deductions
  // For old policy: Use CRA to calculate taxable income first
  let taxableIncome = incomeAfterDeductions;

  if (!useNewPolicy) {
    // Old policy uses Consolidated Relief Allowance
    const cra = calculateConsolidatedReliefAllowance(incomeAfterDeductions);
    taxableIncome = Math.max(0, incomeAfterDeductions - cra);
  }

  // Select tax brackets based on policy
  const taxBrackets = useNewPolicy ? TAX_BRACKETS_2025 : TAX_BRACKETS_OLD;

  // Calculate tax for each bracket (progressive taxation)
  const bracketResults: TaxBracketResult[] = [];
  let totalTax = 0;

  for (const bracket of taxBrackets) {
    // Skip if income doesn't reach this bracket
    if (taxableIncome <= bracket.min) break;

    // Calculate how much income falls in this bracket
    const incomeInBracket = Math.min(taxableIncome, bracket.max) - bracket.min;
    const taxInBracket = incomeInBracket * bracket.rate;

    if (incomeInBracket > 0 && bracket.rate > 0) {
      bracketResults.push({
        bracket:
          bracket.max === Infinity
            ? `Above ₦${formatNumber(bracket.min)}`
            : `₦${formatNumber(bracket.min)} – ₦${formatNumber(bracket.max)}`,
        rate: bracket.rate * 100,
        taxableAmount: incomeInBracket,
        tax: taxInBracket,
      });
    }

    totalTax += taxInBracket;
  }

  // Calculate effective tax rate
  const effectiveTaxRate =
    grossAnnualIncome > 0 ? (totalTax / grossAnnualIncome) * 100 : 0;

  // Calculate net income
  const netIncome = grossAnnualIncome - totalTax;

  return {
    grossIncome: grossAnnualIncome,
    totalDeductions,
    deductionsBreakdown,
    taxableIncome,
    taxBrackets: bracketResults,
    totalTax,
    effectiveTaxRate,
    netIncome,
    isExempt: false,
  };
}

export function formatNumber(num: number): string {
  return num.toLocaleString("en-NG");
}

export function formatCurrency(num: number): string {
  return `₦${formatNumber(Math.round(num))}`;
}

// Calculate monthly values from annual
export function toMonthly(annualAmount: number): number {
  return annualAmount / 12;
}

// Calculate annual values from monthly
export function toAnnual(monthlyAmount: number): number {
  return monthlyAmount * 12;
}
