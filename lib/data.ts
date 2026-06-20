import {
  Award,
  BadgeCheck,
  Globe2,
  Leaf,
  PackageCheck,
  Plane,
  Scale,
  ShieldCheck,
  Sparkles,
  Store,
  Timer,
  Truck
} from "lucide-react";

export const brand = {
  name: "Green Hub Assam Tea",
  legalName: "Green Hub",
  phone: "+91 93656 53511",
  email: "ethina20@gmail.com",
  gst: "18AHVPB2397K1ZP",
  founded: "2018",
  address: "House no 9A, Ground Floor, Padma Path, Zoo Road Tiniali, RG Baruah Road, Guwahati, Assam 781024",
  location: "Guwahati, Assam, India",
  siteUrl: "https://www.greenhubassam.com"
};

export type Product = {
  slug: string;
  name: string;
  category: string;
  short: string;
  description: string;
  price: number;
  image: string;
  gallery: string[];
  benefits: string[];
  specs: Record<string, string>;
  notes: string[];
  strength: number;
  brew: {
    water: string;
    time: string;
    temperature: string;
    ratio: string;
  };
  popular?: boolean;
};

const teaGarden = "https://images.unsplash.com/photo-1560087637-bf797bc7796a?auto=format&fit=crop&w=1400&q=82";
const blackTea = "https://images.unsplash.com/photo-1597481499750-3e6b22637e12?auto=format&fit=crop&w=1200&q=82";
const greenTea = "https://images.unsplash.com/photo-1556679343-c7306c1976bc?auto=format&fit=crop&w=1200&q=82";
const looseLeaf = "https://images.unsplash.com/photo-1531969179221-3946e6b5a5e7?auto=format&fit=crop&w=1200&q=82";
const teaCup = "https://images.unsplash.com/photo-1571934811356-5cc061b6821f?auto=format&fit=crop&w=1200&q=82";
const ctc = "https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=1200&q=82";
const assamTeaHero = "https://images.pexels.com/photos/36906757/pexels-photo-36906757.jpeg?auto=compress&cs=tinysrgb&w=2200&h=1400&fit=crop";

export const products: Product[] = [
  {
    slug: "assam-orthodox-tea-leaf",
    name: "Assam Orthodox Tea Leaf",
    category: "Orthodox Tea",
    short: "Superior dried orthodox leaves with strong liquor and a refined malty cup.",
    description: "A premium orthodox Assam tea crafted for buyers who want layered aroma, long leaf character, and the unmistakable strength of the Brahmaputra valley.",
    price: 920,
    image: looseLeaf,
    gallery: [looseLeaf, teaGarden, teaCup],
    benefits: ["Long leaf grade", "Strong liquor", "Premium breakfast cup"],
    specs: {
      Type: "Natural",
      Style: "Dried",
      Certification: "FSSAI Certified",
      "Shelf Life": "1 Year",
      Grade: "Superior"
    },
    notes: ["Malt", "Honey wood", "Deep amber"],
    strength: 86,
    brew: {
      water: "220 ml",
      time: "3-4 min",
      temperature: "95 C",
      ratio: "2.5 g"
    },
    popular: true
  },
  {
    slug: "assam-black-tea",
    name: "Assam Black Tea",
    category: "Black Tea",
    short: "Aromatic black tea with bright color, strong aroma, and a dependable daily cup.",
    description: "A robust Assam black tea selected for cafes, hotels, retailers, and tea lovers seeking a clean, fragrant, full-bodied brew.",
    price: 780,
    image: blackTea,
    gallery: [blackTea, teaCup, teaGarden],
    benefits: ["Strong aroma", "Health-conscious choice", "Excellent with milk"],
    specs: {
      Type: "Natural",
      Style: "Dried",
      Certification: "FSSAI Certified",
      "Shelf Life": "1 Year",
      Grade: "Superior"
    },
    notes: ["Roasted malt", "Cocoa", "Copper liquor"],
    strength: 82,
    brew: {
      water: "220 ml",
      time: "3 min",
      temperature: "95 C",
      ratio: "2 g"
    },
    popular: true
  },
  {
    slug: "assam-green-tea",
    name: "Assam Green Tea",
    category: "Green Tea",
    short: "Clean, vegetal, and fragrant Assam green tea for wellness-led assortments.",
    description: "A bright green tea with fresh aroma and a light finish, suited to retail wellness shelves, hospitality menus, and everyday mindful brewing.",
    price: 860,
    image: greenTea,
    gallery: [greenTea, teaCup, teaGarden],
    benefits: ["Fresh fragrance", "Light body", "Wellness positioning"],
    specs: {
      Type: "Natural",
      Style: "Dried",
      Certification: "FSSAI Certified",
      "Shelf Life": "1 Year",
      Grade: "Superior"
    },
    notes: ["Fresh grass", "Citrus peel", "Soft sweetness"],
    strength: 54,
    brew: {
      water: "220 ml",
      time: "2 min",
      temperature: "80 C",
      ratio: "2 g"
    }
  },
  {
    slug: "black-tea-bopsm",
    name: "Black Tea BOPSM",
    category: "CTC Tea",
    short: "Best-quality CTC BOPSM tea designed for strong liquor and bulk consistency.",
    description: "A dependable CTC grade for distributors, canteens, cafes, hotels, and private label packs that need brisk strength and reliable blend performance.",
    price: 640,
    image: ctc,
    gallery: [ctc, blackTea, teaCup],
    benefits: ["Bulk friendly", "Brisk liquor", "Private label ready"],
    specs: {
      Type: "Natural",
      Style: "Dried",
      Certification: "FSSAI Certified",
      "Shelf Life": "1 Year",
      Grade: "BOPSM"
    },
    notes: ["Bold malt", "Toasted grain", "Brisk finish"],
    strength: 94,
    brew: {
      water: "200 ml",
      time: "4 min",
      temperature: "98 C",
      ratio: "2.5 g"
    }
  },
  {
    slug: "black-tea-dust-powder",
    name: "Black Tea Dust Powder",
    category: "Tea Dust",
    short: "Aromatic tea dust powder with strong liquor for quick brewing and mass service.",
    description: "A premium tea dust powder for restaurants, institutional buyers, and packaged tea lines where speed, color, and intensity matter.",
    price: 520,
    image: teaCup,
    gallery: [teaCup, ctc, blackTea],
    benefits: ["Quick extraction", "Strong color", "Food service ready"],
    specs: {
      Type: "Natural",
      Style: "Dried",
      Certification: "FSSAI Certified",
      "Shelf Life": "1 Year",
      Grade: "Superior"
    },
    notes: ["Deep liquor", "Bold tannin", "Classic chai base"],
    strength: 98,
    brew: {
      water: "180 ml",
      time: "3-5 min",
      temperature: "98 C",
      ratio: "2 g"
    }
  }
];

