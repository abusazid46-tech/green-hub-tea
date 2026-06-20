import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { WhatsAppFloat } from "@/components/whatsapp-float";
import { GsapEffects } from "@/components/gsap-effects";
import { JsonLd } from "@/components/json-ld";
import { brand, heroImage } from "@/lib/data";
import { faqSchema, organizationSchema } from "@/lib/seo";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter", display: "swap" });
const playfair = Playfair_Display({ subsets: ["latin"], variable: "--font-playfair", display: "swap" });

export const metadata: Metadata = {
  metadataBase: new URL(brand.siteUrl),
  title: {
    default: "Green Hub Assam Tea",
    template: "%s | Green Hub Assam Tea"
  },
  description: "Premium Assam tea supplier and manufacturer from Guwahati for retail, wholesale, hotel, distributor, and export buyers.",
  applicationName: "Green Hub Assam Tea",
  authors: [{ name: "Green Hub" }],
  creator: "Green Hub",
  publisher: "Green Hub",
  category: "Wholesale Tea Supplier",
  keywords: [
    "Assam tea supplier",
    "premium Assam tea",
    "wholesale tea supplier India",
    "Assam CTC tea",
    "Assam orthodox tea",
    "black tea supplier Guwahati",
    "bulk tea supplier Assam",
    "tea distributor India"
  ],
  alternates: {
    canonical: brand.siteUrl
  },
  openGraph: {
    title: "Green Hub Assam Tea",
    description: "Premium Assam tea supplier and manufacturer from Guwahati for retail, wholesale, distributor, hotel, cafe, and export buyers.",
    url: brand.siteUrl,
    siteName: "Green Hub Assam Tea",
    locale: "en_IN",
    type: "website",
    images: [
      {
        url: heroImage,
        width: 1200,
        height: 630,
        alt: "Green Hub Assam tea garden"
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    title: "Green Hub Assam Tea",
    description: "Premium Assam tea supplier and manufacturer from Guwahati for wholesale, retail, distributor, and export buyers.",
    images: [heroImage]
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1
    }
  },
  icons: {
    icon: [
      { url: "/favicon.png", type: "image/png", sizes: "64x64" },
      { url: "/brand/greenhub-icon-192.png", type: "image/png", sizes: "192x192" }
    ],
    apple: [{ url: "/apple-icon.png", type: "image/png", sizes: "180x180" }]
  }
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${inter.variable} ${playfair.variable}`}>
      <body>
        <JsonLd data={organizationSchema()} />
        <JsonLd data={faqSchema()} />
        <GsapEffects />
        <SiteHeader />
        <main>{children}</main>
        <SiteFooter />
        <WhatsAppFloat />
      </body>
    </html>
  );
}
