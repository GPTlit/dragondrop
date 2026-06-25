import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";
import { useEffect, type ReactNode } from "react";

import "@fontsource-variable/inter";
import "@fontsource-variable/outfit";
import "@fontsource-variable/jetbrains-mono";

import appCss from "../styles.css?url";
import { reportLovableError } from "../lib/lovable-error-reporting";

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <p className="text-sm font-mono uppercase tracking-widest text-muted-foreground">Error 404</p>
        <h1 className="mt-4 font-display text-6xl font-semibold tracking-tight text-foreground">Lost in the canvas</h1>
        <p className="mt-3 text-base text-muted-foreground">
          This element doesn't exist on the page. Drag yourself back home.
        </p>
        <div className="mt-8">
          <Link
            to="/"
            className="inline-flex items-center justify-center rounded-full bg-primary px-6 py-3 text-sm font-medium text-primary-foreground transition-all hover:opacity-90 hover:shadow-[var(--shadow-glow)]"
          >
            Back to home
          </Link>
        </div>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  console.error(error);
  const router = useRouter();
  useEffect(() => {
    reportLovableError(error, { boundary: "tanstack_root_error_component" });
  }, [error]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="font-display text-2xl font-semibold tracking-tight text-foreground">
          Something went off-canvas
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          We hit an unexpected error. Try refreshing or head back home.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-2">
          <button
            onClick={() => {
              router.invalidate();
              reset();
            }}
            className="inline-flex items-center justify-center rounded-full bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground transition-colors hover:opacity-90"
          >
            Try again
          </button>
          <a
            href="/"
            className="inline-flex items-center justify-center rounded-full border border-border bg-background px-5 py-2.5 text-sm font-medium text-foreground transition-colors hover:bg-secondary"
          >
            Go home
          </a>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "DRAG-N-DROP — Build websites, stores & apps without code" },
      {
        name: "description",
        content:
          "DRAG-N-DROP is the AI-powered no-code platform to build websites, online stores, landing pages and mobile app UIs visually. Ship in minutes, scale to enterprise.",
      },
      { name: "author", content: "DRAG-N-DROP" },
      { property: "og:title", content: "DRAG-N-DROP — Build websites, stores & apps without code" },
      {
        property: "og:description",
        content: "Drag, drop, ship. The all-in-one platform to build websites, stores and apps without code.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:site", content: "@dragndrop" },
      { name: "twitter:title", content: "DRAG-N-DROP — Build websites, stores & apps without code" },
      { name: "description", content: "DRAG-N-DROP is an AI-powered platform for creating websites, apps, and online stores without code." },
      { property: "og:description", content: "DRAG-N-DROP is an AI-powered platform for creating websites, apps, and online stores without code." },
      { name: "twitter:description", content: "DRAG-N-DROP is an AI-powered platform for creating websites, apps, and online stores without code." },
      { property: "og:image", content: "https://storage.googleapis.com/gpt-engineer-file-uploads/yQ5u6FwrE3Xh72DCjEiWwrAuyZQ2/social-images/social-1782354628743-WhatsApp_Image_2026-06-25_at_4.29.19_AM_(1).webp" },
      { name: "twitter:image", content: "https://storage.googleapis.com/gpt-engineer-file-uploads/yQ5u6FwrE3Xh72DCjEiWwrAuyZQ2/social-images/social-1782354628743-WhatsApp_Image_2026-06-25_at_4.29.19_AM_(1).webp" },
    ],
    links: [{ rel: "stylesheet", href: appCss }],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

import { Toaster } from "sonner";
import { supabase } from "@/integrations/supabase/client";

function RootComponent() {
  const { queryClient } = Route.useRouteContext();
  const router = useRouter();

  useEffect(() => {
    const { data: sub } = supabase.auth.onAuthStateChange((event) => {
      if (event !== "SIGNED_IN" && event !== "SIGNED_OUT" && event !== "USER_UPDATED") return;
      router.invalidate();
      if (event !== "SIGNED_OUT") queryClient.invalidateQueries();
    });
    return () => sub.subscription.unsubscribe();
  }, [router, queryClient]);

  return (
    <QueryClientProvider client={queryClient}>
      <Outlet />
      <Toaster richColors position="top-right" />
    </QueryClientProvider>
  );
}
