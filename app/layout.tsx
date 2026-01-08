import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://taxcalc.com.ng";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#15803d" },
    { media: "(prefers-color-scheme: dark)", color: "#14532d" },
  ],
};

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default:
      "Taxbox Naija - Free Personal Income Tax Calculator 2025 | PAYE Calculator",
    template: "%s | Taxbox Naija",
  },
  description:
    "Free Nigerian personal income tax calculator based on the 2025 Tax Reform Act. Calculate your PAYE, tax brackets, deductions & reliefs. First ₦800,000 is tax-free!",
  keywords: [
    "Nigeria tax calculator",
    "Nigerian tax calculator 2025",
    "PAYE calculator Nigeria",
    "personal income tax Nigeria",
    "Nigeria tax reform 2025",
    "tax brackets Nigeria 2025",
    "income tax calculator",
    "FIRS tax calculator",
    "Nigerian income tax",
    "tax reliefs Nigeria",
    "tax deductions Nigeria",
    "how to calculate PAYE in Nigeria",
    "Nigeria Tax Act 2025",
    "tax free income Nigeria",
    "PIT calculator Nigeria",
  ],
  authors: [{ name: "Taxbox Naija" }],
  creator: "Taxbox Naija",
  publisher: "Taxbox Naija",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "en_NG",
    url: siteUrl,
    siteName: "Taxbox Naija",
    title: "Taxbox Naija - Free Personal Income Tax Calculator 2025",
    description:
      "Calculate your Nigerian personal income tax based on the 2025 Tax Reform Act. Free PAYE calculator with deductions, reliefs & tax brackets. First ₦800,000 is tax-free!",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Taxbox Naija - Personal Income Tax Calculator",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Taxbox Naija - Free Personal Income Tax Calculator 2025",
    description:
      "Calculate your Nigerian PAYE tax based on the 2025 Tax Reform Act. First ₦800,000 is tax-free!",
    images: ["/og-image.png"],
    creator: "@taxboxng",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  // verification: {
  //   google: "YOUR_GOOGLE_VERIFICATION_CODE",
  //   // yandex: "YOUR_YANDEX_VERIFICATION_CODE",
  //   // bing: "YOUR_BING_VERIFICATION_CODE",
  // },
  category: "finance",
  classification: "Tax Calculator",
};

// JSON-LD Structured Data
const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebApplication",
      "@id": `${siteUrl}/#webapp`,
      name: "Taxbox Naija",
      description:
        "Free Nigerian personal income tax calculator based on the 2025 Tax Reform Act",
      url: siteUrl,
      applicationCategory: "FinanceApplication",
      operatingSystem: "Any",
      offers: {
        "@type": "Offer",
        price: "0",
        priceCurrency: "NGN",
      },
      featureList: [
        "Calculate PAYE tax",
        "2025 Tax Reform brackets",
        "Tax deductions and reliefs",
        "Monthly and annual calculation",
        "Compare old vs new tax policy",
      ],
    },
    {
      "@type": "Organization",
      "@id": `${siteUrl}/#organization`,
      name: "Taxbox Naija",
      url: siteUrl,
      logo: {
        "@type": "ImageObject",
        url: `${siteUrl}/logo.png`,
      },
      sameAs: [],
    },
    {
      "@type": "WebSite",
      "@id": `${siteUrl}/#website`,
      url: siteUrl,
      name: "Taxbox Naija",
      description: "Nigeria Personal Income Tax Calculator",
      publisher: {
        "@id": `${siteUrl}/#organization`,
      },
      potentialAction: {
        "@type": "SearchAction",
        target: {
          "@type": "EntryPoint",
          urlTemplate: `${siteUrl}/?q={search_term_string}`,
        },
        "query-input": "required name=search_term_string",
      },
    },
    {
      "@type": "FAQPage",
      "@id": `${siteUrl}/#faq`,
      mainEntity: [
        {
          "@type": "Question",
          name: "How much income is tax-free in Nigeria 2025?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Under the 2025 Tax Reform Act, the first ₦800,000 of annual income is completely tax-free. This means if you earn ₦66,667 or less per month, you pay no personal income tax.",
          },
        },
        {
          "@type": "Question",
          name: "What are the new tax brackets in Nigeria 2025?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "The 2025 tax brackets are: 0% (₦0-₦800,000), 15% (₦800,001-₦3,000,000), 18% (₦3,000,001-₦12,000,000), 21% (₦12,000,001-₦25,000,000), 23% (₦25,000,001-₦50,000,000), and 25% (above ₦50,000,000).",
          },
        },
        {
          "@type": "Question",
          name: "What deductions can I claim on my Nigerian income tax?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "You can claim deductions for pension contributions, NHIS contributions, NHF contributions, housing loan interest, life insurance premiums, and rent relief (capped at ₦500,000 or 20% of annual rent).",
          },
        },
        {
          "@type": "Question",
          name: "How do I calculate my PAYE in Nigeria?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "PAYE (Pay As You Earn) is calculated by applying progressive tax rates to your taxable income. First, deduct allowable reliefs from your gross income, then apply the tax brackets. The first ₦800,000 is tax-free, then rates of 15% to 25% apply progressively.",
          },
        },
      ],
    },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" href="/icon.svg" type="image/svg+xml" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/manifest.json" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
