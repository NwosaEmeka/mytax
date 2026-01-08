import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import { TaxBreakdown } from "./tax-calculator";

/**
 * Enhanced Formatting Helper
 * Uses 'NGN' instead of '₦' to prevent the "1" prefix character encoding error
 * found in standard PDF viewers.
 */

interface PDFExportData {
  calculationType: "monthly" | "annual";
  income: number;
  annualIncome: number;
  newPolicy: TaxBreakdown;
  oldPolicy: TaxBreakdown;
  hasDeductions: boolean;
}

const formatCurrency = (amount: number): string => {
  return `NGN ${amount.toLocaleString("en-NG", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })}`;
};

export function exportTaxBreakdownToPDF(data: PDFExportData) {
  const doc = new jsPDF({
    orientation: "portrait",
    unit: "mm",
    format: "a4",
  });

  const pageWidth = doc.internal.pageSize.width;
  const margin = 14;
  let yPos = 0;

  doc.setFillColor(21, 128, 61); // Nigeria Green
  doc.rect(0, 0, pageWidth, 40, "F");

  doc.setTextColor(255, 255, 255);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(22);
  doc.text("TAX BREAKDOWN REPORT", pageWidth / 2, 18, { align: "center" });

  doc.setFontSize(10);
  doc.setFont("helvetica", "normal");
  doc.text("Official Estimate: Nigeria Tax Reform 2025", pageWidth / 2, 28, {
    align: "center",
  });

  yPos = 50;
  doc.setTextColor(40, 40, 40);
  doc.setFontSize(14);
  doc.setFont("helvetica", "bold");
  doc.text("1. Income Summary", margin, yPos);

  autoTable(doc, {
    startY: yPos + 5,
    margin: { left: margin, right: margin },
    body: [
      ["Monthly Income", formatCurrency(data.income)],
      ["Annual Gross Income", formatCurrency(data.annualIncome)],
      ["Tax-Free Threshold", formatCurrency(800000)], // Based on reform data
    ],
    theme: "plain",
    styles: { fontSize: 10, cellPadding: 2 },
    columnStyles: {
      0: { fontStyle: "bold", cellWidth: 50 },
      1: { halign: "right" },
    },
  });

  yPos = (doc as any).lastAutoTable.finalY + 12;
  doc.setFontSize(14);
  doc.setFont("helvetica", "bold");
  doc.text("2. 2025 Reform Calculation", margin, yPos);

  autoTable(doc, {
    startY: yPos + 5,
    margin: { left: margin, right: margin },
    head: [["Description", "Amount"]],
    body: [
      ["Gross Taxable Income", formatCurrency(data.newPolicy.taxableIncome)],
      ["Total Annual Tax", formatCurrency(data.newPolicy.totalTax)],
      ["Effective Tax Rate", `${data.newPolicy.effectiveTaxRate.toFixed(2)}%`],
    ],
    headStyles: { fillColor: [21, 128, 61], fontSize: 10 },
    styles: { fontSize: 10 },
    columnStyles: { 1: { halign: "right" } },
  });

  yPos = (doc as any).lastAutoTable.finalY + 10;
  doc.setFillColor(240, 240, 240);
  doc.roundedRect(margin, yPos, pageWidth - margin * 2, 20, 2, 2, "F");

  doc.setFontSize(12);
  doc.setTextColor(21, 128, 61);
  doc.text("Annual Net Income (Take-Home):", margin + 5, yPos + 12);
  doc.setFontSize(14);
  doc.text(
    formatCurrency(data.newPolicy.netIncome),
    pageWidth - margin - 5,
    yPos + 12,
    { align: "right" }
  );

  yPos += 35;
  doc.setTextColor(40, 40, 40);
  doc.setFontSize(14);
  doc.text("3. Policy Comparison", margin, yPos);

  autoTable(doc, {
    startY: yPos + 5,
    margin: { left: margin, right: margin },
    head: [["Metric", "Previous (PITA 2011)", "New 2025 Reform"]],
    body: [
      [
        "Annual Tax",
        formatCurrency(data.oldPolicy.totalTax),
        formatCurrency(data.newPolicy.totalTax),
      ],
      [
        "Effective Rate",
        `${data.oldPolicy.effectiveTaxRate.toFixed(2)}%`,
        `${data.newPolicy.effectiveTaxRate.toFixed(2)}%`,
      ],
      [
        "Net Income",
        formatCurrency(data.oldPolicy.netIncome),
        formatCurrency(data.newPolicy.netIncome),
      ],
    ],
    theme: "striped",
    headStyles: { fillColor: [80, 80, 80] },
    columnStyles: { 1: { halign: "right" }, 2: { halign: "right" } },
  });

  const pageCount = (doc as any).internal.getNumberOfPages();
  for (let i = 1; i <= pageCount; i++) {
    doc.setPage(i);
    doc.setFontSize(8);
    doc.setTextColor(150);
    doc.text(
      `Generated on ${new Date().toLocaleDateString("en-NG")} | taxcalc.com.ng`,
      pageWidth / 2,
      285,
      { align: "center" }
    );
    doc.text(
      `Page ${i} of ${pageCount}`,
      pageWidth - 20,
      doc.internal.pageSize.height - 10,
      { align: "right" }
    );

    if (i === pageCount) {
      doc.setFontSize(7);

      doc.text(
        "This calculator provides estimates based on the Nigeria Tax Reform 2025. Consult a tax professional for official advice.",
        pageWidth / 2,
        doc.internal.pageSize.height - 15,
        { align: "center", maxWidth: pageWidth - 40 }
      );
    }
  }

  doc.save(`Tax_Report_2025_${new Date().getTime()}.pdf`);
}
