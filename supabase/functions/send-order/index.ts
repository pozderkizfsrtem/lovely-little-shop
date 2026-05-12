import { corsHeaders } from "https://esm.sh/@supabase/supabase-js@2.95.0/cors";

const GATEWAY_URL = "https://connector-gateway.lovable.dev/telegram";

interface OrderItem {
  product: string;
  flavor: string;
  qty: number;
}

interface OrderPayload {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  paczkomat: string;
  items: OrderItem[];
  total: number;
  telegramUserId?: number | null;
  telegramUsername?: string | null;
}

const isValid = (p: unknown): p is OrderPayload => {
  if (!p || typeof p !== "object") return false;
  const o = p as Record<string, unknown>;
  return (
    typeof o.firstName === "string" && o.firstName.length > 0 && o.firstName.length <= 60 &&
    typeof o.lastName === "string" && o.lastName.length > 0 && o.lastName.length <= 60 &&
    typeof o.email === "string" && o.email.length <= 255 && /^\S+@\S+\.\S+$/.test(o.email) &&
    typeof o.phone === "string" && o.phone.length > 0 && o.phone.length <= 20 &&
    typeof o.paczkomat === "string" && o.paczkomat.length > 0 && o.paczkomat.length <= 120 &&
    Array.isArray(o.items) && o.items.length > 0 && o.items.length <= 50 &&
    typeof o.total === "number" && o.total >= 0 &&
    (o.telegramUserId === undefined || o.telegramUserId === null || typeof o.telegramUserId === "number") &&
    (o.telegramUsername === undefined || o.telegramUsername === null || typeof o.telegramUsername === "string")
  );
};

const escapeHtml = (s: string) =>
  s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  try {
    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    const TELEGRAM_API_KEY = Deno.env.get("TELEGRAM_API_KEY");
    const TELEGRAM_CHAT_ID = Deno.env.get("TELEGRAM_CHAT_ID");

    if (!LOVABLE_API_KEY) throw new Error("LOVABLE_API_KEY is not configured");
    if (!TELEGRAM_API_KEY) throw new Error("TELEGRAM_API_KEY is not configured");
    if (!TELEGRAM_CHAT_ID) throw new Error("TELEGRAM_CHAT_ID is not configured");

    const payload = await req.json();
    if (!isValid(payload)) {
      return new Response(JSON.stringify({ error: "Invalid order payload" }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const totalQty = payload.items.reduce((s, i) => s + i.qty, 0);
    const itemsText = payload.items
      .map(
        (i, idx) =>
          `  ${idx + 1}. <b>${escapeHtml(i.product)}</b>\n` +
          `     • Smak: ${escapeHtml(i.flavor)}\n` +
          `     • Ilość: <b>${i.qty} szt.</b>`,
      )
      .join("\n");

    const orderId = `#${Date.now().toString(36).toUpperCase()}`;
    const now = new Date().toLocaleString("pl-PL", { timeZone: "Europe/Warsaw" });

    const usernameLine = payload.telegramUsername
      ? `┃ <b>Telegram:</b> <a href="https://t.me/${escapeHtml(payload.telegramUsername)}">@${escapeHtml(payload.telegramUsername)}</a>\n`
      : "";

    const text =
      `🛒 <b>NOWE ZAMÓWIENIE</b> ${orderId}\n` +
      `🕒 ${escapeHtml(now)}\n` +
      `━━━━━━━━━━━━━━━━━━\n\n` +
      `📊 <b>STATUS</b>\n` +
      `┃ 🟡 <b>Nowe — oczekuje na realizację</b>\n\n` +
      `👤 <b>KLIENT</b>\n` +
      `┃ <b>Imię i nazwisko:</b> ${escapeHtml(payload.firstName)} ${escapeHtml(payload.lastName)}\n` +
      usernameLine +
      `┃ <b>Email:</b> ${escapeHtml(payload.email)}\n` +
      `┃ <b>Telefon:</b> ${escapeHtml(payload.phone)}\n\n` +
      `📦 <b>DOSTAWA</b>\n` +
      `┃ InPost Paczkomat\n` +
      `┃ ${escapeHtml(payload.paczkomat)}\n\n` +
      `🛍️ <b>PRODUKTY</b> (${totalQty} szt.)\n` +
      `${itemsText}\n\n` +
      `━━━━━━━━━━━━━━━━━━\n` +
      `💰 <b>RAZEM: ${payload.total} zł</b>`;

    const sendTo = async (chatId: string | number) => {
      const r = await fetch(`${GATEWAY_URL}/sendMessage`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${LOVABLE_API_KEY}`,
          "X-Connection-Api-Key": TELEGRAM_API_KEY,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ chat_id: chatId, text, parse_mode: "HTML" }),
      });
      const d = await r.json();
      return { ok: r.ok, status: r.status, data: d };
    };

    const ownerRes = await sendTo(TELEGRAM_CHAT_ID);
    if (!ownerRes.ok) {
      throw new Error(`Telegram API failed [${ownerRes.status}]: ${JSON.stringify(ownerRes.data)}`);
    }

    return new Response(JSON.stringify({ success: true }), {
      status: 200,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Unknown error";
    console.error("send-order error:", message);
    return new Response(JSON.stringify({ success: false, error: message }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
