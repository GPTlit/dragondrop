# Making DRAG-N-DROP real

What you're asking for (real auth, real projects, real drag-and-drop builder with many blocks + color controls + multi-page, real product/file uploads with admin panel, real analytics, real AI-generates-app-from-prompt, new dragon logo) is genuinely the work of a team over months. I can build it for real, but not in one pass — if I try, every piece ends up half-broken. Here is the phased plan I will execute, top-to-bottom, one phase per turn so you can use each piece as it lands.

## Phase 1 — Foundation (this turn)
- Enable **Lovable Cloud** (database, auth, storage, server functions).
- Real **email + password** sign up / sign in / sign out, with session, protected routes, and password reset page.
- DB schema + RLS: `profiles`, `projects`, `pages`, `blocks`, `products`, `product_images`, `assets`, `analytics_events`, `user_roles` (separate roles table, `has_role()` SECURITY DEFINER — no role on profile).
- Real **Projects dashboard**: create / rename / delete projects, only the owner sees them.
- New **dragon-dropping logo** (black & white SVG) replacing the current mark, used in nav, auth, dashboard, builder, favicon.

## Phase 2 — Real drag-and-drop builder
- `@dnd-kit` powered canvas with real drop targets, reordering, nesting in sections.
- Block library: Heading, Text, Button, Image, Video, Section, Columns (2/3/4), Spacer, Divider, Card, Form, Nav, Footer, Pricing, Testimonial, FAQ, Gallery, CTA, Embed, Product grid, Product card.
- Per-block inspector: text, link, padding/margin, alignment, font size/weight, background color, text color, border radius, shadow, full color picker with palette + hex.
- Multi-page projects (add/rename/delete pages, set home).
- Autosave to DB, undo/redo, device preview (desktop/tablet/mobile), public preview URL per project.

## Phase 3 — Admin panel + storage + products
- Per-project **admin panel** only the owner can open (RLS-enforced).
- Real **file uploads** to Cloud Storage (images, assets) with progress + delete.
- **Products CRUD**: name, description, price, currency, stock, images (multi-upload), visibility. Product grid block renders live from DB.

## Phase 4 — Real analytics
- Public published pages POST view events to a server route → `analytics_events`.
- Dashboard charts driven by real aggregates (visitors, pageviews, top pages, conversion, last 7/30/90d). No mock numbers.

## Phase 5 — AI app generation
- "Describe your site" prompt → Lovable AI (Gemini) returns a structured page tree (sections + blocks + copy) → inserted into a new project the user can then edit.
- AI copywriting and AI image generation buttons inside the inspector.

## Technical notes (skip if you don't care)
- Stack stays TanStack Start. Auth via Lovable Cloud (Supabase under the hood). Server functions for all writes; RLS so each user only sees their own rows. `@dnd-kit/core` + `@dnd-kit/sortable` for DnD. `react-colorful` for color picker. AI via Lovable AI Gateway (`google/gemini-3-flash-preview`), no keys to provide.
- Roles in a separate `user_roles` table with `has_role()` — owner of a project is the only admin of that project.

## Two quick confirmations before I start Phase 1
1. OK to enable **Lovable Cloud** now (required for real auth/DB/storage/AI)?
2. For the dragon logo: **black-and-white line-art dragon dropping a small cube/block from its claws**, monochrome, used at all sizes — good?

Reply "go" (or with tweaks) and I'll ship Phase 1 immediately, then continue phase by phase.