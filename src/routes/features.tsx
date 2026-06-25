import { createFileRoute, Link } from "@tanstack/react-router";
import {
  Sparkles, Globe, ShoppingBag, Smartphone, Palette, Zap, Layers, Code2,
  CreditCard, BarChart3, Mail, Search, Shield, Users, FileText, Layout,
  Image as ImageIcon, Calendar, MessageSquare, Cloud, Languages, Package,
} from "lucide-react";
import { SiteNav } from "@/components/site/SiteNav";
import { SiteFooter } from "@/components/site/SiteFooter";

export const Route = createFileRoute("/features")({
  head: () => ({
    meta: [
      { title: "Features — DRAG-N-DROP" },
      { name: "description", content: "Explore every feature: visual builder, AI generator, ecommerce, payments, hosting, SEO, forms, team collaboration and more." },
      { property: "og:title", content: "Features — DRAG-N-DROP" },
      { property: "og:description", content: "A full toolkit for building websites, stores and apps without code." },
    ],
  }),
  component: FeaturesPage,
});

const SECTIONS: Array<{ tag: string; title: string; desc: string; items: Array<{ icon: typeof Sparkles; t: string; d: string }> }> = [
  {
    tag: "Builder",
    title: "Design with surgical precision",
    desc: "A canvas built for designers and developers alike.",
    items: [
      { icon: Layers, t: "Flex, grid & absolute layouts", d: "Real CSS, edited visually. Per-breakpoint overrides for mobile, tablet, desktop." },
      { icon: Palette, t: "Global design system", d: "Tokens for color, type, spacing, shadow, radius. Change once, update everywhere." },
      { icon: Zap, t: "Smart snapping & guides", d: "Pixel-perfect alignment, smart spacing and auto-distribution." },
      { icon: Users, t: "Real-time collaboration", d: "Live cursors, comments, version history and granular role-based access." },
    ],
  },
  {
    tag: "AI",
    title: "AI that builds and writes for you",
    desc: "From a single prompt to a finished, branded site.",
    items: [
      { icon: Sparkles, t: "Website generator", d: "Describe your business — AI ships a full multi-page site with copy, imagery and structure." },
      { icon: ImageIcon, t: "Image & logo generator", d: "Hero images, product shots and brand logos generated to match your palette." },
      { icon: FileText, t: "Copy & blog writer", d: "On-brand product descriptions, landing copy and long-form blog posts." },
      { icon: Languages, t: "1-click translation", d: "Translate the whole site to 90+ languages with editorial quality." },
    ],
  },
  {
    tag: "Commerce",
    title: "Sell anything, anywhere",
    desc: "A Shopify-class store, plus subscriptions, POS and marketplaces.",
    items: [
      { icon: ShoppingBag, t: "Products, variants & inventory", d: "Sizes, colors, SKUs, digital downloads, gift cards and subscriptions." },
      { icon: CreditCard, t: "Global payments", d: "Stripe, PayPal, Apple Pay, Google Pay, all major cards, crypto on Pro." },
      { icon: Package, t: "Shipping & fulfilment", d: "Multi-warehouse, live carrier rates, label printing and tracking." },
      { icon: BarChart3, t: "Revenue analytics", d: "Cohorts, LTV, conversion funnels, abandoned cart and country-level breakdowns." },
    ],
  },
  {
    tag: "Apps",
    title: "Native-feeling mobile apps",
    desc: "Design once, ship to iOS, Android and the web.",
    items: [
      { icon: Smartphone, t: "Phone simulator", d: "iPhone & Android frames with gesture preview and live reload." },
      { icon: Layout, t: "Native components", d: "Bottom tabs, navigation, lists, sheets, modals, chat — built in." },
      { icon: Code2, t: "Flutter & React Native export", d: "Get production-grade source any time you want it." },
      { icon: MessageSquare, t: "Push & in-app messaging", d: "Send segmented push, in-app banners and chat — built into the platform." },
    ],
  },
  {
    tag: "Hosting",
    title: "Enterprise infrastructure included",
    desc: "Every plan ships on a global edge network with automatic SSL.",
    items: [
      { icon: Globe, t: "Global CDN", d: "330+ edge locations. Sub-50ms TTFB worldwide." },
      { icon: Cloud, t: "Auto backups & versioning", d: "Every save is a restore point. Roll back in one click." },
      { icon: Shield, t: "SOC 2, GDPR, ISO 27001", d: "Compliance ready out of the box. SSO and audit logs on Business." },
      { icon: Search, t: "SEO that actually works", d: "Meta, sitemap, structured data, OG, Lighthouse score 95+." },
    ],
  },
  {
    tag: "Operations",
    title: "Run the business, not the website",
    desc: "Built-in CRM, email, forms, analytics and automations.",
    items: [
      { icon: Mail, t: "Email & broadcasts", d: "Visual email builder, segmented broadcasts, transactional and drip campaigns." },
      { icon: Calendar, t: "Bookings & calendars", d: "Restaurants, salons, agencies, courses — all with built-in scheduling." },
      { icon: FileText, t: "Forms with logic", d: "Multi-step, conditional, signatures, file uploads, webhooks, CSV export." },
      { icon: BarChart3, t: "Real-time analytics", d: "Visitors, sources, devices, revenue — privacy-first, no cookie banners required." },
    ],
  },
];