export const highlights = [
  { label: "Established", value: "2018", icon: Award },
  { label: "Pan India Delivery", value: "All States", icon: Truck },
  { label: "Export Ready", value: "Worldwide", icon: Plane },
  { label: "FSSAI Certified", value: "Quality Assured", icon: ShieldCheck }
];

export const whyChoose = [
  { title: "Premium Assam Teas", text: "Assam Tea, CTC Tea, Black Tea, and Assam Gold Orthodox Tea selected for dependable flavor and aroma.", icon: Leaf },
  { title: "Bulk & Loose Supply", text: "Flexible supply options for tea traders, retailers, distributors, hotels, cafes, and business buyers.", icon: PackageCheck },
  { title: "Consistent Freshness", text: "Products are managed for consistent taste, aroma, freshness, and reliable buyer confidence.", icon: BadgeCheck },
  { title: "Wholesale Pricing", text: "Competitive pricing for repeat trade, bulk sourcing, private label, and growing retail networks.", icon: Scale },
  { title: "Nationwide Distribution", text: "Guwahati-based supply support for customers and businesses across India.", icon: Truck },
  { title: "Prompt Service", text: "A customer-centric approach shaped around fast responses, clear details, and long-term relationships.", icon: Timer }
];

export const missionVision = [
  {
    title: "Our Mission",
    text: "To bring the authentic taste of Assam to tea lovers and businesses across India through premium sourcing, dependable wholesale supply, and prompt customer service.",
    icon: Leaf
  },
  {
    title: "Our Vision",
    text: "To become a trusted national tea supply partner known for quality assurance, ethical business practices, consistent freshness, and long-term customer relationships.",
    icon: Globe2
  }
];

export const aboutStats = [
  { label: "Established", value: "2018" },
  { label: "Base", value: "Guwahati" },
  { label: "Supply", value: "Bulk & Loose" },
  { label: "Reach", value: "Pan India" }
];

export const testimonials = [
  {
    quote: "Green Hub gives us a dependable Assam tea supply with consistent aroma, liquor, and freshness for repeat customers.",
    name: "Wholesale Tea Buyer",
    role: "Retail Distribution"
  },
  {
    quote: "Their CTC and black tea options are practical for business use, with clear pricing conversations and prompt service.",
    name: "Cafe Procurement Lead",
    role: "Hospitality Buyer"
  },
  {
    quote: "We value Green Hub for bulk supply flexibility and the confidence that the product quality stays consistent.",
    name: "Regional Distributor",
    role: "Trade Partner"
  }
];

export const buyerTypes = [
  { label: "Retail Chains", icon: Store },
  { label: "Hotels & Cafes", icon: Award },
  { label: "Distributors", icon: Scale },
  { label: "Export Partners", icon: Globe2 }
];

export const blogPosts = [
  {
    slug: "benefits-of-assam-tea",
    title: "Benefits of Assam Tea",
    excerpt: "Why Assam's brisk malty liquor remains a favorite for daily energy, milk tea, and premium breakfast blends.",
    minutes: "4 min read"
  },
  {
    slug: "green-tea-guide",
    title: "Green Tea Guide",
    excerpt: "How to brew Assam green tea for a clean, fragrant cup without bitterness.",
    minutes: "3 min read"
  },
  {
    slug: "black-tea-vs-green-tea",
    title: "Black Tea vs Green Tea",
    excerpt: "A buyer-friendly comparison of taste, processing, shelf positioning, and brewing style.",
    minutes: "5 min read"
  },
  {
    slug: "how-to-brew-assam-tea",
    title: "How To Brew Assam Tea",
    excerpt: "Time, temperature, and leaf ratio guidance for orthodox, CTC, green tea, and tea dust.",
    minutes: "4 min read"
  },
  {
    slug: "why-assam-tea-is-world-famous",
    title: "Why Assam Tea Is World Famous",
    excerpt: "The heritage, climate, and cup character that make Assam tea a global benchmark.",
    minutes: "6 min read"
  }
];

export const heroImage = assamTeaHero;
