import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";
import { ShoppingBag, Sparkles, Check, Loader2, ArrowLeft } from "lucide-react";
import { toast } from "sonner";
import { Link } from "@tanstack/react-router";
import { createQuickStore } from "@/lib/products.functions";
import { Logo } from "@/components/site/Logo";

export const Route = createFileRoute("/_authenticated/quickstore")({
  head: () => ({ meta: [{ title: "QuickStore — DRAG-N-DROP" }] }),
  component: QuickStorePage,
});

function QuickStorePage() {
  const navigate = useNavigate();
  const create = useServerFn(createQuickStore);
  const [name, setName] = useState("My Store");

  const mut = useMutation({
    mutationFn: (n: string) => create({ data: { name: n } }),
    onSuccess: (project: any) => {
      toast.success("Store ready!");
      navigate({ to: "/store/$projectId", params: { projectId: project.id } });
    },
    onError: (e: any) => toast.error(e?.message ?? "Failed"),
  });

  return (
    <div className="min-h-screen bg-surface">
      <header className="border-b border-border bg-background">
        <div className="mx-auto flex max-w-5xl items-center justify-between px-6 py-3">
          <div className="flex items-center gap-3">
            <Link to="/dashboard" className="rounded-lg p-2 hover:bg-secondary"><ArrowLeft className="h-4 w-4" /></Link>
            <Logo />
          </div>
        </div>
      </header>
      <main className="mx-auto max-w-3xl px-6 py-16">
        <div className="rounded-3xl border border-border bg-background p-10 text-center shadow-sm">
          <div className="mx-auto inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-foreground text-background">
            <ShoppingBag className="h-7 w-7" />
          </div>
          <h1 className="mt-5 font-display text-4xl font-semibold tracking-tight">QuickStore</h1>
          <p className="mx-auto mt-3 max-w-xl text-muted-foreground">
            Skip the builder. Get a fully-set-up store with admin panel, products, and storefront in one click — Shopify-style, ready to sell.
          </p>
          <ul className="mx-auto mt-6 grid max-w-md gap-2 text-left text-sm">
            {["Pre-built storefront page", "Product admin with image upload", "Inventory & pricing controls", "Publish with one click"].map((x) => (
              <li key={x} className="flex items-center gap-2"><Check className="h-4 w-4 text-success" /> {x}</li>
            ))}
          </ul>
          <div className="mx-auto mt-8 flex max-w-md flex-col items-stretch gap-2">
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Store name"
              className="w-full rounded-xl border border-border bg-background px-4 py-3 text-sm outline-none focus:border-foreground"
            />
            <button
              disabled={mut.isPending || !name.trim()}
              onClick={() => mut.mutate(name.trim())}
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-foreground px-5 py-3 text-sm font-semibold text-background disabled:opacity-60"
            >
              {mut.isPending ? <Loader2 className="h-4 w-4 animate-spin" /> : <Sparkles className="h-4 w-4" />}
              Create my store
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}
