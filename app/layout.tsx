import type { Metadata } from "next";
import "./globals.css";


const title = "Frederico Foini — Data Analytics, Growth & Product";
const description =
  "I’m a Senior Data Analyst in São Paulo with 7+ years across growth analytics, business performance, customer journeys, and digital product.";
const baseUrl = "https://fredfoini.github.io/website";

export const metadata: Metadata = {
  metadataBase: new URL(baseUrl),
  title,
  description,
  authors: [{ name: "Frederico Foini" }],
  creator: "Frederico Foini",
  keywords: [
    "Frederico Foini",
    "Senior Data Analyst",
    "Data Analytics",
    "Growth Analytics",
    "Product Analytics",
    "SQL",
    "Google BigQuery",
    "Power BI",
    "Business Analysis",
    "São Paulo",
    "Coca-Cola FEMSA",
  ],
  icons: {
    icon: "/website/favicon.png",
    shortcut: "/website/favicon.png",
  },
  openGraph: {
    type: "website",
    url: baseUrl,
    title,
    description,
    siteName: "Frederico Foini",
    locale: "en_US",
    images: [
      {
        url: `${baseUrl}/og.png`,
        width: 1200,
        height: 630,
        alt: "Frederico Foini — Data Analytics, Growth & Product",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
    images: [`${baseUrl}/og.png`],
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
