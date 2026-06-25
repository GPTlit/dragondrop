import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { Check } from "lucide-react";
import { SiteNav } from "@/components/site/SiteNav";
import { SiteFooter } from "@/components/site/SiteFooter";

export const Route = createFileRoute("/pricing")({
  head: () => ({
    meta: [
      { title: "Pricing — DRAG-N-DROP" },
      { name: "description", content: "Simple, transparent pricing. Free forever plan. Pro and Business plans for teams shipping at scale." },
      { property: "og:title", content: "Pricing — DRAG-N-DROP" },
      { property: "og:description", content: "Free forever plan. Pay only when you ship." },
    ],
  }),
  component: PricingPage,
});

type Plan = {
  name: string;
  monthly: number;
  yearly: number;
  desc: string;
  cta: string;
  featured?: boolean;
  features: string[];
};

const PLANS: Plan[] = [
  { name: "Free", monthly: 0, yearly: 0, desc: "For tinkerers and side projects.", cta: "Start free",
    features: ["1 project", "DRAG-N-DROP subdomain", "Basic templates", "Community support", "AI credits: 50/mo"] },
  { name: "Pro", monthly: 24, yearly: 19, desc: "For freelancers and growing brands.", cta: "Start Pro trial", featured: true,
    features: ["Unlimited projects", "Custom domain + SSL", "Premium templates", "Code export (HTML/React/Next)", "AI credits: 2,000/mo", "Online store (0% fees)", "Priority support"] },
  { name: "Business", monthly: 79, yearly: 64, desc: "For teams shipping at scale.", cta: "Start Business trial",
    features: ["Everything in Pro", "Team collaboration (10 seats)", "White-label exports", "API & webhooks", "AI credits: 20,000/mo", "Advanced analytics", "SSO & audit logs"] },
  { name: "Enterprise", monthly: -1, yearly: -1, desc: "For organisations needing scale, security & SLA.", cta: "Talk to sales",
    features: ["Everything in Business", "Unlimited seats", "Dedicated infrastructure", "99.99% uptime SLA", "Custom AI quotas", "Dedicated CSM", "Custom DPA & MSA"] },
];

const COMPARE: Array<{ section: string; rows: Array<[string, string | boolean, string | boolean, string | boolean, string | boolean]> }> = [
  { section: "Builder",
    rows: [
      ["Projects", "1", "Unlimited", "Unlimited", "Unlimited"],
      ["Code export", false, true, true, true],
      ["White label", false, false, true, true],
      ["Real-time collaboration", false, "3 seats", "10 seats", "Unlimited"],
    ],
  },
  { section: "Commerce",
    rows: [
      ["Online store", false, true, true, true],
      ["Transaction fees", "—", "0%", "0%", "0%"],
      ["Multi-currency", false, true, true, true],
      ["Point of Sale", false, false, true, true],
    ],
  },
  { section: "AI",
    rows: [
      ["AI credits / month", "50", "2,000", "20,000", "Custom"],
      ["AI Website Generator", true, true, true, true],
      ["AI Image Generator", true, true, true, true],
      ["AI Translation (90+ languages)", false, true, true, true],
    ],
  },
  { section: "Hosting & Security",
    rows: [
      ["Custom domain + SSL", false, true, true, true],
      ["Global CDN", true, true, true, true],
      ["SSO (SAML/OIDC)", false, false, true, true],
      ["Audit logs", false, false, true, true],
      ["Uptime SLA", "—", "99.9%", "99.95%", "99.99%"],
    ],
  },
];

