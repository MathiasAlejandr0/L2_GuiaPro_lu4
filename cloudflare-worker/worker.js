/**
 * Cloudflare Worker — proxy seguro para el chat Lu4 (Groq).
 *
 * Deploy:
 *   1. npm i -g wrangler   (o npx wrangler)
 *   2. cd cloudflare-worker
 *   3. npx wrangler login
 *   4. npx wrangler secret put GROQ_API_KEY   (pega tu gsk_…)
 *   5. npx wrangler deploy
 *   6. En la guía: Configurar IA → pega la URL del worker (https://….workers.dev)
 *
 * Así tus amigos usan el chat inteligente SIN pegar la key en el navegador.
 */

export default {
  async fetch(request, env) {
    const cors = {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "POST, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type"
    };

    if (request.method === "OPTIONS") {
      return new Response(null, { headers: cors });
    }

    const url = new URL(request.url);
    if (request.method === "GET" && (url.pathname === "/" || url.pathname === "/health")) {
      return json({ ok: true, service: "lu4-chat-worker" }, cors);
    }

    if (request.method !== "POST" || url.pathname !== "/chat") {
      return json({ error: "Use POST /chat" }, cors, 404);
    }

    if (!env.GROQ_API_KEY) {
      return json({ error: "Falta GROQ_API_KEY en el worker" }, cors, 500);
    }

    let body;
    try {
      body = await request.json();
    } catch (_) {
      return json({ error: "JSON inválido" }, cors, 400);
    }

    const messages = Array.isArray(body.messages) ? body.messages : null;
    if (!messages || !messages.length) {
      return json({ error: "messages requerido" }, cors, 400);
    }

    const model = body.model || "llama-3.3-70b-versatile";

    const res = await fetch("https://api.groq.com/openai/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + env.GROQ_API_KEY
      },
      body: JSON.stringify({
        model,
        temperature: 0.4,
        max_tokens: 1200,
        messages
      })
    });

    const data = await res.json().catch(() => ({}));
    if (!res.ok) {
      const msg = (data.error && data.error.message) || ("Groq HTTP " + res.status);
      return json({ error: msg }, cors, res.status);
    }

    const text = (((data.choices || [])[0] || {}).message || {}).content || "";
    return json({ text, model }, cors);
  }
};

function json(obj, cors, status) {
  return new Response(JSON.stringify(obj), {
    status: status || 200,
    headers: { "Content-Type": "application/json", ...cors }
  });
}
