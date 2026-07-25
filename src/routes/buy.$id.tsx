import { createFileRoute, Link, notFound, useNavigate } from "@tanstack/react-router";
import { useMutation } from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";
import { useState } from "react";
import { toast } from "sonner";
import { ArrowLeft, Check, Loader2, MessageCircle, Upload } from "lucide-react";
import { SiteNav } from "@/components/site/SiteNav";
import { SiteFooter } from "@/components/site/SiteFooter";
import { templateById, formatMRU, WHATSAPP_NUMBER, WHATSAPP_DISPLAY, type StoreTemplate } from "@/lib/templates";
import { submitPurchase } from "@/lib/purchase.functions";
import { supabase } from "@/integrations/supabase/client";
import bankily from "@/assets/pay/bankily.jpg";
import masrivi from "@/assets/pay/masrivi.jpg";
import sedad from "@/assets/pay/sedad.jpg";

export const Route = createFileRoute("/buy/$id")({
  head: ({ params }) => {
    const t = templateById(params.id);
    return {
      meta: [
        { title: `Unlock ${t?.name ?? "template"} — DRAG-N-DROP` },
        { name: "description", content: t ? `Pay ${formatMRU(t.price_mru)} via Bankily, Masrvi or Sedad to unlock ${t.name}.` : "" },
        { property: "og:title", content: `Unlock ${t?.name ?? "template"}` },
        { property: "og:description", content: t?.tagline ?? "" },
      ],
    };
  },
  errorComponent: () => <ErrPage />,
  notFoundComponent: () => <ErrPage />,
  loader: ({ params }) => {
    const t = templateById(params.id);
    if (!t) throw notFound();
    return t;
  },
  component: BuyPage,
});

function ErrPage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-4 bg-background">
      <p className="text-muted-foreground">Template not found.</p>
      <Link to="/" className="rounded-full bg-foreground px-5 py-2 text-sm font-semibold text-background">Back</Link>
    </div>
  );
}

type Method = "bankily" | "masrivi" | "sedad";

