import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";
import {
  LayoutDashboard, FolderOpen, Globe, ShoppingBag, Smartphone, Sparkles,
  Plus, Search, Bell, Settings, MoreHorizontal, LogOut, Loader2, Trash2,
  TrendingUp, DollarSign, Eye, Package, Rocket,
} from "lucide-react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { Logo } from "@/components/site/Logo";
import {
  listProjects, createProject, deleteProject, togglePublish, getDashboardStats,
} from "@/lib/projects.functions";

export const Route = createFileRoute("/_authenticated/dashboard")({
  head: () => ({
    meta: [
      { title: "Dashboard — DRAG-N-DROP" },
      { name: "description", content: "Manage your real projects, sites and stores." },
    ],
  }),
  component: DashboardPage,
});

function DashboardPage() {
  const navigate = useNavigate();
  const qc = useQueryClient();
  const fetchProjects = useServerFn(listProjects);
  const fetchStats = useServerFn(getDashboardStats);
  const create = useServerFn(createProject);
  const del = useServerFn(deleteProject);
  const toggle = useServerFn(togglePublish);

  const projectsQ = useQuery({ queryKey: ["projects"], queryFn: () => fetchProjects() });
  const statsQ = useQuery({ queryKey: ["dashboard-stats"], queryFn: () => fetchStats() });
  const [email, setEmail] = useState<string>("");

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => setEmail(data.user?.email ?? ""));
  }, []);

  const createMut = useMutation({
    mutationFn: (vars: { name: string; type: "website" | "store" | "portfolio" | "app" | "landing" | "blog" }) =>
      create({ data: vars }),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["projects"] });
      qc.invalidateQueries({ queryKey: ["dashboard-stats"] });
      toast.success("Project created");
    },
    onError: (e: any) => toast.error(e?.message ?? "Failed"),
  });
  const delMut = useMutation({
    mutationFn: (id: string) => del({ data: { id } }),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["projects"] });
      qc.invalidateQueries({ queryKey: ["dashboard-stats"] });
      toast.success("Deleted");
    },
  });
  const pubMut = useMutation({
    mutationFn: (vars: { id: string; publish: boolean }) => toggle({ data: vars }),
    onSuccess: (_d, vars) => {
      qc.invalidateQueries({ queryKey: ["projects"] });
      toast.success(vars.publish ? "Published" : "Unpublished");
    },
  });

  async function signOut() {
    await qc.cancelQueries();
    qc.clear();
    await supabase.auth.signOut();
    navigate({ to: "/auth", replace: true });
  }

  const [showNew, setShowNew] = useState(false);

  return (
    <div className="min-h-screen bg-surface">
      <Sidebar onSignOut={signOut} />
      <div className="lg:pl-64">
        <Topbar email={email} />
        <main className="px-6 py-8">
          <div className="mx-auto max-w-7xl space-y-8">
            <div className="flex flex-wrap items-end justify-between gap-4">
              <div>
                <p className="text-sm text-muted-foreground">Welcome{email ? `, ${email.split("@")[0]}` : ""}</p>
                <h1 className="mt-1 font-display text-3xl font-semibold tracking-tight">Your workspace</h1>
              </div>
              <button
                onClick={() => setShowNew(true)}
                className="inline-flex items-center gap-2 rounded-full bg-foreground px-4 py-2.5 text-sm font-semibold text-background"
              >
                <Plus className="h-4 w-4" /> New project
              </button>
            </div>

            <Stats stats={statsQ.data} loading={statsQ.isLoading} projects={projectsQ.data?.length ?? 0} />

            <Projects
              loading={projectsQ.isLoading}
              projects={projectsQ.data ?? []}
              onDelete={(id) => delMut.mutate(id)}
              onToggle={(id, publish) => pubMut.mutate({ id, publish })}
              onNew={() => setShowNew(true)}
            />
          </div>
        </main>
      </div>
      {showNew && (
        <NewProjectModal
          onClose={() => setShowNew(false)}
          onCreate={async (vars) => {
            await createMut.mutateAsync(vars);
            setShowNew(false);
          }}
          submitting={createMut.isPending}
        />
      )}
    </div>
  );
}

const NAV = [
  { icon: LayoutDashboard, to: "/dashboard", label: "Overview" },
  { icon: FolderOpen, to: "/dashboard", label: "Projects" },
  { icon: Globe, to: "/dashboard", label: "Websites" },
  { icon: ShoppingBag, to: "/dashboard", label: "Stores" },
  { icon: Smartphone, to: "/dashboard", label: "Apps" },
  { icon: Sparkles, to: "/builder", label: "Builder" },
] as const;

