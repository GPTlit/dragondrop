import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";
import { ArrowLeft, Plus, Trash2, Upload, Loader2, Package, X, Eye, EyeOff, Save } from "lucide-react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { Logo } from "@/components/site/Logo";
import { listProducts, upsertProduct, deleteProduct, getProject } from "@/lib/products.functions";
import { togglePublish } from "@/lib/projects.functions";

export const Route = createFileRoute("/_authenticated/store/$projectId")({
  head: () => ({ meta: [{ title: "Store Admin — DRAG-N-DROP" }] }),
  component: StoreAdmin,
});

type Product = {
  id: string;
  name: string;
  description: string | null;
  price_cents: number;
  currency: string;
  stock: number;
  visible: boolean;
  images: string[];
};

function StoreAdmin() {
  const { projectId } = Route.useParams();
  const qc = useQueryClient();
  const navigate = useNavigate();
  const fetchProject = useServerFn(getProject);
  const fetchProducts = useServerFn(listProducts);
  const upsert = useServerFn(upsertProduct);
  const del = useServerFn(deleteProduct);
  const pub = useServerFn(togglePublish);

  const projectQ = useQuery({
    queryKey: ["project", projectId],
    queryFn: () => fetchProject({ data: { id: projectId } }),
  });
  const productsQ = useQuery({
    queryKey: ["products", projectId],
    queryFn: () => fetchProducts({ data: { projectId } }),
  });

  const [editing, setEditing] = useState<Partial<Product> | null>(null);

  const saveMut = useMutation({
    mutationFn: (p: Partial<Product>) =>
      upsert({
        data: {
          projectId,
          id: p.id,
          name: p.name ?? "",
          description: p.description ?? null,
          price_cents: Math.round((p.price_cents ?? 0)),
          currency: p.currency ?? "USD",
          stock: p.stock ?? 0,
          visible: p.visible ?? true,
          images: (p.images ?? []) as string[],
        } as any,
      }),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["products", projectId] });
      toast.success("Saved");
      setEditing(null);
    },
    onError: (e: any) => toast.error(e?.message ?? "Failed"),
  });

  const delMut = useMutation({
    mutationFn: (id: string) => del({ data: { id, projectId } }),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["products", projectId] });
      toast.success("Deleted");
    },
  });

  const pubMut = useMutation({
    mutationFn: (publish: boolean) => pub({ data: { id: projectId, publish } }),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["project", projectId] });
      toast.success("Updated");
    },
  });

  if (projectQ.isLoading) {
    return <div className="flex min-h-screen items-center justify-center"><Loader2 className="h-5 w-5 animate-spin" /></div>;
  }
  if (projectQ.error || !projectQ.data) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center gap-3">
        <p className="text-sm text-muted-foreground">Store not found.</p>
        <Link to="/dashboard" className="rounded-lg bg-foreground px-4 py-2 text-sm font-semibold text-background">Back</Link>
      </div>
    );
  }
  const project = projectQ.data;
  const products = (productsQ.data ?? []) as Product[];

  return (
    <div className="min-h-screen bg-surface">
      <header className="sticky top-0 z-20 border-b border-border bg-background">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-6 py-3">
          <div className="flex items-center gap-3">
            <Link to="/dashboard" className="rounded-lg p-2 hover:bg-secondary"><ArrowLeft className="h-4 w-4" /></Link>
            <Logo showWordmark={false} />
            <div>
              <p className="font-display text-base font-semibold">{project.name}</p>
              <p className="text-xs text-muted-foreground">Store admin · {products.length} products</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => pubMut.mutate(!project.is_published)}
              className="rounded-lg border border-border px-3 py-1.5 text-xs font-medium hover:bg-secondary"
            >
              {project.is_published ? "Unpublish" : "Publish"}
            </button>
            <button
              onClick={() => setEditing({ name: "", price_cents: 0, currency: "USD", stock: 0, visible: true, images: [] })}
              className="inline-flex items-center gap-1.5 rounded-lg bg-foreground px-3 py-1.5 text-xs font-semibold text-background"
            >
              <Plus className="h-3.5 w-3.5" /> New product
            </button>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-6 py-8">
        {productsQ.isLoading ? (
          <Loader2 className="mx-auto h-5 w-5 animate-spin" />
        ) : products.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-border bg-background p-12 text-center">
            <Package className="mx-auto h-10 w-10 text-muted-foreground" />
            <p className="mt-3 font-display text-lg font-semibold">No products yet</p>
            <button
              onClick={() => setEditing({ name: "", price_cents: 0, currency: "USD", stock: 0, visible: true, images: [] })}
              className="mt-4 inline-flex items-center gap-1.5 rounded-lg bg-foreground px-4 py-2 text-sm font-semibold text-background"
            >
              <Plus className="h-4 w-4" /> Add your first product
            </button>
          </div>
        ) : (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {products.map((p) => (
              <div key={p.id} className="rounded-2xl border border-border bg-background p-4">
                <div className="aspect-square overflow-hidden rounded-xl bg-secondary">
                  {p.images?.[0] ? (
                    <img src={p.images[0]} alt={p.name} className="h-full w-full object-cover" />
                  ) : (
                    <div className="flex h-full items-center justify-center text-muted-foreground"><Package className="h-8 w-8" /></div>
                  )}
                </div>
                <div className="mt-3 flex items-start justify-between gap-2">
                  <div className="min-w-0">
                    <p className="truncate font-medium">{p.name}</p>
                    <p className="text-xs text-muted-foreground">
                      {(p.price_cents / 100).toLocaleString(undefined, { style: "currency", currency: p.currency || "USD" })} · {p.stock} in stock
                    </p>
                  </div>
                  <span className={`rounded-full px-2 py-0.5 text-[10px] font-semibold ${p.visible ? "bg-success/10 text-success" : "bg-secondary text-muted-foreground"}`}>
                    {p.visible ? <Eye className="inline h-3 w-3" /> : <EyeOff className="inline h-3 w-3" />}
                  </span>
                </div>
                <div className="mt-3 flex gap-2">
                  <button onClick={() => setEditing(p)} className="flex-1 rounded-lg border border-border px-3 py-1.5 text-xs font-medium hover:bg-secondary">Edit</button>
                  <button onClick={() => confirm(`Delete "${p.name}"?`) && delMut.mutate(p.id)} className="rounded-lg p-2 text-muted-foreground hover:bg-destructive/10 hover:text-destructive">
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>

      {editing && (
        <ProductEditor
          initial={editing}
          projectId={projectId}
          onClose={() => setEditing(null)}
          onSave={(p) => saveMut.mutate(p)}
          saving={saveMut.isPending}
        />
      )}
    </div>
  );
}

function ProductEditor({
  initial, projectId, onClose, onSave, saving,
}: {
  initial: Partial<Product>;
  projectId: string;
  onClose: () => void;
  onSave: (p: Partial<Product>) => void;
  saving: boolean;
}) {
  const [p, setP] = useState<Partial<Product>>(initial);
  const [uploading, setUploading] = useState(false);
  const images = (p.images ?? []) as string[];

  async function handleUpload(files: FileList | null) {
    if (!files?.length) return;
    setUploading(true);
    try {
      const { data: u } = await supabase.auth.getUser();
      if (!u.user) throw new Error("Not signed in");
      const uploaded: string[] = [];
      for (const file of Array.from(files)) {
        const ext = file.name.split(".").pop() || "bin";
        const path = `${u.user.id}/${projectId}/${crypto.randomUUID()}.${ext}`;
        const { error } = await supabase.storage.from("product-images").upload(path, file, { upsert: false });
        if (error) throw error;
        const { data: signed } = await supabase.storage.from("product-images").createSignedUrl(path, 60 * 60 * 24 * 365);
        if (signed?.signedUrl) uploaded.push(signed.signedUrl);
      }
      setP((s) => ({ ...s, images: [...(s.images ?? []), ...uploaded] }));
      toast.success(`Uploaded ${uploaded.length} image(s)`);
    } catch (e: any) {
      toast.error(e?.message ?? "Upload failed");
    } finally {
      setUploading(false);
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-foreground/40 p-4">
      <div className="w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-2xl border border-border bg-background p-6 shadow-xl">
        <div className="flex items-center justify-between">
          <h2 className="font-display text-xl font-semibold">{p.id ? "Edit product" : "New product"}</h2>
          <button onClick={onClose} className="rounded-lg p-1.5 hover:bg-secondary"><X className="h-4 w-4" /></button>
        </div>
        <div className="mt-5 space-y-4">
          <Field label="Name">
            <input value={p.name ?? ""} onChange={(e) => setP({ ...p, name: e.target.value })} className="input" />
          </Field>
          <Field label="Description">
            <textarea rows={3} value={p.description ?? ""} onChange={(e) => setP({ ...p, description: e.target.value })} className="input" />
          </Field>
          <div className="grid grid-cols-3 gap-3">
            <Field label="Price">
              <input
                type="number" min={0} step="0.01"
                value={((p.price_cents ?? 0) / 100).toString()}
                onChange={(e) => setP({ ...p, price_cents: Math.round(parseFloat(e.target.value || "0") * 100) })}
                className="input"
              />
            </Field>
            <Field label="Currency">
              <input value={p.currency ?? "USD"} onChange={(e) => setP({ ...p, currency: e.target.value.toUpperCase().slice(0, 3) })} className="input" />
            </Field>
            <Field label="Stock">
              <input type="number" min={0} value={p.stock ?? 0} onChange={(e) => setP({ ...p, stock: parseInt(e.target.value || "0") })} className="input" />
            </Field>
          </div>
          <Field label="Images">
            <div className="space-y-2">
              <div className="grid grid-cols-4 gap-2">
                {images.map((url, i) => (
                  <div key={i} className="relative aspect-square overflow-hidden rounded-lg border border-border">
                    <img src={url} className="h-full w-full object-cover" />
                    <button
                      onClick={() => setP({ ...p, images: images.filter((_, j) => j !== i) })}
                      className="absolute right-1 top-1 rounded-full bg-foreground/70 p-0.5 text-background"
                    ><X className="h-3 w-3" /></button>
                  </div>
                ))}
                <label className="flex aspect-square cursor-pointer items-center justify-center rounded-lg border border-dashed border-border text-muted-foreground hover:bg-secondary">
                  {uploading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Upload className="h-4 w-4" />}
                  <input type="file" multiple accept="image/*" className="hidden" onChange={(e) => handleUpload(e.target.files)} />
                </label>
              </div>
            </div>
          </Field>
          <label className="flex items-center gap-2 text-sm">
            <input type="checkbox" checked={p.visible ?? true} onChange={(e) => setP({ ...p, visible: e.target.checked })} />
            Visible in storefront
          </label>
        </div>
        <div className="mt-6 flex justify-end gap-2">
          <button onClick={onClose} className="rounded-lg border border-border px-3 py-2 text-sm font-medium hover:bg-secondary">Cancel</button>
          <button
            onClick={() => onSave(p)}
            disabled={saving || !p.name?.trim()}
            className="inline-flex items-center gap-2 rounded-lg bg-foreground px-4 py-2 text-sm font-semibold text-background disabled:opacity-60"
          >
            {saving ? <Loader2 className="h-4 w-4 animate-spin" /> : <Save className="h-4 w-4" />} Save
          </button>
        </div>
      </div>
      <style>{`.input { width:100%; border:1px solid hsl(var(--border)); border-radius:0.5rem; padding:0.625rem 0.75rem; font-size:0.875rem; background:transparent; outline:none; } .input:focus { border-color: hsl(var(--foreground)); }`}</style>
    </div>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <label className="text-xs font-medium text-muted-foreground">{label}</label>
      <div className="mt-1">{children}</div>
    </div>
  );
}
