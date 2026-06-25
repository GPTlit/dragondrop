import { Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { Logo } from "./Logo";

const NAV = [
  { to: "/features", label: "Features" },
  { to: "/templates", label: "Templates" },
  { to: "/builder", label: "Builder" },
  { to: "/dashboard", label: "Dashboard" },
  { to: "/pricing", label: "Pricing" },
] as const;

export function SiteNav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled ? "py-2" : "py-4"
      }`}
    >
      <div className="mx-auto max-w-7xl px-4">
        <div
          className={`flex items-center justify-between rounded-2xl border px-4 py-2.5 transition-all ${
            scrolled
              ? "border-border/80 bg-background/80 shadow-[var(--shadow-sm)] backdrop-blur-xl"
              : "border-transparent bg-transparent"
          }`}
        >
          <Link to="/" className="shrink-0">
            <Logo />
          </Link>

          <nav className="hidden items-center gap-1 md:flex">
            {NAV.map((item) => (
              <Link
                key={item.to}
                to={item.to}
                activeProps={{ className: "text-foreground bg-secondary" }}
                inactiveProps={{ className: "text-muted-foreground hover:text-foreground hover:bg-secondary/60" }}
                className="rounded-lg px-3 py-1.5 text-sm font-medium transition-colors"
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="hidden items-center gap-2 md:flex">
            <Link
              to="/login"
              className="rounded-lg px-3 py-1.5 text-sm font-medium text-muted-foreground hover:text-foreground"
            >
              Sign in
            </Link>
            <Link
              to="/signup"
              className="group inline-flex items-center gap-1.5 rounded-lg bg-foreground px-4 py-2 text-sm font-medium text-background transition-all hover:bg-foreground/90"
            >
              Start free
              <span className="transition-transform group-hover:translate-x-0.5">→</span>
            </Link>
          </div>

          <button
            className="rounded-lg p-2 md:hidden"
            onClick={() => setOpen((v) => !v)}
            aria-label="Toggle menu"
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>

        {open && (
          <div className="mt-2 rounded-2xl border border-border bg-background p-3 shadow-[var(--shadow-md)] md:hidden">
            <div className="flex flex-col gap-1">
              {NAV.map((item) => (
                <Link
                  key={item.to}
                  to={item.to}
                  onClick={() => setOpen(false)}
                  className="rounded-lg px-3 py-2 text-sm font-medium text-foreground hover:bg-secondary"
                >
                  {item.label}
                </Link>
              ))}
              <div className="my-2 h-px bg-border" />
              <Link
                to="/login"
                onClick={() => setOpen(false)}
                className="rounded-lg px-3 py-2 text-sm font-medium text-muted-foreground hover:bg-secondary"
              >
                Sign in
              </Link>
              <Link
                to="/signup"
                onClick={() => setOpen(false)}
                className="rounded-lg bg-foreground px-3 py-2 text-center text-sm font-medium text-background"
              >
                Start free
              </Link>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