function Sidebar({ onSignOut }: { onSignOut: () => void }) {
  return (
    <aside className="fixed inset-y-0 left-0 z-30 hidden w-64 border-r border-border bg-background lg:flex lg:flex-col">
      <div className="border-b border-border p-5">
        <Link to="/"><Logo /></Link>
      </div>
      <nav className="flex-1 overflow-y-auto p-3">
        {NAV.map((n) => (
          <Link
            key={n.label}
            to={n.to}
            className="flex w-full items-center gap-2.5 rounded-lg px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
          >
            <n.icon className="h-4 w-4" /> {n.label}
          </Link>
        ))}
      </nav>
      <div className="border-t border-border p-3">
        <button
          onClick={onSignOut}
          className="flex w-full items-center gap-2.5 rounded-lg px-3 py-2 text-sm font-medium text-muted-foreground hover:bg-secondary hover:text-foreground"
        >
          <LogOut className="h-4 w-4" /> Sign out
        </button>
      </div>
    </aside>
  );
}

function Topbar({ email }: { email: string }) {
  const initial = (email || "U").slice(0, 1).toUpperCase();
  return (
    <header className="sticky top-0 z-20 border-b border-border bg-background/85 backdrop-blur-xl">
      <div className="flex items-center justify-between gap-3 px-6 py-3">
        <div className="flex items-center gap-2 rounded-lg border border-border bg-surface px-3 py-1.5 text-sm w-full max-w-md">
          <Search className="h-4 w-4 text-muted-foreground" />
          <input placeholder="Search projects…" className="flex-1 bg-transparent outline-none" />
        </div>
        <div className="flex items-center gap-2">
          <button className="rounded-lg border border-border p-2 hover:bg-secondary"><Bell className="h-4 w-4" /></button>
          <button className="rounded-lg border border-border p-2 hover:bg-secondary"><Settings className="h-4 w-4" /></button>
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary font-display text-xs font-semibold text-primary-foreground">
            {initial}
          </div>
        </div>
      </div>
    </header>
  );
}

function Stats({ stats, loading, projects }: { stats: any; loading: boolean; projects: number }) {
  const cards = [
    { label: "Projects", value: projects, icon: FolderOpen },
    { label: "Published sites", value: stats?.publishedCount ?? 0, icon: Rocket },
    { label: "Visitors (7d)", value: stats?.viewsCount ?? 0, icon: Eye },
    { label: "Revenue", value: "$0", icon: DollarSign },
  ];
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {cards.map((s) => (
        <div key={s.label} className="rounded-2xl border border-border bg-background p-5">
          <div className="flex items-start justify-between">
            <span className="text-sm text-muted-foreground">{s.label}</span>
            <s.icon className="h-4 w-4 text-muted-foreground" />
          </div>
          <p className="mt-3 font-display text-3xl font-semibold tracking-tight">
            {loading ? "—" : s.value}
          </p>
          <p className="mt-1 text-xs font-medium text-muted-foreground">Real-time</p>
        </div>
      ))}
    </div>
  );
}

