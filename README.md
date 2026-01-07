# 🇳🇬 TaxCalc Nigeria

> Free Nigerian Personal Income Tax Calculator based on the 2025 Tax Reform Act

[![Next.js](https://img.shields.io/badge/Next.js-16.1-black?logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-4.0-38B2AC?logo=tailwind-css)](https://tailwindcss.com/)
[![License](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)

**Live Demo:** [taxcalc.com.ng](https://taxcalc.com.ng)

---

## ✨ Features

- 🧮 **Accurate Tax Calculation** - Based on the Nigeria Tax Reform Act 2025
- 💰 **Tax-Free Threshold** - First ₦800,000 is completely tax-free
- 📊 **Progressive Tax Brackets** - 15%, 18%, 21%, 23%, 25% rates
- 🔄 **Monthly & Annual Toggle** - Calculate tax for any income period
- 📉 **Tax Deductions** - Pension, NHIS, NHF, rent relief, and more
- 📈 **Old vs New Comparison** - See your savings under the new reform
- 📰 **Live Tax News** - Google RSS feed integration for latest updates
- 📱 **Fully Responsive** - Works on desktop, tablet, and mobile
- 🌙 **Dark Mode Support** - Easy on the eyes
- 🔍 **SEO Optimized** - Schema markup, Open Graph, Twitter Cards

---

## 📋 2025 Tax Brackets

| Annual Income (₦)         | Tax Rate          |
| ------------------------- | ----------------- |
| ₦0 – ₦800,000             | **0%** (Tax-free) |
| ₦800,001 – ₦3,000,000     | 15%               |
| ₦3,000,001 – ₦12,000,000  | 18%               |
| ₦12,000,001 – ₦25,000,000 | 21%               |
| ₦25,000,001 – ₦50,000,000 | 23%               |
| Above ₦50,000,000         | 25%               |

---

## 🚀 Quick Start

### Prerequisites

- Node.js 18.17 or later
- npm, yarn, or pnpm

### Installation

```bash
# Clone the repository
git clone https://github.com/yourusername/taxcalc-nigeria.git
cd taxcalc-nigeria

# Install dependencies
npm install

# Run development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Build for Production

```bash
# Create optimized build
npm run build

# Start production server
npm start
```

---

## 💰 Tax Deductions Supported

| Deduction              | Description                           |
| ---------------------- | ------------------------------------- |
| **Pension (PFA)**      | Employee pension contributions        |
| **NHIS**               | National Health Insurance Scheme      |
| **NHF**                | National Housing Fund (2.5% of basic) |
| **Home Loan Interest** | Owner-occupied property loans         |
| **Life Insurance**     | Life insurance/annuity premiums       |
| **Rent Relief**        | 20% of annual rent (max ₦500,000)     |

---

## ⚙️ Environment Variables

Create a `.env.local` file in the root directory:

```env
# Site URL (for SEO and sitemap)
NEXT_PUBLIC_SITE_URL=
```

---

## 🔗 Official Resources

- [Nigeria Tax Act 2025 (PDF)](https://tat.gov.ng/Nigeria-Tax-Act-2025.pdf)
- [Tax Administration Act 2025 (PDF)](https://tat.gov.ng/NIGERIA-TAX-ADMINISTRATION-ACT-2025.pdf)
- [Federal Inland Revenue Service (FIRS)](https://www.firs.gov.ng)
- [Nigeria Tax Administration](https://tat.gov.ng)

---

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## ⚠️ Disclaimer

This calculator provides estimates based on publicly available information about the Nigeria Tax Reform 2025. The actual gazetted versions may contain variations. **Please consult a qualified tax professional for official tax advice and planning.**

---

## 👨‍💻 Author

**Emeka**

<p align="center">
  Made with ❤️ in Nigeria 🇳🇬
</p>
