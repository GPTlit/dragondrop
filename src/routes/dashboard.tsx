import { createFileRoute, Link } from "@tanstack/react-router";
import {
  LayoutDashboard, Globe, ShoppingBag, Smartphone, Users, CreditCard,
  Database, Sparkles, FolderOpen, Settings, Bell, Search, Plus, MoreHorizontal,
  TrendingUp, DollarSign, Eye, Package,
} from "lucide-react";
import { Logo } from "@/components/site/Logo";

export const Route = createFileRoute("/dashboard")({
  head: () => ({
    meta: [
      { title: "Dashboard — DRAG-N-DROP" },
      { name: "description", content: "Manage projects, websites, stores, apps and team from one beautiful workspace." },
      { property: "og:title", content: "Dashboard — DRAG-N-DROP" },
      { property: "og:description", content: "Your control center for every project." },
    ],
  }),
  component: DashboardPage,
});

function DashboardPage() {
  return (
    <div className="min-h-screen bg-surface">
      <Sidebar />
      <div className="lg:pl-64">
        <Topbar />
        <main className="px-6 py-8">
          <div className="mx-auto max-w-7xl space-y-8">
            <Header />
            <Stats />
            <div className="grid gap-6 lg:grid-cols-3">
              <RevenueChart />
              <TrafficSources />
            </div>
            <Projects />
            <div className="grid gap-6 lg:grid-cols-2">
              <RecentOrders />
              <TeamActivity />
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

const NAV = [
  { icon: LayoutDashboard, label: "Overview", active: true },
  { icon: FolderOpen, label: "Projects", badge: "12" },
  { icon: Globe, label: "Websites" },
  { icon: ShoppingBag, label: "Stores" },
  { icon: Smartphone, label: "Apps" },
  { icon: TrendingUp, label: "Analytics" },
  { icon: DollarSign, label: "Earnings" },
  { icon: Users, label: "Team" },
  { icon: Globe, label: "Domains" },
  { icon: Database, label: "Storage" },
  { icon: CreditCard, label: "Billing" },
  { icon: Sparkles, label: "AI Credits", badge: "1.8k" },
];

function Sidebar() {
  return (
    <aside className="fixed inset-y-0 left-0 z-30 hidden w-64 border-r border-border bg-background lg:flex lg:flex-col">
      <div className="border-b border-border p-5">
        <Link to="/"><Logo /></Link>
      </div>
      <div className="border-b border-border p-3">
        <button className="flex w-full items-center justify-between rounded-lg border border-border bg-surface px-3 py-2 text-left text-sm hover:bg-secondary">
          <div className="flex items-center gap-2">
            <div className="flex h-6 w-6 items-center justify-center rounded bg-foreground font-display text-[10px] font-semibold text-background">A</div>
            <span className="font-medium">Aurelia Studio</span>
          </div>
          <MoreHorizontal className="h-4 w-4 text-muted-foreground" />
        </button>
      </div>
      <nav className="flex-1 overflow-y-auto p-3">
        {NAV.map((n) => (
          <button
            key={n.label}
            className={`flex w-full items-center justify-between rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
              n.active ? "bg-accent text-accent-foreground" : "text-muted-foreground hover:bg-secondary hover:text-foreground"
            }`}
          >
            <span className="flex items-center gap-2.5">
              <n.icon className="h-4 w-4" />
              {n.label}
            </span>
            {n.badge && (
              <span className="rounded-full bg-background px-2 py-0.5 text-[10px] font-semibold text-muted-foreground">
                {n.badge}
              </span>
            )}
          </button>
        ))}
      </nav>
      <div className="border-t border-border p-3">
        <div className="rounded-xl bg-foreground p-4 text-background">
          <p className="font-display text-sm font-semibold">Upgrade to Business</p>
          <p className="mt-1 text-xs text-background/70">SSO, white-label, 20k AI credits.</p>
          <button className="mt-3 w-full rounded-md bg-background px-3 py-1.5 text-xs font-semibold text-foreground">
            Upgrade
          </button>
        </div>
      </div>
    </aside>
  );
}

function Topbar() {
  return (
    <header className="sticky top-0 z-20 border-b border-border bg-background/85 backdrop-blur-xl">
      <div className="flex items-center justify-between px-6 py-3">
        <div className="flex items-center gap-2 rounded-lg border border-border bg-surface px-3 py-1.5 text-sm w-full max-w-md">
          <Search className="h-4 w-4 text-muted-foreground" />
          <input placeholder="Search projects, customers, pages…" className="flex-1 bg-transparent outline-none placeholder:text-muted-foreground" />
          <kbd className="rounded border border-border bg-background px-1.5 py-0.5 text-[10px] font-mono text-muted-foreground">⌘K</kbd>
        </div>
        <div className="flex items-center gap-2">
          <button className="rounded-lg border border-border p-2 hover:bg-secondary">
            <Bell className="h-4 w-4" />
          </button>
          <button className="rounded-lg border border-border p-2 hover:bg-secondary">
            <Settings className="h-4 w-4" />
          </button>
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary font-display text-xs font-semibold text-primary-foreground">
            MP
          </div>
        </div>
      </div>
    </header>
  );
}

function Header() {
  return (
    <div className="flex flex-wrap items-end justify-between gap-4">
      <div>
        <p className="text-sm text-muted-foreground">Good morning, Maya</p>
        <h1 className="mt-1 font-display text-3xl font-semibold tracking-tight">Here's what's happening today.</h1>
      </div>
      <Link to="/builder" className="inline-flex items-center gap-2 rounded-full bg-foreground px-4 py-2.5 text-sm font-semibold text-background">
        <Plus className="h-4 w-4" /> New project
      </Link>
    </div>
  );
}

function Stats() {
  const stats = [
    { label: "Total visitors", value: "284,392", change: "+12.4%", icon: Eye, positive: true },
    { label: "Revenue", value: "$48,219", change: "+8.1%", icon: DollarSign, positive: true },
    { label: "Orders", value: "1,284", change: "+24.0%", icon: Package, positive: true },
    { label: "Conversion", value: "3.84%", change: "−0.3%", icon: TrendingUp, positive: false },
  ];
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {stats.map((s) => (
        <div key={s.label} className="rounded-2xl border border-border bg-background p-5">
          <div className="flex items-start justify-between">
            <span className="text-sm text-muted-foreground">{s.label}</span>
            <s.icon className="h-4 w-4 text-muted-foreground" />
          </div>
          <p className="mt-3 font-display text-3xl font-semibold tracking-tight">{s.value}</p>
          <p className={`mt-1 text-xs font-medium ${s.positive ? "text-success" : "text-destructive"}`}>{s.change} vs last 7d</p>
        </div>
      ))}
    </div>
  );
}

function RevenueChart() {
  const data = [42, 38, 55, 48, 70, 65, 82, 78, 90, 86, 110, 95, 120, 108];
  const max = Math.max(...data);
  return (
    <div className="rounded-2xl border border-border bg-background p-6 lg:col-span-2">
      <div className="flex items-end justify-between">
        <div>
          <p className="text-sm text-muted-foreground">Revenue</p>
          <p className="mt-1 font-display text-2xl font-semibold tracking-tight">$48,219</p>
        </div>
        <div className="flex gap-1 text-xs">
          {["7d", "30d", "90d", "1y"].map((r, i) => (
            <button key={r} className={`rounded-md px-2.5 py-1 ${i === 1 ? "bg-foreground text-background" : "text-muted-foreground hover:bg-secondary"}`}>{r}</button>
          ))}
        </div>
      </div>
      <div className="mt-8 flex h-48 items-end gap-2">
        {data.map((v, i) => (
          <div key={i} className="group flex-1">
            <div
              className="w-full rounded-t-md bg-gradient-to-t from-primary/30 to-primary transition-all hover:from-primary/50 hover:to-primary"
              style={{ height: `${(v / max) * 100}%` }}
            />
          </div>
        ))}
      </div>
      <div className="mt-3 flex justify-between text-[10px] text-muted-foreground">
        <span>Apr 1</span><span>Apr 7</span><span>Apr 14</span>
      </div>
    </div>
  );
}

function TrafficSources() {
  const sources = [
    { name: "Direct", pct: 42, color: "#2563EB" },
    { name: "Organic search", pct: 28, color: "#10B981" },
    { name: "Social", pct: 18, color: "#F59E0B" },
    { name: "Referral", pct: 12, color: "#6B7280" },
  ];
  return (
    <div className="rounded-2xl border border-border bg-background p-6">
      <p className="text-sm text-muted-foreground">Traffic sources</p>
      <div className="mt-6 flex items-center justify-center">
        <div className="relative h-32 w-32">
          <svg viewBox="0 0 36 36" className="h-32 w-32 -rotate-90">
            {(() => {
              let offset = 0;
              return sources.map((s) => {
                const dash = `${s.pct} ${100 - s.pct}`;
                const el = (
                  <circle
                    key={s.name}
                    cx="18" cy="18" r="15.9"
                    fill="none" strokeWidth="4"
                    stroke={s.color}
                    strokeDasharray={dash}
                    strokeDashoffset={-offset}
                    pathLength={100}
                  />
                );
                offset += s.pct;
                return el;
              });
            })()}
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className="font-display text-2xl font-semibold">284k</span>
            <span className="text-[10px] text-muted-foreground">visitors</span>
          </div>
        </div>
      </div>
      <div className="mt-5 space-y-2">
        {sources.map((s) => (
          <div key={s.name} className="flex items-center justify-between text-sm">
            <span className="flex items-center gap-2">
              <span className="h-2 w-2 rounded-full" style={{ background: s.color }} />
              {s.name}
            </span>
            <span className="font-medium">{s.pct}%</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function Projects() {
  const projects = [
    { name: "Aurelia Store", type: "Ecommerce", status: "Published", domain: "aurelia.shop", visits: "84k", color: "#F59E0B" },
    { name: "Olive & Oak", type: "Restaurant", status: "Published", domain: "oliveandoak.co", visits: "12k", color: "#10B981" },
    { name: "Atelier Folio", type: "Portfolio", status: "Draft", domain: "—", visits: "—", color: "#6B7280" },
    { name: "Nimbus App", type: "Mobile app", status: "Published", domain: "nimbus.app", visits: "36k", color: "#2563EB" },
    { name: "Lumen Agency", type: "Agency", status: "Published", domain: "lumen.studio", visits: "9.2k", color: "#1C1C1C" },
  ];
  return (
    <div className="rounded-2xl border border-border bg-background">
      <div className="flex items-center justify-between border-b border-border p-5">
        <div>
          <p className="font-display text-lg font-semibold">Projects</p>
          <p className="text-xs text-muted-foreground">12 active · 4 published this month</p>
        </div>
        <Link to="/builder" className="inline-flex items-center gap-1 rounded-lg border border-border px-3 py-1.5 text-xs font-medium hover:bg-secondary">
          <Plus className="h-3 w-3" /> New project
        </Link>
      </div>
      <div className="divide-y divide-border">
        {projects.map((p) => (
          <div key={p.name} className="flex items-center gap-4 p-5 transition-colors hover:bg-surface">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg font-display text-sm font-semibold text-white" style={{ background: p.color }}>
              {p.name[0]}
            </div>
            <div className="flex-1 min-w-0">
              <p className="font-medium">{p.name}</p>
              <p className="text-xs text-muted-foreground">{p.type} · {p.domain}</p>
            </div>
            <div className="hidden text-right sm:block">
              <p className="text-sm font-medium">{p.visits}</p>
              <p className="text-xs text-muted-foreground">visitors / 30d</p>
            </div>
            <span className={`rounded-full px-2.5 py-1 text-[10px] font-semibold ${
              p.status === "Published" ? "bg-success/10 text-success" : "bg-secondary text-muted-foreground"
            }`}>
              {p.status}
            </span>
            <button className="rounded-lg p-2 hover:bg-secondary"><MoreHorizontal className="h-4 w-4 text-muted-foreground" /></button>
          </div>
        ))}
      </div>
    </div>
  );
}

function RecentOrders() {
  const orders = [
    { id: "#10284", customer: "Elena Ruiz", total: "$248.00", status: "Paid" },
    { id: "#10283", customer: "Mark Liu", total: "$72.00", status: "Paid" },
    { id: "#10282", customer: "Aisha Khan", total: "$496.00", status: "Refunded" },
    { id: "#10281", customer: "Tom Becker", total: "$129.00", status: "Paid" },
    { id: "#10280", customer: "Yuki Tanaka", total: "$84.00", status: "Pending" },
  ];
  return (
    <div className="rounded-2xl border border-border bg-background">
      <div className="flex items-center justify-between border-b border-border p-5">
        <p className="font-display text-lg font-semibold">Recent orders</p>
        <button className="text-xs font-medium text-muted-foreground hover:text-foreground">View all</button>
      </div>
      <div className="divide-y divide-border">
        {orders.map((o) => (
          <div key={o.id} className="flex items-center justify-between gap-3 p-4 text-sm">
            <div>
              <p className="font-medium">{o.customer}</p>
              <p className="text-xs text-muted-foreground font-mono">{o.id}</p>
            </div>
            <p className="font-semibold">{o.total}</p>
            <span className={`rounded-full px-2 py-0.5 text-[10px] font-semibold ${
              o.status === "Paid" ? "bg-success/10 text-success" :
              o.status === "Refunded" ? "bg-destructive/10 text-destructive" :
              "bg-warning/15 text-warning-foreground"
            }`}>
              {o.status}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

function TeamActivity() {
  const acts = [
    { who: "Daniel", what: "published", target: "Aurelia / Homepage v3", time: "2m ago", color: "#2563EB" },
    { who: "Sofia", what: "commented on", target: "Pricing section", time: "18m ago", color: "#F59E0B" },
    { who: "AI", what: "generated", target: "Blog post: Autumn drop", time: "1h ago", color: "#10B981" },
    { who: "Maya", what: "invited", target: "theo@quanta.io as Editor", time: "3h ago", color: "#1C1C1C" },
    { who: "Daniel", what: "exported", target: "Nimbus app → Flutter", time: "5h ago", color: "#2563EB" },
  ];
  return (
    <div className="rounded-2xl border border-border bg-background">
      <div className="flex items-center justify-between border-b border-border p-5">
        <p className="font-display text-lg font-semibold">Team activity</p>
        <button className="text-xs font-medium text-muted-foreground hover:text-foreground">Open log</button>
      </div>
      <div className="divide-y divide-border">
        {acts.map((a, i) => (
          <div key={i} className="flex items-center gap-3 p-4 text-sm">
            <div className="flex h-8 w-8 items-center justify-center rounded-full font-display text-xs font-semibold text-white" style={{ background: a.color }}>
              {a.who[0]}
            </div>
            <p className="flex-1">
              <span className="font-medium">{a.who}</span>{" "}
              <span className="text-muted-foreground">{a.what}</span>{" "}
              <span className="font-medium">{a.target}</span>
            </p>
            <span className="text-xs text-muted-foreground">{a.time}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
