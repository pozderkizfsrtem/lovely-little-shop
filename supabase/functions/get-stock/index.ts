import { corsHeaders } from "https://esm.sh/@supabase/supabase-js@2.95.0/cors";

const SUPABASE_URL = Deno.env.get("SUPABASE_URL")!;
const SERVICE_KEY = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;

// Public read-only: returns { stock: { "<flavor lowercase>": qty } }
Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response("ok", { headers: corsHeaders });
  try {
    const res = await fetch(`${SUPABASE_URL}/rest/v1/bot_settings?key=eq.stock&select=value`, {
      headers: { apikey: SERVICE_KEY, Authorization: `Bearer ${SERVICE_KEY}` },
    });
    const rows = res.ok ? ((await res.json()) as Array<{ value: string }>) : [];
    const stock = rows[0]?.value ? JSON.parse(rows[0].value) : {};
    return new Response(JSON.stringify({ stock }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (_e) {
    return new Response(JSON.stringify({ stock: {} }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
