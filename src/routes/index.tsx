import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import {
  Sparkles, Layers, Wand2, Globe, ShoppingBag, Smartphone, Palette, Zap,
  ArrowRight, Check, Star, Play, Code2, Image as ImageIcon, Type as TypeIcon,
  Square, MousePointer2, Layout, ChevronRight, Plus, Minus,
} from "lucide-react";
import { useState } from "react";
import { SiteNav } from "@/components/site/SiteNav";
import { SiteFooter } from "@/components/site/SiteFooter";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "DRAG-N-DROP — Build websites, stores & apps without code" },
      {
        name: "description",
        content:
          "DRAG-N-DROP is the AI-powered no-code platform to build websites, online stores, landing pages and mobile app UIs visually. Ship in minutes, scale to enterprise.",
      },
      { property: "og:title", content: "DRAG-N-DROP — The visual builder for everything" },
      {
        property: "og:description",
        content: "Drag, drop, ship. The all-in-one platform to build websites, stores and apps without code.",
      },
    ],
  }),
  component: LandingPage,
});

function LandingPage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <SiteNav />
      <main>
        <Hero />
        <LogoMarquee />
        <Builds />
        <BuilderShowcase />
        <FeatureGrid />
        <AISection />
        <Templates />
        <Stats />
        <Pricing />
        <Testimonials />
        <FAQ />
        <CTA />
      </main>
      <SiteFooter />
    </div>
  );
}

/* ---------- HERO ---------- */
function Hero() {
  return (
    <section className="relative overflow-hidden pt-32 pb-24 sm:pt-40">
      <div className="absolute inset-0 -z-10 grid-bg [mask-image:radial-gradient(60%_50%_at_50%_30%,#000,transparent)]" />
      <div
        className="absolute inset-x-0 top-0 -z-10 h-[700px] opacity-80"
        style={{ background: "var(--gradient-aurora)" }}
      />

      <div className="mx-auto max-w-7xl px-4">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mx-auto max-w-4xl text-center"
        >
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-border bg-background/80 px-3 py-1.5 text-xs font-medium text-muted-foreground backdrop-blur">
            <span className="inline-flex h-1.5 w-1.5 rounded-full bg-success" />
            New · AI Website Generator v4 is live
            <ChevronRight className="h-3 w-3" />
          </div>

          <h1 className="text-balance font-display text-5xl font-semibold leading-[1.05] tracking-tight sm:text-7xl md:text-[88px]">
            Build anything.
            <br />
            <span className="gradient-text">Drag. Drop. Ship.</span>
          </h1>

          <p className="mx-auto mt-6 max-w-2xl text-balance text-lg text-muted-foreground sm:text-xl">
            The all-in-one visual platform to design websites, launch online stores,
            and prototype mobile apps — powered by AI, no code required.
          </p>

          <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Link
              to="/builder"
              className="group inline-flex items-center gap-2 rounded-full bg-foreground px-6 py-3.5 text-sm font-semibold text-background shadow-[var(--shadow-md)] transition-all hover:shadow-[var(--shadow-lg)]"
            >
              Start building free
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </Link>
            <Link
              to="/builder"
              className="group inline-flex items-center gap-2 rounded-full border border-border bg-background/80 px-6 py-3.5 text-sm font-semibold text-foreground backdrop-blur transition-all hover:bg-secondary"
            >
              <Sparkles className="h-4 w-4 text-primary" />
              Generate with AI
            </Link>
          </div>

          <div className="mt-6 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-xs text-muted-foreground">
            <span className="inline-flex items-center gap-1.5"><Check className="h-3.5 w-3.5 text-success" /> Free forever plan</span>
            <span className="inline-flex items-center gap-1.5"><Check className="h-3.5 w-3.5 text-success" /> No credit card</span>
            <span className="inline-flex items-center gap-1.5"><Check className="h-3.5 w-3.5 text-success" /> Export code anytime</span>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="relative mx-auto mt-20 max-w-6xl"
        >
          <BuilderMockup />
        </motion.div>
      </div>
    </section>
  );
}

