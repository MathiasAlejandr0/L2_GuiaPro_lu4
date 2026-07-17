/**
 * Índice de ítems/materiales Lu4 + links a drop/spoil en la wiki.
 * La wiki es la fuente de verdad de drops; aquí hay materiales comunes y armas de la guía.
 */
(function (global) {
  const W = "https://masterwork.wiki";

  /** @type {{id:number, slug:string, name:string, cat:string, tip:string, aliases?:string[]}[]} */
  const ITEMS = [
    // Gemstones (SA)
    { id: 2130, slug: "gemstone-d", name: "Gemstone D", cat: "gemstone", tip: "Para insertar SA en armas D. Compra/craft/drop.", aliases: ["gem d", "gema d"] },
    { id: 2131, slug: "gemstone-c", name: "Gemstone C", cat: "gemstone", tip: "Para insertar SA en armas C.", aliases: ["gem c", "gema c"] },
    { id: 2132, slug: "gemstone-b", name: "Gemstone B", cat: "gemstone", tip: "Para insertar SA en armas B.", aliases: ["gem b"] },
    { id: 2133, slug: "gemstone-a", name: "Gemstone A", cat: "gemstone", tip: "Para insertar SA en armas A.", aliases: ["gem a"] },
    { id: 2134, slug: "gemstone-s", name: "Gemstone S", cat: "gemstone", tip: "Para SA / craft de grado S.", aliases: ["gem s"] },

    // Crystals
    { id: 1458, slug: "crystal-d", name: "Crystal (D-Grade)", cat: "crystal", tip: "Craft, enchant scrolls, marcas BH, etc.", aliases: ["crystal d", "cristal d"] },
    { id: 1459, slug: "crystal-c", name: "Crystal (C-Grade)", cat: "crystal", tip: "Craft C-grade.", aliases: ["crystal c", "cristal c"] },
    { id: 1460, slug: "crystal-b", name: "Crystal (B-Grade)", cat: "crystal", tip: "Craft B-grade.", aliases: ["crystal b"] },
    { id: 1461, slug: "crystal-a", name: "Crystal (A-Grade)", cat: "crystal", tip: "Craft A-grade.", aliases: ["crystal a"] },
    { id: 1462, slug: "crystal-s", name: "Crystal (S-Grade)", cat: "crystal", tip: "Craft S-grade.", aliases: ["crystal s"] },

    // Basic mats
    { id: 1864, slug: "stem", name: "Stem", cat: "material", tip: "Material básico (mobs low / shops).", aliases: ["tallo"] },
    { id: 1865, slug: "varnish", name: "Varnish", cat: "material", tip: "Craft early. Marcas BH pedían barniz.", aliases: ["barniz"] },
    { id: 1866, slug: "suede", name: "Suede", cat: "material", tip: "Material de cuero/craft.", aliases: ["ante"] },
    { id: 1867, slug: "animal-skin", name: "Animal Skin", cat: "material", tip: "Spoil/drop animals. Marcas BH: piel.", aliases: ["piel", "skin"] },
    { id: 1868, slug: "thread", name: "Thread", cat: "material", tip: "Material textil básico.", aliases: ["hilo"] },
    { id: 1869, slug: "iron-ore", name: "Iron Ore", cat: "material", tip: "Mineral básico → Steel / frames.", aliases: ["hierro", "iron"] },
    { id: 1870, slug: "coal", name: "Coal", cat: "material", tip: "Combustible craft.", aliases: ["carbon", "carbón"] },
    { id: 1871, slug: "charcoal", name: "Charcoal", cat: "material", tip: "Craft / Cokes.", aliases: ["carbon vegetal"] },
    { id: 1872, slug: "animal-bone", name: "Animal Bone", cat: "material", tip: "→ Coarse Bone Powder.", aliases: ["hueso"] },
    { id: 1873, slug: "silver-nugget", name: "Silver Nugget", cat: "material", tip: "Craft joyería / molds.", aliases: ["plata", "silver"] },
    { id: 1874, slug: "oriharukon-ore", name: "Oriharukon Ore", cat: "material", tip: "Mineral mid → Oriharukon.", aliases: ["oriharukon ore"] },
    { id: 1875, slug: "stone-of-purity", name: "Stone of Purity", cat: "material", tip: "Craft Varnish of Purity y más.", aliases: ["piedra de pureza"] },
    { id: 1876, slug: "mithril-ore", name: "Mithril Ore", cat: "material", tip: "Mineral mid-high.", aliases: ["mithril"] },
    { id: 1877, slug: "adamantite-nugget", name: "Adamantite Nugget", cat: "material", tip: "Craft high.", aliases: ["adamantite"] },
    { id: 1878, slug: "braided-hemp", name: "Braided Hemp", cat: "material", tip: "Craft cords / fibers.", aliases: ["hemp"] },
    { id: 1879, slug: "cokes", name: "Cokes", cat: "material", tip: "Intermedio de forge.", aliases: ["coque"] },
    { id: 1880, slug: "steel", name: "Steel", cat: "material", tip: "Marcas BH pedían acero. Craft desde Iron Ore.", aliases: ["acero"] },
    { id: 1881, slug: "coarse-bone-powder", name: "Coarse Bone Powder", cat: "material", tip: "Desde Animal Bone.", aliases: ["bone powder"] },
    { id: 1882, slug: "leather", name: "Leather", cat: "material", tip: "Desde Animal Skin.", aliases: ["cuero"] },
    { id: 1884, slug: "cord", name: "Cord", cat: "material", tip: "Craft mid.", aliases: ["cuerda"] },
    { id: 1885, slug: "high-grade-suede", name: "High-Grade Suede", cat: "material", tip: "Craft mid-high.", aliases: ["hg suede"] },
    { id: 1886, slug: "silver-mold", name: "Silver Mold", cat: "material", tip: "Mold craft Dwarf.", aliases: ["molde plata"] },
    { id: 1887, slug: "varnish-of-purity", name: "Varnish of Purity", cat: "material", tip: "Craft avanzado.", aliases: ["barniz pureza"] },
    { id: 1888, slug: "synthetic-cokes", name: "Synthetic Cokes", cat: "material", tip: "Forge mid.", aliases: [] },
    { id: 1889, slug: "compound-braid", name: "Compound Braid", cat: "material", tip: "Craft mid.", aliases: [] },
    { id: 1890, slug: "mithril-alloy", name: "Mithril Alloy", cat: "material", tip: "Craft armas/armaduras mid.", aliases: [] },
    { id: 1891, slug: "crafted-leather", name: "Crafted Leather", cat: "material", tip: "Armaduras light mid.", aliases: [] },
    { id: 1892, slug: "blacksmiths-frame", name: "Blacksmith's Frame", cat: "material", tip: "Frames Dwarf craft.", aliases: ["blacksmith frame", "frame"] },
    { id: 1893, slug: "metallic-fiber", name: "Metallic Fiber", cat: "material", tip: "Craft mid-high.", aliases: ["fiber"] },
    { id: 1894, slug: "oriharukon", name: "Oriharukon", cat: "material", tip: "Metal craft mid.", aliases: [] },

    // Rare mats
    { id: 4039, slug: "mold-glue", name: "Mold Glue", cat: "rare", tip: "Craft A / molds. Spoil/drop mid-high.", aliases: ["glue"] },
    { id: 4040, slug: "mold-lubricant", name: "Mold Lubricant", cat: "rare", tip: "Craft A.", aliases: ["lubricant"] },
    { id: 4041, slug: "mold-hardener", name: "Mold Hardener", cat: "rare", tip: "Craft A.", aliases: ["hardener"] },
    { id: 4042, slug: "enria", name: "Enria", cat: "rare", tip: "Material raro mid-high (spoil/drop).", aliases: [] },
    { id: 4043, slug: "asofe", name: "Asofe", cat: "rare", tip: "Material raro mid-high.", aliases: [] },
    { id: 4044, slug: "thons", name: "Thons", cat: "rare", tip: "Material raro mid-high.", aliases: [] },
    { id: 4045, slug: "maestro-mold", name: "Maestro Mold", cat: "rare", tip: "Craft Warsmith / A jewelry.", aliases: [] },
    { id: 4046, slug: "maestro-anvil-lock", name: "Maestro Anvil Lock", cat: "rare", tip: "Craft Warsmith.", aliases: ["anvil lock"] },
    { id: 4048, slug: "maestro-holder", name: "Maestro Holder", cat: "rare", tip: "Craft Warsmith.", aliases: ["holder"] },
    { id: 5550, slug: "durable-metal-plate", name: "Durable Metal Plate", cat: "rare", tip: "Craft high.", aliases: ["dmp", "metal plate"] },

    // SA crystals (empty) — tip only; IDs may vary by color on wiki
    { id: 4629, slug: "red-soul-crystal-stage-1", name: "Red Soul Crystal - Stage 1", cat: "sa", tip: "Empieza en Blacksmith (vacío). Levea matando mobs con 1 cristal en inventario.", aliases: ["red crystal", "cristal rojo"] },
    { id: 4640, slug: "green-soul-crystal-stage-1", name: "Green Soul Crystal - Stage 1", cat: "sa", tip: "Color Green. Compra vacío en Blacksmith.", aliases: ["green crystal", "cristal verde"] },
    { id: 4651, slug: "blue-soul-crystal-stage-1", name: "Blue Soul Crystal - Stage 1", cat: "sa", tip: "Color Blue. Compra vacío en Blacksmith.", aliases: ["blue crystal", "cristal azul"] },

    // Weapons / pieces mentioned in guide
    { id: 2, slug: "long-sword", name: "Long Sword", cat: "weapon", tip: "Arma NG común.", aliases: [] },
    { id: 129, slug: "sword-of-solidarity", name: "Sword of Solidarity", cat: "weapon", tip: "Quest Human starter.", aliases: ["solidarity"] },
    { id: 7880, slug: "butchers-sword", name: "Butcher's Sword", cat: "weapon", tip: "Quest Orc Merciless Punishment.", aliases: ["butcher"] },
    { id: 2504, slug: "meteor-shower", name: "Meteor Shower", cat: "weapon", tip: "Blunt B típico magos/buffers.", aliases: [] },
    { id: 79, slug: "damascus", name: "Damascus", cat: "weapon", tip: "Sword B popular melee.", aliases: [] },
    { id: 2500, slug: "dark-elven-long-bow", name: "Dark Elven Long Bow", cat: "weapon", tip: "Bow B típico arqueros.", aliases: ["del bow"] },
    { id: 75, slug: "caliburs", name: "Caliburs", cat: "weapon", tip: "Sword C.", aliases: [] },
    { id: 135, slug: "samurai-longsword", name: "Samurai Longsword", cat: "weapon", tip: "2H sword C (Destroyer path).", aliases: ["samurai"] },
    { id: 84, slug: "homunkuluss-sword", name: "Homunkulus's Sword", cat: "weapon", tip: "Pool Alligator/Ivory (C).", aliases: ["homunkulus"] },
    { id: 2503, slug: "yaksa-mace", name: "Yaksa Mace", cat: "weapon", tip: "Blunt C magic-friendly.", aliases: ["yaksa"] },
    { id: 286, slug: "war-axe", name: "War Axe", cat: "weapon", tip: "Blunt/axe C (Alligator pool).", aliases: [] },

    // Quest / key items
    { id: 8873, slug: "ice-crystal", name: "Ice Crystal", cat: "quest", tip: "Saga prep: The Finest Ingredients pt.1 (72+).", aliases: ["cristal de hielo"] },
    { id: 4414, slug: "divine-stone-of-wisdom", name: "Divine Stone of Wisdom", cat: "quest", tip: "Saga prep: Ketra o Varka alliance + Magical Power quests.", aliases: ["piedra divina"] }
  ];

  const CAT_LABEL = {
    gemstone: "Gemstone",
    crystal: "Crystal",
    material: "Material",
    rare: "Material raro",
    sa: "Soul Crystal",
    weapon: "Arma",
    quest: "Quest / key"
  };

  function itemUrl(it) {
    return `${W}/lu4/item/${it.id}-${it.slug}`;
  }

  function wikiItemSearchUrl(name) {
    const q = encodeURIComponent(name || "");
    return `${W}/lu4/search?Search%5Bsearch_type%5D=2&Search%5Bname%5D=${q}`;
  }

  function wikiNpcSearchUrl(name) {
    const q = encodeURIComponent(name || "");
    return `${W}/lu4/search?Search%5Bsearch_type%5D=1&Search%5Bname%5D=${q}`;
  }

  function normalize(s) {
    return (s || "")
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/[^a-z0-9\s]/g, " ")
      .replace(/\s+/g, " ")
      .trim();
  }

  function searchItems(query, limit) {
    const q = normalize(query);
    if (!q || q.length < 2) return [];
    const tokens = q.split(" ").filter(Boolean);
    const scored = ITEMS.map(it => {
      const blob = normalize([it.name, it.slug, it.tip, it.cat, ...(it.aliases || [])].join(" "));
      let s = 0;
      if (blob.includes(q)) s += 20;
      if (normalize(it.name).startsWith(q)) s += 15;
      for (const t of tokens) {
        if (blob.includes(t)) s += 5;
        if ((it.aliases || []).some(a => normalize(a).includes(t))) s += 8;
      }
      return { it, s };
    }).filter(x => x.s > 0).sort((a, b) => b.s - a.s);
    return scored.slice(0, limit || 20).map(x => x.it);
  }

  function getItem(idOrName) {
    if (typeof idOrName === "number") return ITEMS.find(i => i.id === idOrName) || null;
    const q = normalize(idOrName);
    return ITEMS.find(i => normalize(i.name) === q || i.slug === q) || searchItems(q, 1)[0] || null;
  }

  function explainItem(it) {
    if (!it) return null;
    return [
      `**${it.name}** (${CAT_LABEL[it.cat] || it.cat})`,
      it.tip,
      "",
      `• Drop / Spoil / precios: abre la ficha wiki (sección Drop Spoil).`,
      `• También puedes buscar el ítem en el **Bestiary** del cliente Lu4.`,
      "",
      `Wiki ítem: ${itemUrl(it)}`,
      `Buscar en wiki: ${wikiItemSearchUrl(it.name)}`
    ].join("\n");
  }

  global.Lu4Items = {
    W, ITEMS, CAT_LABEL,
    itemUrl, wikiItemSearchUrl, wikiNpcSearchUrl,
    searchItems, getItem, explainItem, normalize
  };
})(window);