function PricingPage() {
  const [yearly, setYearly] = useState(true);

  return (
    <div className="min-h-screen bg-background">
      <SiteNav />
      <main>
        <section className="pt-36 pb-10">
          <div className="mx-auto max-w-4xl px-4 text-center">
            <p className="text-sm font-medium text-primary">Pricing</p>
            <h1 className="mt-3 font-display text-5xl font-semibold tracking-tight sm:text-7xl text-balance">
              Pay for what you ship.
            </h1>
            <p className="mt-5 text-lg text-muted-foreground">
              Free forever. Upgrade only when you launch. Every plan includes hosting and SSL.
            </p>
            <div className="mt-8 inline-flex items-center gap-1 rounded-full border border-border bg-secondary p-1 text-sm">
              <button
                onClick={() => setYearly(false)}
                className={`rounded-full px-4 py-1.5 font-medium transition-colors ${!yearly ? "bg-background text-foreground shadow-[var(--shadow-xs)]" : "text-muted-foreground"}`}
              >
                Monthly
              </button>
              <button
                onClick={() => setYearly(true)}
                className={`rounded-full px-4 py-1.5 font-medium transition-colors ${yearly ? "bg-background text-foreground shadow-[var(--shadow-xs)]" : "text-muted-foreground"}`}
              >
                Yearly <span className="ml-1 rounded-full bg-success/15 px-1.5 py-0.5 text-[10px] font-semibold text-success">−20%</span>
              </button>
            </div>
          </div>
        </section>

        <section className="pb-16">
          <div className="mx-auto max-w-7xl px-4">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              {PLANS.map((p) => {
                const price = yearly ? p.yearly : p.monthly;
                return (
                  <div
                    key={p.name}
                    className={`relative flex flex-col rounded-3xl border p-6 ${
                      p.featured ? "border-foreground bg-foreground text-background shadow-[var(--shadow-xl)]" : "border-border bg-background"
                    }`}
                  >
                    {p.featured && (
                      <span className="absolute -top-3 left-6 rounded-full bg-warning px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-warning-foreground">
                        Most popular
                      </span>
                    )}
                    <p className="font-display text-lg font-semibold">{p.name}</p>
                    <p className={`mt-1 text-xs ${p.featured ? "text-background/60" : "text-muted-foreground"}`}>{p.desc}</p>
                    <div className="mt-5 flex items-baseline gap-1">
                      {price < 0 ? (
                        <span className="font-display text-4xl font-semibold">Custom</span>
                      ) : (
                        <>
                          <span className="font-display text-5xl font-semibold tracking-tight">${price}</span>
                          <span className={p.featured ? "text-background/60" : "text-muted-foreground"}>
                            {price === 0 ? "" : "/mo"}
                          </span>
                        </>
                      )}
                    </div>
                    <Link
                      to="/auth"
                      className={`mt-5 rounded-xl px-4 py-2.5 text-center text-sm font-semibold ${
                        p.featured ? "bg-background text-foreground" : "bg-foreground text-background"
                      }`}
                    >
                      {p.cta}
                    </Link>
                    <ul className="mt-6 space-y-2.5 text-sm">
                      {p.features.map((f) => (
                        <li key={f} className="flex items-start gap-2">
                          <Check className={`mt-0.5 h-4 w-4 shrink-0 ${p.featured ? "text-warning" : "text-success"}`} />
                          <span>{f}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        <section className="border-t border-border bg-surface py-20">
          <div className="mx-auto max-w-7xl px-4">
            <h2 className="text-center font-display text-3xl font-semibold tracking-tight sm:text-4xl">Compare plans</h2>
            <div className="mt-10 overflow-hidden rounded-2xl border border-border bg-background">
              <div className="grid grid-cols-5 border-b border-border bg-surface text-sm">
                <div className="p-4 font-display font-semibold">Feature</div>
                {PLANS.map((p) => (
                  <div key={p.name} className="p-4 font-display font-semibold">{p.name}</div>
                ))}
              </div>
              {COMPARE.map((s) => (
                <div key={s.section}>
                  <div className="border-b border-border bg-secondary/50 px-4 py-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                    {s.section}
                  </div>
                  {s.rows.map((row) => (
                    <div key={String(row[0])} className="grid grid-cols-5 border-b border-border text-sm last:border-0">
                      <div className="p-4 text-muted-foreground">{row[0]}</div>
                      {row.slice(1).map((v, i) => (
                        <div key={i} className="p-4">
                          {v === true ? <Check className="h-4 w-4 text-success" /> : v === false ? <span className="text-muted-foreground/50">—</span> : <span className="font-medium">{v as string}</span>}
                        </div>
                      ))}
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-20">
          <div className="mx-auto max-w-3xl px-4 text-center">
            <h2 className="font-display text-3xl font-semibold tracking-tight">Questions about Enterprise?</h2>
            <p className="mt-3 text-muted-foreground">Custom contracts, dedicated CSM, advanced security and procurement.</p>
            <Link to="/auth" className="mt-6 inline-block rounded-full bg-foreground px-6 py-3 text-sm font-semibold text-background">
              Talk to sales
            </Link>
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}
