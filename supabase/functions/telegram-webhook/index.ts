const GATEWAY_URL = "https://connector-gateway.lovable.dev/telegram";
const BOT_USERNAME = "CoolRickbot";
const MINI_APP_LINK = `https://t.me/${BOT_USERNAME}?startapp=shop`;
const INFO_CHANNEL_LINK = "https://t.me/puffbotinfo";
const MANAGER_LINK = "https://t.me/rickbigdic";
const BOT_DEEP_LINK = `https://t.me/${BOT_USERNAME}?start=shop`;
const SUPABASE_URL = Deno.env.get("SUPABASE_URL")!;
const SERVICE_KEY = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;

const settingsUrl = (key: string) =>
  `${SUPABASE_URL}/rest/v1/bot_settings?key=eq.${encodeURIComponent(key)}&select=value`;

const dbHeaders = {
  apikey: SERVICE_KEY,
  Authorization: `Bearer ${SERVICE_KEY}`,
  "Content-Type": "application/json",
};

async function getSetting(key: string): Promise<string | null> {
  const res = await fetch(settingsUrl(key), { headers: dbHeaders });
  if (!res.ok) {
    console.error(`getSetting failed [${res.status}]:`, await res.text());
    return null;
  }
  const rows = (await res.json()) as Array<{ value: string }>;
  return rows[0]?.value ?? null;
}

async function setSetting(key: string, value: string) {
  const res = await fetch(`${SUPABASE_URL}/rest/v1/bot_settings`, {
    method: "POST",
    headers: { ...dbHeaders, Prefer: "resolution=merge-duplicates" },
    body: JSON.stringify({ key, value, updated_at: new Date().toISOString() }),
  });
  if (!res.ok) console.error(`setSetting failed [${res.status}]:`, await res.text());
}

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
    const OWNER_CHAT_ID = Deno.env.get("TELEGRAM_CHAT_ID") ?? "";

    // Bot promoted/added in a channel -> remember it as the announcement channel.
    const memberUpdate = update.my_chat_member;
    if (memberUpdate?.chat?.type === "channel") {
      const status = memberUpdate.new_chat_member?.status;
      if (status === "administrator" || status === "member") {
        await setSetting("announce_chat_id", String(memberUpdate.chat.id));
        if (OWNER_CHAT_ID) {
          await tg(
            "sendMessage",
            {
              chat_id: OWNER_CHAT_ID,
              text: `✅ Kana\u0142 <b>${memberUpdate.chat.title ?? "PuffBot"}</b> zapisany.\nWy\u015blij mi <code>/post tre\u015b\u0107</code>, aby opublikowa\u0107 og\u0142oszenie.`,
              parse_mode: "HTML",
            },
            LOVABLE_API_KEY,
            TELEGRAM_API_KEY,
          );
        }
      }
      return new Response(JSON.stringify({ ok: true }), {
        headers: { "Content-Type": "application/json" },
      });
    }

    // Any post inside a channel also identifies the channel.
    const channelPost = update.channel_post ?? update.edited_channel_post;
    if (channelPost?.chat?.id) {
      await setSetting("announce_chat_id", String(channelPost.chat.id));
      return new Response(JSON.stringify({ ok: true }), {
        headers: { "Content-Type": "application/json" },
      });
    }

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

    // Owner-only: /post <tekst> publishes an announcement on the PuffBot channel.
    const postMatch = text.trim().match(/^\/post(?:@\w+)?(?:\s+([\s\S]+))?$/i);
    if (postMatch) {
      if (String(chat.id) !== String(OWNER_CHAT_ID)) {
        return new Response(JSON.stringify({ ok: true }), {
          headers: { "Content-Type": "application/json" },
        });
      }
      const body = postMatch[1]?.trim();
      const announceChat = await getSetting("announce_chat_id");
      if (!body) {
        await tg(
          "sendMessage",
          {
            chat_id: chat.id,
            text: "✍️ U\u017cyj: <code>/post tre\u015b\u0107 og\u0142oszenia</code>\nOg\u0142oszenie pojawi si\u0119 na kanale z przyciskiem do sklepu.",
            parse_mode: "HTML",
          },
          LOVABLE_API_KEY,
          TELEGRAM_API_KEY,
        );
      } else if (!announceChat) {
        await tg(
          "sendMessage",
          {
            chat_id: chat.id,
            text: "⚠️ Nie znam jeszcze kana\u0142u. Dodaj bota jako administratora kana\u0142u PuffBot (z prawem publikowania), potem spr\u00f3buj ponownie.",
          },
          LOVABLE_API_KEY,
          TELEGRAM_API_KEY,
        );
      } else {
        const sent = await tg(
          "sendMessage",
          {
            chat_id: announceChat,
            text: body,
            parse_mode: "HTML",
            reply_markup: {
              inline_keyboard: [[{ text: "🛒 Otw\u00f3rz sklep PuffBot", url: BOT_DEEP_LINK }]],
            },
          },
          LOVABLE_API_KEY,
          TELEGRAM_API_KEY,
        );
        await tg(
          "sendMessage",
          {
            chat_id: chat.id,
            text: sent?.ok === false
              ? `❌ Nie uda\u0142o si\u0119 opublikowa\u0107: ${sent?.description ?? "b\u0142\u0105d"}`
              : "✅ Og\u0142oszenie opublikowane na kanale.",
          },
          LOVABLE_API_KEY,
          TELEGRAM_API_KEY,
        );
      }
      return new Response(JSON.stringify({ ok: true }), {
        headers: { "Content-Type": "application/json" },
      });
    }

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
