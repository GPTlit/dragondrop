import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import {
  Type as TypeIcon, Square, Image as ImageIcon, MousePointer2, Layout,
  ShoppingBag, Video, Map as MapIcon, Star, FormInput, ChevronLeft, Eye,
  Undo2, Redo2, Save, Upload, Sparkles, Monitor, Tablet, Smartphone,
  Layers, Settings as SettingsIcon, Plus, GripVertical,
} from "lucide-react";
import { Logo } from "@/components/site/Logo";

export const Route = createFileRoute("/builder")({
  head: () => ({
    meta: [
      { title: "Visual Builder — DRAG-N-DROP" },
      { name: "description", content: "The most precise drag-and-drop builder. Real flex, grid and absolute layouts, edited visually." },
      { property: "og:title", content: "Visual Builder — DRAG-N-DROP" },
      { property: "og:description", content: "Drag, drop, ship. Real responsive design, no code." },
    ],
  }),
  component: BuilderPage,
});

const ELEMENTS = [
  { icon: TypeIcon, label: "Heading" },
  { icon: TypeIcon, label: "Text" },
  { icon: MousePointer2, label: "Button" },
  { icon: ImageIcon, label: "Image" },
  { icon: Video, label: "Video" },
  { icon: Square, label: "Container" },
  { icon: Layout, label: "Section" },
  { icon: FormInput, label: "Form" },
  { icon: ShoppingBag, label: "Product" },
  { icon: MapIcon, label: "Map" },
  { icon: Star, label: "Rating" },
];

const DEVICES = [
  { icon: Monitor, label: "Desktop", w: 1280 },
  { icon: Tablet, label: "Tablet", w: 820 },
  { icon: Smartphone, label: "Mobile", w: 390 },
];

function BuilderPage() {
  const [device, setDevice] = useState(DEVICES[0]);
  const [tab, setTab] = useState<"elements" | "layers">("elements");
  const [selected, setSelected] = useState("Hero");

  return (
    <div className="flex h-screen flex-col overflow-hidden bg-surface text-foreground">
      <TopBar device={device} setDevice={setDevice} />
      <div className="flex flex-1 overflow-hidden">
        <LeftPanel tab={tab} setTab={setTab} selected={selected} setSelected={setSelected} />
        <Canvas device={device} selected={selected} setSelected={setSelected} />
        <RightPanel selected={selected} />
      </div>
    </div>
  );
}

function TopBar({ device, setDevice }: { device: typeof DEVICES[number]; setDevice: (d: typeof DEVICES[number]) => void }) {
  return (
    <header className="flex h-14 shrink-0 items-center justify-between border-b border-border bg-background px-4">
      <div className="flex items-center gap-3">
        <Link to="/dashboard" className="rounded-md p-1.5 hover:bg-secondary">
          <ChevronLeft className="h-4 w-4" />
        </Link>
        <Logo className="hidden sm:flex" />
        <div className="mx-2 h-5 w-px bg-border" />
        <div className="flex items-center gap-2">
          <div className="h-2 w-2 rounded-full bg-success animate-pulse" />
          <span className="text-sm font-medium">Aurelia Store</span>
          <span className="rounded-md bg-secondary px-1.5 py-0.5 text-[10px] font-medium text-muted-foreground">Draft</span>
        </div>
      </div>

      <div className="flex items-center gap-1 rounded-lg border border-border bg-surface p-0.5">
        {DEVICES.map((d) => (
          <button
            key={d.label}
            onClick={() => setDevice(d)}
            className={`flex items-center gap-1.5 rounded-md px-2.5 py-1.5 text-xs font-medium ${
              device.label === d.label ? "bg-background text-foreground shadow-[var(--shadow-xs)]" : "text-muted-foreground hover:text-foreground"
            }`}
          >
            <d.icon className="h-3.5 w-3.5" />
            {d.label}
          </button>
        ))}
      </div>

      <div className="flex items-center gap-1">
        <button className="rounded-md p-2 hover:bg-secondary" title="Undo"><Undo2 className="h-4 w-4" /></button>
        <button className="rounded-md p-2 hover:bg-secondary" title="Redo"><Redo2 className="h-4 w-4" /></button>
        <div className="mx-1 h-5 w-px bg-border" />
        <button className="inline-flex items-center gap-1.5 rounded-md border border-border bg-background px-3 py-1.5 text-xs font-medium hover:bg-secondary">
          <Sparkles className="h-3.5 w-3.5 text-primary" /> AI edit
        </button>
        <button className="inline-flex items-center gap-1.5 rounded-md border border-border bg-background px-3 py-1.5 text-xs font-medium hover:bg-secondary">
          <Save className="h-3.5 w-3.5" /> Save
        </button>
        <button className="inline-flex items-center gap-1.5 rounded-md border border-border bg-background px-3 py-1.5 text-xs font-medium hover:bg-secondary">
          <Eye className="h-3.5 w-3.5" /> Preview
        </button>
        <button className="inline-flex items-center gap-1.5 rounded-md bg-primary px-3 py-1.5 text-xs font-semibold text-primary-foreground hover:opacity-90">
          <Upload className="h-3.5 w-3.5" /> Publish
        </button>
      </div>
    </header>
  );
}

