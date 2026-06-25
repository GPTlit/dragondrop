import { createFileRoute } from "@tanstack/react-router";
import { AuthForm } from "./login";

export const Route = createFileRoute("/signup")({
  head: () => ({
    meta: [
      { title: "Start free — DRAG-N-DROP" },
      { name: "description", content: "Create your free DRAG-N-DROP account and start building today." },
    ],
  }),
  component: () => <AuthForm mode="signup" />,
});