function Projects({
  loading, projects, onDelete, onToggle, onNew,
}: {
  loading: boolean;
  projects: any[];
  onDelete: (id: string) => void;
  onToggle: (id: string, publish: boolean) => void;
  onNew: () => void;
}) {
  if (loading) {
    return (
      <div className="rounded-2xl border border-border bg-background p-12 text-center text-sm text-muted-foreground">
        <Loader2 className="mx-auto h-5 w-5 animate-spin" />
      </div>
    );
  }
  if (!projects.length) {
    return (
      <div className="rounded-2xl border border-dashed border-border bg-background p-12 text-center">
        <Package className="mx-auto h-10 w-10 text-muted-foreground" />
        <p className="mt-3 font-display text-lg font-semibold">No projects yet</p>
        <p className="mt-1 text-sm text-muted-foreground">Create your first website, store, or app.</p>
        <button
          onClick={onNew}
          className="mt-5 inline-flex items-center gap-2 rounded-full bg-foreground px-4 py-2 text-sm font-semibold text-background"
        >
          <Plus className="h-4 w-4" /> New project
        </button>
      </div>
    );
  }
  return (
    <div className="rounded-2xl border border-border bg-background">
      <div className="flex items-center justify-between border-b border-border p-5">
        <div>
          <p className="font-display text-lg font-semibold">Projects</p>
          <p className="text-xs text-muted-foreground">{projects.length} total</p>
        </div>
        <button onClick={onNew} className="inline-flex items-center gap-1 rounded-lg border border-border px-3 py-1.5 text-xs font-medium hover:bg-secondary">
          <Plus className="h-3 w-3" /> New
        </button>
      </div>
      <div className="divide-y divide-border">
        {projects.map((p) => (
          <div key={p.id} className="flex items-center gap-4 p-5 transition-colors hover:bg-surface">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-foreground font-display text-sm font-semibold text-background">
              {p.name[0]?.toUpperCase()}
            </div>
            <div className="flex-1 min-w-0">
              <p className="font-medium truncate">{p.name}</p>
              <p className="text-xs text-muted-foreground capitalize">{p.type} · {p.slug}</p>
            </div>
            <span className={`hidden sm:inline-flex rounded-full px-2.5 py-1 text-[10px] font-semibold ${
              p.is_published ? "bg-success/10 text-success" : "bg-secondary text-muted-foreground"
            }`}>
              {p.is_published ? "Published" : "Draft"}
            </span>
            <button
              onClick={() => onToggle(p.id, !p.is_published)}
              className="rounded-lg border border-border px-3 py-1.5 text-xs font-medium hover:bg-secondary"
            >
              {p.is_published ? "Unpublish" : "Publish"}
            </button>
            <Link
              to="/builder"
              search={{ project: p.id } as any}
              className="rounded-lg bg-foreground px-3 py-1.5 text-xs font-semibold text-background"
            >
              Open
            </Link>
            <button
              onClick={() => {
                if (confirm(`Delete "${p.name}"?`)) onDelete(p.id);
              }}
              className="rounded-lg p-2 text-muted-foreground hover:bg-destructive/10 hover:text-destructive"
            >
              <Trash2 className="h-4 w-4" />
            </button>
            <button className="rounded-lg p-2 hover:bg-secondary"><MoreHorizontal className="h-4 w-4 text-muted-foreground" /></button>
          </div>
        ))}
      </div>
    </div>
  );
}

function NewProjectModal({
  onClose, onCreate, submitting,
}: {
  onClose: () => void;
  onCreate: (vars: { name: string; type: any; description?: string }) => Promise<void>;
  submitting: boolean;
}) {
  const [name, setName] = useState("");
  const [type, setType] = useState<"website" | "store" | "portfolio" | "app" | "landing" | "blog">("website");
  const [description, setDescription] = useState("");

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-foreground/40 p-4">
      <div className="w-full max-w-md rounded-2xl border border-border bg-background p-6 shadow-xl">
        <h2 className="font-display text-xl font-semibold">New project</h2>
        <p className="mt-1 text-sm text-muted-foreground">Give it a name. You can change everything later.</p>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            if (!name.trim()) return;
            onCreate({ name: name.trim(), type, description: description.trim() || undefined });
          }}
          className="mt-5 space-y-3"
        >
          <div>
            <label className="text-xs font-medium text-muted-foreground">Name</label>
            <input
              autoFocus
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="mt-1 w-full rounded-lg border border-border bg-background px-3 py-2.5 text-sm outline-none focus:border-foreground"
              placeholder="My amazing site"
            />
          </div>
          <div>
            <label className="text-xs font-medium text-muted-foreground">Type</label>
            <select
              value={type}
              onChange={(e) => setType(e.target.value as any)}
              className="mt-1 w-full rounded-lg border border-border bg-background px-3 py-2.5 text-sm outline-none focus:border-foreground"
            >
              <option value="website">Website</option>
              <option value="store">Online store</option>
              <option value="portfolio">Portfolio</option>
              <option value="landing">Landing page</option>
              <option value="app">App / SaaS</option>
              <option value="blog">Blog</option>
            </select>
          </div>
          <div>
            <label className="text-xs font-medium text-muted-foreground">Description (optional)</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={3}
              className="mt-1 w-full rounded-lg border border-border bg-background px-3 py-2.5 text-sm outline-none focus:border-foreground"
              placeholder="What is this site about?"
            />
          </div>
          <div className="flex justify-end gap-2 pt-2">
            <button type="button" onClick={onClose} className="rounded-lg border border-border px-3 py-2 text-sm font-medium hover:bg-secondary">
              Cancel
            </button>
            <button
              type="submit"
              disabled={submitting}
              className="inline-flex items-center gap-2 rounded-lg bg-foreground px-4 py-2 text-sm font-semibold text-background disabled:opacity-60"
            >
              {submitting ? <Loader2 className="h-4 w-4 animate-spin" /> : <TrendingUp className="h-4 w-4" />}
              Create
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
