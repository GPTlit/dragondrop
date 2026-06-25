import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { requireSupabaseAuth } from "@/integrations/supabase/auth-middleware";

async function assertOwner(supabase: any, userId: string, projectId: string) {
  const { data, error } = await supabase
    .from("projects")
    .select("id,owner_id")
    .eq("id", projectId)
    .maybeSingle();
  if (error) throw new Error(error.message);
  if (!data || data.owner_id !== userId) throw new Error("Not found");
}

export const listProducts = createServerFn({ method: "GET" })
  .middleware([requireSupabaseAuth])
  .inputValidator((d: unknown) => z.object({ projectId: z.string().uuid() }).parse(d))
  .handler(async ({ data, context }) => {
    await assertOwner(context.supabase, context.userId, data.projectId);
    const { data: rows, error } = await context.supabase
      .from("products")
      .select("*")
      .eq("project_id", data.projectId)
      .order("created_at", { ascending: false });
    if (error) throw new Error(error.message);
    return rows ?? [];
  });

const productInput = z.object({
  projectId: z.string().uuid(),
  name: z.string().trim().min(1).max(120),
  description: z.string().max(2000).optional().nullable(),
  price_cents: z.number().int().min(0).max(100_000_000),
  currency: z.string().length(3).default("USD"),
  stock: z.number().int().min(0).default(0),
  visible: z.boolean().default(true),
  images: z.array(z.string().url()).default([]),
});

export const upsertProduct = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((d: unknown) => productInput.extend({ id: z.string().uuid().optional() }).parse(d))
  .handler(async ({ data, context }) => {
    await assertOwner(context.supabase, context.userId, data.projectId);
    const payload = {
      project_id: data.projectId,
      name: data.name,
      description: data.description ?? null,
      price_cents: data.price_cents,
      currency: data.currency,
      stock: data.stock,
      visible: data.visible,
      images: data.images,
    };
    if (data.id) {
      const { error } = await context.supabase.from("products").update(payload).eq("id", data.id);
      if (error) throw new Error(error.message);
      return { id: data.id };
    }
    const { data: row, error } = await context.supabase.from("products").insert(payload).select("id").single();
    if (error) throw new Error(error.message);
    return { id: row.id };
  });

export const deleteProduct = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((d: unknown) => z.object({ id: z.string().uuid(), projectId: z.string().uuid() }).parse(d))
  .handler(async ({ data, context }) => {
    await assertOwner(context.supabase, context.userId, data.projectId);
    const { error } = await context.supabase.from("products").delete().eq("id", data.id);
    if (error) throw new Error(error.message);
    return { ok: true };
  });

export const getProject = createServerFn({ method: "GET" })
  .middleware([requireSupabaseAuth])
  .inputValidator((d: unknown) => z.object({ id: z.string().uuid() }).parse(d))
  .handler(async ({ data, context }) => {
    const { data: row, error } = await context.supabase
      .from("projects")
      .select("*")
      .eq("id", data.id)
      .maybeSingle();
    if (error) throw new Error(error.message);
    if (!row || row.owner_id !== context.userId) throw new Error("Not found");
    return row;
  });

export const createQuickStore = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((d: unknown) =>
    z.object({ name: z.string().trim().min(1).max(80).default("My Store") }).parse(d),
  )
  .handler(async ({ data, context }) => {
    const slug = `${data.name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "").slice(0, 30) || "store"}-${Math.random().toString(36).slice(2, 6)}`;
    const { data: project, error } = await context.supabase
      .from("projects")
      .insert({
        owner_id: context.userId,
        name: data.name,
        slug,
        type: "store",
        description: "Instant store powered by DRAG-N-DROP QuickStore.",
      })
      .select()
      .single();
    if (error) throw new Error(error.message);

    await context.supabase.from("pages").insert({
      project_id: project.id,
      name: "Storefront",
      path: "/",
      is_home: true,
      blocks: [
        { id: crypto.randomUUID(), type: "heading", props: { text: data.name, level: 1 } },
        { id: crypto.randomUUID(), type: "text", props: { text: "Shop our latest products." } },
        { id: crypto.randomUUID(), type: "product-grid", props: {} },
      ],
    });

    // Seed 3 sample products so the admin panel is not empty
    await context.supabase.from("products").insert([
      { project_id: project.id, name: "Sample Tee", description: "Soft cotton tee.", price_cents: 2500, currency: "USD", stock: 50, visible: true, images: [] },
      { project_id: project.id, name: "Sample Mug", description: "11oz ceramic mug.", price_cents: 1500, currency: "USD", stock: 100, visible: true, images: [] },
      { project_id: project.id, name: "Sample Sticker Pack", description: "Set of 5 vinyl stickers.", price_cents: 800, currency: "USD", stock: 200, visible: true, images: [] },
    ]);

    return project;
  });