function LeftPanel({
  tab, setTab, selected, setSelected,
}: { tab: "elements" | "layers"; setTab: (t: "elements" | "layers") => void; selected: string; setSelected: (s: string) => void }) {
  return (
    <aside className="hidden w-64 shrink-0 flex-col border-r border-border bg-background md:flex">
      <div className="flex border-b border-border p-1.5">
        {(["elements", "layers"] as const).map((t) => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={`flex-1 rounded-md px-3 py-1.5 text-xs font-medium capitalize transition-colors ${
              tab === t ? "bg-secondary text-foreground" : "text-muted-foreground hover:bg-secondary/50"
            }`}
          >
            {t === "elements" ? <span className="inline-flex items-center gap-1.5"><Plus className="h-3 w-3" /> Elements</span> :
              <span className="inline-flex items-center gap-1.5"><Layers className="h-3 w-3" /> Layers</span>}
          </button>
        ))}
      </div>
      {tab === "elements" ? (
        <div className="flex-1 overflow-y-auto p-3">
          <p className="px-1 text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">Basic</p>
          <div className="mt-2 grid grid-cols-2 gap-2">
            {ELEMENTS.map((e) => (
              <button
                key={e.label}
                className="flex cursor-grab flex-col items-center gap-1.5 rounded-lg border border-border bg-surface p-3 text-[11px] font-medium text-muted-foreground transition-all hover:border-primary hover:bg-accent hover:text-primary"
              >
                <e.icon className="h-4 w-4" />
                {e.label}
              </button>
            ))}
          </div>
          <p className="mt-5 px-1 text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">Sections</p>
          <div className="mt-2 space-y-1.5">
            {["Hero", "Features grid", "Pricing", "Testimonials", "FAQ", "Newsletter", "Footer"].map((s) => (
              <button key={s} className="flex w-full items-center gap-2 rounded-md border border-border bg-surface px-3 py-2 text-xs font-medium hover:border-primary hover:text-primary">
                <Layout className="h-3.5 w-3.5" /> {s}
              </button>
            ))}
          </div>
        </div>
      ) : (
        <div className="flex-1 overflow-y-auto p-2 text-sm">
          <Tree selected={selected} onSelect={setSelected} />
        </div>
      )}
    </aside>
  );
}

const TREE = [
  { name: "Page", depth: 0, children: [
    { name: "Header", depth: 1, children: [
      { name: "Logo", depth: 2 },
      { name: "Nav", depth: 2 },
      { name: "Cart icon", depth: 2 },
    ]},
    { name: "Hero", depth: 1, children: [
      { name: "Heading", depth: 2 },
      { name: "Subtext", depth: 2 },
      { name: "CTA Button", depth: 2 },
      { name: "Hero image", depth: 2 },
    ]},
    { name: "Product grid", depth: 1 },
    { name: "Testimonials", depth: 1 },
    { name: "Footer", depth: 1 },
  ]},
];

type Node = { name: string; depth: number; children?: Node[] };

function Tree({ selected, onSelect }: { selected: string; onSelect: (s: string) => void }) {
  const render = (nodes: Node[]) =>
    nodes.map((n) => (
      <div key={n.name}>
        <button
          onClick={() => onSelect(n.name)}
          className={`flex w-full items-center gap-1.5 rounded-md px-2 py-1.5 text-left text-xs ${
            selected === n.name ? "bg-accent text-accent-foreground font-medium" : "text-muted-foreground hover:bg-secondary"
          }`}
          style={{ paddingLeft: `${n.depth * 12 + 8}px` }}
        >
          <GripVertical className="h-3 w-3 opacity-40" /> {n.name}
        </button>
        {n.children && render(n.children)}
      </div>
    ));
  return <>{render(TREE)}</>;
}

