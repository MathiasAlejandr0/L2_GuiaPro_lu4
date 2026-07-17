/**
 * Lu4 RAG local — “entrena” un índice con toda la guía e ítems
 * y recupera los trozos más relevantes para el chat (sin API externa).
 */
(function (global) {
  const W = "https://masterwork.wiki";

  /** @type {{id:string, title:string, tags:string[], text:string, source:string}[]} */
  let CORPUS = [];
  let READY = false;
  let STATS = { chunks: 0, builtAt: null };

  function normalize(s) {
    return (s || "")
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/[^a-z0-9\s]/g, " ")
      .replace(/\s+/g, " ")
      .trim();
  }

  function tokens(s) {
    return normalize(s).split(" ").filter(t => t.length > 2);
  }

  function pushChunk(list, chunk) {
    if (!chunk || !chunk.text) return;
    const text = String(chunk.text).replace(/\s+/g, " ").trim();
    if (text.length < 40) return;
    list.push({
      id: chunk.id || ("c" + list.length),
      title: chunk.title || "Lu4",
      tags: chunk.tags || [],
      text: text.slice(0, 2200),
      source: chunk.source || "guide"
    });
  }

  /** Construye / reentrena el índice a partir de Lu4Guides + Lu4Items + Lu4Chat.KB */
  function train() {
    const G = global.Lu4Guides;
    const I = global.Lu4Items;
    const Chat = global.Lu4Chat;
    const list = [];

    // —— Secretos Lu4 ——
    if (G && G.SECRETS) {
      G.SECRETS.forEach((s, i) => {
        pushChunk(list, {
          id: "secret-" + i,
          title: s.title,
          tags: ["secreto", "regla", "lu4", normalize(s.title)],
          text: `${s.title}. Qué significa: ${s.what} Qué hacer: ${s.do}`,
          source: "secrets"
        });
      });
    }

    // —— SA completo ——
    if (G && G.saDigest) {
      pushChunk(list, {
        id: "sa-full",
        title: "Soul Crystal (SA) Lu4",
        tags: ["sa", "soul", "crystal", "gemstone", "blacksmith", "levear", "insertar"],
        text: G.saDigest() + ` Wiki: ${W}/lu4/posts/post/367-soul-crystal-sa-enhancement`,
        source: "sa"
      });
    }

    pushChunk(list, {
      id: "sa-farm",
      title: "Dónde farmear Soul Crystal por stage",
      tags: ["sa", "farm", "stage", "timak", "doll", "maluk", "platinum", "raid"],
      text: [
        "Farm Soul Crystal Lu4 por stage:",
        "Stage 2 (D low): Ol Mahum Captain, Langk Lizardman Leader (~25).",
        "Stage 3 (D mid): Ant Captain, Marsh Stakato Drone, Ghoul (~30-35).",
        "Stage 4 (D top): Hatu Onyx Beast, Porta, Noble Ant (~36-40).",
        "Stage 5-6 (C): Timak Orcs, Blade Stakato, Forest of Mirrors Ghost (~40-46).",
        "Stage 7-8 (C high/top): Eva's Seeker, Fiend Archer, Doll Blader, Sairon (~47-54).",
        "Stage 9-10 (B): Unicorn Elder, Drake, Maluk, Platinum Tribe, Seal Angel (~55-73).",
        "Stage 11-13 (A): Raid Bosses; Epics Queen Ant/Core/Orfen/Zaken = 100% party.",
        "Regla: solo 1 cristal en inventario. No hace falta usarlo sobre el mob."
      ].join(" "),
      source: "sa"
    });

    // —— Equipo por grados (global) ——
    pushChunk(list, {
      id: "gear-grades",
      title: "Equipo por grados NG a S",
      tags: ["equipo", "grado", "ng", "d", "c", "b", "a", "alligator", "ivory", "mammon"],
      text: [
        "Equipo Lu4 por grados:",
        "NG 1-20: quests de aldea + Seal be Broken. Sets NG con bonus en shops.",
        "D 18-40: cupón Path NG→D, Dragon Fangs, Magnificent Feast, Acts of Evil.",
        "C 40-52: Alligator Hunter (warriors) o Ivory Tower (mages), Pastime, Treasure Hunt. No Coins of Magic.",
        "B ~52-61: craft, drop Élite, Blacksmith of Mammon. Sets Avadon/Zubei/Blue Wolf/Doom.",
        "A ~61-76: Tallum/Dark Crystal/Nightmare/Majestic. Craft/Mammon.",
        "S+ 76-85: post Saga / endgame.",
        `Wiki: ${W}/lu4/posts/post/368-lu4-equipment-quests · ${W}/lu4/posts/post/558-cba-grade-sets-upgrades`
      ].join(" "),
      source: "gear"
    });

    // —— Cada clase ——
    if (G && G.CLASSES) {
      G.CLASSES.forEach(cls => {
        const digest = G.classDigest ? G.classDigest(cls) : `${cls.name} ${cls.name2} ${cls.role} ${cls.tip}`;
        pushChunk(list, {
          id: "class-" + cls.id,
          title: `${cls.name} (${cls.name2})`,
          tags: [cls.id, cls.name, cls.name2, cls.role, cls.race, "clase", "guia"].map(normalize),
          text: digest,
          source: "class"
        });
        // Roadmap resumido
        if (G.getRoadmapRows) {
          const rows = G.getRoadmapRows(cls).slice(0, 18);
          pushChunk(list, {
            id: "road-" + cls.id,
            title: `Roadmap 1-85 ${cls.name}`,
            tags: [cls.id, cls.name, "roadmap", "nivel", "mision", "zona"],
            text: `Roadmap ${cls.name}: ` + rows.map(r => `[${r.lv}] ${r.nombre}: ${r.detalle} @ ${r.where}`).join(" · "),
            source: "roadmap"
          });
        }
      });
    }

    // —— Paths 1ª ——
    if (G && G.FIRST) {
      Object.keys(G.FIRST).forEach(key => {
        const f = G.FIRST[key];
        pushChunk(list, {
          id: "path-" + key,
          title: `Path ${f.name}`,
          tags: ["path", "primera", f.name, key],
          text: [
            `Path of ${f.name}. Inicio: ${f.startNpc}. Cambio: ${f.changeNpc}.`,
            `Recompensa: ${f.reward}. Abre: ${(f.opens || []).join(", ")}.`,
            (f.steps || []).join(" → "),
            f.pathUrl ? `Wiki: ${f.pathUrl}` : ""
          ].join(" "),
          source: "path"
        });
      });
    }

    // —— Razas / starters ——
    if (G && G.RACES) {
      Object.keys(G.RACES).forEach(rid => {
        const r = G.RACES[rid];
        const starters = (r.starters || []).map(s => `${s.name} (${s.lv}): ${s.reward} — ${s.tip}`).join("; ");
        pushChunk(list, {
          id: "race-" + rid,
          title: `Starter ${r.name} — ${r.village}`,
          tags: [rid, r.name, r.village, "starter", "aldea"],
          text: `${r.name}. Aldea: ${r.village}. ${r.blurb || ""} Quests: ${starters}`,
          source: "race"
        });
      });
    }

    // —— NPCs ——
    if (G && G.NPC_INDEX) {
      G.NPC_INDEX.forEach((n, i) => {
        pushChunk(list, {
          id: "npc-" + i,
          title: n.name,
          tags: [...(n.q || []), n.name, "npc"],
          text: `NPC ${n.name}. Dónde: ${n.where}. ${n.tip}. Wiki: ${n.wiki}`,
          source: "npc"
        });
      });
    }

    // —— Lugares ——
    if (G && G.PLACES) {
      Object.keys(G.PLACES).forEach(pid => {
        const p = G.PLACES[pid];
        pushChunk(list, {
          id: "place-" + pid,
          title: p.name,
          tags: [pid, p.name, "lugar", "ciudad"],
          text: `${p.name}: ${p.tip}`,
          source: "place"
        });
      });
    }

    // —— Items ——
    if (I && I.ITEMS) {
      I.ITEMS.forEach(it => {
        pushChunk(list, {
          id: "item-" + it.id,
          title: it.name,
          tags: [it.name, it.slug, it.cat, ...(it.aliases || []), "item", "material", "drop", "spoil"],
          text: [
            `Ítem ${it.name} (${I.CAT_LABEL[it.cat] || it.cat}).`,
            it.tip,
            `Drop/Spoil y detalles: ${I.itemUrl(it)}`,
            `Buscar: ${I.wikiItemSearchUrl(it.name)}`
          ].join(" "),
          source: "item"
        });
      });
    }

    // —— KB del chat ——
    if (Chat && Chat.KB) {
      Chat.KB.forEach(e => {
        pushChunk(list, {
          id: "kb-" + e.id,
          title: e.id,
          tags: [...(e.tags || []), e.id, ...(e.q || [])],
          text: e.a.replace(/\$\{W\}/g, W),
          source: "kb"
        });
      });
    }

    // —— Niveles genéricos ——
    if (Chat && Chat.answerByLevel) {
      [1, 18, 20, 30, 35, 40, 45, 52, 60, 70, 76, 80, 85].forEach(lv => {
        const a = Chat.answerByLevel(lv);
        if (a) {
          pushChunk(list, {
            id: "level-" + lv,
            title: `Qué hacer nivel ${lv}`,
            tags: ["nivel", "level", String(lv), "farmear", "subir"],
            text: a,
            source: "level"
          });
        }
      });
    }

    CORPUS = list;
    READY = true;
    STATS = { chunks: CORPUS.length, builtAt: new Date().toISOString() };
    return STATS;
  }

  function scoreChunk(chunk, qNorm, qTokens) {
    let score = 0;
    const titleN = normalize(chunk.title);
    const tagsN = normalize((chunk.tags || []).join(" "));
    const textN = normalize(chunk.text);
    if (titleN.includes(qNorm)) score += 25;
    if (tagsN.includes(qNorm)) score += 18;
    if (textN.includes(qNorm)) score += 10;
    for (const t of qTokens) {
      if (titleN.includes(t)) score += 8;
      if (tagsN.includes(t)) score += 6;
      if (textN.includes(t)) score += 2;
      // id boost
      if (normalize(chunk.id).includes(t)) score += 4;
    }
    // Prefer class/item/sa for specific queries
    if (/sa|soul|crystal|gemstone/.test(qNorm) && chunk.source === "sa") score += 12;
    if (/material|drop|spoil|gemstone|steel|enria|item/.test(qNorm) && chunk.source === "item") score += 10;
    if (/fatigue|fatiga|party|templo|kusto|path/.test(qNorm) && (chunk.source === "secrets" || chunk.source === "kb")) score += 8;
    return score;
  }

  function retrieve(query, limit) {
    if (!READY) train();
    const qNorm = normalize(query);
    const qTokens = tokens(query);
    if (!qNorm || qTokens.length === 0) return [];
    const ranked = CORPUS.map(c => ({ chunk: c, score: scoreChunk(c, qNorm, qTokens) }))
      .filter(x => x.score >= 6)
      .sort((a, b) => b.score - a.score);
    // diversify sources a bit
    const out = [];
    const seenSource = {};
    for (const row of ranked) {
      const src = row.chunk.source;
      seenSource[src] = (seenSource[src] || 0) + 1;
      if (seenSource[src] > 3 && out.length >= 2) continue;
      out.push(row);
      if (out.length >= (limit || 6)) break;
    }
    return out;
  }

  function formatRetrieval(hits) {
    if (!hits.length) return null;
    const blocks = hits.map((h, i) => {
      const c = h.chunk;
      return `**${i + 1}. ${c.title}**\n${c.text}`;
    });
    return blocks.join("\n\n");
  }

  /**
   * Respuesta RAG: recupera chunks y arma un texto útil.
   * Devuelve { text, hits, score } o null si no hay match bueno.
   */
  function answer(query, opts) {
    opts = opts || {};
    const hits = retrieve(query, opts.limit || 6);
    if (!hits.length || hits[0].score < 8) return null;
    const topScore = hits[0].score;
    let text = formatRetrieval(hits);
    // Si hay clase abierta, priorizar su digest si no está ya
    const G = global.Lu4Guides;
    if (opts.classId && G && G.getClass && G.classDigest) {
      const cls = G.getClass(opts.classId);
      if (cls && !hits.some(h => h.chunk.id === "class-" + cls.id)) {
        text = `**Contexto de tu clase (${cls.name}):**\n${G.classDigest(cls)}\n\n---\n\n` + text;
      }
    }
    text += `\n\n_Índice RAG: ${STATS.chunks} trozos · top score ${topScore}_`;
    return {
      text,
      hits,
      score: topScore,
      sources: hits.map(h => h.chunk.id)
    };
  }

  function status() {
    return { ready: READY, ...STATS };
  }

  global.Lu4Rag = {
    train,
    rebuild: train,
    retrieve,
    answer,
    status,
    get corpus() { return CORPUS; }
  };
})(window);
