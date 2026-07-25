import type { StoreTemplate } from "@/lib/templates";
import { formatMRU } from "@/lib/templates";

/** A miniature, real-looking storefront preview rendered with the template's palette + layout. */
export function TemplatePreviewCard({ template, compact = false }: { template: StoreTemplate; compact?: boolean }) {
  const p = template.palette;
  const pad = compact ? "p-4" : "p-6";
  const height = compact ? "h-64" : "h-96";
  const products = template.sampleProducts.slice(0, template.layout === "hero" || template.layout === "split" ? 3 : 4);

  return (
    <div
      className={`relative ${height} w-full overflow-hidden ${pad} ${template.fontClass}`}
      style={{ background: p.bg, color: p.text }}
    >
      {/* Fake nav */}
      <div className="flex items-center justify-between text-[10px]" style={{ color: p.muted }}>
        <div className="flex items-center gap-1.5">
          <div className="h-3 w-3 rounded-sm" style={{ background: p.accent }} />
          <span className="font-semibold" style={{ color: p.text }}>{template.name.toUpperCase()}</span>
        </div>
        <div className="flex gap-2">
          <span>Shop</span><span>About</span><span>Cart</span>
        </div>
      </div>

      {template.layout === "classic" && (
        <>
          <div className="mt-3">
            <h4 className="text-lg font-semibold">Everyday essentials</h4>
            <p className="text-[10px]" style={{ color: p.muted }}>Made simple. Shipped fast.</p>
          </div>
          <div className="mt-3 grid grid-cols-4 gap-1.5">
            {products.map((sp, i) => (
              <MiniProduct key={i} sp={sp} p={p} />
            ))}
          </div>
        </>
      )}

      {template.layout === "editorial" && (
        <>
          <div className="mt-3 grid grid-cols-5 gap-2">
            <div className="col-span-3">
              <p className="text-[9px] uppercase tracking-widest" style={{ color: p.accent }}>Featured</p>
              <h4 className="mt-0.5 text-xl leading-tight font-semibold">Handmade with heart.</h4>
              <div className="mt-2 flex items-center gap-1.5">
                <div className="rounded-full px-2 py-0.5 text-[9px] font-semibold" style={{ background: p.accent, color: p.bg }}>Shop now</div>
                <div className="rounded-full border px-2 py-0.5 text-[9px]" style={{ borderColor: p.muted, color: p.text }}>Story</div>
              </div>
            </div>
            <div className="col-span-2 rounded-lg flex items-center justify-center text-3xl" style={{ background: p.accent2 }}>{products[0]?.emoji}</div>
          </div>
          <div className="mt-3 grid grid-cols-4 gap-1.5">
            {products.map((sp, i) => <MiniProduct key={i} sp={sp} p={p} />)}
          </div>
        </>
      )}

      {template.layout === "grid" && (
        <>
          <div className="mt-3 flex items-center gap-2">
            <div className="rounded-full px-2 py-0.5 text-[9px] font-semibold" style={{ background: p.accent, color: p.bg }}>All</div>
            <div className="rounded-full px-2 py-0.5 text-[9px]" style={{ background: p.accent2, color: p.text }}>Fresh</div>
            <div className="rounded-full px-2 py-0.5 text-[9px]" style={{ background: p.accent2, color: p.text }}>Best</div>
          </div>
          <h4 className="mt-2 text-base font-semibold">Fresh finds this week</h4>
          <div className="mt-2 grid grid-cols-4 gap-1.5">
            {products.map((sp, i) => <MiniProduct key={i} sp={sp} p={p} />)}
          </div>
        </>
      )}

      {template.layout === "hero" && (
        <>
          <div className="mt-3 rounded-xl p-3" style={{ background: p.surface }}>
            <p className="text-[9px] uppercase tracking-widest" style={{ color: p.accent2 }}>New</p>
            <h4 className="mt-0.5 text-lg font-semibold">Tech that feels invisible.</h4>
            <div className="mt-1.5 flex items-center gap-1.5">
              <div className="rounded px-2 py-0.5 text-[9px] font-semibold" style={{ background: p.accent, color: "#fff" }}>Buy now</div>
              <span className="text-[9px]" style={{ color: p.muted }}>From {formatMRU(template.price_mru / 10)}</span>
            </div>
          </div>
          <div className="mt-2 grid grid-cols-3 gap-1.5">
            {products.map((sp, i) => <MiniProduct key={i} sp={sp} p={p} dark />)}
          </div>
        </>
      )}

      {template.layout === "split" && (
        <>
          <div className="mt-3 grid grid-cols-2 gap-2">
            <div>
              <p className="text-[9px] uppercase tracking-widest" style={{ color: p.accent }}>Collection 24</p>
              <h4 className="mt-0.5 text-xl leading-tight font-semibold">Timeless. Golden.</h4>
              <p className="mt-1 text-[10px]" style={{ color: p.muted }}>Curated luxury.</p>
              <div className="mt-2 rounded-full px-2 py-1 text-[9px] font-semibold w-fit" style={{ background: p.accent, color: p.bg }}>Explore</div>
            </div>
            <div className="rounded-xl flex items-center justify-center text-4xl" style={{ background: p.accent2 }}>{products[0]?.emoji}</div>
          </div>
          <div className="mt-2 grid grid-cols-3 gap-1.5">
            {products.map((sp, i) => <MiniProduct key={i} sp={sp} p={p} />)}
          </div>
        </>
      )}

      {template.layout === "magazine" && (
        <>
          <div className="mt-3 rounded-lg p-2" style={{ background: p.surface }}>
            <p className="text-[9px] uppercase tracking-widest" style={{ color: p.accent }}>Issue 07</p>
            <h4 className="mt-0.5 text-lg font-semibold" style={{ color: p.text }}>The Autumn Edit</h4>
          </div>
          <div className="mt-2 grid grid-cols-4 gap-1.5">
            {products.map((sp, i) => (
              <div key={i} className="rounded" style={{ background: p.accent2 }}>
                <div className="flex h-10 items-center justify-center text-lg">{sp.emoji}</div>
                <div className="px-1 py-0.5">
                  <p className="truncate text-[9px] font-semibold" style={{ color: p.text }}>{sp.name}</p>
                  <p className="text-[9px]" style={{ color: p.accent }}>{sp.price} MRU</p>
                </div>
              </div>
            ))}
          </div>
        </>
      )}

      {template.layout === "immersive" && (
        <>
          <div
            className="mt-3 relative overflow-hidden rounded-xl p-3"
            style={{ background: `linear-gradient(135deg, ${p.accent} 0%, ${p.accent2} 100%)` }}
          >
            <p className="text-[9px] uppercase tracking-widest text-white/80">Flagship</p>
            <h4 className="mt-0.5 text-lg font-semibold text-white">Aurora Experience.</h4>
            <div className="mt-1 flex gap-1">
              <div className="rounded bg-white/95 px-2 py-0.5 text-[9px] font-semibold" style={{ color: p.accent }}>Shop drop</div>
              <div className="rounded border border-white/40 px-2 py-0.5 text-[9px] text-white">AI stylist</div>
            </div>
            <div className="absolute -right-2 -top-2 text-4xl">{products[0]?.emoji}</div>
          </div>
          <div className="mt-2 grid grid-cols-4 gap-1.5">
            {products.map((sp, i) => <MiniProduct key={i} sp={sp} p={p} dark />)}
          </div>
        </>
      )}
    </div>
  );
}

function MiniProduct({ sp, p, dark }: { sp: { name: string; price: number; emoji: string }; p: any; dark?: boolean }) {
  const bg = dark ? p.surface : p.accent2;
  return (
    <div className="rounded overflow-hidden" style={{ background: bg }}>
      <div className="flex h-10 items-center justify-center text-lg">{sp.emoji}</div>
      <div className="px-1 py-0.5" style={{ background: dark ? p.surface : p.bg }}>
        <p className="truncate text-[9px] font-semibold" style={{ color: p.text }}>{sp.name}</p>
        <p className="text-[9px]" style={{ color: p.accent }}>{sp.price} MRU</p>
      </div>
    </div>
  );
}
