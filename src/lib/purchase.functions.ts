import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { createClient } from "@supabase/supabase-js";
import type { Database } from "@/integrations/supabase/types";

const purchaseInput = z.object({
  template_id: z.number().int().min(1).max(50),
  store_name: z.string().trim().min(1).max(80),
  buyer_name: z.string().trim().min(1).max(120),
  buyer_email: z.string().trim().email().max(180),
  buyer_code: z.string().trim().max(40).optional().default(""),
  buyer_phone: z.string().trim().max(40).optional().default(""),
  buyer_whatsapp: z.string().trim().max(40).optional().default(""),
  comments: z.string().trim().max(1000).optional().default(""),
  payment_method: z.enum(["bankily", "masrivi", "sedad"]),
  receipt_url: z.string().url().max(1000).optional().default(""),
});

function newPublicClient() {
  const url = process.env.SUPABASE_URL!;
  const key = process.env.SUPABASE_PUBLISHABLE_KEY!;
  const isNewKey = key.startsWith("sb_publishable_") || key.startsWith("sb_secret_");
  return createClient<Database>(url, key, {
    auth: { persistSession: false, autoRefreshToken: false, storage: undefined },
    global: {
      fetch: (input, init) => {
        const headers = new Headers(init?.headers);
        if (isNewKey && headers.get("Authorization") === `Bearer ${key}`) headers.delete("Authorization");
        headers.set("apikey", key);
        return fetch(input, { ...init, headers });
      },
    },
  });
}

export const submitPurchase = createServerFn({ method: "POST" })
  .inputValidator((d: unknown) => purchaseInput.parse(d))
  .handler(async ({ data }) => {
    const supabase = newPublicClient();
    const { data: row, error } = await supabase.rpc("submit_purchase", {
      p_template_id: data.template_id,
      p_store_name: data.store_name,
      p_buyer_name: data.buyer_name,
      p_buyer_email: data.buyer_email,
      p_buyer_code: data.buyer_code || "",
      p_buyer_phone: data.buyer_phone || "",
      p_buyer_whatsapp: data.buyer_whatsapp || "",
      p_comments: data.comments || "",
      p_payment_method: data.payment_method,
      p_receipt_url: data.receipt_url || "",
    } as any);
    if (error) throw new Error(error.message);
    const first = Array.isArray(row) ? row[0] : row;
    return { purchaseId: first?.purchase_id as string, projectId: first?.project_id as string };
  });
