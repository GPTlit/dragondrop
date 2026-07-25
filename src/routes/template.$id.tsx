import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { templateById, formatMRU, TEMPLATES } from "@/lib/templates";
import { TemplatePreviewCard } from "@/components/site/TemplatePreviewCard";
import { SiteNav } from "@/components/site/SiteNav";
import { SiteFooter } from "@/components/site/SiteFooter";
import { ArrowLeft, Check, Lock } from "lucide-react";

export const Route = createFileRoute("/template/$id")({
  head: ({ params }) => {
    const t = templateById(params.id);
    return {
      meta: [
        { title: `${t?.name ?? "Template"} — DRAG-N-DROP` },
        { name: "description", content: t ? `${t.tagline}. Preview and unlock this store template for ${formatMRU(t.price_mru)}.` : "Preview a store template." },
        { property: "og:title", content: `${t?.name ?? "Template"} — DRAG-N-DROP` },
        { property: "og:description", content: t?.tagline ?? "" },
      ],
    };
  },
  errorComponent: () => <PageErr />,
  notFoundComponent: () => <PageErr />,
  loader: ({ params }) => {
    const t = templateById(params.id);
    if (!t) throw notFound();
    return t;
  },
  component: TemplatePreview,
});

function PageErr() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-4 bg-background">
      <p className="text-muted-foreground">Template not found.</p>
      <Link to="/" className="rounded-full bg-foreground px-5 py-2 text-sm font-semibold text-background">Back to store</Link>
    </div>
  );
}

function TemplatePreview() {
  const t = Route.useLoaderData() as ReturnType<typeof templateById> & object;
  const p = t.palette;
  const others = TEMPLATES.filter((x) => x.id !== t.id).slice(0, 3);

  return (
    <div className="min-h-screen bg-background">
      <SiteNav />
      <main className="pt-24">
        <div className="mx-auto max-w-7xl px-4">
          <Link to="/" className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground">
            <ArrowLeft className="h-3.5 w-3.5" /> All templates
          </Link>
          <div className="mt-4 grid gap-8 lg:grid-cols-[1fr_360px]">
            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">{t.tier} · Template #{t.id}</p>
              <h1 className="mt-2 font-display text-5xl font-semibold tracking-tight">{t.name}</h1>
              <p className="mt-2 text-lg text-muted-foreground">{t.tagline}</p>

              <div className="mt-8 overflow-hidden rounded-3xl border border-border shadow-xl">
                <TemplatePreviewCard template={t} />
              </div>

              {/* full storefront simulation */}
              <div className="mt-6 rounded-3xl border border-border overflow-hidden">
                <div className={t.fontClass} style={{ background: p.bg, color: p.text }}>
                  <div className="flex items-center justify-between px-8 py-5 border-b" style={{ borderColor: p.accent2 }}>
                    <div className="flex items-center gap-2">
                      <div className="h-8 w-8 rounded" style={{ background: p.accent }} />
                      <span className="font-semibold text-lg">{t.name}</span>
                    </div>
                    <nav className="hidden gap-6 text-sm sm:flex" style={{ color: p.muted }}>
                      <span>Shop</span><span>Collections</span><span>About</span><span>Contact</span>
                    </nav>
                    <div className="rounded-full px-3 py-1 text-xs font-semibold" style={{ background: p.accent, color: p.bg }}>Cart · 0</div>
                  </div>
                  <div className="px-8 py-10">
                    <h2 className="text-4xl font-semibold" style={{ color: p.text }}>Welcome to {t.name}.</h2>
                    <p className="mt-2" style={{ color: p.muted }}>A living preview — this is exactly what your customers will see, in your brand colors.</p>
                  </div>
                  <div className="grid grid-cols-2 gap-4 px-8 pb-10 sm:grid-cols-4">
                    {t.sampleProducts.map((sp, i) => (
                      <div key={i} className="rounded-2xl overflow-hidden" style={{ background: p.accent2 }}>
                        <div className="flex h-40 items-center justify-center text-6xl">{sp.emoji}</div>
                        <div className="p-4" style={{ background: p.surface }}>
                          <p className="font-semibold" style={{ color: p.text }}>{sp.name}</p>
                          <p className="text-sm" style={{ color: p.accent }}>{sp.price} MRU</p>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="px-8 py-6 text-xs text-center" style={{ background: p.surface, color: p.muted }}>
                    © {t.name} — powered by DRAG-N-DROP
                  </div>
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <aside className="lg:sticky lg:top-24 h-fit rounded-3xl border border-border bg-background p-6 shadow-lg">
              <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Price</p>
              <p className="mt-1 font-display text-4xl font-bold">{formatMRU(t.price_mru)}</p>
              <p className="mt-1 text-xs text-muted-foreground">One-time · lifetime ownership</p>

              <ul className="mt-6 space-y-2 text-sm">
                {t.features.map((f) => (
                  <li key={f} className="flex items-start gap-2">
                    <Check className="mt-0.5 h-4 w-4 flex-none" style={{ color: p.accent }} />
                    <span>{f}</span>
                  </li>
                ))}
                <li className="flex items-start gap-2"><Check className="mt-0.5 h-4 w-4 flex-none" style={{ color: p.accent }} /> Private admin panel</li>
                <li className="flex items-start gap-2"><Check className="mt-0.5 h-4 w-4 flex-none" style={{ color: p.accent }} /> Product & price editor</li>
                <li className="flex items-start gap-2"><Check className="mt-0.5 h-4 w-4 flex-none" style={{ color: p.accent }} /> Logo & site name change</li>
              </ul>

              <div className="mt-6 rounded-2xl border border-dashed border-border bg-secondary/50 p-4 text-xs text-muted-foreground">
                <div className="flex items-center gap-1.5 font-semibold text-foreground">
                  <Lock className="h-3.5 w-3.5" /> Exports locked
                </div>
                Unlock this template to export & own it. You'll sign in with the email used at checkout.
              </div>

              <Link
                to="/buy/$id"
                params={{ id: String(t.id) }}
                className="mt-5 block w-full rounded-2xl bg-foreground px-6 py-3.5 text-center text-sm font-semibold text-background hover:opacity-90"
              >
                Unlock for {formatMRU(t.price_mru)}
              </Link>
            </aside>
          </div>

          <section className="mt-20">
            <h2 className="font-display text-2xl font-semibold">More templates</h2>
            <div className="mt-4 grid gap-4 sm:grid-cols-3">
              {others.map((o) => (
                <Link key={o.id} to="/template/$id" params={{ id: String(o.id) }} className="rounded-2xl border border-border overflow-hidden hover:shadow-lg transition">
                  <TemplatePreviewCard template={o} compact />
                  <div className="p-4 flex items-center justify-between">
                    <div>
                      <p className="text-xs text-muted-foreground">{o.tier}</p>
                      <p className="font-semibold">{o.name}</p>
                    </div>
                    <p className="text-sm font-semibold">{formatMRU(o.price_mru)}</p>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}
