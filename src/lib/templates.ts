export type StoreTemplate = {
  id: number;
  name: string;
  tagline: string;
  price_mru: number;
  tier: "Starter" | "Basic" | "Standard" | "Pro" | "Premium" | "Elite" | "Ultimate";
  palette: {
    bg: string;
    surface: string;
    text: string;
    muted: string;
    accent: string;
    accent2: string;
  };
  features: string[];
  fontClass: string;
  layout: "classic" | "editorial" | "grid" | "hero" | "split" | "magazine" | "immersive";
  sampleProducts: { name: string; price: number; emoji: string }[];
};

export const TEMPLATES: StoreTemplate[] = [
  {
    id: 1,
    name: "Sable",
    tagline: "Clean starter storefront for first-time sellers",
    price_mru: 5000,
    tier: "Starter",
    palette: { bg: "#ffffff", surface: "#f7f7f5", text: "#1a1a1a", muted: "#6b6b6b", accent: "#111111", accent2: "#e5e5e5" },
    features: ["Product grid", "Simple cart", "Contact form", "Logo & name change"],
    fontClass: "font-sans",
    layout: "classic",
    sampleProducts: [
      { name: "Classic Tee", price: 250, emoji: "👕" },
      { name: "Canvas Bag", price: 180, emoji: "👜" },
      { name: "Cap", price: 120, emoji: "🧢" },
      { name: "Notebook", price: 90, emoji: "📓" },
    ],
  },
  {
    id: 2,
    name: "Coral",
    tagline: "Warm boutique for handmade goods & artisans",
    price_mru: 9000,
    tier: "Basic",
    palette: { bg: "#fff8f3", surface: "#ffe9d9", text: "#3a1d0e", muted: "#8a5a3a", accent: "#ff6b3d", accent2: "#ffd6b0" },
    features: ["Category filters", "Featured collection", "Image galleries", "Custom logo"],
    fontClass: "font-serif",
    layout: "editorial",
    sampleProducts: [
      { name: "Ceramic Bowl", price: 480, emoji: "🍜" },
      { name: "Woven Basket", price: 620, emoji: "🧺" },
      { name: "Clay Mug", price: 220, emoji: "☕" },
      { name: "Handmade Soap", price: 150, emoji: "🧼" },
    ],
  },
  {
    id: 3,
    name: "Verdant",
    tagline: "Organic & fresh — perfect for food or wellness",
    price_mru: 14000,
    tier: "Standard",
    palette: { bg: "#f4faf3", surface: "#e6f4e1", text: "#0f2e1a", muted: "#4a6b52", accent: "#2f8f4a", accent2: "#c4e8b8" },
    features: ["Delivery zones", "Order notes", "Recipe blocks", "Newsletter"],
    fontClass: "font-sans",
    layout: "grid",
    sampleProducts: [
      { name: "Organic Honey", price: 550, emoji: "🍯" },
      { name: "Herbal Tea", price: 320, emoji: "🍵" },
      { name: "Almond Butter", price: 780, emoji: "🥜" },
      { name: "Cold Press Oil", price: 950, emoji: "🫒" },
    ],
  },
  {
    id: 4,
    name: "Cobalt",
    tagline: "Bold electronics & tech storefront",
    price_mru: 20000,
    tier: "Pro",
    palette: { bg: "#0b1220", surface: "#12203a", text: "#f0f6ff", muted: "#8fa4c9", accent: "#3b82f6", accent2: "#60a5fa" },
    features: ["Product specs table", "Variant selector", "Wishlist", "Live search"],
    fontClass: "font-sans",
    layout: "hero",
    sampleProducts: [
      { name: "Wireless Buds", price: 3200, emoji: "🎧" },
      { name: "Smart Watch", price: 8500, emoji: "⌚" },
      { name: "Portable Speaker", price: 4200, emoji: "🔊" },
      { name: "USB-C Hub", price: 1800, emoji: "🔌" },
    ],
  },
  {
    id: 5,
    name: "Amber",
    tagline: "Luxury fashion & jewelry showcase",
    price_mru: 28000,
    tier: "Premium",
    palette: { bg: "#faf6f0", surface: "#ede2cc", text: "#2b1d0e", muted: "#7a6540", accent: "#b8892b", accent2: "#e4c88a" },
    features: ["Lookbook", "Model shots", "Size guide", "Loyalty pass"],
    fontClass: "font-serif",
    layout: "split",
    sampleProducts: [
      { name: "Gold Chain", price: 12000, emoji: "📿" },
      { name: "Silk Scarf", price: 4500, emoji: "🧣" },
      { name: "Leather Bag", price: 18000, emoji: "👜" },
      { name: "Diamond Ring", price: 45000, emoji: "💍" },
    ],
  },
  {
    id: 6,
    name: "Noir",
    tagline: "Editorial magazine layout for premium brands",
    price_mru: 38000,
    tier: "Elite",
    palette: { bg: "#0a0a0a", surface: "#151515", text: "#f5f5f5", muted: "#a1a1a1", accent: "#e0b64a", accent2: "#3a3a3a" },
    features: ["Full-bleed hero", "Editorial grid", "Video blocks", "Multi-language"],
    fontClass: "font-serif",
    layout: "magazine",
    sampleProducts: [
      { name: "Perfume 100ml", price: 8500, emoji: "🌸" },
      { name: "Leather Jacket", price: 24000, emoji: "🧥" },
      { name: "Designer Sunglasses", price: 6800, emoji: "🕶️" },
      { name: "Cashmere Sweater", price: 15000, emoji: "🧶" },
    ],
  },
  {
    id: 7,
    name: "Aurora",
    tagline: "Immersive flagship experience — the ultimate storefront",
    price_mru: 50000,
    tier: "Ultimate",
    palette: { bg: "#0d0921", surface: "#1a1140", text: "#faf8ff", muted: "#a89bd9", accent: "#a855f7", accent2: "#22d3ee" },
    features: ["Immersive hero", "3D product spins", "AI recommendations", "Multi-vendor ready", "Advanced analytics"],
    fontClass: "font-sans",
    layout: "immersive",
    sampleProducts: [
      { name: "Limited Edition Sneakers", price: 22000, emoji: "👟" },
      { name: "Designer Watch", price: 65000, emoji: "⌚" },
      { name: "Premium Backpack", price: 12500, emoji: "🎒" },
      { name: "Signature Fragrance", price: 18000, emoji: "🌺" },
    ],
  },
];

export const WHATSAPP_NUMBER = "221710318199";
export const WHATSAPP_DISPLAY = "+221 710318199";

export function formatMRU(n: number) {
  return `${n.toLocaleString("en-US")} MRU`;
}

export function templateById(id: number | string) {
  const n = typeof id === "string" ? parseInt(id, 10) : id;
  return TEMPLATES.find((t) => t.id === n);
}
