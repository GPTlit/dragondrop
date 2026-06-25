import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { Search, Star } from "lucide-react";
import { SiteNav } from "@/components/site/SiteNav";
import { SiteFooter } from "@/components/site/SiteFooter";

export const Route = createFileRoute("/templates")({
  head: () => ({
    meta: [
      { title: "Templates — DRAG-N-DROP" },
      { name: "description", content: "1,200+ free and premium templates for websites, stores, apps and landing pages — fully editable." },
      { property: "og:title", content: "Templates — DRAG-N-DROP" },
      { property: "og:description", content: "Start from a masterpiece. Edit everything." },
    ],
  }),
  component: TemplatesPage,
});

const CATS = ["All", "Ecommerce", "SaaS", "Portfolio", "Restaurant", "Agency", "Real estate", "Blog", "Education", "Mobile app", "Landing"] as const;

type Tpl = { name: string; cat: typeof CATS[number]; price: "Free" | "Pro"; rating: number; from: string; to: string };

const TEMPLATES: Tpl[] = [
  { name: "Aurelia", cat: "Ecommerce", price: "Free", rating: 4.9, from: "#fde68a", to: "#fb923c" },
  { name: "Nimbus", cat: "SaaS", price: "Pro", rating: 4.8, from: "#bfdbfe", to: "#818cf8" },
  { name: "Olive & Oak", cat: "Restaurant", price: "Free", rating: 4.9, from: "#a7f3d0", to: "#14b8a6" },
  { name: "Atelier", cat: "Portfolio", price: "Free", rating: 4.7, from: "#e7e5e4", to: "#78716c" },
  { name: "Domus", cat: "Real estate", price: "Pro", rating: 4.8, from: "#fecaca", to: "#f472b6" },
  { name: "Lumen", cat: "Agency", price: "Pro", rating: 4.9, from: "#e2e8f0", to: "#64748b" },
  { name: "Folio", cat: "Portfolio", price: "Free", rating: 4.6, from: "#fef3c7", to: "#f59e0b" },
  { name: "Quanta", cat: "SaaS", price: "Pro", rating: 4.9, from: "#dbeafe", to: "#2563eb" },
  { name: "Verdant", cat: "Ecommerce", price: "Free", rating: 4.8, from: "#d1fae5", to: "#10b981" },
  { name: "Hearth", cat: "Restaurant", price: "Pro", rating: 4.7, from: "#fed7aa", to: "#ea580c" },
  { name: "Scholar", cat: "Education", price: "Free", rating: 4.6, from: "#e0e7ff", to: "#6366f1" },
  { name: "Beacon", cat: "Landing", price: "Free", rating: 4.8, from: "#cffafe", to: "#06b6d4" },
  { name: "Wave", cat: "Mobile app", price: "Pro", rating: 4.9, from: "#fae8ff", to: "#a855f7" },
  { name: "Ink", cat: "Blog", price: "Free", rating: 4.7, from: "#f5f5f4", to: "#1c1917" },
  { name: "Studio", cat: "Agency", price: "Free", rating: 4.7, from: "#e7e5e4", to: "#a8a29e" },
];

function TemplatesPage() {
  const [active, setActive] = useState<typeof CATS[number]>("All");
  const [q, setQ] = useState("");
  const filtered = TEMPLATES.filter(
    (t) => (active === "All" || t.cat === active) && t.name.toLowerCase().includes(q.toLowerCase()),
  );
  return (
    <div className="min-h-screen bg-background">
      <SiteNav />
      <main>
        <section className="pt-36 pb-10">
          <div className="mx-auto max-w-7xl px-4 text-center">
            <p className="text-sm font-medium text-primary">Templates</p>
            <h1 className="mt-3 font-display text-5xl font-semibold tracking-tight sm:text-7xl">
              1,200+ designs to start from.
            </h1>
            <p className="mx-auto mt-4 max-w-2xl text-lg text-muted-foreground">
              Crafted by award-winning studios. Free and Pro. Fully editable.
            </p>
            <div className="mx-auto mt-8 flex max-w-md items-center gap-2 rounded-full border border-border bg-background px-4 py-2.5 shadow-[var(--shadow-sm)]">
              <Search className="h-4 w-4 text-muted-foreground" />
              <input
                value={q}
                onChange={(e) => setQ(e.target.value)}
                placeholder="Search templates…"
                className="flex-1 bg-transparent text-sm outline-none placeholder:text-muted-foreground"
              />
            </div>
          </div>
        </section>

        <div className="sticky top-20 z-30 border-y border-border bg-background/85 backdrop-blur-xl">
          <div className="mx-auto flex max-w-7xl gap-2 overflow-x-auto px-4 py-3">
            {CATS.map((c) => (
              <button
                key={c}
                onClick={() => setActive(c)}
                className={`whitespace-nowrap rounded-full px-3.5 py-1.5 text-sm font-medium transition-colors ${
                  active === c ? "bg-foreground text-background" : "bg-secondary text-muted-foreground hover:text-foreground"
                }`}
              >
                {c}
              </button>
            ))}
          </div>
        </div>

        <section className="py-12">
          <div className="mx-auto max-w-7xl px-4">
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {filtered.map((t) => (
                <div key={t.name} className="group cursor-pointer">
                  <div
                    className="relative aspect-[4/3] overflow-hidden rounded-2xl border border-border"
                    style={{ background: `linear-gradient(135deg, ${t.from}, ${t.to})` }}
                  >
                    <div className="absolute inset-5 rounded-xl bg-background/95 p-4 shadow-[var(--shadow-md)] transition-transform group-hover:scale-[1.02]">
                      <div className="flex items-center justify-between">
                        <div className="h-2 w-20 rounded-full bg-foreground/70" />
                        <div className="flex gap-1">
                          {[0,1,2].map((i) => <div key={i} className="h-1.5 w-1.5 rounded-full bg-foreground/30" />)}
                        </div>
                      </div>
                      <div className="mt-3 h-16 rounded-md bg-foreground/10" />
                      <div className="mt-2 grid grid-cols-3 gap-1.5">
                        {[0,1,2,3,4,5].map((i) => <div key={i} className="aspect-square rounded bg-foreground/10" />)}
                      </div>
                    </div>
                    <span className={`absolute right-3 top-3 rounded-full px-2 py-0.5 text-[10px] font-semibold ${
                      t.price === "Pro" ? "bg-foreground text-background" : "bg-background text-foreground border border-border"
                    }`}>
                      {t.price}
                    </span>
                  </div>
                  <div className="mt-3 flex items-center justify-between px-1">
                    <div>
                      <p className="font-display text-base font-semibold">{t.name}</p>
                      <p className="text-xs text-muted-foreground">{t.cat}</p>
                    </div>
                    <div className="flex items-center gap-1 text-xs text-muted-foreground">
                      <Star className="h-3.5 w-3.5 fill-warning text-warning" />
                      {t.rating}
                    </div>
                  </div>
                </div>
              ))}
            </div>
            {filtered.length === 0 && (
              <p className="py-20 text-center text-muted-foreground">No templates match your search.</p>
            )}
          </div>
        </section>

        <section className="border-t border-border bg-surface py-20">
          <div className="mx-auto max-w-3xl px-4 text-center">
            <h2 className="font-display text-4xl font-semibold tracking-tight">Or start from a blank canvas.</h2>
            <p className="mt-3 text-muted-foreground">The builder is just as fast either way.</p>
            <div className="mt-6 flex justify-center gap-3">
              <Link to="/builder" className="rounded-full bg-foreground px-6 py-3 text-sm font-semibold text-background">
                Open the builder
              </Link>
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}
