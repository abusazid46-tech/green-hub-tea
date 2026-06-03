import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { WhatsAppFloat } from "@/components/whatsapp-float";
import { GsapEffects } from "@/components/gsap-effects";
import { JsonLd } from "@/components/json-ld";
import { faqSchema, organizationSchema } from "@/lib/seo";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter", display: "swap" });
const playfair = Playfair_Display({ subsets: ["latin"], variable: "--font-playfair", display: "swap" });

export const metadata: Metadata = {
  metadataBase: new URL("https://greenhubassamtea.vercel.app"),
  title: {
    default: "Green Hub Assam Tea",
    template: "%s | Green Hub Assam Tea"
  },
  description: "Premium Assam tea supplier and manufacturer from Guwahati for retail, wholesale, hotel, distributor, and export buyers."
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
