import { createServerFn } from "@tanstack/react-start";
import { createClient } from "@supabase/supabase-js";
import { z } from "zod";
import type { Database } from "@/integrations/supabase/types";
import { requireSupabaseAuth } from "@/integrations/supabase/auth-middleware";

// ---------------------------------------------------------------------------
// Public read-only listing fetches (active rows only — enforced by RLS too).
// ---------------------------------------------------------------------------

const LISTING_TABLES = {
  umrah_packages: true,
  work_demands: true,
  tourist_visas: true,
  tour_packages: true,
  business_invitations: true,
} as const;

export type ListingTable = keyof typeof LISTING_TABLES;

function assertTable(table: string): ListingTable {
  if (!(table in LISTING_TABLES)) throw new Error("Unknown listing table");
  return table as ListingTable;
}

function publicClient() {
  const url = process.env["SUPABASE_URL"]!;
  const key = process.env["SUPABASE_PUBLISHABLE_KEY"]!;
  return createClient<Database>(url, key, {
    auth: { storage: undefined, persistSession: false, autoRefreshToken: false },
    // Opaque sb_ keys aren't JWTs — send apikey only.
    global: {
      fetch: (input, init) => {
        const h = new Headers(init?.headers);
        if (key.startsWith("sb_") && h.get("Authorization") === `Bearer ${key}`) h.delete("Authorization");
        h.set("apikey", key);
        return fetch(input, { ...init, headers: h });
      },
    },
  });
}

export const getUmrahPackages = createServerFn({ method: "GET" }).handler(async () => {
  const { data, error } = await publicClient()
    .from("umrah_packages")
    .select("*")
    .eq("status", "active")
    .order("departure_date", { ascending: true });
  if (error) return [];
  return data;
});

export const getWorkDemands = createServerFn({ method: "GET" }).handler(async () => {
  const { data, error } = await publicClient()
    .from("work_demands")
    .select("*")
    .eq("status", "active")
    .order("created_at", { ascending: true });
  if (error) return [];
  return data;
});

export const getTouristVisas = createServerFn({ method: "GET" }).handler(async () => {
  const { data, error } = await publicClient()
    .from("tourist_visas")
    .select("*")
    .eq("status", "active")
    .order("country", { ascending: true });
  if (error) return [];
  return data;
});

export const getTours = createServerFn({ method: "GET" }).handler(async () => {
  const { data, error } = await publicClient()
    .from("tour_packages")
    .select("*")
    .eq("status", "active")
    .order("created_at", { ascending: true });
  if (error) return [];
  return data;
});

export const getBusinessInvitations = createServerFn({ method: "GET" }).handler(async () => {
  const { data, error } = await publicClient()
    .from("business_invitations")
    .select("*")
    .eq("status", "active")
    .order("country", { ascending: true });
  if (error) return [];
  return data;
});

// ---------------------------------------------------------------------------
// Admin CRUD — every handler verifies the admin role server-side.
// ---------------------------------------------------------------------------

async function requireAdmin(context: { supabase: Database-like; userId: string } | any) {
  const { data: isAdmin, error } = await (context.supabase as any).rpc("has_role", {
    _user_id: context.userId,
    _role: "admin",
  });
  if (error || !isAdmin) throw new Error("Forbidden — admin role required");
}

const TableInput = z.object({ table: z.string().min(1).max(40) });

export const adminListRows = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((input: unknown) => TableInput.parse(input))
  .handler(async ({ data, context }) => {
    await requireAdmin(context);
    const table = assertTable(data.table);
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const { data: rows, error } = await supabaseAdmin
      .from(table)
      .select("*")
      .order("created_at", { ascending: true });
    if (error) throw new Error(error.message);
    return rows ?? [];
  });

const UpdateInput = z.object({
  table: z.string().min(1).max(40),
  id: z.string().uuid(),
  patch: z.record(z.string(), z.unknown()),
});

export const adminUpdateRow = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((input: unknown) => UpdateInput.parse(input))
  .handler(async ({ data, context }) => {
    await requireAdmin(context);
    const table = assertTable(data.table);
    const patch = { ...data.patch } as Record<string, unknown>;
    delete patch.id;
    delete patch.created_at;
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const { error } = await supabaseAdmin.from(table).update(patch).eq("id", data.id);
    if (error) throw new Error(error.message);
    return { ok: true };
  });

const InsertInput = z.object({
  table: z.string().min(1).max(40),
  row: z.record(z.string(), z.unknown()),
});

export const adminInsertRow = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((input: unknown) => InsertInput.parse(input))
  .handler(async ({ data, context }) => {
    await requireAdmin(context);
    const table = assertTable(data.table);
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const { data: inserted, error } = await supabaseAdmin.from(table).insert(data.row).select("*").single();
    if (error) throw new Error(error.message);
    return inserted;
  });

const DeleteInput = z.object({ table: z.string().min(1).max(40), id: z.string().uuid() });

export const adminDeleteRow = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((input: unknown) => DeleteInput.parse(input))
  .handler(async ({ data, context }) => {
    await requireAdmin(context);
    const table = assertTable(data.table);
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const { error } = await supabaseAdmin.from(table).delete().eq("id", data.id);
    if (error) throw new Error(error.message);
    return { ok: true };
  });