function Canvas({
  device, selected, setSelected,
}: { device: typeof DEVICES[number]; selected: string; setSelected: (s: string) => void }) {
  return (
    <div className="relative flex-1 overflow-auto dot-bg p-8">
      <div className="mx-auto transition-all" style={{ maxWidth: device.w }}>
        <div className="overflow-hidden rounded-2xl border border-border bg-background shadow-[var(--shadow-xl)]">
          {/* Header */}
          <div
            className={`flex items-center justify-between border-b border-border px-6 py-4 transition-all cursor-pointer ${selected === "Header" ? "ring-2 ring-primary ring-offset-2 ring-offset-surface" : ""}`}
            onClick={() => setSelected("Header")}
          >
            <span className="font-display text-lg font-semibold">Aurelia</span>
            <nav className="flex gap-5 text-sm text-muted-foreground">
              <span>Shop</span><span>Stories</span><span>About</span>
            </nav>
            <button className="rounded-full bg-foreground px-3 py-1.5 text-xs font-semibold text-background">Cart · 2</button>
          </div>

          {/* Hero */}
          <div
            className={`relative px-10 py-16 cursor-pointer transition-all ${selected === "Hero" ? "ring-2 ring-primary" : ""}`}
            onClick={() => setSelected("Hero")}
            style={{ background: "linear-gradient(135deg, #fef3c7 0%, #fed7aa 100%)" }}
          >
            <span className="rounded-full bg-foreground px-2.5 py-1 text-[10px] font-semibold text-background">NEW DROP</span>
            <h1 className="mt-3 font-display text-5xl font-semibold leading-[1.05] tracking-tight">Autumn collection.<br/>Made to last.</h1>
            <p className="mt-3 max-w-md text-sm text-foreground/70">Hand-finished linens, ceramics and lighting from independent makers.</p>
            <div className="mt-5 flex gap-2">
              <button className="rounded-full bg-foreground px-5 py-2.5 text-xs font-semibold text-background">Shop the collection</button>
              <button className="rounded-full border border-foreground/20 bg-background/60 px-5 py-2.5 text-xs font-semibold backdrop-blur">Watch the film</button>
            </div>
            {selected === "Hero" && (
              <span className="absolute -top-2 left-3 rounded-md bg-primary px-2 py-0.5 text-[10px] font-semibold text-primary-foreground">
                Hero · Section
              </span>
            )}
          </div>

          {/* Products */}
          <div
            className={`px-6 py-10 cursor-pointer ${selected === "Product grid" ? "ring-2 ring-primary" : ""}`}
            onClick={() => setSelected("Product grid")}
          >
            <p className="font-display text-2xl font-semibold">Best sellers</p>
            <div className="mt-5 grid grid-cols-2 gap-4 md:grid-cols-4">
              {[
                ["#fde68a", "Linen tote", "$48"],
                ["#bfdbfe", "Ceramic vase", "$72"],
                ["#fecaca", "Wool throw", "$120"],
                ["#bbf7d0", "Brass lamp", "$210"],
              ].map(([bg, n, p]) => (
                <div key={n} className="overflow-hidden rounded-lg border border-border">
                  <div className="aspect-square w-full" style={{ background: bg }} />
                  <div className="p-3">
                    <p className="text-sm font-medium">{n}</p>
                    <p className="mt-0.5 text-sm font-semibold text-primary">{p}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Footer */}
          <div
            className={`grid grid-cols-3 gap-4 border-t border-border bg-surface px-6 py-8 text-xs text-muted-foreground cursor-pointer ${selected === "Footer" ? "ring-2 ring-primary" : ""}`}
            onClick={() => setSelected("Footer")}
          >
            <div>
              <p className="font-display text-sm font-semibold text-foreground">Aurelia</p>
              <p className="mt-1">© 2026</p>
            </div>
            <div><p className="font-semibold text-foreground">Shop</p><p className="mt-1">All</p><p>New</p></div>
            <div><p className="font-semibold text-foreground">Help</p><p className="mt-1">Returns</p><p>Contact</p></div>
          </div>
        </div>
        <p className="mt-4 text-center text-xs text-muted-foreground">{device.label} · {device.w}px</p>
      </div>
    </div>
  );
}

function RightPanel({ selected }: { selected: string }) {
  return (
    <aside className="hidden w-72 shrink-0 flex-col border-l border-border bg-background xl:flex">
      <div className="border-b border-border p-3">
        <div className="flex items-center gap-2 rounded-md border border-border bg-surface px-2 py-1.5 text-xs">
          <SettingsIcon className="h-3 w-3 text-muted-foreground" />
          <span className="font-medium">{selected}</span>
          <span className="ml-auto rounded bg-secondary px-1.5 py-0.5 font-mono text-[10px] text-muted-foreground">{selected.toLowerCase().replace(/\s/g, "-")}</span>
        </div>
      </div>
      <div className="flex-1 overflow-y-auto p-3 text-xs">
        <Section title="Layout">
          <Row label="Display"><Pill options={["Block", "Flex", "Grid"]} active="Flex" /></Row>
          <Row label="Direction"><Pill options={["Row", "Col"]} active="Col" /></Row>
          <Row label="Gap"><Input val="16" unit="px" /></Row>
          <Row label="Align"><Pill options={["Start", "Center", "End"]} active="Center" /></Row>
        </Section>

        <Section title="Spacing">
          <SpacingBox />
        </Section>

        <Section title="Background">
          <Row label="Type"><Pill options={["Color", "Gradient", "Image"]} active="Gradient" /></Row>
          <div className="flex gap-1">
            {["#1C1C1C", "#FFFFFF", "#2563EB", "#10B981", "#F59E0B", "#E8EAED"].map((c) => (
              <button key={c} className="h-7 w-7 rounded-md border border-border" style={{ background: c }} />
            ))}
          </div>
          <Row label="Opacity"><Slider value={92} /></Row>
        </Section>

        <Section title="Typography">
          <Row label="Font"><select className="rounded-md border border-border bg-background px-2 py-1 text-xs"><option>Outfit</option><option>Inter</option><option>JetBrains</option></select></Row>
          <Row label="Size"><Input val="48" unit="px" /></Row>
          <Row label="Weight"><Pill options={["400", "500", "600", "700"]} active="600" /></Row>
          <Row label="Tracking"><Input val="−0.02" unit="em" /></Row>
        </Section>

        <Section title="Effects">
          <Row label="Radius"><Input val="14" unit="px" /></Row>
          <Row label="Shadow"><Pill options={["None", "Sm", "Md", "Lg"]} active="Md" /></Row>
          <Row label="Blur"><Slider value={0} /></Row>
          <Row label="Border"><Input val="1" unit="px" /></Row>
        </Section>

        <Section title="Interactions">
          <Row label="On click"><select className="rounded-md border border-border bg-background px-2 py-1 text-xs"><option>None</option><option>Navigate</option><option>Open modal</option><option>Trigger AI</option></select></Row>
          <Row label="Hover"><Pill options={["Off", "Scale", "Lift"]} active="Lift" /></Row>
          <Row label="Animation"><Pill options={["None", "Fade", "Slide"]} active="Fade" /></Row>
        </Section>

        <div className="mt-4 rounded-lg border border-dashed border-primary/40 bg-accent p-3 text-[11px] text-accent-foreground">
          <Sparkles className="mb-1 inline h-3 w-3" /> Tip — Ask AI: "make this hero more editorial"
        </div>
      </div>
    </aside>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="mb-4 space-y-2.5 border-b border-border pb-4 last:border-0">
      <p className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">{title}</p>
      {children}
    </div>
  );
}
function Row({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="flex items-center justify-between gap-2">
      <span className="text-muted-foreground">{label}</span>
      <div>{children}</div>
    </div>
  );
}
function Pill({ options, active }: { options: string[]; active: string }) {
  return (
    <div className="inline-flex gap-0.5 rounded-md border border-border bg-surface p-0.5">
      {options.map((o) => (
        <button key={o} className={`rounded px-1.5 py-0.5 text-[10px] ${o === active ? "bg-background text-foreground shadow-[var(--shadow-xs)]" : "text-muted-foreground"}`}>
          {o}
        </button>
      ))}
    </div>
  );
}
function Input({ val, unit }: { val: string; unit?: string }) {
  return (
    <div className="inline-flex items-center gap-1 rounded-md border border-border bg-background px-2 py-1">
      <input defaultValue={val} className="w-10 bg-transparent text-right text-[11px] font-mono outline-none" />
      {unit && <span className="text-[10px] text-muted-foreground">{unit}</span>}
    </div>
  );
}
function Slider({ value }: { value: number }) {
  return (
    <div className="flex w-32 items-center gap-2">
      <div className="relative h-1 flex-1 rounded-full bg-secondary">
        <div className="absolute inset-y-0 left-0 rounded-full bg-foreground" style={{ width: `${value}%` }} />
        <div className="absolute top-1/2 h-3 w-3 -translate-y-1/2 -translate-x-1/2 rounded-full border border-border bg-background shadow-[var(--shadow-sm)]" style={{ left: `${value}%` }} />
      </div>
      <span className="text-[10px] font-mono text-muted-foreground">{value}</span>
    </div>
  );
}
function SpacingBox() {
  return (
    <div className="relative rounded-md border border-dashed border-border bg-surface p-3 font-mono text-[10px] text-muted-foreground">
      <p className="absolute left-1/2 top-0 -translate-x-1/2 -translate-y-1/2 bg-background px-1">24</p>
      <p className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-1/2 bg-background px-1">16</p>
      <p className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 bg-background px-1">16</p>
      <p className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 bg-background px-1">24</p>
      <div className="rounded border border-border bg-background py-3 text-center text-foreground">px</div>
    </div>
  );
}
