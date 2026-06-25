import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { ArrowRight, Eye, EyeOff } from "lucide-react";
import { Logo } from "@/components/site/Logo";

export const Route = createFileRoute("/login")({
  head: () => ({
    meta: [
      { title: "Sign in — DRAG-N-DROP" },
      { name: "description", content: "Sign in to your DRAG-N-DROP workspace." },
    ],
  }),
  component: LoginPage,
});

function LoginPage() {
  return <AuthForm mode="signin" />;
}

export function AuthForm({ mode }: { mode: "signin" | "signup" }) {
  const [show, setShow] = useState(false);
  const isSignup = mode === "signup";
  return (
    <div className="grid min-h-screen lg:grid-cols-2">
      <div className="flex flex-col p-6 sm:p-10">
        <Link to="/"><Logo /></Link>
        <div className="mx-auto flex w-full max-w-sm flex-1 flex-col justify-center">
          <h1 className="font-display text-3xl font-semibold tracking-tight sm:text-4xl">
            {isSignup ? "Create your account" : "Welcome back"}
          </h1>
          <p className="mt-2 text-sm text-muted-foreground">
            {isSignup ? "Start building free. No credit card required." : "Sign in to continue building."}
          </p>

          <div className="mt-7 grid gap-2">
            {[
              ["Google", "#4285F4"],
              ["Apple", "#1C1C1C"],
              ["GitHub", "#24292e"],
              ["Facebook", "#1877F2"],
            ].map(([name, color]) => (
              <button
                key={name as string}
                className="flex items-center justify-center gap-2 rounded-lg border border-border bg-background px-4 py-2.5 text-sm font-medium hover:bg-secondary"
              >
                <span className="inline-block h-4 w-4 rounded-full" style={{ background: color as string }} />
                Continue with {name as string}
              </button>
            ))}
          </div>

          <div className="my-6 flex items-center gap-3 text-xs text-muted-foreground">
            <div className="h-px flex-1 bg-border" /> or <div className="h-px flex-1 bg-border" />
          </div>

          <form className="space-y-3" onSubmit={(e) => e.preventDefault()}>
            {isSignup && (
              <div>
                <label className="text-xs font-medium text-muted-foreground">Full name</label>
                <input
                  type="text"
                  placeholder="Maya Patel"
                  className="mt-1 w-full rounded-lg border border-border bg-background px-3 py-2.5 text-sm outline-none focus:border-foreground"
                />
              </div>
            )}
            <div>
              <label className="text-xs font-medium text-muted-foreground">Email</label>
              <input
                type="email"
                placeholder="you@company.com"
                className="mt-1 w-full rounded-lg border border-border bg-background px-3 py-2.5 text-sm outline-none focus:border-foreground"
              />
            </div>
            <div>
              <label className="text-xs font-medium text-muted-foreground">Password</label>
              <div className="relative mt-1">
                <input
                  type={show ? "text" : "password"}
                  placeholder="•••••••••"
                  className="w-full rounded-lg border border-border bg-background px-3 py-2.5 pr-9 text-sm outline-none focus:border-foreground"
                />
                <button
                  type="button"
                  onClick={() => setShow((v) => !v)}
                  className="absolute right-2 top-1/2 -translate-y-1/2 rounded p-1 text-muted-foreground hover:bg-secondary"
                >
                  {show ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
            </div>
            <button
              type="submit"
              className="inline-flex w-full items-center justify-center gap-2 rounded-lg bg-foreground px-4 py-2.5 text-sm font-semibold text-background hover:opacity-90"
            >
              {isSignup ? "Create account" : "Sign in"} <ArrowRight className="h-4 w-4" />
            </button>
          </form>

          <p className="mt-6 text-center text-xs text-muted-foreground">
            {isSignup ? (
              <>Already have an account? <Link to="/login" className="font-medium text-foreground hover:underline">Sign in</Link></>
            ) : (
              <>Don't have an account? <Link to="/signup" className="font-medium text-foreground hover:underline">Start free</Link></>
            )}
          </p>
        </div>
        <p className="text-center text-xs text-muted-foreground">
          By continuing, you agree to our Terms and Privacy Policy.
        </p>
      </div>

      <div
        className="relative hidden overflow-hidden lg:block"
        style={{ background: "linear-gradient(135deg, #0a0a0c 0%, #111114 100%)" }}
      >
        <div className="absolute inset-0 opacity-40" style={{ background: "var(--gradient-aurora)" }} />
        <div className="relative flex h-full flex-col justify-between p-12 text-background">
          <div />
          <div>
            <p className="font-display text-4xl font-semibold leading-tight tracking-tight">
              "We replaced Shopify, Webflow and Mailchimp with DRAG-N-DROP. Saved $1,400/mo and ship 4x faster."
            </p>
            <div className="mt-6 flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-success font-display text-sm font-semibold text-white">MP</div>
              <div>
                <p className="text-sm font-semibold">Maya Patel</p>
                <p className="text-xs text-background/60">Founder, Olive & Oak</p>
              </div>
            </div>
          </div>
          <div className="flex gap-1 text-xs text-background/40">
            <span>SOC 2 · GDPR · ISO 27001</span>
          </div>
        </div>
      </div>
    </div>
  );
}
