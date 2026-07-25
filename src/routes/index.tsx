import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteNav } from "@/components/site/SiteNav";
import { SiteFooter } from "@/components/site/SiteFooter";
import { TEMPLATES, formatMRU, WHATSAPP_NUMBER, WHATSAPP_DISPLAY } from "@/lib/templates";
import { TemplatePreviewCard } from "@/components/site/TemplatePreviewCard";
import bankily from "@/assets/pay/bankily.jpg";
import masrivi from "@/assets/pay/masrivi.jpg";
import sedad from "@/assets/pay/sedad.jpg";
import { MessageCircle, Sparkles, ShieldCheck, Rocket } from "lucide-react";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "DRAG-N-DROP — 7 ready-to-launch store templates" },
      { name: "description", content: "Pick from 7 professionally-designed store templates from 5,000 to 50,000 MRU. Pay by Bankily, Masrvi or Sedad and own your storefront." },
      { property: "og:title", content: "DRAG-N-DROP — Template store" },
      { property: "og:description", content: "7 unique storefront designs. Unlock, own and manage from your admin panel." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: TemplateStore,
});

function TemplateStore() {
  const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
    "Hello Salem & Co., I'd like a custom website quote.",
  )}`;

  return (
    <div className="min-h-screen bg-background">
      <SiteNav />
      <main>
        {/* Hero */}
        <section className="pt-32 pb-16">
          <div className="mx-auto max-w-6xl px-4 text-center">
            <span className="inline-flex items-center gap-1.5 rounded-full border border-border bg-secondary px-3 py-1 text-xs font-medium text-muted-foreground">
              <Sparkles className="h-3.5 w-3.5" /> Template store · From 5,000 MRU
            </span>
            <h1 className="mt-5 font-display text-5xl font-semibold tracking-tight sm:text-6xl">
              7 ready-to-launch store designs.
            </h1>
            <p className="mx-auto mt-4 max-w-2xl text-lg text-muted-foreground">
              Pick a template, pay by <b>Bankily</b>, <b>Masrvi</b> or <b>Sedad</b>, and become the owner instantly. Manage products, prices and your logo from a private admin panel.
            </p>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
              <a href="#templates" className="rounded-full bg-foreground px-6 py-3 text-sm font-semibold text-background">
                Browse the 7 templates
              </a>
              <a href={whatsappUrl} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-full border border-border bg-background px-6 py-3 text-sm font-semibold hover:bg-secondary">
                <MessageCircle className="h-4 w-4 text-success" /> Custom quote on WhatsApp
              </a>
            </div>
            <div className="mt-10 flex flex-wrap items-center justify-center gap-6 opacity-90">
              <PayLogo src={bankily} label="Bankily" />
              <PayLogo src={masrivi} label="Masrvi" />
              <PayLogo src={sedad} label="Sedad" />
            </div>
          </div>
        </section>

        {/* How it works */}
        <section className="border-y border-border bg-surface py-16">
          <div className="mx-auto max-w-6xl px-4">
            <h2 className="text-center font-display text-3xl font-semibold tracking-tight">How it works</h2>
            <div className="mt-10 grid gap-6 sm:grid-cols-3">
              {[
                { i: 1, t: "Preview any template", d: "Navigate all 7 storefronts freely. See colors, layouts and products before you buy.", icon: <Sparkles className="h-5 w-5" /> },
                { i: 2, t: "Pay & get exported", d: "Choose Bankily, Masrvi or Sedad. Send your receipt on WhatsApp — the store is bound to your email.", icon: <Rocket className="h-5 w-5" /> },
                { i: 3, t: "Sign in & manage", d: "Only your email unlocks the admin panel. Upload logo, change name, edit products & prices.", icon: <ShieldCheck className="h-5 w-5" /> },
              ].map((s) => (
                <div key={s.i} className="rounded-2xl border border-border bg-background p-6">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-foreground text-background">{s.icon}</div>
                  <p className="mt-4 text-xs font-semibold text-muted-foreground">STEP {s.i}</p>
                  <p className="mt-1 font-display text-lg font-semibold">{s.t}</p>
                  <p className="mt-2 text-sm text-muted-foreground">{s.d}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Templates grid */}
        <section id="templates" className="py-16">
          <div className="mx-auto max-w-7xl px-4">
            <div className="flex flex-col items-center text-center">
              <h2 className="font-display text-4xl font-semibold tracking-tight sm:text-5xl">The 7 templates</h2>
              <p className="mt-3 max-w-xl text-muted-foreground">
                Each design is unique — colors, typography and layout — and every next tier adds more features.
              </p>
            </div>
            <div className="mt-12 grid gap-8 md:grid-cols-2 xl:grid-cols-3">
              {TEMPLATES.map((t) => (
                <div key={t.id} className="group flex flex-col overflow-hidden rounded-3xl border border-border bg-background shadow-[0_2px_20px_-8px_rgba(0,0,0,0.08)] transition hover:shadow-[0_8px_30px_-10px_rgba(0,0,0,0.15)]">
                  <TemplatePreviewCard template={t} compact />
                  <div className="flex flex-1 flex-col gap-4 p-6">
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">{t.tier} · #{t.id}</p>
                        <h3 className="mt-1 font-display text-2xl font-semibold">{t.name}</h3>
                      </div>
                      <p className="whitespace-nowrap rounded-full bg-foreground px-3 py-1 text-sm font-semibold text-background">{formatMRU(t.price_mru)}</p>
                    </div>
                    <p className="text-sm text-muted-foreground">{t.tagline}</p>
                    <ul className="grid grid-cols-2 gap-1.5 text-xs text-muted-foreground">
                      {t.features.map((f) => (
                        <li key={f} className="flex items-center gap-1.5">
                          <span className="h-1 w-1 rounded-full" style={{ background: t.palette.accent }} />
                          {f}
                        </li>
                      ))}
                    </ul>
                    <div className="mt-auto flex gap-2 pt-2">
                      <Link to="/template/$id" params={{ id: String(t.id) }} className="flex-1 rounded-xl border border-border px-4 py-2.5 text-center text-sm font-semibold hover:bg-secondary">
                        Preview
                      </Link>
                      <Link to="/buy/$id" params={{ id: String(t.id) }} className="flex-1 rounded-xl bg-foreground px-4 py-2.5 text-center text-sm font-semibold text-background hover:opacity-90">
                        Unlock & own
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Custom website CTA */}
        <section className="border-t border-border bg-surface py-20">
          <div className="mx-auto max-w-4xl px-4 text-center">
            <span className="inline-flex items-center gap-1.5 rounded-full border border-border bg-background px-3 py-1 text-xs font-medium text-muted-foreground">
              <MessageCircle className="h-3.5 w-3.5 text-success" /> Need something custom?
            </span>
            <h2 className="mt-4 font-display text-4xl font-semibold tracking-tight sm:text-5xl">
              Custom website — built to your brief.
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-muted-foreground">
              Not seeing exactly what you need? Message us on WhatsApp and we'll build a fully custom store or app.
            </p>
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noreferrer"
              className="mt-8 inline-flex items-center gap-2 rounded-full bg-success px-8 py-4 text-base font-semibold text-white shadow-lg hover:opacity-95"
            >
              <MessageCircle className="h-5 w-5" /> Chat on WhatsApp · {WHATSAPP_DISPLAY}
            </a>
          </div>
        </section>

        {/* Payment methods */}
        <section className="py-16">
          <div className="mx-auto max-w-5xl px-4">
            <h2 className="text-center font-display text-3xl font-semibold tracking-tight">Accepted payment methods</h2>
            <p className="mt-2 text-center text-sm text-muted-foreground">Pick your bank at checkout and upload your transaction receipt.</p>
            <div className="mt-10 grid gap-6 sm:grid-cols-3">
              {[
                { src: bankily, name: "Bankily", d: "Mobile wallet by BPM" },
                { src: masrivi, name: "Masrvi", d: "Mobile bank by BMCI" },
                { src: sedad, name: "Sedad", d: "Bank transfer by BMI" },
              ].map((p) => (
                <div key={p.name} className="flex flex-col items-center rounded-2xl border border-border bg-background p-6 text-center">
                  <div className="flex h-20 w-full items-center justify-center overflow-hidden rounded-xl bg-white">
                    <img src={p.src} alt={p.name} className="max-h-16 object-contain" />
                  </div>
                  <p className="mt-4 font-display text-lg font-semibold">{p.name}</p>
                  <p className="text-xs text-muted-foreground">{p.d}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}

function PayLogo({ src, label }: { src: string; label: string }) {
  return (
    <div className="flex items-center gap-2 rounded-lg bg-white px-3 py-1.5 shadow-sm border border-border">
      <img src={src} alt={label} className="h-6 object-contain" />
      <span className="text-xs font-medium text-muted-foreground">{label}</span>
    </div>
  );
}