function FeaturesPage() {
  return (
    <div className="min-h-screen bg-background">
      <SiteNav />
      <main>
        <section className="pt-36 pb-16">
          <div className="mx-auto max-w-4xl px-4 text-center">
            <p className="text-sm font-medium text-primary">Features</p>
            <h1 className="mt-3 font-display text-5xl font-semibold tracking-tight sm:text-7xl text-balance">
              Every tool you need to build, launch & grow.
            </h1>
            <p className="mx-auto mt-5 max-w-2xl text-lg text-muted-foreground">
              DRAG-N-DROP replaces a dozen tools — design, ecommerce, payments, email, analytics
              and AI — in one unified workspace.
            </p>
          </div>
        </section>

        {SECTIONS.map((s, i) => (
          <section key={s.tag} className={i % 2 ? "border-y border-border bg-surface py-20" : "py-20"}>
            <div className="mx-auto max-w-7xl px-4">
              <div className="max-w-2xl">
                <p className="text-sm font-medium text-primary">{s.tag}</p>
                <h2 className="mt-2 font-display text-3xl font-semibold tracking-tight sm:text-4xl">{s.title}</h2>
                <p className="mt-3 text-muted-foreground">{s.desc}</p>
              </div>
              <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                {s.items.map((it) => (
                  <div key={it.t} className="rounded-2xl border border-border bg-background p-5 transition-all hover:-translate-y-0.5 hover:shadow-[var(--shadow-md)]">
                    <div className="inline-flex h-9 w-9 items-center justify-center rounded-lg bg-accent text-accent-foreground">
                      <it.icon className="h-4.5 w-4.5" />
                    </div>
                    <h3 className="mt-4 font-display text-base font-semibold leading-tight">{it.t}</h3>
                    <p className="mt-1.5 text-sm text-muted-foreground">{it.d}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>
        ))}

        <section className="py-24">
          <div className="mx-auto max-w-3xl px-4 text-center">
            <h2 className="font-display text-4xl font-semibold tracking-tight">Ready to build?</h2>
            <p className="mt-3 text-muted-foreground">Start free. Upgrade only when you ship.</p>
            <div className="mt-6 flex justify-center gap-3">
              <Link to="/signup" className="rounded-full bg-foreground px-6 py-3 text-sm font-semibold text-background">
                Start free
              </Link>
              <Link to="/pricing" className="rounded-full border border-border px-6 py-3 text-sm font-semibold text-foreground">
                See pricing
              </Link>
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}
