const GATEWAY_URL = "https://connector-gateway.lovable.dev/telegram";
const BOT_USERNAME = "CoolRickbot";
const MINI_APP_LINK = `https://t.me/${BOT_USERNAME}?startapp=shop`;
const INFO_CHANNEL_LINK = "https://t.me/puffbotinfo";
const MANAGER_LINK = "https://t.me/rickbigdic";

async function deriveSecret(key: string): Promise<string> {
  const digest = await crypto.subtle.digest("SHA-256", new TextEncoder().encode(`telegram-webhook:${key}`));
  return btoa(String.fromCharCode(...new Uint8Array(digest)))
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=+$/g, "");
}

function safeEqual(a: string | null, b: string): boolean {
  if (!a || a.length !== b.length) return false;
  let diff = 0;
  for (let i = 0; i < a.length; i++) diff |= a.charCodeAt(i) ^ b.charCodeAt(i);
  return diff === 0;
}

const tg = async (method: string, body: Record<string, unknown>, lovableKey: string, tgKey: string) => {
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
  if (!res.ok || data?.ok === false) {
    console.error(`Telegram ${method} failed [${res.status}]:`, JSON.stringify(data));
  }
  return data;
};

Deno.serve(async (req) => {
  if (req.method !== "POST") return new Response("Method not allowed", { status: 405 });

  const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
  const TELEGRAM_API_KEY = Deno.env.get("TELEGRAM_API_KEY");
  if (!LOVABLE_API_KEY || !TELEGRAM_API_KEY) {
    console.error("Missing LOVABLE_API_KEY or TELEGRAM_API_KEY");
    return new Response("Not configured", { status: 500 });
  }

  const expected = await deriveSecret(TELEGRAM_API_KEY);
  if (!safeEqual(req.headers.get("X-Telegram-Bot-Api-Secret-Token"), expected)) {
    return new Response("Unauthorized", { status: 401 });
  }

  try {
    const update = await req.json();

    // Handle order status button clicks (from send-order messages).
    if (update.callback_query) {
      const cq = update.callback_query;
      const data: string = cq.data ?? "";
      const action = data.split("|")[1];
      if (action === "pay" || action === "ship") {
        await tg("answerCallbackQuery", { callback_query_id: cq.id }, LOVABLE_API_KEY, TELEGRAM_API_KEY);

        // Telegram gives us PLAIN text (no HTML) + entities. We patch the status
        // line in the plain text and shift/rebuild entities so bold survives.
        const origText: string = cq.message?.text ?? "";
        const entities: Array<{ type: string; offset: number; length: number; [k: string]: unknown }> =
          cq.message?.entities ?? [];

        const newLabel = action === "pay" ? "🟢 Opłacone" : "🔵 Wysłane";

        const marker = "┃ ";
        const statusHeader = origText.indexOf("STATUS");
        const lineStart = statusHeader === -1 ? -1 : origText.indexOf(marker, statusHeader);
        if (lineStart === -1) {
          console.error("Status line not found in message text");
          return new Response(JSON.stringify({ ok: true }), {
            headers: { "Content-Type": "application/json" },
          });
        }
        const valueStart = lineStart + marker.length;
        let lineEnd = origText.indexOf("\n", valueStart);
        if (lineEnd === -1) lineEnd = origText.length;

        const newText = origText.slice(0, valueStart) + newLabel + origText.slice(lineEnd);
        const delta = newLabel.length - (lineEnd - valueStart);

        const newEntities = entities
          .filter((e) => e.offset + e.length <= valueStart || e.offset >= lineEnd)
          .map((e) => (e.offset >= lineEnd ? { ...e, offset: e.offset + delta } : e));
        newEntities.push({ type: "bold", offset: valueStart, length: newLabel.length });
        newEntities.sort((a, b) => a.offset - b.offset);

        await tg(
          "editMessageText",
          {
            chat_id: cq.message?.chat?.id,
            message_id: cq.message?.message_id,
            text: newText,
            entities: newEntities,
            reply_markup: cq.message?.reply_markup,
          },
          LOVABLE_API_KEY,
          TELEGRAM_API_KEY,
        );
      } else {

        await tg("answerCallbackQuery", { callback_query_id: cq.id }, LOVABLE_API_KEY, TELEGRAM_API_KEY);
      }
      return new Response(JSON.stringify({ ok: true }), {
        headers: { "Content-Type": "application/json" },
      });
    }

    const msg = update.message ?? update.edited_message;
    const chat = msg?.chat;
    if (!chat?.id) return new Response(JSON.stringify({ ok: true }));

    const text: string = msg.text ?? "";
    const isCommand = /^\/(start|shop|sklep)(@\w+)?\b/i.test(text.trim());
    const botAdded = (msg.new_chat_members ?? []).some(
      (m: { username?: string }) => m.username === BOT_USERNAME,
    );

    if (!isCommand && !botAdded) return new Response(JSON.stringify({ ok: true }));

    const isGroup = chat.type === "group" || chat.type === "supergroup";

    await tg(
      "sendMessage",
      {
        chat_id: chat.id,
        text: "🛒 <b>PuffBot</b>\nWybierz smak i zamów w kilka sekund.",
        parse_mode: "HTML",
        reply_markup: {
          inline_keyboard: [
            [
              isGroup
                ? { text: "Otwórz sklep", url: MINI_APP_LINK }
                : { text: "Otwórz sklep", web_app: { url: "https://delight-boutique-showcase.lovable.app" } },
            ],
            [{ text: "📢 Kanał info", url: INFO_CHANNEL_LINK }],
            [{ text: "💬 Kontakt z menadżerem", url: MANAGER_LINK }],
          ],
        },
      },
      LOVABLE_API_KEY,
      TELEGRAM_API_KEY,
    );

    return new Response(JSON.stringify({ ok: true }), {
      headers: { "Content-Type": "application/json" },
    });
  } catch (err) {
    console.error("telegram-webhook error:", err instanceof Error ? err.message : err);
    return new Response(JSON.stringify({ ok: true }), {
      headers: { "Content-Type": "application/json" },
    });
  }
});
