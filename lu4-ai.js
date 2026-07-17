/**
 * Chat inteligente Lu4 — LLM (Groq gratis) + contexto RAG de la guía.
 * Sin LLM no hay “entender cualquier pregunta”; el índice solo busca fichas.
 *
 * Opciones:
 *  A) Key Groq en el navegador (console.groq.com → gsk_…)
 *  B) Cloudflare Worker (recomendado para amigos): la key vive en el servidor
 */
(function (global) {
  const KEY_STORAGE = "lu4_groq_api_key";
  const ENDPOINT_STORAGE = "lu4_ai_endpoint";
  const MODEL = "llama-3.3-70b-versatile";
  const GROQ_URL = "https://api.groq.com/openai/v1/chat/completions";
  const MAX_TURNS = 10;

  let history = [];

  function getKey() {
    try { return (localStorage.getItem(KEY_STORAGE) || "").trim(); }
    catch (_) { return ""; }
  }
  function setKey(k) {
    try {
      const v = (k || "").trim();
      if (v) localStorage.setItem(KEY_STORAGE, v);
      else localStorage.removeItem(KEY_STORAGE);
    } catch (_) { /* ignore */ }
  }
  function clearKey() {
    setKey("");
  }
  function getEndpoint() {
    try { return (localStorage.getItem(ENDPOINT_STORAGE) || "").trim().replace(/\/$/, ""); }
    catch (_) { return ""; }
  }
  function setEndpoint(url) {
    try {
      const v = (url || "").trim().replace(/\/$/, "");
      if (v) localStorage.setItem(ENDPOINT_STORAGE, v);
      else localStorage.removeItem(ENDPOINT_STORAGE);
    } catch (_) { /* ignore */ }
  }
  function hasAi() {
    return !!(getKey() || getEndpoint());
  }
  function clearHistory() {
    history = [];
  }

  function buildSystem(ctx, ragText) {
    const classLine = ctx && ctx.className
      ? `El jugador tiene abierta la guía de: ${ctx.className}${ctx.raceName ? " (" + ctx.raceName + ")" : ""}${ctx.level != null ? ", nivel ~" + ctx.level : ""}.`
      : (ctx && ctx.level != null ? `Nivel aproximado del jugador: ${ctx.level}.` : "No hay clase abierta en la UI.");

    return [
      "Eres un asistente EXPERTO de Lineage 2 en el servidor Lu4 (MasterWork / E-Global).",
      "Tu trabajo: entender la pregunta, resolver el problema y dar pasos claros y accionables.",
      "Idioma: español neutro latinoamericano (tú: haz, puedes, elige). Sin voseo argentino.",
      "Nombres de quests, NPCs, aldeas, zonas, ítems y clases: déjalos en INGLÉS como en la wiki.",
      "Prioriza SIEMPRE el CONTEXTO DE LA GUÍA abajo. Si algo no está en el contexto, dilo y orienta a masterwork.wiki/lu4 o al Bestiary in-game.",
      "No inventes mecánicas de otros servers. Reglas Lu4: Fatigue Worn = EXP mobs ×0.1 (quests OK); ventana mobs −5/+4; party 5–9; sin pets/pesca; Path 18=250k EXP; Marks desde 35; Temple+Kusto ANTES del 45; cap 85; Coins of Magic NO existe.",
      "Formato: respuesta conversacional, luego bullets numerados si hay pasos. Máximo 1 link wiki al final.",
      classLine,
      "",
      "=== CONTEXTO DE LA GUÍA (RAG) ===",
      (ragText || "(sin fragmentos)").slice(0, 12000)
    ].join("\n");
  }

  function gatherRag(question, ctx) {
    const parts = [];
    const Rag = global.Lu4Rag;
    const G = global.Lu4Guides;
    if (Rag) {
      if (!Rag.status().ready) Rag.train();
      const hits = Rag.retrieve(question, 8);
      if (hits.length) {
        parts.push(hits.map(h => `[${h.chunk.title}] ${h.chunk.text}`).join("\n\n"));
      }
    }
    if (G && ctx && ctx.classId && G.getClass && G.classDigest) {
      const cls = G.getClass(ctx.classId);
      if (cls) parts.push(G.classDigest(cls));
    }
    if (G && G.explainGuideTopic) {
      const ex = G.explainGuideTopic(question, ctx || {});
      if (ex) parts.push(ex);
    }
    const I = global.Lu4Items;
    if (I) {
      const items = I.searchItems(question, 4);
      if (items.length) {
        parts.push(items.map(it => I.explainItem(it)).join("\n"));
      }
    }
    return parts.join("\n\n---\n\n");
  }

  async function callGroqDirect(messages) {
    const key = getKey();
    if (!key) throw new Error("NO_KEY");
    if (!/^gsk_/i.test(key)) {
      throw new Error("La key de Groq debe empezar con gsk_");
    }
    let res;
    try {
      res = await fetch(GROQ_URL, {
        method: "POST",
        mode: "cors",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + key
        },
        body: JSON.stringify({
          model: MODEL,
          temperature: 0.4,
          max_tokens: 1200,
          messages
        })
      });
    } catch (err) {
      throw new Error("No se pudo conectar con Groq: " + (err.message || err));
    }
    const data = await res.json().catch(() => ({}));
    if (!res.ok) {
      const msg = (data.error && data.error.message) || ("HTTP " + res.status);
      throw new Error(msg);
    }
    const text = (((data.choices || [])[0] || {}).message || {}).content || "";
    if (!text.trim()) throw new Error("Respuesta vacía del modelo");
    return text.trim();
  }

  async function callWorker(messages, ragText, ctx) {
    const ep = getEndpoint();
    if (!ep) throw new Error("NO_ENDPOINT");
    const res = await fetch(ep + "/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        messages,
        model: MODEL,
        systemExtra: { ragText, ctx }
      })
    });
    const data = await res.json().catch(() => ({}));
    if (!res.ok) throw new Error(data.error || ("HTTP " + res.status));
    if (!data.text) throw new Error("Respuesta vacía del worker");
    return String(data.text).trim();
  }

  /**
   * Chat inteligente. Devuelve { text, mode } o lanza error.
   */
  async function chat(question, ctx) {
    const q = (question || "").trim();
    if (!q) throw new Error("Pregunta vacía");
    if (!hasAi()) throw new Error("NO_AI");

    const ragText = gatherRag(q, ctx || {});
    const system = buildSystem(ctx || {}, ragText);
    const messages = [
      { role: "system", content: system },
      ...history.map(h => ({ role: h.role, content: h.content })),
      { role: "user", content: q }
    ];

    let text;
    if (getEndpoint()) {
      text = await callWorker(messages, ragText, ctx);
    } else {
      text = await callGroqDirect(messages);
    }

    history.push({ role: "user", content: q });
    history.push({ role: "assistant", content: text });
    while (history.length > MAX_TURNS * 2) {
      history.shift();
    }
    return { text, mode: "ai" };
  }

  global.Lu4Ai = {
    MODEL,
    hasAi,
    getKey,
    setKey,
    clearKey,
    getEndpoint,
    setEndpoint,
    clearHistory,
    chat,
    GROQ_SIGNUP: "https://console.groq.com/keys"
  };
})(window);
