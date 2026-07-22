import type { Metadata } from "next";
import "./globals.css";


const title = "Frederico Foini — Senior Product Owner";
const description =
  "I’m a Senior Product Owner in São Paulo with 7+ years across digital products, growth, business analysis, and cross-functional delivery.";
const baseUrl = "https://fredfoini.github.io/website";

export const metadata: Metadata = {
  metadataBase: new URL(baseUrl),
  title,
  description,
  authors: [{ name: "Frederico Foini" }],
  creator: "Frederico Foini",
  keywords: [
    "Frederico Foini",
    "Senior Product Owner",
    "Product Management",
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
        alt: "Frederico Foini — Senior Product Owner",
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
