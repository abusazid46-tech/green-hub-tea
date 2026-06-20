import type { Metadata } from "next";
import { brand, heroImage, products } from "@/lib/data";

const titleBase = "Green Hub Assam Tea";

export function pageMetadata(title: string, description: string, path = ""): Metadata {
  const url = `${brand.siteUrl}${path}`;
  const fullTitle = title === titleBase ? title : `${title} | ${titleBase}`;

  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: {
      title: fullTitle,
      description,
      url,
      siteName: titleBase,
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
      title: fullTitle,
      description,
      images: [heroImage]
    },
    keywords: [
      "Assam Tea",
      "Premium Assam Tea",
      "Assam Orthodox Tea",
      "Assam Green Tea",
      "Assam Black Tea",
      "Wholesale Tea Supplier India",
      "Tea Exporter Assam",
      "Bulk Tea Supplier",
      "Green Hub Assam",
      "Guwahati Tea Supplier",
      "CTC Tea Supplier",
      "Assam Gold Orthodox Tea"
    ]
  };
}

export function organizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": ["Organization", "LocalBusiness"],
    "@id": `${brand.siteUrl}/#organization`,
    name: brand.legalName,
    alternateName: brand.name,
    url: brand.siteUrl,
    logo: `${brand.siteUrl}/brand/greenhub-logo.png`,
    image: `${brand.siteUrl}/brand/greenhub-logo.png`,
    description: "Green Hub is a Guwahati-based wholesale supplier of premium Assam Tea, CTC Tea, Black Tea, and Assam Gold Orthodox Tea.",
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
    areaServed: ["India", "Worldwide"],
    knowsAbout: [
      "Assam Tea",
      "CTC Tea",
      "Black Tea",
      "Assam Orthodox Tea",
      "Bulk Tea Supply",
      "Wholesale Tea Distribution"
    ],
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
    url: `${brand.siteUrl}/product/${product.slug}`,
    sku: product.slug,
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
      itemCondition: "https://schema.org/NewCondition",
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
