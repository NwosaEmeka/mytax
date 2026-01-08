import TaxCalculator from "@/components/TaxCalculator";
import TaxNews from "@/components/TaxNews";
import TaxInfo from "@/components/TaxInfo";

export default function Home() {
  return (
    <main className="min-h-screen">
      {/* Header */}
      <header className="bg-green-700 text-white py-6 shadow-lg">
        <div className="container mx-auto px-4">
          <div className="flex items-center gap-3">
            <span className="text-4xl">🇳🇬</span>
            <div>
              <h1 className="text-2xl md:text-3xl font-bold">Taxbox Naija</h1>
              <p className="text-green-100 text-sm md:text-base">
                Personal Income Tax Calculator - 2025 Tax Reform
              </p>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Calculator - Main Column */}
          <div className="lg:col-span-2 space-y-8">
            <TaxCalculator />
            <TaxInfo />
          </div>

          {/* Sidebar - News */}
          <div className="space-y-6">
            <TaxNews />

            {/* Official Documents */}
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-4">
              <h3 className="font-semibold mb-3 text-sm uppercase text-muted-foreground">
                📜 Official Documents
              </h3>
              <ul className="space-y-2 text-sm">
                <li>
                  <a
                    href="https://tat.gov.ng/Nigeria-Tax-Act-2025.pdf"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-green-600 hover:underline flex items-center gap-2"
                  >
                    📄 Nigeria Tax Act 2025 (PDF)
                  </a>
                </li>
                <li>
                  <a
                    href="https://tat.gov.ng/NIGERIA-TAX-ADMINISTRATION-ACT-2025.pdf"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-green-600 hover:underline flex items-center gap-2"
                  >
                    📄 Tax Administration Act 2025 (PDF)
                  </a>
                </li>
              </ul>
            </div>

            {/* Quick Links */}
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-4">
              <h3 className="font-semibold mb-3 text-sm uppercase text-muted-foreground">
                Useful Links
              </h3>
              <ul className="space-y-2 text-sm">
                <li>
                  <a
                    href="https://tat.gov.ng"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-green-600 hover:underline flex items-center gap-2"
                  >
                    🏛️ Nigeria Tax Administration (TAT)
                  </a>
                </li>
                <li>
                  <a
                    href="https://www.firs.gov.ng"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-green-600 hover:underline flex items-center gap-2"
                  >
                    🏛️ Federal Inland Revenue Service (FIRS)
                  </a>
                </li>
                <li>
                  <a
                    href="https://www.pwc.com/ng/en/publications/nigeria-tax-reform-2025.html"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-green-600 hover:underline flex items-center gap-2"
                  >
                    📊 PwC Tax Reform Analysis
                  </a>
                </li>
              </ul>
            </div>

            {/* Info Box */}
            <div className="bg-linear-to-br from-green-600 to-green-700 text-white rounded-lg shadow p-4">
              <h3 className="font-semibold mb-2">💡 Did You Know?</h3>
              <p className="text-sm text-green-100">
                The new 2025 Tax Reform exempts individuals earning ₦800,000 or
                less per year from personal income tax. This means if you earn
                about ₦66,667 or less monthly, you don&apos;t pay income tax!
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-100 dark:bg-gray-900 border-t mt-12 py-8">
        <div className="container mx-auto px-4 text-center text-sm text-muted-foreground">
          <p>© {new Date().getFullYear()} Taxbox Naija.</p>
          <p className="mt-2">
            This calculator is for informational purposes only. Consult a tax
            professional for official advice.
          </p>
          <p className="mt-2 text-xs">
            Tax information based on Nigeria Tax Reform Acts signed June 2025
          </p>
        </div>
      </footer>
    </main>
  );
}
