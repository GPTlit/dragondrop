import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { requireSupabaseAuth } from "@/integrations/supabase/auth-middleware";

function slugify(s: string) {
  return s
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "")
    .slice(0, 40) || "site";
}

export const listProjects = createServerFn({ method: "GET" })
  .middleware([requireSupabaseAuth])
  .handler(async ({ context }) => {
    const { data, error } = await context.supabase
      .from("projects")
      .select("id,name,slug,type,status,is_published,description,updated_at,created_at")
      .order("updated_at", { ascending: false });
    if (error) throw new Error(error.message);
    return data ?? [];
  });

export const createProject = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((d: unknown) =>
    z.object({
      name: z.string().trim().min(1).max(80),
      type: z.enum(["website", "store", "portfolio", "app", "landing", "blog"]).default("website"),
      description: z.string().max(500).optional(),
    }).parse(d),
  )
  .handler(async ({ data, context }) => {
    const baseSlug = `${slugify(data.name)}-${Math.random().toString(36).slice(2, 6)}`;
    const { data: project, error } = await context.supabase
      .from("projects")
      .insert({
        owner_id: context.userId,
        name: data.name,
        slug: baseSlug,
        type: data.type,
        description: data.description ?? null,
      })
      .select()
      .single();
    if (error) throw new Error(error.message);

    // create default home page
    await context.supabase.from("pages").insert({
      project_id: project.id,
      name: "Home",
      path: "/",
      is_home: true,
      blocks: [
        { id: crypto.randomUUID(), type: "heading", props: { text: data.name, level: 1 } },
        { id: crypto.randomUUID(), type: "text", props: { text: data.description ?? "Welcome to your new site." } },
      ],
    });

    return project;
  });

export const renameProject = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((d: unknown) => z.object({ id: z.string().uuid(), name: z.string().trim().min(1).max(80) }).parse(d))
  .handler(async ({ data, context }) => {
    const { error } = await context.supabase.from("projects").update({ name: data.name }).eq("id", data.id);
    if (error) throw new Error(error.message);
    return { ok: true };
  });

export const deleteProject = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((d: unknown) => z.object({ id: z.string().uuid() }).parse(d))
  .handler(async ({ data, context }) => {
    const { error } = await context.supabase.from("projects").delete().eq("id", data.id);
    if (error) throw new Error(error.message);
    return { ok: true };
  });

export const togglePublish = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((d: unknown) => z.object({ id: z.string().uuid(), publish: z.boolean() }).parse(d))
  .handler(async ({ data, context }) => {
    const { error } = await context.supabase
      .from("projects")
      .update({ is_published: data.publish, status: data.publish ? "published" : "draft" })
      .eq("id", data.id);
    if (error) throw new Error(error.message);
    return { ok: true };
  });

export const getDashboardStats = createServerFn({ method: "GET" })
  .middleware([requireSupabaseAuth])
  .handler(async ({ context }) => {
    const since = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString();
    const [{ count: projectCount }, { count: publishedCount }, { count: viewsCount }, { data: recent }] = await Promise.all([
      context.supabase.from("projects").select("*", { count: "exact", head: true }),
      context.supabase.from("projects").select("*", { count: "exact", head: true }).eq("is_published", true),
      context.supabase.from("analytics_events").select("*", { count: "exact", head: true }).gte("created_at", since),
      context.supabase
        .from("projects")
        .select("id,name,type,status,is_published,updated_at,slug")
        .order("updated_at", { ascending: false })
        .limit(5),
    ]);
    return {
      projectCount: projectCount ?? 0,
      publishedCount: publishedCount ?? 0,
      viewsCount: viewsCount ?? 0,
      recent: recent ?? [],
    };
  });
