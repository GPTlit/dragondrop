import { useMemo, useState } from "react";
import {
  Search, ShoppingCart, X, Plus, Minus, Star, Truck, ShieldCheck, Headphones,
  MapPin, Phone, Mail, Clock, Facebook, Instagram, Youtube, Twitter, ChevronRight, Menu, Check,
} from "lucide-react";
import { money, templateFor, type StoreMeta, type StoreProduct } from "@/lib/store-config";

export type CartLine = { product: StoreProduct; qty: number };

export type OrderPayload = {
  name: string;
  phone: string;
  email: string;
  address: string;
  note: string;
  items: { id: string; name: string; qty: number; price_cents: number }[];
  total_cents: number;
};

export function StoreFront({
  meta,
  products,
  templateId,
  demo = false,
  onOrder,
  placing = false,
}: {
  meta: StoreMeta;
  products: StoreProduct[];
  templateId?: number;
  demo?: boolean;
  onOrder?: (o: OrderPayload) => void | Promise<void>;
  placing?: boolean;
}) {
  const t = templateFor(templateId ?? meta.template_id);
  const p = t.palette;
  const cur = meta.currency || "MRU";

  const [q, setQ] = useState("");
  const [cat, setCat] = useState("All");
  const [sort, setSort] = useState("featured");
  const [cart, setCart] = useState<CartLine[]>([]);
  const [cartOpen, setCartOpen] = useState(false);
  const [checkout, setCheckout] = useState(false);
  const [detail, setDetail] = useState<StoreProduct | null>(null);
  const [navOpen, setNavOpen] = useState(false);
  const [done, setDone] = useState(false);

  const categories = useMemo(
    () => ["All", ...Array.from(new Set(products.map((x) => x.category || "General")))],
    [products],
  );

  const visible = useMemo(() => {
    let list = products.filter((x) => (cat === "All" || x.category === cat));
    if (q.trim()) {
      const s = q.toLowerCase();
      list = list.filter((x) => x.name.toLowerCase().includes(s) || (x.description ?? "").toLowerCase().includes(s));
    }
    if (sort === "low") list = [...list].sort((a, b) => a.price_cents - b.price_cents);
    if (sort === "high") list = [...list].sort((a, b) => b.price_cents - a.price_cents);
    if (sort === "featured") list = [...list].sort((a, b) => Number(b.featured) - Number(a.featured));
    return list;
  }, [products, cat, q, sort]);

  const deals = products.filter((x) => x.compare_at_cents && x.compare_at_cents > x.price_cents).slice(0, 4);
  const count = cart.reduce((n, l) => n + l.qty, 0);
  const total = cart.reduce((n, l) => n + l.qty * l.product.price_cents, 0);

  function add(prod: StoreProduct, qty = 1) {
    setCart((c) => {
      const i = c.findIndex((l) => l.product.id === prod.id);
      if (i >= 0) { const n = [...c]; n[i] = { ...n[i], qty: n[i].qty + qty }; return n; }
      return [...c, { product: prod, qty }];
    });
    setCartOpen(true);
  }
  function setQty(id: string, qty: number) {
    setCart((c) => (qty <= 0 ? c.filter((l) => l.product.id !== id) : c.map((l) => (l.product.id === id ? { ...l, qty } : l))));
  }

  const S = {
    bg: { background: p.bg, color: p.text },
    surface: { background: p.surface },
    accent: { background: p.accent, color: p.bg },
    muted: { color: p.muted },
    border: { borderColor: p.accent2 },
  };

  return (
    <div className={t.fontClass} style={{ ...S.bg, position: "relative" }}>
      {/* announcement */}
      {meta.announcement ? (
        <div className="px-4 py-2 text-center text-xs font-medium" style={S.accent}>{meta.announcement}</div>
      ) : null}

      {/* header */}
      <header className="sticky top-0 z-30 border-b" style={{ ...S.bg, ...S.border }}>
        <div className="mx-auto flex max-w-7xl items-center gap-4 px-4 py-3">
          <button className="md:hidden" onClick={() => setNavOpen((v) => !v)} aria-label="Menu"><Menu className="h-5 w-5" /></button>
          <a href="#top" className="flex items-center gap-2 shrink-0">
            {meta.logo_url ? (
              <img src={meta.logo_url} alt={meta.site_name} className="h-9 w-9 rounded-lg object-cover" />
            ) : (
              <div className="flex h-9 w-9 items-center justify-center rounded-lg text-sm font-bold" style={S.accent}>
                {meta.site_name.slice(0, 1).toUpperCase()}
              </div>
            )}
            <span className="text-lg font-semibold tracking-tight">{meta.site_name}</span>
          </a>

          <div className="relative ml-auto hidden flex-1 md:block">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2" style={S.muted} />
            <input
              value={q} onChange={(e) => setQ(e.target.value)}
              placeholder="Search products…"
              className="w-full rounded-full border py-2 pl-9 pr-4 text-sm outline-none"
              style={{ ...S.surface, ...S.border, color: p.text, borderWidth: 1 }}
            />
          </div>

          <nav className="ml-auto hidden gap-5 text-sm md:ml-0 md:flex" style={S.muted}>
            <a href="#shop">Shop</a><a href="#deals">Deals</a><a href="#about">About</a><a href="#contact">Contact</a>
          </nav>

          <button onClick={() => setCartOpen(true)} className="relative rounded-full px-3 py-2 text-sm font-semibold" style={S.accent}>
            <ShoppingCart className="inline h-4 w-4" />
            <span className="ml-1.5 hidden sm:inline">Cart</span>
            {count > 0 && <span className="ml-1.5 rounded-full px-1.5 text-xs" style={{ background: p.bg, color: p.accent }}>{count}</span>}
          </button>
        </div>

        {/* category bar */}
        <div className="border-t" style={S.border}>
          <div className="mx-auto flex max-w-7xl gap-2 overflow-x-auto px-4 py-2 text-xs">
            {categories.map((c) => (
              <button key={c} onClick={() => setCat(c)}
                className="whitespace-nowrap rounded-full px-3 py-1.5 font-medium"
                style={c === cat ? S.accent : { ...S.surface, color: p.muted }}>
                {c}
              </button>
            ))}
          </div>
        </div>

        {navOpen && (
          <div className="border-t px-4 py-3 md:hidden" style={S.border}>
            <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search products…"
              className="w-full rounded-full border px-4 py-2 text-sm outline-none" style={{ ...S.surface, ...S.border, color: p.text, borderWidth: 1 }} />
            <div className="mt-3 flex flex-wrap gap-4 text-sm" style={S.muted}>
              <a href="#shop">Shop</a><a href="#deals">Deals</a><a href="#about">About</a><a href="#contact">Contact</a>
            </div>
          </div>
        )}
      </header>

      {/* hero */}
      <section id="top" className="relative overflow-hidden">
        <div className="mx-auto grid max-w-7xl items-center gap-8 px-4 py-14 md:grid-cols-2 md:py-20">
          <div>
            <span className="inline-block rounded-full px-3 py-1 text-xs font-semibold" style={{ ...S.surface, color: p.accent }}>
              {meta.tagline || t.tier + " storefront"}
            </span>
            <h1 className="mt-4 text-4xl font-semibold leading-tight tracking-tight md:text-5xl">
              {meta.hero_title || `Welcome to ${meta.site_name}`}
            </h1>
            <p className="mt-3 max-w-lg text-base" style={S.muted}>
              {meta.hero_subtitle || "Browse the catalogue, add to cart and order in seconds."}
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <a href="#shop" className="rounded-full px-6 py-3 text-sm font-semibold" style={S.accent}>{meta.hero_cta || "Shop now"}</a>
              <a href="#contact" className="rounded-full border px-6 py-3 text-sm font-semibold" style={{ ...S.border, borderWidth: 1, color: p.text }}>Contact us</a>
            </div>
            <div className="mt-8 grid grid-cols-3 gap-3 text-xs" style={S.muted}>
              <Perk icon={<Truck className="h-4 w-4" />} label={meta.delivery_note || "Fast delivery"} color={p.accent} />
              <Perk icon={<ShieldCheck className="h-4 w-4" />} label="Secure orders" color={p.accent} />
              <Perk icon={<Headphones className="h-4 w-4" />} label="Real support" color={p.accent} />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-3">
            {products.slice(0, 4).map((pr) => (
              <button key={pr.id} onClick={() => setDetail(pr)} className="overflow-hidden rounded-2xl text-left" style={S.surface}>
                <Thumb product={pr} palette={p} className="h-32" />
                <div className="p-3">
                  <p className="truncate text-sm font-medium">{pr.name}</p>
                  <p className="text-xs font-semibold" style={{ color: p.accent }}>{money(pr.price_cents, cur)}</p>
                </div>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* deals */}
      {deals.length > 0 && (
        <section id="deals" className="border-y py-10" style={{ ...S.surface, ...S.border }}>
          <div className="mx-auto max-w-7xl px-4">
            <div className="flex items-end justify-between">
              <h2 className="text-2xl font-semibold tracking-tight">Today's deals</h2>
              <a href="#shop" className="text-sm" style={{ color: p.accent }}>See all <ChevronRight className="inline h-3 w-3" /></a>
            </div>
            <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {deals.map((pr) => (
                <ProductCard key={pr.id} product={pr} palette={p} currency={cur} onAdd={() => add(pr)} onOpen={() => setDetail(pr)} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* shop */}
      <section id="shop" className="py-12">
        <div className="mx-auto max-w-7xl px-4">
          <div className="flex flex-wrap items-end justify-between gap-3">
            <div>
              <h2 className="text-2xl font-semibold tracking-tight">{cat === "All" ? "All products" : cat}</h2>
              <p className="text-sm" style={S.muted}>{visible.length} item{visible.length === 1 ? "" : "s"}</p>
            </div>
            <select value={sort} onChange={(e) => setSort(e.target.value)}
              className="rounded-full border px-4 py-2 text-sm outline-none"
              style={{ ...S.surface, ...S.border, borderWidth: 1, color: p.text }}>
              <option value="featured">Featured</option>
              <option value="low">Price: low to high</option>
              <option value="high">Price: high to low</option>
            </select>
          </div>

          {visible.length === 0 ? (
            <div className="mt-10 rounded-2xl border border-dashed p-12 text-center text-sm" style={{ ...S.border, ...S.muted }}>
              No products yet. Add them from your admin panel.
            </div>
          ) : (
            <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {visible.map((pr) => (
                <ProductCard key={pr.id} product={pr} palette={p} currency={cur} onAdd={() => add(pr)} onOpen={() => setDetail(pr)} />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* about */}
      <section id="about" className="border-t py-14" style={{ ...S.surface, ...S.border }}>
        <div className="mx-auto grid max-w-5xl gap-8 px-4 md:grid-cols-2">
          <div>
            <h2 className="text-2xl font-semibold tracking-tight">About {meta.site_name}</h2>
            <p className="mt-3 text-sm leading-relaxed" style={S.muted}>
              {meta.about || "Tell your customers who you are, what you sell and why they should buy from you. Edit this from the admin panel."}
            </p>
          </div>
          <div className="grid gap-3 text-sm">
            {meta.address ? <Info icon={<MapPin className="h-4 w-4" />} text={[meta.address, meta.city].filter(Boolean).join(", ")} color={p.accent} /> : null}
            {meta.hours ? <Info icon={<Clock className="h-4 w-4" />} text={meta.hours} color={p.accent} /> : null}
            {meta.phone ? <Info icon={<Phone className="h-4 w-4" />} text={meta.phone} color={p.accent} /> : null}
            {meta.email ? <Info icon={<Mail className="h-4 w-4" />} text={meta.email} color={p.accent} /> : null}
          </div>
        </div>
      </section>

      {/* contact / footer */}
      <footer id="contact" className="py-12" style={S.bg}>
        <div className="mx-auto grid max-w-7xl gap-8 px-4 md:grid-cols-3">
          <div>
            <p className="text-lg font-semibold">{meta.site_name}</p>
            <p className="mt-2 text-sm" style={S.muted}>{meta.tagline}</p>
            <div className="mt-4 flex gap-3">
              {meta.socials?.facebook ? <Social href={meta.socials.facebook} color={p.accent}><Facebook className="h-4 w-4" /></Social> : null}
              {meta.socials?.instagram ? <Social href={meta.socials.instagram} color={p.accent}><Instagram className="h-4 w-4" /></Social> : null}
              {meta.socials?.youtube ? <Social href={meta.socials.youtube} color={p.accent}><Youtube className="h-4 w-4" /></Social> : null}
              {meta.socials?.twitter ? <Social href={meta.socials.twitter} color={p.accent}><Twitter className="h-4 w-4" /></Social> : null}
              {meta.socials?.tiktok ? <Social href={meta.socials.tiktok} color={p.accent}><span className="text-xs font-bold">TT</span></Social> : null}
              {meta.socials?.snapchat ? <Social href={meta.socials.snapchat} color={p.accent}><span className="text-xs font-bold">SC</span></Social> : null}
            </div>
          </div>
          <div className="text-sm" style={S.muted}>
            <p className="font-semibold" style={{ color: p.text }}>Shop</p>
            <ul className="mt-2 space-y-1">
              {categories.slice(1, 6).map((c) => (
                <li key={c}><button onClick={() => { setCat(c); }}>{c}</button></li>
              ))}
            </ul>
          </div>
          <div className="text-sm" style={S.muted}>
            <p className="font-semibold" style={{ color: p.text }}>Get in touch</p>
            <ul className="mt-2 space-y-1">
              {meta.phone ? <li>{meta.phone}</li> : null}
              {meta.whatsapp ? <li><a href={`https://wa.me/${meta.whatsapp.replace(/[^0-9]/g, "")}`} target="_blank" rel="noreferrer">WhatsApp {meta.whatsapp}</a></li> : null}
              {meta.email ? <li>{meta.email}</li> : null}
              {meta.address ? <li>{meta.address}</li> : null}
            </ul>
          </div>
        </div>
        <div className="mx-auto mt-10 max-w-7xl border-t px-4 pt-5 text-center text-xs" style={{ ...S.border, ...S.muted }}>
          © {new Date().getFullYear()} {meta.site_name} · created by Salem & Co.
        </div>
      </footer>

      {/* product detail */}
      {detail && (
        <Modal onClose={() => setDetail(null)} palette={p}>
          <div className="grid gap-6 md:grid-cols-2">
            <Thumb product={detail} palette={p} className="h-64 rounded-2xl" />
            <div>
              <p className="text-xs font-semibold uppercase tracking-wider" style={{ color: p.accent }}>{detail.category}</p>
              <h3 className="mt-1 text-2xl font-semibold">{detail.name}</h3>
              <div className="mt-2 flex items-center gap-2">
                <p className="text-xl font-bold" style={{ color: p.accent }}>{money(detail.price_cents, cur)}</p>
                {detail.compare_at_cents ? <p className="text-sm line-through" style={S.muted}>{money(detail.compare_at_cents, cur)}</p> : null}
              </div>
              <div className="mt-2 flex items-center gap-1 text-xs" style={S.muted}>
                {[0, 1, 2, 3, 4].map((i) => <Star key={i} className="h-3 w-3" fill={p.accent} stroke="none" />)}
                <span className="ml-1">In stock: {detail.stock}</span>
              </div>
              <p className="mt-4 text-sm leading-relaxed" style={S.muted}>{detail.description}</p>
              <button onClick={() => { add(detail); setDetail(null); }} className="mt-6 w-full rounded-full px-6 py-3 text-sm font-semibold" style={S.accent}>
                Add to cart
              </button>
            </div>
          </div>
        </Modal>
      )}

      {/* cart drawer */}
      {cartOpen && (
        <div className="fixed inset-0 z-50 flex justify-end" style={{ background: "rgba(0,0,0,.45)" }} onClick={() => setCartOpen(false)}>
          <div className="flex h-full w-full max-w-md flex-col" style={S.bg} onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between border-b px-5 py-4" style={S.border}>
              <p className="text-lg font-semibold">Your cart ({count})</p>
              <button onClick={() => setCartOpen(false)}><X className="h-5 w-5" /></button>
            </div>

            {done ? (
              <div className="flex flex-1 flex-col items-center justify-center gap-3 p-8 text-center">
                <div className="flex h-12 w-12 items-center justify-center rounded-full" style={S.accent}><Check className="h-6 w-6" /></div>
                <p className="text-lg font-semibold">Order sent!</p>
                <p className="text-sm" style={S.muted}>{demo ? "This is a demo — no real order was placed." : "The store owner has received your order and will contact you."}</p>
                <button onClick={() => { setDone(false); setCartOpen(false); }} className="mt-2 rounded-full px-5 py-2 text-sm font-semibold" style={S.accent}>Continue shopping</button>
              </div>
            ) : cart.length === 0 ? (
              <div className="flex flex-1 items-center justify-center p-8 text-sm" style={S.muted}>Your cart is empty.</div>
            ) : checkout ? (
              <CheckoutForm
                palette={p} demo={demo} placing={placing} total={total} currency={cur}
                onBack={() => setCheckout(false)}
                onSubmit={async (form) => {
                  const payload: OrderPayload = {
                    ...form,
                    items: cart.map((l) => ({ id: l.product.id, name: l.product.name, qty: l.qty, price_cents: l.product.price_cents })),
                    total_cents: total,
                  };
                  if (onOrder) await onOrder(payload);
                  setCart([]); setCheckout(false); setDone(true);
                }}
              />
            ) : (
              <>
                <div className="flex-1 space-y-3 overflow-y-auto p-5">
                  {cart.map((l) => (
                    <div key={l.product.id} className="flex gap-3 rounded-xl p-2" style={S.surface}>
                      <Thumb product={l.product} palette={p} className="h-16 w-16 rounded-lg" />
                      <div className="min-w-0 flex-1">
                        <p className="truncate text-sm font-medium">{l.product.name}</p>
                        <p className="text-xs" style={{ color: p.accent }}>{money(l.product.price_cents, cur)}</p>
                        <div className="mt-1 flex items-center gap-2">
                          <button onClick={() => setQty(l.product.id, l.qty - 1)} className="rounded p-1" style={{ background: p.bg }}><Minus className="h-3 w-3" /></button>
                          <span className="text-sm">{l.qty}</span>
                          <button onClick={() => setQty(l.product.id, l.qty + 1)} className="rounded p-1" style={{ background: p.bg }}><Plus className="h-3 w-3" /></button>
                          <button onClick={() => setQty(l.product.id, 0)} className="ml-auto text-xs" style={S.muted}>Remove</button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="border-t p-5" style={S.border}>
                  <div className="flex items-center justify-between text-sm">
                    <span style={S.muted}>Total</span>
                    <span className="text-lg font-bold">{money(total, cur)}</span>
                  </div>
                  <button onClick={() => setCheckout(true)} className="mt-4 w-full rounded-full px-6 py-3 text-sm font-semibold" style={S.accent}>
                    Checkout
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

function CheckoutForm({
  palette, onBack, onSubmit, total, currency, demo, placing,
}: {
  palette: any; onBack: () => void; total: number; currency: string; demo: boolean; placing: boolean;
  onSubmit: (f: { name: string; phone: string; email: string; address: string; note: string }) => void;
}) {
  const [f, setF] = useState({ name: "", phone: "", email: "", address: "", note: "" });
  const ok = f.name.trim() && f.phone.trim();
  const inputStyle = { background: palette.surface, borderColor: palette.accent2, color: palette.text, borderWidth: 1 };
  return (
    <div className="flex flex-1 flex-col overflow-y-auto p-5">
      <button onClick={onBack} className="self-start text-xs" style={{ color: palette.muted }}>← Back to cart</button>
      <p className="mt-3 text-lg font-semibold">Delivery details</p>
      <div className="mt-4 space-y-3">
        {[
          ["name", "Full name *"], ["phone", "Phone number *"], ["email", "Email"], ["address", "Delivery address"],
        ].map(([k, label]) => (
          <div key={k}>
            <label className="text-xs" style={{ color: palette.muted }}>{label}</label>
            <input value={(f as any)[k]} onChange={(e) => setF({ ...f, [k]: e.target.value })}
              className="mt-1 w-full rounded-lg px-3 py-2 text-sm outline-none" style={inputStyle} />
          </div>
        ))}
        <div>
          <label className="text-xs" style={{ color: palette.muted }}>Note</label>
          <textarea rows={2} value={f.note} onChange={(e) => setF({ ...f, note: e.target.value })}
            className="mt-1 w-full rounded-lg px-3 py-2 text-sm outline-none" style={inputStyle} />
        </div>
      </div>
      <div className="mt-5 flex items-center justify-between text-sm">
        <span style={{ color: palette.muted }}>Total</span>
        <span className="text-lg font-bold">{money(total, currency)}</span>
      </div>
      <button disabled={!ok || placing} onClick={() => onSubmit(f)}
        className="mt-4 w-full rounded-full px-6 py-3 text-sm font-semibold disabled:opacity-50"
        style={{ background: palette.accent, color: palette.bg }}>
        {placing ? "Sending…" : demo ? "Place demo order" : "Place order"}
      </button>
    </div>
  );
}

function ProductCard({ product, palette, currency, onAdd, onOpen }: {
  product: StoreProduct; palette: any; currency: string; onAdd: () => void; onOpen: () => void;
}) {
  const off = product.compare_at_cents && product.compare_at_cents > product.price_cents
    ? Math.round((1 - product.price_cents / product.compare_at_cents) * 100) : 0;
  return (
    <div className="group flex flex-col overflow-hidden rounded-2xl border" style={{ borderColor: palette.accent2, background: palette.bg }}>
      <button onClick={onOpen} className="relative">
        <Thumb product={product} palette={palette} className="h-44" />
        {off > 0 && (
          <span className="absolute left-2 top-2 rounded-full px-2 py-0.5 text-[10px] font-bold" style={{ background: palette.accent, color: palette.bg }}>
            -{off}%
          </span>
        )}
      </button>
      <div className="flex flex-1 flex-col p-3">
        <p className="text-[10px] uppercase tracking-wider" style={{ color: palette.muted }}>{product.category}</p>
        <button onClick={onOpen} className="mt-0.5 text-left text-sm font-medium leading-snug line-clamp-2">{product.name}</button>
        <div className="mt-1 flex items-baseline gap-2">
          <span className="text-base font-bold" style={{ color: palette.accent }}>{money(product.price_cents, currency)}</span>
          {product.compare_at_cents ? <span className="text-xs line-through" style={{ color: palette.muted }}>{money(product.compare_at_cents, currency)}</span> : null}
        </div>
        <button onClick={onAdd} disabled={product.stock <= 0}
          className="mt-3 w-full rounded-full px-3 py-2 text-xs font-semibold disabled:opacity-50"
          style={{ background: palette.accent, color: palette.bg }}>
          {product.stock <= 0 ? "Out of stock" : "Add to cart"}
        </button>
      </div>
    </div>
  );
}

function Thumb({ product, palette, className = "" }: { product: StoreProduct; palette: any; className?: string }) {
  return (
    <div className={`flex w-full items-center justify-center overflow-hidden ${className}`} style={{ background: palette.surface }}>
      {product.images?.[0]
        ? <img src={product.images[0]} alt={product.name} className="h-full w-full object-cover" />
        : <span className="text-5xl">{product.emoji ?? "🛍️"}</span>}
    </div>
  );
}

function Modal({ children, onClose, palette }: { children: React.ReactNode; onClose: () => void; palette: any }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4" style={{ background: "rgba(0,0,0,.5)" }} onClick={onClose}>
      <div className="max-h-[90vh] w-full max-w-3xl overflow-y-auto rounded-3xl p-6"
        style={{ background: palette.bg, color: palette.text }} onClick={(e) => e.stopPropagation()}>
        <button onClick={onClose} className="mb-3 ml-auto block rounded-full p-1.5" style={{ background: palette.surface }}><X className="h-4 w-4" /></button>
        {children}
      </div>
    </div>
  );
}

function Perk({ icon, label, color }: { icon: React.ReactNode; label: string; color: string }) {
  return <div className="flex items-center gap-1.5"><span style={{ color }}>{icon}</span><span className="line-clamp-2">{label}</span></div>;
}
function Info({ icon, text, color }: { icon: React.ReactNode; text: string; color: string }) {
  return <div className="flex items-start gap-2"><span style={{ color }}>{icon}</span><span>{text}</span></div>;
}
function Social({ href, children, color }: { href: string; children: React.ReactNode; color: string }) {
  return (
    <a href={href} target="_blank" rel="noreferrer" className="flex h-8 w-8 items-center justify-center rounded-full" style={{ background: color, color: "#fff" }}>
      {children}
    </a>
  );
}
