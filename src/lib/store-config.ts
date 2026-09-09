import { TEMPLATES, type StoreTemplate } from "@/lib/templates";

export type StoreSocials = {
  facebook?: string;
  instagram?: string;
  tiktok?: string;
  twitter?: string;
  youtube?: string;
  snapchat?: string;
};

export type StoreMeta = {
  site_name: string;
  logo_url?: string | null;
  template_id?: number;
  tagline?: string;
  announcement?: string;
  hero_title?: string;
  hero_subtitle?: string;
  hero_cta?: string;
  about?: string;
  phone?: string;
  whatsapp?: string;
  email?: string;
  address?: string;
  city?: string;
  hours?: string;
  currency?: string;
  delivery_note?: string;
  socials?: StoreSocials;
};

export type StoreProduct = {
  id: string;
  name: string;
  description?: string | null;
  price_cents: number;
  compare_at_cents?: number | null;
  currency: string;
  stock: number;
  images: string[];
  category: string;
  featured: boolean;
  emoji?: string;
};

export function templatePalette(templateId?: number): StoreTemplate["palette"] {
  const t = TEMPLATES.find((x) => x.id === templateId) ?? TEMPLATES[0];
  return t.palette;
}

export function templateFor(templateId?: number): StoreTemplate {
  return TEMPLATES.find((x) => x.id === templateId) ?? TEMPLATES[0];
}

export function normalizeMeta(raw: any, fallbackName = "My Store"): StoreMeta {
  const m = (raw ?? {}) as Partial<StoreMeta>;
  return {
    site_name: m.site_name || fallbackName,
    logo_url: m.logo_url ?? null,
    template_id: m.template_id,
    tagline: m.tagline ?? "",
    announcement: m.announcement ?? "",
    hero_title: m.hero_title ?? "",
    hero_subtitle: m.hero_subtitle ?? "",
    hero_cta: m.hero_cta ?? "Shop now",
    about: m.about ?? "",
    phone: m.phone ?? "",
    whatsapp: m.whatsapp ?? "",
    email: m.email ?? "",
    address: m.address ?? "",
    city: m.city ?? "",
    hours: m.hours ?? "",
    currency: m.currency ?? "MRU",
    delivery_note: m.delivery_note ?? "",
    socials: m.socials ?? {},
  };
}

export function money(cents: number, currency = "MRU") {
  const v = cents / 100;
  return `${v.toLocaleString("en-US", { maximumFractionDigits: 2 })} ${currency}`;
}

