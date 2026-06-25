import { Link } from "@tanstack/react-router";
import { Logo } from "./Logo";

const COLS = [
  {
    title: "Product",
    links: [
      ["Website builder", "/builder"],
      ["App builder", "/builder"],
      ["Online store", "/features"],
      ["AI generator", "/features"],
      ["Templates", "/templates"],
      ["Dashboard", "/dashboard"],
    ],
  },
  {
    title: "Solutions",
    links: [
      ["Ecommerce", "/templates"],
      ["Restaurants", "/templates"],
      ["Agencies", "/templates"],
      ["Real estate", "/templates"],
      ["Portfolios", "/templates"],
      ["SaaS", "/templates"],
    ],
  },
  {
    title: "Resources",
    links: [
      ["Pricing", "/pricing"],
      ["Features", "/features"],
      ["Changelog", "/features"],
      ["Help center", "/features"],
      ["Community", "/features"],
      ["API docs", "/features"],
    ],
  },
  {
    title: "Company",
    links: [
      ["About", "/features"],
      ["Customers", "/features"],
      ["Careers", "/features"],
      ["Contact", "/features"],
      ["Privacy", "/features"],
      ["Terms", "/features"],
    ],
  },
] as const;

export function SiteFooter() {
  return (
    <footer className="border-t border-border bg-surface">
      <div className="mx-auto max-w-7xl px-4 py-16">
        <div className="grid gap-10 lg:grid-cols-[1.4fr_repeat(4,1fr)]">
          <div className="max-w-sm">
            <Logo />
            <p className="mt-4 text-sm text-muted-foreground">
              The visual platform to build, launch, and grow your entire business online. Drag, drop, done.
            </p>
            <div className="mt-6 flex items-center gap-2">
              <span className="inline-flex h-2 w-2 animate-pulse rounded-full bg-success" />
              <span className="text-xs font-medium text-muted-foreground">
                All systems operational · 99.99% uptime
              </span>
            </div>
          </div>
          {COLS.map((col) => (
            <div key={col.title}>
              <h4 className="font-display text-sm font-semibold text-foreground">{col.title}</h4>
              <ul className="mt-4 space-y-3">
                {col.links.map(([label, to]) => (
                  <li key={label}>
                    <Link
                      to={to as string}
                      className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                    >
                      {label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 flex flex-col items-start justify-between gap-4 border-t border-border pt-6 text-xs text-muted-foreground sm:flex-row sm:items-center">
          <p>© {new Date().getFullYear()} DRAG-N-DROP, Inc. Built with itself.</p>
          <div className="flex items-center gap-4">
            <span>SOC 2 Type II</span>
            <span className="h-1 w-1 rounded-full bg-border" />
            <span>GDPR ready</span>
            <span className="h-1 w-1 rounded-full bg-border" />
            <span>ISO 27001</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