function BuilderMockup() {
  return (
    <div className="relative">
      <div
        className="absolute -inset-x-12 -inset-y-8 -z-10 rounded-[40px] opacity-50 blur-3xl"
        style={{ background: "var(--gradient-aurora)" }}
      />
      <div className="overflow-hidden rounded-2xl border border-border bg-background shadow-[var(--shadow-xl)]">
        {/* Top bar */}
        <div className="flex items-center gap-3 border-b border-border bg-surface px-4 py-3">
          <div className="flex gap-1.5">
            <span className="h-3 w-3 rounded-full bg-[#ff5f57]" />
            <span className="h-3 w-3 rounded-full bg-[#febc2e]" />
            <span className="h-3 w-3 rounded-full bg-[#28c840]" />
          </div>
          <div className="ml-2 flex items-center gap-2 rounded-md border border-border bg-background px-3 py-1 text-xs text-muted-foreground">
            <Globe className="h-3 w-3" />
            yourstore.dragndrop.app
          </div>
          <div className="ml-auto flex items-center gap-1.5">
            <DeviceTab active>Desktop</DeviceTab>
            <DeviceTab>Tablet</DeviceTab>
            <DeviceTab>Mobile</DeviceTab>
            <div className="mx-2 h-5 w-px bg-border" />
            <button className="rounded-md border border-border bg-background px-3 py-1 text-xs font-medium">Preview</button>
            <button className="rounded-md bg-primary px-3 py-1 text-xs font-medium text-primary-foreground">Publish</button>
          </div>
        </div>
        <div className="grid grid-cols-[200px_1fr_240px]">
          {/* Left palette */}
          <div className="border-r border-border bg-surface p-3">
            <p className="px-2 text-[10px] font-medium uppercase tracking-wider text-muted-foreground">Elements</p>
            <div className="mt-2 grid grid-cols-2 gap-1.5">
              {[
                [TypeIcon, "Text"],
                [Square, "Box"],
                [ImageIcon, "Image"],
                [MousePointer2, "Button"],
                [Layout, "Section"],
                [ShoppingBag, "Product"],
              ].map(([Icon, label]) => {
                const I = Icon as typeof TypeIcon;
                return (
                  <div
                    key={label as string}
                    className="flex cursor-grab flex-col items-center gap-1 rounded-lg border border-border bg-background p-2 text-[10px] font-medium text-muted-foreground transition-colors hover:border-primary hover:text-primary"
                  >
                    <I className="h-3.5 w-3.5" />
                    {label as string}
                  </div>
                );
              })}
            </div>
            <p className="mt-4 px-2 text-[10px] font-medium uppercase tracking-wider text-muted-foreground">Pages</p>
            <div className="mt-2 space-y-0.5 text-xs">
              {["Home", "Shop", "Cart", "About"].map((p, i) => (
                <div key={p} className={`flex items-center justify-between rounded-md px-2 py-1.5 ${i === 0 ? "bg-accent text-accent-foreground" : "text-muted-foreground"}`}>
                  {p}
                </div>
              ))}
            </div>
          </div>

          {/* Canvas */}
          <div className="relative bg-secondary/40 p-6 dot-bg">
            <div className="mx-auto max-w-[520px] overflow-hidden rounded-xl border border-border bg-background shadow-[var(--shadow-md)]">
              <div className="flex items-center justify-between border-b border-border px-4 py-3 text-xs">
                <div className="font-display font-semibold">Aurelia</div>
                <div className="flex gap-3 text-muted-foreground">
                  <span>Shop</span><span>About</span><span>Cart · 2</span>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3 p-4">
                <div className="col-span-2 rounded-lg bg-gradient-to-br from-foreground to-foreground/80 p-5 text-background">
                  <p className="text-[10px] font-medium uppercase tracking-widest opacity-70">New drop</p>
                  <p className="mt-1 font-display text-2xl font-semibold leading-tight">Autumn collection</p>
                  <button className="mt-3 rounded-full bg-background px-3 py-1 text-[10px] font-semibold text-foreground">Shop now</button>
                </div>
                {[
                  ["#fde68a", "Linen tote", "$48"],
                  ["#bfdbfe", "Ceramic vase", "$72"],
                  ["#fecaca", "Wool throw", "$120"],
                  ["#bbf7d0", "Brass lamp", "$210"],
                ].map(([bg, name, price]) => (
                  <div key={name} className="overflow-hidden rounded-lg border border-border">
                    <div className="h-20 w-full" style={{ background: bg }} />
                    <div className="flex items-center justify-between p-2">
                      <span className="text-[11px] font-medium">{name}</span>
                      <span className="text-[11px] font-semibold text-primary">{price}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Floating cursor */}
            <motion.div
              initial={{ x: 60, y: 200 }}
              animate={{ x: [60, 300, 200, 60], y: [200, 120, 260, 200] }}
              transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
              className="absolute left-6 top-6 pointer-events-none"
            >
              <MousePointer2 className="h-5 w-5 -rotate-12 fill-primary text-primary" />
              <span className="ml-3 mt-1 inline-block rounded-md bg-primary px-2 py-0.5 text-[10px] font-medium text-primary-foreground">
                Alex
              </span>
            </motion.div>
          </div>

          {/* Right inspector */}
          <div className="border-l border-border bg-surface p-3 text-xs">
            <p className="px-1 text-[10px] font-medium uppercase tracking-wider text-muted-foreground">Properties</p>
            <div className="mt-3 space-y-3">
              {[
                ["Width", "520 px"],
                ["Padding", "24"],
                ["Radius", "12 px"],
                ["Shadow", "Soft"],
              ].map(([k, v]) => (
                <div key={k} className="flex items-center justify-between">
                  <span className="text-muted-foreground">{k}</span>
                  <span className="rounded-md border border-border bg-background px-2 py-0.5 font-mono">{v}</span>
                </div>
              ))}
              <div>
                <p className="mb-1.5 text-muted-foreground">Fill</p>
                <div className="flex gap-1">
                  {["#1C1C1C", "#2563EB", "#10B981", "#F59E0B", "#FFFFFF"].map((c) => (
                    <button key={c} className="h-6 w-6 rounded-md border border-border" style={{ background: c }} />
                  ))}
                </div>
              </div>
              <div className="rounded-lg border border-dashed border-primary/40 bg-primary/5 p-2 text-[11px] text-primary">
                <Sparkles className="mb-1 inline h-3 w-3" /> Ask AI to redesign this section
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function DeviceTab({ children, active }: { children: React.ReactNode; active?: boolean }) {
  return (
    <button className={`rounded-md px-2 py-1 text-[11px] ${active ? "bg-background text-foreground shadow-[var(--shadow-xs)]" : "text-muted-foreground"}`}>
      {children}
    </button>
  );
}

/* ---------- LOGO MARQUEE ---------- */
function LogoMarquee() {
  const logos = ["Acme", "Lumen", "Northwind", "Vertex", "Helix", "Parallax", "Monolith", "Onyx", "Stratus", "Quanta"];
  const row = [...logos, ...logos];
  return (
    <section className="border-y border-border bg-surface py-10">
      <p className="mb-6 text-center text-xs font-medium uppercase tracking-widest text-muted-foreground">
        Powering 240,000+ teams worldwide
      </p>
      <div className="relative overflow-hidden [mask-image:linear-gradient(to_right,transparent,#000_15%,#000_85%,transparent)]">
        <div className="flex w-max gap-14 animate-marquee">
          {row.map((l, i) => (
            <span key={i} className="font-display text-2xl font-semibold tracking-tight text-muted-foreground/70">
              {l}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------- BUILDS ---------- */
function Builds() {
  const items = [
    { icon: Globe, label: "Websites", color: "#2563EB" },
    { icon: ShoppingBag, label: "Online stores", color: "#10B981" },
    { icon: Smartphone, label: "Mobile apps", color: "#F59E0B" },
    { icon: Layout, label: "Landing pages", color: "#2563EB" },
    { icon: Layers, label: "Dashboards", color: "#10B981" },
    { icon: Sparkles, label: "AI products", color: "#F59E0B" },
    { icon: Palette, label: "Portfolios", color: "#2563EB" },
    { icon: Code2, label: "SaaS apps", color: "#10B981" },
  ];
  return (
    <section className="py-24">
      <div className="mx-auto max-w-7xl px-4">
        <div className="max-w-2xl">
          <p className="text-sm font-medium text-primary">Build anything</p>
          <h2 className="mt-2 font-display text-4xl font-semibold tracking-tight sm:text-5xl">
            One canvas. Every kind of product.
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            From a one-page portfolio to a multi-region marketplace — DRAG-N-DROP scales from your
            first project to enterprise infrastructure.
          </p>
        </div>
        <div className="mt-12 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
          {items.map(({ icon: Icon, label, color }) => (
            <div
              key={label}
              className="group relative overflow-hidden rounded-2xl border border-border bg-background p-6 transition-all hover:border-foreground/20 hover:shadow-[var(--shadow-md)]"
            >
              <div
                className="inline-flex h-10 w-10 items-center justify-center rounded-xl"
                style={{ background: `${color}15`, color }}
              >
                <Icon className="h-5 w-5" />
              </div>
              <p className="mt-4 font-display text-lg font-semibold">{label}</p>
              <p className="mt-1 text-xs text-muted-foreground">120+ templates</p>
              <ArrowRight className="absolute right-4 top-4 h-4 w-4 text-muted-foreground/40 transition-all group-hover:right-3 group-hover:text-foreground" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------- BUILDER SHOWCASE ---------- */
function BuilderShowcase() {
  const features = [
    {
      icon: Layers,
      title: "Pixel-perfect canvas",
      desc: "Snap, align and resize anything. Real CSS grid, flexbox and absolute positioning — visually.",
    },
    {
      icon: Smartphone,
      title: "Responsive by default",
      desc: "Design once, ship to desktop, tablet and mobile with per-breakpoint overrides.",
    },
    {
      icon: Palette,
      title: "Global design system",
      desc: "Tokens for color, type and spacing. Change one variable — the entire site updates.",
    },
    {
      icon: Zap,
      title: "Real-time collaboration",
      desc: "See teammates' cursors, leave comments and ship together. No more design hand-offs.",
    },
  ];
  return (
    <section className="border-t border-border bg-surface py-24">
      <div className="mx-auto max-w-7xl px-4">
        <div className="grid items-start gap-12 lg:grid-cols-2">
          <div className="lg:sticky lg:top-32">
            <p className="text-sm font-medium text-primary">The builder</p>
            <h2 className="mt-2 font-display text-4xl font-semibold tracking-tight sm:text-5xl">
              The most precise visual editor on the planet.
            </h2>
            <p className="mt-4 text-lg text-muted-foreground">
              Built for designers who care about every pixel and developers who want the code they
              would have written themselves.
            </p>
            <Link
              to="/builder"
              className="mt-8 inline-flex items-center gap-2 rounded-full bg-foreground px-5 py-3 text-sm font-medium text-background transition-all hover:shadow-[var(--shadow-md)]"
            >
              Open the builder <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
          <div className="grid gap-4">
            {features.map((f) => (
              <div
                key={f.title}
                className="rounded-2xl border border-border bg-background p-6 transition-all hover:shadow-[var(--shadow-md)]"
              >
                <div className="flex items-start gap-4">
                  <div className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-accent text-accent-foreground">
                    <f.icon className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="font-display text-lg font-semibold">{f.title}</h3>
                    <p className="mt-1 text-sm text-muted-foreground">{f.desc}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------- FEATURE GRID ---------- */
function FeatureGrid() {
  const groups = [
    { tag: "Commerce", title: "A full Shopify-class store", desc: "Products, variants, inventory, taxes, shipping, checkout, refunds, subscriptions and POS — out of the box.", icon: ShoppingBag },
    { tag: "Payments", title: "Stripe, PayPal, Apple & Google Pay", desc: "Sell globally in 135+ currencies. Built-in tax & fraud handling, with crypto on Pro.", icon: Zap },
    { tag: "Hosting", title: "Global CDN, instant publish", desc: "1-click deploy with SSL, automatic backups and 99.99% uptime — on every plan.", icon: Globe },
    { tag: "SEO", title: "Rankings out of the box", desc: "Meta, sitemap, structured data, Open Graph and a real-time SEO score for every page.", icon: Sparkles },
    { tag: "Forms", title: "Logic-powered form builder", desc: "Multi-step, conditional, signatures, file uploads, webhooks and CSV export.", icon: Layout },
    { tag: "Teams", title: "Roles, comments & history", desc: "Owner, Admin, Editor, Designer, Viewer. Full audit logs and version restore.", icon: Layers },
  ];
  return (
    <section className="py-24">
      <div className="mx-auto max-w-7xl px-4">
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-sm font-medium text-primary">Everything you need</p>
          <h2 className="mt-2 font-display text-4xl font-semibold tracking-tight sm:text-5xl">
            One platform. Replaces twelve.
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Stop stitching together Shopify, Webflow, Mailchimp, Calendly, Zapier, and a half-dozen others.
          </p>
        </div>
        <div className="mt-14 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {groups.map((g) => (
            <div
              key={g.title}
              className="group relative overflow-hidden rounded-2xl border border-border bg-background p-6 transition-all hover:-translate-y-0.5 hover:shadow-[var(--shadow-md)]"
            >
              <span className="inline-block rounded-full bg-secondary px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
                {g.tag}
              </span>
              <h3 className="mt-4 font-display text-xl font-semibold leading-tight">{g.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{g.desc}</p>
              <g.icon className="absolute right-5 top-5 h-5 w-5 text-muted-foreground/30 transition-colors group-hover:text-primary" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------- AI SECTION ---------- */
function AISection() {
  const [prompt, setPrompt] = useState("A boutique coffee roaster with online shop and storytelling blog");
  return (
    <section className="relative overflow-hidden border-y border-border bg-foreground py-24 text-background">
      <div className="absolute inset-0 -z-0 opacity-20" style={{ background: "var(--gradient-mesh)" }} />
      <div className="relative mx-auto max-w-7xl px-4">
        <div className="mx-auto max-w-2xl text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3 py-1 text-xs font-medium backdrop-blur">
            <Sparkles className="h-3 w-3 text-warning" /> Generate with AI
          </div>
          <h2 className="mt-4 font-display text-4xl font-semibold tracking-tight sm:text-5xl">
            Describe it. Watch it build itself.
          </h2>
          <p className="mt-4 text-lg text-white/70">
            Tell the AI what you want. It generates pages, copy, imagery, brand colors and structure
            in under 30 seconds — fully editable on the canvas.
          </p>
        </div>

        <div className="mx-auto mt-10 max-w-3xl rounded-2xl border border-white/10 bg-white/5 p-3 backdrop-blur-xl">
          <div className="flex items-start gap-3 rounded-xl bg-black/40 p-4">
            <Sparkles className="mt-1 h-5 w-5 shrink-0 text-warning" />
            <textarea
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              rows={2}
              className="flex-1 resize-none bg-transparent text-base outline-none placeholder:text-white/40"
            />
            <button className="shrink-0 rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground hover:opacity-90">
              Generate →
            </button>
          </div>
          <div className="mt-3 flex flex-wrap gap-2 px-2 pb-1">
            {[
              "SaaS for dentists",
              "Real estate agency in Miami",
              "Vegan restaurant in Lisbon",
              "Photographer portfolio",
              "Indie music label store",
            ].map((s) => (
              <button
                key={s}
                onClick={() => setPrompt(s)}
                className="rounded-full border border-white/15 bg-white/5 px-3 py-1 text-xs text-white/80 hover:bg-white/10"
              >
                {s}
              </button>
            ))}
          </div>
        </div>

        <div className="mt-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {[
            { t: "AI Website Generator", d: "Full sites from one prompt" },
            { t: "AI Designer", d: "Reskin sections instantly" },
            { t: "AI Copywriter", d: "On-brand, on-message" },
            { t: "AI Image Generator", d: "Hero images & product shots" },
          ].map((c) => (
            <div key={c.t} className="rounded-xl border border-white/10 bg-white/5 p-4 backdrop-blur">
              <p className="font-display text-base font-semibold">{c.t}</p>
              <p className="mt-1 text-xs text-white/60">{c.d}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------- TEMPLATES ---------- */
function Templates() {
  const tpl = [
    { name: "Aurelia", cat: "Ecommerce", color: "from-amber-200 to-orange-300" },
    { name: "Nimbus", cat: "SaaS", color: "from-blue-200 to-indigo-300" },
    { name: "Olive & Oak", cat: "Restaurant", color: "from-emerald-200 to-teal-300" },
    { name: "Atelier", cat: "Portfolio", color: "from-stone-200 to-stone-400" },
    { name: "Domus", cat: "Real estate", color: "from-rose-200 to-pink-300" },
    { name: "Lumen", cat: "Agency", color: "from-slate-200 to-slate-400" },
  ];
  return (
    <section className="py-24">
      <div className="mx-auto max-w-7xl px-4">
        <div className="flex flex-col items-end justify-between gap-6 sm:flex-row">
          <div className="max-w-xl">
            <p className="text-sm font-medium text-primary">Templates</p>
            <h2 className="mt-2 font-display text-4xl font-semibold tracking-tight sm:text-5xl">
              Start from a masterpiece.
            </h2>
            <p className="mt-3 text-muted-foreground">
              1,200+ free and premium templates, designed by award-winning studios. Customize every pixel.
            </p>
          </div>
          <Link to="/templates" className="group inline-flex items-center gap-1 text-sm font-medium text-foreground">
            Browse all templates <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
          </Link>
        </div>
        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {tpl.map((t) => (
            <div key={t.name} className="group cursor-pointer">
              <div className={`relative aspect-[4/3] overflow-hidden rounded-2xl border border-border bg-gradient-to-br ${t.color}`}>
                <div className="absolute inset-4 rounded-xl bg-background/95 p-4 shadow-[var(--shadow-md)]">
                  <div className="h-2 w-24 rounded-full bg-foreground/80" />
                  <div className="mt-2 h-2 w-16 rounded-full bg-foreground/30" />
                  <div className="mt-4 grid grid-cols-3 gap-1.5">
                    {[0,1,2,3,4,5].map((i) => (
                      <div key={i} className="aspect-square rounded bg-foreground/10" />
                    ))}
                  </div>
                </div>
                <div className="absolute inset-x-3 bottom-3 rounded-lg bg-background/90 p-2 text-xs backdrop-blur opacity-0 transition-opacity group-hover:opacity-100">
                  <button className="w-full rounded-md bg-foreground py-2 font-medium text-background">Use this template</button>
                </div>
              </div>
              <div className="mt-3 flex items-center justify-between px-1">
                <div>
                  <p className="font-display text-base font-semibold">{t.name}</p>
                  <p className="text-xs text-muted-foreground">{t.cat}</p>
                </div>
                <span className="rounded-full border border-border px-2 py-0.5 text-[10px] font-medium text-muted-foreground">Free</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------- STATS ---------- */
function Stats() {
  const s = [
    { v: "240k+", l: "Active creators" },
    { v: "$1.4B", l: "GMV processed" },
    { v: "1,200+", l: "Templates" },
    { v: "99.99%", l: "Uptime" },
  ];
  return (
    <section className="border-y border-border bg-surface py-16">
      <div className="mx-auto grid max-w-7xl grid-cols-2 gap-8 px-4 lg:grid-cols-4">
        {s.map((x) => (
          <div key={x.l}>
            <p className="font-display text-4xl font-semibold tracking-tight sm:text-5xl">{x.v}</p>
            <p className="mt-1 text-sm text-muted-foreground">{x.l}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

/* ---------- PRICING ---------- */
function Pricing() {
  const plans = [
    {
      name: "Free",
      price: "$0",
      sub: "Forever",
      desc: "For tinkerers and side projects.",
      cta: "Start free",
      features: ["1 project", "DRAG-N-DROP subdomain", "Basic templates", "Community support", "AI credits: 50/mo"],
    },
    {
      name: "Pro",
      price: "$24",
      sub: "/month",
      desc: "For freelancers and growing brands.",
      cta: "Start Pro trial",
      featured: true,
      features: ["Unlimited projects", "Custom domain + SSL", "Premium templates", "Code export", "AI credits: 2,000/mo", "Online store (0% fees)", "Priority support"],
    },
    {
      name: "Business",
      price: "$79",
      sub: "/month",
      desc: "For teams shipping at scale.",
      cta: "Talk to sales",
      features: ["Everything in Pro", "Team collaboration (10)", "White-label exports", "API & webhooks", "AI credits: 20,000/mo", "Advanced analytics", "SSO & audit logs"],
    },
  ];
  return (
    <section className="py-24">
      <div className="mx-auto max-w-7xl px-4">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-sm font-medium text-primary">Pricing</p>
          <h2 className="mt-2 font-display text-4xl font-semibold tracking-tight sm:text-5xl">
            Pay for what you ship.
          </h2>
          <p className="mt-3 text-muted-foreground">Cancel anytime. Every plan includes hosting, SSL and the full builder.</p>
        </div>
        <div className="mt-12 grid gap-5 lg:grid-cols-3">
          {plans.map((p) => (
            <div
              key={p.name}
              className={`relative flex flex-col rounded-3xl border p-7 ${
                p.featured
                  ? "border-foreground bg-foreground text-background shadow-[var(--shadow-xl)]"
                  : "border-border bg-background"
              }`}
            >
              {p.featured && (
                <span className="absolute -top-3 left-7 rounded-full bg-warning px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-warning-foreground">
                  Most popular
                </span>
              )}
              <p className="font-display text-lg font-semibold">{p.name}</p>
              <p className={`mt-1 text-sm ${p.featured ? "text-background/60" : "text-muted-foreground"}`}>{p.desc}</p>
              <div className="mt-6 flex items-baseline gap-1">
                <span className="font-display text-5xl font-semibold tracking-tight">{p.price}</span>
                <span className={p.featured ? "text-background/60" : "text-muted-foreground"}>{p.sub}</span>
              </div>
              <Link
                to="/signup"
                className={`mt-6 rounded-xl px-4 py-3 text-center text-sm font-semibold transition-all ${
                  p.featured
                    ? "bg-background text-foreground hover:opacity-90"
                    : "bg-foreground text-background hover:opacity-90"
                }`}
              >
                {p.cta}
              </Link>
              <ul className="mt-7 space-y-3 text-sm">
                {p.features.map((f) => (
                  <li key={f} className="flex items-start gap-2">
                    <Check className={`mt-0.5 h-4 w-4 shrink-0 ${p.featured ? "text-warning" : "text-success"}`} />
                    <span className={p.featured ? "text-background/85" : "text-foreground"}>{f}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------- TESTIMONIALS ---------- */
function Testimonials() {
  const t = [
    { q: "We replaced Shopify, Webflow and Mailchimp with DRAG-N-DROP. Saved $1,400/mo and ship 4x faster.", a: "Maya Patel", r: "Founder, Olive & Oak", color: "#10B981" },
    { q: "Generated a 14-page agency site at 11pm. Pitched it Monday morning. Closed the deal.", a: "Daniel Reyes", r: "Creative Director, Helix", color: "#2563EB" },
    { q: "The store builder is unreal. We launched in 5 countries with multi-currency in one afternoon.", a: "Sofia Lindberg", r: "COO, Aurelia", color: "#F59E0B" },
    { q: "The export gives me real React + Next.js. I keep ownership of every line.", a: "Theo Nakamura", r: "Engineer, Quanta", color: "#2563EB" },
    { q: "Comments, version history, roles — finally a no-code tool serious teams can actually use.", a: "Imani Wright", r: "Design Lead, Vertex", color: "#10B981" },
    { q: "AI generated our entire restaurant website with a menu, gallery, and reservations. Magic.", a: "Luca Bianchi", r: "Owner, Trattoria Luce", color: "#F59E0B" },
  ];
  return (
    <section className="border-t border-border bg-surface py-24">
      <div className="mx-auto max-w-7xl px-4">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-sm font-medium text-primary">Loved by builders</p>
          <h2 className="mt-2 font-display text-4xl font-semibold tracking-tight sm:text-5xl">
            Shipped by 240,000+ teams.
          </h2>
          <div className="mt-4 flex items-center justify-center gap-1 text-warning">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star key={i} className="h-4 w-4 fill-current" />
            ))}
            <span className="ml-2 text-sm font-medium text-muted-foreground">4.9 average · 18,400+ reviews</span>
          </div>
        </div>
        <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {t.map((x, i) => (
            <div key={i} className="rounded-2xl border border-border bg-background p-6">
              <p className="text-[15px] leading-relaxed text-foreground">"{x.q}"</p>
              <div className="mt-5 flex items-center gap-3">
                <div
                  className="flex h-9 w-9 items-center justify-center rounded-full font-display text-sm font-semibold text-white"
                  style={{ background: x.color }}
                >
                  {x.a.split(" ").map((n) => n[0]).join("")}
                </div>
                <div>
                  <p className="text-sm font-semibold">{x.a}</p>
                  <p className="text-xs text-muted-foreground">{x.r}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------- FAQ ---------- */
function FAQ() {
  const items = [
    ["Do I need to know how to code?", "Not at all. DRAG-N-DROP is fully visual. If you can use Figma or PowerPoint, you can ship a production site."],
    ["Can I export my code?", "Yes. On Pro and above you can export production-grade HTML, CSS, React, Next.js or Flutter. You own everything."],
    ["Is there a free plan?", "Yes, forever. You get one project on a dragndrop.app subdomain with the full builder and 50 AI credits per month."],
    ["Can I sell physical products?", "Absolutely. The Pro plan includes a full Shopify-class store with inventory, shipping, taxes and checkout — at 0% transaction fees."],
    ["What payments do you support?", "Stripe, PayPal, Apple Pay, Google Pay, all major cards, and crypto on Business and above."],
    ["Can my team collaborate?", "Yes. Invite teammates with granular roles (Owner, Admin, Editor, Designer, Viewer), with live cursors, comments and full version history."],
    ["Is it really enterprise-ready?", "Yes — SOC 2 Type II, GDPR, SSO, audit logs, 99.99% uptime SLA and a global CDN with automatic backups."],
  ];
  const [open, setOpen] = useState(0);
  return (
    <section className="py-24">
      <div className="mx-auto max-w-3xl px-4">
        <div className="text-center">
          <p className="text-sm font-medium text-primary">FAQ</p>
          <h2 className="mt-2 font-display text-4xl font-semibold tracking-tight sm:text-5xl">
            Questions, answered.
          </h2>
        </div>
        <div className="mt-10 overflow-hidden rounded-2xl border border-border bg-background">
          {items.map(([q, a], i) => (
            <div key={q} className="border-b border-border last:border-0">
              <button
                onClick={() => setOpen(open === i ? -1 : i)}
                className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left transition-colors hover:bg-surface"
              >
                <span className="font-display text-base font-semibold">{q}</span>
                {open === i ? <Minus className="h-4 w-4 shrink-0" /> : <Plus className="h-4 w-4 shrink-0" />}
              </button>
              {open === i && <div className="px-6 pb-5 text-sm text-muted-foreground">{a}</div>}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------- CTA ---------- */
function CTA() {
  return (
    <section className="px-4 py-24">
      <div className="relative mx-auto max-w-6xl overflow-hidden rounded-[32px] border border-border bg-foreground p-12 text-background sm:p-20">
        <div className="absolute inset-0 -z-0 opacity-30" style={{ background: "var(--gradient-aurora)" }} />
        <div className="relative mx-auto max-w-3xl text-center">
          <h2 className="font-display text-4xl font-semibold tracking-tight sm:text-6xl">
            Your idea, shipped tonight.
          </h2>
          <p className="mt-4 text-lg text-background/70">
            Join 240,000+ creators building the next generation of websites, stores and apps.
            Free forever — upgrade only when you're ready.
          </p>
          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Link
              to="/signup"
              className="inline-flex items-center gap-2 rounded-full bg-background px-6 py-3.5 text-sm font-semibold text-foreground transition-all hover:opacity-90"
            >
              Start building free <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              to="/builder"
              className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/5 px-6 py-3.5 text-sm font-semibold text-background backdrop-blur transition-colors hover:bg-white/10"
            >
              <Play className="h-3.5 w-3.5 fill-current" />
              Watch the 90-second demo
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