/** Rich demo catalogue used for the locked template prototypes. */
export function demoProducts(t: StoreTemplate): StoreProduct[] {
  const sets: Record<number, { name: string; price: number; emoji: string; cat: string; was?: number }[]> = {
    1: [
      { name: "Classic Cotton Tee", price: 250, emoji: "👕", cat: "Clothing", was: 320 },
      { name: "Canvas Tote Bag", price: 180, emoji: "👜", cat: "Bags" },
      { name: "Everyday Cap", price: 120, emoji: "🧢", cat: "Accessories" },
      { name: "Dotted Notebook", price: 90, emoji: "📓", cat: "Stationery" },
      { name: "Steel Water Bottle", price: 340, emoji: "🍶", cat: "Accessories", was: 400 },
      { name: "Cotton Socks (3 pack)", price: 140, emoji: "🧦", cat: "Clothing" },
      { name: "Gel Pen Set", price: 70, emoji: "🖊️", cat: "Stationery" },
      { name: "Laptop Sleeve", price: 460, emoji: "💼", cat: "Bags" },
    ],
    2: [
      { name: "Hand-thrown Ceramic Bowl", price: 480, emoji: "🍜", cat: "Ceramics" },
      { name: "Woven Palm Basket", price: 620, emoji: "🧺", cat: "Home", was: 760 },
      { name: "Clay Mug", price: 220, emoji: "☕", cat: "Ceramics" },
      { name: "Argan Soap Bar", price: 150, emoji: "🧼", cat: "Beauty" },
      { name: "Beeswax Candle", price: 260, emoji: "🕯️", cat: "Home" },
      { name: "Embroidered Cushion", price: 700, emoji: "🛋️", cat: "Home" },
      { name: "Rose Water Mist", price: 310, emoji: "🌹", cat: "Beauty" },
      { name: "Terracotta Vase", price: 540, emoji: "🏺", cat: "Ceramics", was: 640 },
    ],
    3: [
      { name: "Raw Organic Honey 500g", price: 550, emoji: "🍯", cat: "Pantry" },
      { name: "Herbal Detox Tea", price: 320, emoji: "🍵", cat: "Drinks" },
      { name: "Almond Butter", price: 780, emoji: "🥜", cat: "Pantry", was: 900 },
      { name: "Cold-pressed Olive Oil", price: 950, emoji: "🫒", cat: "Pantry" },
      { name: "Fresh Dates 1kg", price: 420, emoji: "🌴", cat: "Fresh" },
      { name: "Green Smoothie Mix", price: 380, emoji: "🥬", cat: "Drinks" },
      { name: "Vitamin C Boost", price: 640, emoji: "💊", cat: "Wellness" },
      { name: "Chia Seeds 250g", price: 290, emoji: "🌾", cat: "Pantry" },
    ],
    4: [
      { name: "Wireless Earbuds Pro", price: 3200, emoji: "🎧", cat: "Audio", was: 4200 },
      { name: "Smart Watch S9", price: 8500, emoji: "⌚", cat: "Wearables" },
      { name: "Portable Speaker", price: 4200, emoji: "🔊", cat: "Audio" },
      { name: "USB-C 7-in-1 Hub", price: 1800, emoji: "🔌", cat: "Accessories" },
      { name: "Gaming Mouse RGB", price: 2400, emoji: "🖱️", cat: "Gaming" },
      { name: "Mechanical Keyboard", price: 5600, emoji: "⌨️", cat: "Gaming", was: 6400 },
      { name: "Power Bank 20 000mAh", price: 2100, emoji: "🔋", cat: "Accessories" },
      { name: "4K Action Camera", price: 11500, emoji: "📷", cat: "Cameras" },
    ],
    5: [
      { name: "18K Gold Chain", price: 12000, emoji: "📿", cat: "Jewelry" },
      { name: "Pure Silk Scarf", price: 4500, emoji: "🧣", cat: "Accessories" },
      { name: "Italian Leather Bag", price: 18000, emoji: "👜", cat: "Bags", was: 22000 },
      { name: "Solitaire Diamond Ring", price: 45000, emoji: "💍", cat: "Jewelry" },
      { name: "Pearl Earrings", price: 7800, emoji: "🦪", cat: "Jewelry" },
      { name: "Cashmere Coat", price: 26000, emoji: "🧥", cat: "Clothing" },
      { name: "Swiss Dress Watch", price: 39000, emoji: "⌚", cat: "Watches" },
      { name: "Silk Evening Dress", price: 21000, emoji: "👗", cat: "Clothing" },
    ],
    6: [
      { name: "Signature Perfume 100ml", price: 8500, emoji: "🌸", cat: "Fragrance" },
      { name: "Black Leather Jacket", price: 24000, emoji: "🧥", cat: "Outerwear", was: 29000 },
      { name: "Designer Sunglasses", price: 6800, emoji: "🕶️", cat: "Eyewear" },
      { name: "Cashmere Sweater", price: 15000, emoji: "🧶", cat: "Knitwear" },
      { name: "Monogram Belt", price: 5400, emoji: "🥋", cat: "Accessories" },
      { name: "Suede Chelsea Boots", price: 19500, emoji: "🥾", cat: "Shoes" },
      { name: "Oud Body Oil", price: 4300, emoji: "🧴", cat: "Fragrance" },
      { name: "Wool Overcoat", price: 32000, emoji: "🧥", cat: "Outerwear" },
    ],
    7: [
      { name: "Limited Edition Sneakers", price: 22000, emoji: "👟", cat: "Sneakers", was: 26000 },
      { name: "Titanium Designer Watch", price: 65000, emoji: "⌚", cat: "Watches" },
      { name: "Premium Tech Backpack", price: 12500, emoji: "🎒", cat: "Bags" },
      { name: "Signature Fragrance", price: 18000, emoji: "🌺", cat: "Fragrance" },
      { name: "Noise-cancelling Headset", price: 24500, emoji: "🎧", cat: "Audio" },
      { name: "Carbon Sunglasses", price: 9800, emoji: "🕶️", cat: "Eyewear" },
      { name: "Flagship Smartphone", price: 89000, emoji: "📱", cat: "Devices", was: 99000 },
      { name: "Drone 4K Pro", price: 47000, emoji: "🚁", cat: "Devices" },
    ],
  };
  const list = sets[t.id] ?? sets[1];
  return list.map((p, i) => ({
    id: `demo-${t.id}-${i}`,
    name: p.name,
    description: `${p.name} — part of the ${t.name} demo catalogue. Replace it with your own product from the admin panel.`,
    price_cents: p.price * 100,
    compare_at_cents: p.was ? p.was * 100 : null,
    currency: "MRU",
    stock: 10 + i * 3,
    images: [],
    category: p.cat,
    featured: i < 3,
    emoji: p.emoji,
  }));
}

export function demoMeta(t: StoreTemplate): StoreMeta {
  return normalizeMeta({
    site_name: t.name,
    template_id: t.id,
    tagline: t.tagline,
    announcement: "Free delivery in Nouakchott on orders over 2,000 MRU",
    hero_title: `Everything you need, at ${t.name}.`,
    hero_subtitle: t.tagline,
    hero_cta: "Shop the collection",
    about: `${t.name} is a demo storefront built with DRAG-N-DROP. Once you own it, you replace this text, the logo, the products and every contact detail from your private admin panel.`,
    phone: "+222 00 00 00 00",
    whatsapp: "+222 00 00 00 00",
    email: `hello@${t.name.toLowerCase()}.mr`,
    address: "Nouakchott, Mauritania",
    hours: "Sat – Thu · 9:00 → 21:00",
    currency: "MRU",
    delivery_note: "Delivery within 24–48h across Nouakchott.",
    socials: { facebook: "#", instagram: "#", tiktok: "#" },
  });
}
