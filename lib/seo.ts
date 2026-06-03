import type { Metadata } from "next";
import { brand, products } from "@/lib/data";

const titleBase = "Green Hub Assam Tea";

export function pageMetadata(title: string, description: string, path = ""): Metadata {
  const url = `${brand.siteUrl}${path}`;

  return {
    title: title === titleBase ? title : `${title} | ${titleBase}`,
    description,
    alternates: { canonical: url },
    openGraph: {
      title,
      description,
      url,
      siteName: titleBase,
      locale: "en_IN",
      type: "website"
    },
    twitter: {
      card: "summary_large_image",
      title,
      description
    },
    keywords: [
      "Assam Tea",
      "Premium Assam Tea",
      "Assam Orthodox Tea",
      "Assam Green Tea",
      "Assam Black Tea",
      "Wholesale Tea Supplier India",
      "Tea Exporter Assam",
      "Bulk Tea Supplier"
    ]
  };
}

export function organizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: brand.legalName,
    url: brand.siteUrl,
    foundingDate: brand.founded,
    address: {
      "@type": "PostalAddress",
      streetAddress: "House no 9A, Ground Floor, Padma Path, Zoo Road Tiniali, RG Baruah Road",
      addressLocality: "Guwahati",
      addressRegion: "Assam",
      postalCode: "781024",
      addressCountry: "IN"
    },
    telephone: brand.phone,
    email: brand.email,
    taxID: brand.gst,
    makesOffer: products.map((product) => product.name)
  };
}

export function productSchema(slug: string) {
  const product = products.find((item) => item.slug === slug);
  if (!product) return null;

  return {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    description: product.description,
    image: product.image,
    brand: {
      "@type": "Brand",
      name: brand.name
    },
    category: product.category,
    offers: {
      "@type": "Offer",
      priceCurrency: "INR",
      price: product.price,
      availability: "https://schema.org/InStock",
      url: `${brand.siteUrl}/product/${product.slug}`
    }
  };
}

export function faqSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "Does Green Hub support wholesale tea supply?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Yes. Green Hub supports wholesale, distributor, retail, hotel, cafe, and institutional tea inquiries."
        }
      },
      {
        "@type": "Question",
        name: "Can international buyers inquire for export?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Yes. Green Hub supplies Pan India and supports worldwide export inquiries for Assam tea and agricultural products."
        }
      }
    ]
  };
}