function BuyPage() {
  const t = Route.useLoaderData() as StoreTemplate;
  const navigate = useNavigate();
  const submit = useServerFn(submitPurchase);
  const [method, setMethod] = useState<Method>("bankily");
  const [storeName, setStoreName] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [code, setCode] = useState("");
  const [phone, setPhone] = useState("");
  const [wa, setWa] = useState("");
  const [comments, setComments] = useState("");
  const [receipt, setReceipt] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const [receiptUrl, setReceiptUrl] = useState<string>("");

  const purchase = useMutation({
    mutationFn: async () => {
      let url = receiptUrl;
      if (!url && receipt) {
        setUploading(true);
        const ext = receipt.name.split(".").pop() || "bin";
        const path = `${crypto.randomUUID()}.${ext}`;
        const { error } = await supabase.storage.from("receipts").upload(path, receipt, { upsert: false });
        if (error) throw error;
        const { data } = await supabase.storage.from("receipts").createSignedUrl(path, 60 * 60 * 24 * 30);
        url = data?.signedUrl ?? "";
        setReceiptUrl(url);
        setUploading(false);
      }
      const res = await submit({
        data: {
          template_id: t.id,
          store_name: storeName,
          buyer_name: name,
          buyer_email: email,
          buyer_code: code,
          buyer_phone: phone,
          buyer_whatsapp: wa || phone,
          comments,
          payment_method: method,
          receipt_url: url,
        },
      });
      return { ...res, receiptUrl: url };
    },
    onSuccess: (res) => {
      const method_label = method === "bankily" ? "Bankily" : method === "masrivi" ? "Masrvi" : "Sedad";
      const message = [
        `🛒 New store purchase — ${t.name} (${formatMRU(t.price_mru)})`,
        `Template: #${t.id} · ${t.tier}`,
        `Store name: ${storeName}`,
        `Buyer: ${name}`,
        `Email: ${email}`,
        `Phone: ${phone || "-"}`,
        `WhatsApp: ${wa || phone || "-"}`,
        `Payment: ${method_label}`,
        `Ref/Code: ${code || "-"}`,
        comments ? `Notes: ${comments}` : "",
        res.receiptUrl ? `Receipt: ${res.receiptUrl}` : "Receipt: (I will attach the screenshot in this chat)",
        `Purchase ID: ${res.purchaseId}`,
      ].filter(Boolean).join("\n");
      const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
      toast.success("Purchase submitted — opening WhatsApp");
      window.open(url, "_blank");
      navigate({ to: "/auth", search: { redirect: `/dashboard` } as any });
    },
    onError: (e: any) => toast.error(e?.message ?? "Something went wrong"),
  });

  const canSubmit = storeName.trim() && name.trim() && /.+@.+\..+/.test(email) && method;

  const payLogo = method === "bankily" ? bankily : method === "masrivi" ? masrivi : sedad;
  const payName = method === "bankily" ? "Bankily" : method === "masrivi" ? "Masrvi" : "Sedad";

  return (
    <div className="min-h-screen bg-background">
      <SiteNav />
      <main className="pt-24 pb-16">
        <div className="mx-auto max-w-5xl px-4">
          <Link to="/template/$id" params={{ id: String(t.id) }} className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground">
            <ArrowLeft className="h-3.5 w-3.5" /> Back to {t.name}
          </Link>

          <div className="mt-6 grid gap-8 lg:grid-cols-[1fr_360px]">
            <div className="rounded-3xl border border-border bg-background p-8 shadow-sm">
              <h1 className="font-display text-3xl font-semibold tracking-tight">Checkout — {t.name}</h1>
              <p className="mt-1 text-sm text-muted-foreground">Fill in your details, pick a payment method, and send the receipt. We'll unlock the template on your email.</p>

              <section className="mt-8">
                <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">1 · Your store</p>
                <div className="mt-3 grid gap-3">
                  <Input label="Store name" value={storeName} onChange={setStoreName} placeholder="e.g. Salem Bazaar" />
                </div>
              </section>

              <section className="mt-8">
                <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">2 · Your details</p>
                <div className="mt-3 grid gap-3 sm:grid-cols-2">
                  <Input label="Full name" value={name} onChange={setName} />
                  <Input label="Email (owner login)" value={email} onChange={setEmail} type="email" placeholder="you@example.com" />
                  <Input label="Phone" value={phone} onChange={setPhone} />
                  <Input label="WhatsApp number" value={wa} onChange={setWa} placeholder="Same as phone if empty" />
                </div>
                <Textarea label="Comments (optional)" value={comments} onChange={setComments} placeholder="Anything we should know?" />
              </section>

              <section className="mt-8">
                <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">3 · Payment method</p>
                <div className="mt-3 grid gap-3 sm:grid-cols-3">
                  {([
                    { id: "bankily", label: "Bankily", src: bankily, d: "Mobile wallet · BPM" },
                    { id: "masrivi", label: "Masrvi", src: masrivi, d: "Mobile bank · BMCI" },
                    { id: "sedad", label: "Sedad", src: sedad, d: "Bank transfer · BMI" },
                  ] as const).map((m) => (
                    <button
                      type="button"
                      key={m.id}
                      onClick={() => setMethod(m.id)}
                      className={`relative rounded-2xl border p-4 text-left transition ${method === m.id ? "border-foreground bg-secondary" : "border-border hover:bg-secondary/50"}`}
                    >
                      {method === m.id && <Check className="absolute right-3 top-3 h-4 w-4 text-success" />}
                      <div className="flex h-14 items-center justify-center rounded-lg bg-white">
                        <img src={m.src} alt={m.label} className="max-h-10 object-contain" />
                      </div>
                      <p className="mt-3 font-semibold">{m.label}</p>
                      <p className="text-xs text-muted-foreground">{m.d}</p>
                    </button>
                  ))}
                </div>

                <div className="mt-5 rounded-2xl bg-secondary/50 border border-border p-4">
                  <p className="text-sm">
                    Send <b>{formatMRU(t.price_mru)}</b> via <b>{payName}</b>, then paste your transaction reference below.
                  </p>
                  <div className="mt-3 grid gap-3 sm:grid-cols-2">
                    <Input label="Transaction reference / code" value={code} onChange={setCode} placeholder="e.g. TX-123456" />
                    <div>
                      <label className="text-xs font-medium text-muted-foreground">Receipt screenshot</label>
                      <label className="mt-1 flex cursor-pointer items-center justify-between rounded-xl border border-dashed border-border bg-background px-3 py-2.5 text-sm hover:bg-secondary">
                        <span className="truncate">{receipt?.name ?? "Choose an image…"}</span>
                        <Upload className="h-4 w-4 text-muted-foreground" />
                        <input type="file" accept="image/*" className="hidden" onChange={(e) => setReceipt(e.target.files?.[0] ?? null)} />
                      </label>
                    </div>
                  </div>
                </div>
              </section>

              <div className="mt-8 flex flex-col-reverse items-stretch gap-3 sm:flex-row sm:items-center sm:justify-between">
                <p className="text-xs text-muted-foreground">
                  After submitting you'll be redirected to WhatsApp ({WHATSAPP_DISPLAY}) with a prefilled message.
                </p>
                <button
                  onClick={() => purchase.mutate()}
                  disabled={!canSubmit || purchase.isPending || uploading}
                  className="inline-flex items-center justify-center gap-2 rounded-2xl bg-foreground px-6 py-3 text-sm font-semibold text-background disabled:opacity-60"
                >
                  {(purchase.isPending || uploading) ? <Loader2 className="h-4 w-4 animate-spin" /> : <MessageCircle className="h-4 w-4" />}
                  Send & open WhatsApp
                </button>
              </div>
            </div>

            <aside className="lg:sticky lg:top-24 h-fit rounded-3xl border border-border bg-background p-6 shadow-lg">
              <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Order summary</p>
              <div className="mt-3 flex items-center gap-3 rounded-xl border border-border p-3">
                <div className="h-12 w-12 rounded-lg" style={{ background: `linear-gradient(135deg, ${t.palette.accent}, ${t.palette.accent2})` }} />
                <div>
                  <p className="font-semibold">{t.name}</p>
                  <p className="text-xs text-muted-foreground">{t.tier} template</p>
                </div>
              </div>
              <div className="mt-4 flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Subtotal</span>
                <span className="font-semibold">{formatMRU(t.price_mru)}</span>
              </div>
              <div className="mt-1 flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Fees</span>
                <span>—</span>
              </div>
              <div className="mt-3 flex items-center justify-between border-t border-border pt-3">
                <span className="font-semibold">Total</span>
                <span className="font-display text-2xl font-bold">{formatMRU(t.price_mru)}</span>
              </div>
              <div className="mt-4 flex items-center gap-2 rounded-xl bg-secondary/50 p-3">
                <img src={payLogo} alt={payName} className="h-6 rounded bg-white p-0.5" />
                <p className="text-xs">Paying with <b>{payName}</b></p>
              </div>
              <ul className="mt-5 space-y-2 text-xs text-muted-foreground">
                <li className="flex gap-2"><Check className="h-3.5 w-3.5 text-success" /> Bound to your email — only you can edit.</li>
                <li className="flex gap-2"><Check className="h-3.5 w-3.5 text-success" /> Sign in after payment to access admin.</li>
                <li className="flex gap-2"><Check className="h-3.5 w-3.5 text-success" /> Full source export once confirmed.</li>
              </ul>
            </aside>
          </div>
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}

function Input({ label, value, onChange, type = "text", placeholder }: { label: string; value: string; onChange: (v: string) => void; type?: string; placeholder?: string }) {
  return (
    <div>
      <label className="text-xs font-medium text-muted-foreground">{label}</label>
      <input
        type={type}
        value={value}
        placeholder={placeholder}
        onChange={(e) => onChange(e.target.value)}
        className="mt-1 w-full rounded-xl border border-border bg-background px-3 py-2.5 text-sm outline-none focus:border-foreground"
      />
    </div>
  );
}

function Textarea({ label, value, onChange, placeholder }: { label: string; value: string; onChange: (v: string) => void; placeholder?: string }) {
  return (
    <div className="mt-3">
      <label className="text-xs font-medium text-muted-foreground">{label}</label>
      <textarea
        rows={3}
        value={value}
        placeholder={placeholder}
        onChange={(e) => onChange(e.target.value)}
        className="mt-1 w-full rounded-xl border border-border bg-background px-3 py-2.5 text-sm outline-none focus:border-foreground"
      />
    </div>
  );
}
