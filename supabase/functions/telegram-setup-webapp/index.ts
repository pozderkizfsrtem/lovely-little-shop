import { corsHeaders } from "https://esm.sh/@supabase/supabase-js@2.95.0/cors";

const GATEWAY_URL = "https://connector-gateway.lovable.dev/telegram";
const WEBAPP_URL = "https://delight-boutique-showcase.lovable.app";

const tg = async (
  method: string,
  body: Record<string, unknown>,
  lovableKey: string,
  tgKey: string,
) => {
  const res = await fetch(`${GATEWAY_URL}/${method}`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${lovableKey}`,
      "X-Connection-Api-Key": tgKey,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });
  const data = await res.json();
  if (!res.ok) {
    throw new Error(`Telegram ${method} failed [${res.status}]: ${JSON.stringify(data)}`);
  }
  return data;
};

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  try {
    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    const TELEGRAM_API_KEY = Deno.env.get("TELEGRAM_API_KEY");
    if (!LOVABLE_API_KEY) throw new Error("LOVABLE_API_KEY is not configured");
    if (!TELEGRAM_API_KEY) throw new Error("TELEGRAM_API_KEY is not configured");

    // 1) Set the persistent menu button to open the Mini App
    const menu = await tg(
      "setChatMenuButton",
      {
        menu_button: {
          type: "web_app",
          text: "Sklep Maison",
          web_app: { url: WEBAPP_URL },
        },
      },
      LOVABLE_API_KEY,
      TELEGRAM_API_KEY,
    );

    // 2) Register /start and /shop commands
    const cmds = await tg(
      "setMyCommands",
      {
        commands: [
          { command: "start", description: "Otwórz sklep" },
          { command: "shop", description: "Otwórz sklep Maison" },
        ],
      },
      LOVABLE_API_KEY,
      TELEGRAM_API_KEY,
    );

    return new Response(
      JSON.stringify({ success: true, menu, cmds, webapp_url: WEBAPP_URL }),
      { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } },
    );
  } catch (err) {
    const message = err instanceof Error ? err.message : "Unknown error";
    console.error("telegram-setup-webapp error:", message);
    return new Response(JSON.stringify({ success: false, error: message }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
