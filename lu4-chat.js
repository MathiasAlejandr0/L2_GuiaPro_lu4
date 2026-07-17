/**
 * Lu4 Guide Chat — solo base local (guía + ítems + wiki links).
 * Español neutro LatAm. Quests / aldeas / NPCs en inglés wiki.
 */
(function (global) {
  const W = "https://masterwork.wiki";
  const MAX_HISTORY = 8;

  const KB = [
    // —— Reglas ——
    {
      id: "fatigue",
      tags: ["fatigue", "fatiga", "battle ready", "battle worn", "agotado", "experiencia limitada", "hora"],
      q: ["qué es fatigue", "qué hago si estoy fatigado", "fatiga"],
      a: `**Fatiga (Lu4):** cuando se agotan los Fatigue Points pasas a *Battle Worn* y la EXP de **monstruos/RB baja ×10**.\n\n• Las **misiones siguen dando EXP/adena completa**.\n• Con fatiga: haz Templo, Kusto, Cazador, misiones de equipo, Path/marcas.\n• Se recarga a las **06:30 hora del servidor**.\n\nWiki: ${W}/lu4/posts/post/381-lu4-fatigue-system`
    },
    {
      id: "ventana",
      tags: ["ventana", "penalty", "penalizacion", "rojo", "azul", "blanco", "nivel mob", "diferencia de nivel"],
      q: ["qué nivel de mobs", "mobs rojos", "ventana de farmeo"],
      a: `**Ventana de farmeo Lu4:**\n• Monstruos ideales: **−5 a +4** de tu nivel (blancos).\n• Azules: sirven si no hay mejor sitio.\n• **Rojos: no valen** (EXP y drop/spoil rotos).\n• Raid Bosses: **−4 a +3**.\n\nWiki: ${W}/lu4/posts/post/498-gaining-experience-and-penalties`
    },
    {
      id: "party",
      tags: ["party", "grupo", "partida", "5", "9", "exp party"],
      q: ["cuántos en party", "mejor party"],
      a: `En Lu4 el bonus de grupo se reworkeó: en grupos de **5 a 9** todos reciben la **misma EXP** por kill. Más gente = más kills = más rápido. Ideal: grupo completo en zonas Élite.`
    },
    {
      id: "pets",
      tags: ["pet", "pets", "lobo", "kookaburra", "pesca", "fishing", "help the son", "help the sister"],
      q: ["hay pets", "puedo pescar"],
      a: `En **Lu4 están desactivados pesca y mascotas**. No hagas Get a Pet / Help Son / Sister / Uncle: no están disponibles.`
    },
    {
      id: "path-reward",
      tags: ["path", "primera clase", "1ra", "1ª", "250000", "250k", "profesion 1"],
      q: ["cuánta exp da el path", "recompensa primera clase"],
      a: `**1ª profesión (Path) en Lu4** (todas iguales):\n• **250.000 EXP + 25.000 SP**\n• Cupón de arma NG→D\n• Soulshots / BSpS NG, pociones, Proof of Loyalty\n• Disponible desde **nivel 18**\n• Sobre el nivel 26: el Path **no da EXP**\n• En Lu4 los objetos de misión dropean para **todo el grupo**.`
    },
    {
      id: "marks-reward",
      tags: ["mark", "marks", "segunda clase", "2da", "2ª", "750k", "3-in-1", "3 in 1"],
      q: ["cuánta exp dan los marks", "segunda profesion"],
      a: `**2ª profesión (marcas) en Lu4:**\n• Cada marca: **750.000 EXP + 75.000 SP**\n• Las 3 marcas ≈ **2.25M EXP**\n• Disponibles desde **nivel 35** (no hace falta subir más para las etapas)\n• Cambio de clase al **40**\n• Usa las guías **3-en-1** de la wiki`
    },
    {
      id: "temple45",
      tags: ["temple", "templo", "executor", "champion", "shadow fox", "fallen angel", "antes del 45", "45"],
      q: ["temple chain", "qué es temple", "hacer temple"],
      a: `**Temple Executor chain (35–45)** — HACELA ANTES DEL 45 (después no da EXP/SP).\n\nOrden: Missionary → Executor → Champion-1 → Champion-2 → Shadow Fox 1–3 → Fallen Angel Dawn **o** Dusk.\n\nTotal ≈ **2.5–2.7M EXP** + adena/consumibles.\n\nWiki: ${W}/lu4/posts/post/380-temple-executor-quest-chain-35`
    },
    {
      id: "kusto",
      tags: ["kusto", "relic exploration", "nikola", "vain conclusion", "loraine"],
      q: ["qué es kusto", "cadena kusto"],
      a: `**Kusto chain (40–45)** — también **antes del 45**.\n\n4 misiones (~590–615k EXP):\nRelic Exploration → Nikola (elección) → Heart/Seal/Contract → Lost Dream / Vain Conclusion / Contract Completion.\n\nNPC inicio: **Head Blacksmith Kusto** (Giran Blacksmith).\n\nWiki: ${W}/lu4/posts/post/386-lu4-kusto-quest-chain-40`
    },
    {
      id: "alligator",
      tags: ["alligator", "alligators", "cazador", "enverun", "heine", "fisico", "warrior"],
      q: ["alligator hunter", "dónde es alligator"],
      a: `**Alligator Hunter (40–47)** — solo **guerreros y chamanes orcos** con 2ª profesión.\n\nNPC: **Enverun** (comerciante de accesorios) — Heine, tienda de comestibles.\nRecompensas: adena, equipo C/D, pergaminos, tintes, EXP por minijuegos.\n\nMagos: usa **Under the Shadow of the Ivory Tower** en vez de esta.`
    },
    {
      id: "ivory",
      tags: ["ivory", "ivory tower", "cema", "hardin", "mage", "mistico", "nebulite"],
      q: ["ivory tower quest", "shadow of the ivory"],
      a: `**Under the Shadow of the Ivory Tower (40–47)** — solo **místicos y chamanes orcos** con 2ª.\n\nNPC: **Cema** (comerciante mágico) — Academia de Hardin (territorio de Giran).\nFarmea Orbes de Nebulita → juegos / lotería → equipo C, tintes, EXP.\n\nWiki equipo: ${W}/lu4/posts/post/368-lu4-equipment-quests`
    },
    {
      id: "saga-prep",
      tags: ["saga", "ice crystal", "divine stone", "ketra", "varka", "finest ingredients", "72", "74", "76"],
      q: ["qué necesito para la saga", "preparar saga"],
      a: `**Antes de la Saga (76+)** consigue:\n1. **Cristal de Hielo** — misión *The Finest Ingredients pt.1* (72+)\n2. **Piedra Divina de la Sabiduría** — Alianza Ketra **o** Varka nv.2 (72+) → Magical Power Water/Fire pt.1 (74+)\n\nRecompensa típica de Saga: ~2.3M EXP · 5M Adena · Códice de los Gigantes.`
    },
    {
      id: "subclass",
      tags: ["subclass", "subclase", "fate", "fate's whisper", "52"],
      q: ["cuándo subclass", "subclass"],
      a: `**Subclase en Lu4/MasterWork:** Fate's Whisper simplificado desde **nivel 52**. La subclase también puede llegar a **85**. Más subclases desde el 55 de la sub actual.\n\nWiki: ${W}/lu4/posts/post/45-subclasses-on-masterwork`
    },

    // —— NPCs ——
    {
      id: "npc-pippi",
      tags: ["pippi", "collector pippi", "scavenger", "scavanger", "dwarven village"],
      q: ["dónde está pippi", "donde esta pippi"],
      a: `**Collector Pippi** — north of **Dwarven Village**. Starts *Path of the Scavenger* (18+).\nClass change: **Warehouse Chief Moke** at **Gludin Warehouse**.`
    },
    {
      id: "npc-mion",
      tags: ["mion", "grocer mion"],
      q: ["dónde está mion"],
      a: `**Mion** (Grocer) — Grocery Store, **Dwarven Village**. Part of Path Scavenger (deliveries until Mion's Letter).`
    },
    {
      id: "npc-toma",
      tags: ["toma", "master toma"],
      q: ["dónde está toma", "master toma"],
      a: `**Master Toma** — Western Mining Zone (isla cerca de la desembocadura del río).\nEn **Lu4 no teleporta**: existe a la vez en todos sus hábitats.`
    },
    {
      id: "npc-karukia",
      tags: ["karukia", "orc raider", "hall of kings"],
      q: ["dónde está karukia"],
      a: `**Prefect Karukia** — 1st floor of **Hall of Kings**, Orc Village. Starts *Path of the Orc Raider*.\nClass change: **High Prefect Osborn**, Orc Guild of **Gludin**.`
    },
    {
      id: "npc-kasman",
      tags: ["kasman"],
      q: ["dónde está kasman"],
      a: `**Prefect Kasman** — Orc Guild of **Gludin**. Part of Path Orc Raider.`
    },
    {
      id: "npc-varika",
      tags: ["varika", "altar of rites", "dark wizard"],
      q: ["dónde está varika"],
      a: `**Varika** — foot of the **Altar of Rites**, south Dark Elf lands. Starts *Path of the Dark Wizard*.\nClass change: **Grand Master Tobias**, Dark Elf Guild of **Gludio**.`
    },
    {
      id: "npc-arkenia",
      tags: ["arkenia", "hub scent"],
      q: ["dónde está arkenia", "hub scent"],
      a: `**Arkenia** — near the **Altar of Rites** (Dark Elf lands). Gives **Hub Scent** — without it Path Dark Wizard drops (Hearts of Lunacy) can fail.`
    },
    {
      id: "npc-kusto",
      tags: ["kusto blacksmith", "head blacksmith kusto"],
      q: ["dónde está kusto"],
      a: `**Head Blacksmith Kusto** — Blacksmith of **Giran**. Starts Relic Exploration / Kusto chain (40–45).`
    },
    {
      id: "npc-enverun",
      tags: ["enverun"],
      q: ["dónde está enverun"],
      a: `**Enverun** (Accessory Merchant) — **Heine**, Grocery Store. Quest *Alligator Hunter* (40–47).`
    },
    {
      id: "npc-cema",
      tags: ["cema"],
      q: ["dónde está cema"],
      a: `**Cema** (Magic Trader) — **Hardin's Academy** (Giran Territory). Quest *Under the Shadow of the Ivory Tower* (40–47).`
    },
    {
      id: "npc-fairen",
      tags: ["fairen", "storm screamer saga"],
      q: ["dónde está fairen"],
      a: `**Grand Magister Fairen** — **Ivory Tower 4th floor**. Starts *Saga of the Storm Screamer* (76+).`
    },
    {
      id: "npc-tazki",
      tags: ["tazki", "titan saga"],
      q: ["dónde está tazki"],
      a: `**Prefect Tazki** — Warriors Guild of **Rune**. Starts *Saga of the Titan* (76+).`
    },
    {
      id: "npc-mond",
      tags: ["mond", "fortune seeker saga"],
      q: ["dónde está mond"],
      a: `**Chief Inspector Mond** — Warehouse of **Rune**. Starts *Saga of the Fortune Seeker* (76+).`
    },
    {
      id: "npc-grey",
      tags: ["grey", "song of hunter", "hunter guild", "hunter's village"],
      q: ["dónde está grey", "song of the hunter"],
      a: `**Grey** — central building of **Hunter's Village**. Quest *Song of the Hunter* (30+, reworked in Lu4).\nWiki: ${W}/lu4/posts/post/379-lu4-quest-song-of-hunter-30`
    },
    {
      id: "npc-ranspo",
      tags: ["ranspo", "magnificent feast", "dion feast"],
      q: ["magnificent feast", "dónde feast"],
      a: `**Magnificent Feast (20–40)** — Dion Warehouse Chief **Ranspo**.\nPrevious chain: Fantasy Wine (Harlan), Adept of Taste (Jonas), Bring Out Flavor (Rollant), musician scores (Barbado/Nanarin/Swan).\nReward: random D jewelry.`
    },

    // —— Clases fichas ——
    {
      id: "class-spoiler",
      tags: ["spoiler", "scavenger", "bounty hunter", "fortune seeker", "enano", "dwarf spoil"],
      q: ["guía spoiler", "cómo subir spoiler", "fortune seeker"],
      a: `**Spoiler → Fortune Seeker (Dwarf)**\n\n1. Starter Dwarf: Jumble Tumble Diamond Fuss, Covert Business (Ring of Raccoon)\n2. **18:** Path Scavenger — Pippi → Mion → Toma (Spoil) → Moke en Gludin\n3. **35–40:** 3-en-1 BH (Guildsman+Prosperity+Searcher) — prepara Acero/Barniz/Piel/Cristales\n4. **Antes del 45:** Templo + Kusto + Alligator\n5. **76:** Saga Mond (Almacén de Rune) — Cristal de Hielo + Piedra Divina\n\nPath: ${W}/lu4/posts/post/77-path-of-the-scavanger-18\n3-en-1: ${W}/lu4/posts/post/319-3-in-1-bounty-hunter-profession-quest\nSaga: ${W}/lu4/posts/post/433-saga-of-the-fortune-seeker-76`
    },
    {
      id: "class-destroyer",
      tags: ["destroyer", "titan", "orc raider", "destru"],
      q: ["guía destroyer", "cómo subir destroyer", "titan"],
      a: `**Destroyer → Titan (Orc)**\n\n1. Starter: Long Live the Pa'agrio Lord!, Proof of Valor, Merciless Punishment (Butcher's Sword)\n2. **18:** Path Raider — Karukia → dientes Kuruka → Kasman → Umbar Orcs → Osborn Gludin\n3. **35–40:** 3-en-1 Destroyer (Challenger+Glory+Champion)\n4. **Antes del 45:** Templo + Kusto + Alligator\n5. **76:** Saga Tazki (Gremio de Guerreros de Rune)\n\nPath: ${W}/lu4/posts/post/69-path-of-the-orc-raider-18\n3-en-1: ${W}/lu4/posts/post/315-3-in-1-destroyer-profession-quest\nSaga: ${W}/lu4/posts/post/428-saga-of-the-titan-76`
    },
    {
      id: "class-storm",
      tags: ["storm screamer", "storm", "spellhowler", "dark wizard", "ss"],
      q: ["guía storm screamer", "cómo subir storm", "spellhowler"],
      a: `**Storm Screamer (Dark Elf)**\n\n1. Starter DE: Forgotten Truth (spellbook), Will the Seal be Broken?, Dragon Fangs\n2. **18:** Path Dark Wizard — Varika → Arkenia (**Hub Scent**) → Annika → Charkeren → Tobias Gludio\n3. **35–40:** 3-in-1 Spellhowler (Scholar+Fate+Magus)\n4. **Before 45:** Temple + Kusto + **Ivory Tower** (no Alligator)\n5. **76:** Saga Fairen (Ivory Tower 4F) — kill Allector **with skills**\n\nPath: ${W}/lu4/posts/post/81-path-of-the-dark-wizard-18\n3-en-1: ${W}/lu4/posts/post/312-3-in-1-spellhowler-profession-quest\nSaga: ${W}/lu4/posts/post/425-saga-of-the-storm-screamer-76`
    },

    // —— Zonas ——
    {
      id: "zone-crypts",
      tags: ["crypts", "crypts of disgrace", "schuttgart", "33", "34", "35", "30-36"],
      q: ["dónde farmear 30", "crypts"],
      a: `**Crypts of Disgrace** — monstruos Élite **33–35**, pensado para **grupo**. Ideal niveles ~30–36.\nWiki: ${W}/lu4/posts/post/322-update-crypts-of-disgrace-3236`
    },
    {
      id: "zone-grave",
      tags: ["grave robber", "grave", "42", "43", "44", "45", "40-48"],
      q: ["dónde farmear 40", "grave robber"],
      a: `**Grave Robber Hideout** — Élite **42–45**, grupo. Ideal ~40–48.\nWiki: ${W}/lu4/posts/post/323-update-grave-robber-hideout-4050`
    },
    {
      id: "zone-den",
      tags: ["den of evil", "den", "47", "50", "55", "57"],
      q: ["dónde farmear 50", "den of evil"],
      a: `**Den of Evil** — ~47–57. Sirve solo, grupo chico o grupo completo.\nWiki: ${W}/lu4/posts/post/324-update-den-of-evil-4757`
    },
    {
      id: "zone-caron",
      tags: ["caron", "caron's", "59", "60", "56-64"],
      q: ["dónde farmear 60", "caron"],
      a: `**Caron's Dungeon** — Élite **59–60**, grupo. Ideal ~56–64.\nWiki: ${W}/lu4/posts/post/325-update-carons-dungeon-5664`
    },
    {
      id: "zone-lab",
      tags: ["archaic", "laboratory", "lab", "61", "65"],
      q: ["archaic laboratory"],
      a: `**Archaic Laboratory** — ~60–65.\nWiki: ${W}/lu4/posts/post/326-update-archaic-laboratory-6065`
    },
    {
      id: "zone-hatoum",
      tags: ["hatoum", "66", "68", "70", "72", "74"],
      q: ["hatoum", "dónde farmear 70"],
      a: `**Hatoum Settlement** — grupo ~**68–72**, misión pasiva de recetas.\nWiki: ${W}/lu4/posts/post/174-new-hatoum-settlement-6674`
    },
    {
      id: "zone-iop",
      tags: ["isle of prayer", "chromatic", "74", "75", "76", "77", "78", "80", "83", "island"],
      q: ["isle of prayer", "chromatic", "dónde farmear 80"],
      a: `**Isle of Prayer / Chromatic Highlands (74–83)**\n• Isla: mecánica *no more than three* → **máx. 3 jugadores**\n• Cromáticas: grupo grande + dragones reworkeados (buena EXP)\nWiki: ${W}/lu4/posts/post/171-isle-of-prayer-and-chromatic-highlands-7483`
    },
    {
      id: "zone-pagan",
      tags: ["pagan", "pagan temple", "78-83"],
      q: ["pagan temple"],
      a: `**Pagan Temple (78–83)** — monstruos ~80, solo/grupo, farmeo A/S.\nWiki: ${W}/lu4/posts/post/241-update-pagan-temple-7883`
    },
    {
      id: "zone-fairy",
      tags: ["fairy", "fairy settlement", "78-85", "85"],
      q: ["fairy settlement"],
      a: `**Fairy Settlement (78–85)** — 3 zonas de dificultad + misiones semanales.\nWiki: ${W}/lu4/posts/post/173-new-fairy-settlement-7885`
    },

    // —— Quests sueltas ——
    {
      id: "dragon-fangs",
      tags: ["dragon fangs", "fangs", "19", "langk"],
      q: ["dragon fangs"],
      a: `**Dragon Fangs (19–29)** — gran EXP (~350k) + armadura D al azar.\nStart: Guard Luis (Gludin area / Langk Lizardmen chain).\nWiki: ${W}/quest/38/lu4`
    },
    {
      id: "red-eyed",
      tags: ["red-eyed", "red eyed", "invaders", "20", "28", "babenco"],
      q: ["red-eyed invaders"],
      a: `**Red-Eyed Invaders (20–28)** — one-time ≈ **280–330k EXP**.\nNPC: **Guard Babenco**, Gludio Western Gate.`
    },
    {
      id: "seal",
      tags: ["seal", "will the seal", "sellado"],
      q: ["will the seal be broken"],
      a: `**Will the Seal be Broken? (16–26)** — one-time. Random NG armor + D enchant scrolls. Hazla sí o sí en niveles bajos.`
    },
    {
      id: "coins",
      tags: ["coins of magic", "monedas"],
      q: ["coins of magic"],
      a: `**Coins of Magic no está disponible en Lu4.** Usa Alligator / Ivory Tower / Warehouse Pastime / Treasure Hunt para C-grade.`
    },
    {
      id: "sa",
      tags: ["sa", "soul crystal", "soulcrystal", "special ability", "cristal", "enhance your weapon", "poner sa", "levear cristal", "subir sa", "gemstone"],
      q: ["cómo poner sa", "donde poner sa", "qué es sa", "soul crystal", "cómo subir cristal", "cómo levear sa", "dónde farmear soul crystal"],
      a: `**Soul Crystal (SA) — Lu4 completo**\n\n**Conseguir:** Blacksmith de ciudad → compra cristal vacío nivel 0 (Red / Green / Blue). Un cristal por diálogo.\n\n**Levear:** deja **solo 1** cristal en el inventario y mata mobs. En Lu4 **no** hace falta usarlo sobre el mob. Si hay varios → *crystal resonance* y no sube. La quest se activa al **loguear** (si la cancelaste → relog).\n\n**Atajo:** puedes subir del 1 al stage objetivo farmeando solo los mobs de ese stage.\n\n**Stages → arma:**\n• D: Stage 2/3/4 · C: 5/6/7/8 · B: 9/10 · A: 11/12/13\n• Insertar: Blacksmith + Gemstones del grado. Quitar SA: Blacksmith (el cristal **no** vuelve).\n\n**Farm rápido:**\n• Stage 2–4: Ol Mahum / Ants / Hatu / Porta\n• Stage 5–6: Timak Orcs / Blade Stakato\n• Stage 7–8: Forest of Mirrors / Doll Blader / Sairon\n• Stage 9–10: Drake / Maluk / Platinum Tribe\n• Stage 11+: RBs; Epics Queen Ant/Core/Orfen/Zaken = **100%** party\n\n**Duals:** sin cristal; SA al enchant **+4**.\n**NoGrade:** no admite SA.\n\nWiki: ${W}/lu4/posts/post/367-soul-crystal-sa-enhancement`
    },
    {
      id: "equipo-grados",
      tags: ["equipo", "grado", "grade", "armadura", "arma recomendada", "full plate", "karmian", "ng", "c-grade", "b-grade"],
      q: ["equipo por grados", "qué arma usar", "qué set usar", "armadura recomendada"],
      a: `**Equipo Lu4 por grados:**\n• **NG** — quests de aldea + Seal · sets con bonus (wiki 362)\n• **D** — cupón Path NG→D · Dragon Fangs · Feast · Acts of Evil\n• **C** — Alligator (físicos) o Ivory Tower (magos) · Pastime · Treasure Hunt · **no** Coins of Magic\n• **B/A** — craft / drop / Mammon · sets Avadon→Majestic (wiki 558)\n• **S+** — post Saga / endgame\n\nAbre tu clase en la guía: secciones **Equipo por grados** y **Armas + SA**.\nWiki: ${W}/lu4/posts/post/368-lu4-equipment-quests`
    }
  ];

  /** Respuestas por rango de nivel */
  function answerByLevel(lv) {
    if (lv < 1 || lv > 85) return null;
    let steps = [];
    if (lv <= 17) {
      steps = [
        "Misiones únicas de tu aldea + equipo de raza",
        "Will the Seal be Broken? (16–26) y Dragon Fangs (19–29) cuando puedas",
        "Farmea monstruos blancos (−5/+4)",
        "Al 18: Path de 1ª profesión (250k EXP)"
      ];
    } else if (lv <= 19) {
      steps = [
        "Haz el **Path** de tu clase (18+) → 250k EXP",
        "Dragon Fangs si no lo terminaste",
        "Empieza Magnificent Feast en Dion (20+)"
      ];
    } else if (lv <= 29) {
      steps = [
        "Magnificent Feast + Adept of Taste / Fantasy Wine (Dion)",
        "Red-Eyed Invaders (20–28) — mucha EXP",
        "Acts of Evil (27–32) para armadura D",
        "Crypts of Disgrace en grupo (~30–36)"
      ];
    } else if (lv <= 34) {
      steps = [
        "Crypts of Disgrace (Elite 33–35) en grupo 5–9",
        "Song of the Hunter (Grey en Hunter's Village)",
        "Prepara la cadena del Templo (desde 35)"
      ];
    } else if (lv <= 39) {
      steps = [
        "**PRIORIDAD:** Temple Executor chain (antes del 45)",
        "Empieza las marcas 3-en-1 de tu 2ª (disponibles desde 35)",
        "Crypts / transición a Grave Robber Hideout cerca del 40"
      ];
    } else if (lv <= 44) {
      steps = [
        "Toma la **2ª profesión** al 40",
        "**Kusto** + termina el **Templo** ANTES del 45",
        "Alligator (físicos/chamán) o Ivory Tower (magos/chamán)",
        "Grave Robber Hideout (Elite 42–45)"
      ];
    } else if (lv <= 51) {
      steps = [
        "Den of Evil (~47–57)",
        "Warehouse Pastime / Treasure Hunt / Song of the Hunter",
        "Al 52: Fate's Whisper → subclase"
      ];
    } else if (lv <= 59) {
      steps = [
        "Subclase si todavía no la tienes",
        "Den of Evil → Caron's Dungeon (59–60)",
        "Sigue misiones de Cazador / adena"
      ];
    } else if (lv <= 65) {
      steps = [
        "Caron's Dungeon / Archaic Laboratory",
        "Prepara rumbo a Hatoum (~68–72)"
      ];
    } else if (lv <= 73) {
      steps = [
        "Hatoum Settlement en grupo",
        "**72+:** The Finest Ingredients → Cristal de Hielo",
        "**72–74:** Alianza Ketra o Varka → Piedra Divina de la Sabiduría"
      ];
    } else if (lv <= 75) {
      steps = [
        "Isle of Prayer (máx. 3) o Chromatic Highlands (grupo)",
        "Asegura Cristal de Hielo + Piedra Divina",
        "Al 76: Saga de tu clase → 3ª"
      ];
    } else if (lv <= 85) {
      steps = [
        "Saga si aún no eres 3ª clase",
        "Chromatic Highlands / Pagan Temple / Fairy Settlement",
        "Respeta ventana −5/+4 y Fatiga (misiones si estás Worn)",
        "Tope 85 + subclase 85"
      ];
    }
    return `**Nivel ${lv} — qué hacer en Lu4:**\n\n` + steps.map((s, i) => `${i + 1}. ${s}`).join("\n") +
      `\n\nConsejo: si Fatiga está en Worn → solo misiones. Grupo 5–9 en Élite.`;
  }

  function normalize(s) {
    return (s || "")
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/[¿?¡!.,;:()]/g, " ")
      .replace(/\s+/g, " ")
      .trim();
  }

  function extractLevel(text) {
    const n = normalize(text);
    let m = n.match(/(?:nivel|lv|lvl|level)\s*(\d{1,2})/);
    if (m) return +m[1];
    m = n.match(/\b(\d{1,2})\b/);
    if (m) {
      const v = +m[1];
      if (v >= 1 && v <= 85 && /(que|qué|hacer|farmear|ir|donde|dónde|zona|subir|estoy|tengo|llegue|llegué)/.test(n)) {
        return v;
      }
    }
    return null;
  }

  function scoreEntry(entry, qNorm, tokens) {
    let score = 0;
    for (const t of entry.tags) {
      const tn = normalize(t);
      if (qNorm.includes(tn)) score += tn.length > 3 ? 6 : 3;
      for (const tok of tokens) {
        if (tn.includes(tok) || tok.includes(tn)) score += 2;
      }
    }
    for (const qq of entry.q || []) {
      const qn = normalize(qq);
      if (qNorm.includes(qn) || qn.includes(qNorm)) score += 10;
      // token overlap
      const qt = qn.split(" ");
      const overlap = qt.filter(t => t.length > 2 && tokens.includes(t)).length;
      score += overlap * 3;
    }
    // id boost for exact class words
    if (qNorm.includes(normalize(entry.id.replace(/-/g, " ")))) score += 4;
    return score;
  }

  function formatAnswer(text) {
    let s = (text || "")
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>")
      .replace(/\[([^\]]+)\]\((https?:\/\/[^)]+)\)/g, '<a href="$2" target="_blank" rel="noopener">$1</a>');
    // Enlazar URLs sueltas sin tocar las que ya están en href=
    s = s.replace(/(^|[^"'>=])(https?:\/\/[^\s<]+)/g, '$1<a href="$2" target="_blank" rel="noopener">$2</a>');
    return s.replace(/\n/g, "<br>");
  }

  /** Historial corto de la sesión (para “Nueva charla”). */
  let history = [];

  function clearHistory() {
    history = [];
  }

  function pushHistory(role, text) {
    history.push({ role, text: String(text || "").slice(0, 4000) });
    while (history.length > MAX_HISTORY) history.shift();
  }

  function defaultSuggestions(topic) {
    const base = [
      { label: "Nivel 18", q: "¿Qué hago en el nivel 18?" },
      { label: "Nivel 40", q: "¿Qué hago en el nivel 40?" },
      { label: "Soul Crystal", q: "Explícame cómo conseguir y levear Soul Crystals" },
      { label: "Gemstone C", q: "¿Cómo consigo Gemstone C?" }
    ];
    if (topic === "level") {
      return [
        { label: "¿Y después?", q: "¿Y qué hago después de eso?" },
        { label: "Dónde farmear", q: "¿Dónde farmear en este nivel?" },
        { label: "Si estoy fatigado", q: "Si estoy Battle Worn, ¿qué hago?" },
        { label: "Templo", q: "¿Cuándo hago el Temple?" }
      ];
    }
    if (topic === "class") {
      return [
        { label: "Armas", q: "¿Qué armas y sets me recomiendas?" },
        { label: "Path 18", q: "Explícame el Path de mi clase paso a paso" },
        { label: "Antes del 45", q: "¿Qué quests debo hacer antes del 45?" },
        { label: "SA", q: "Cómo pongo SA a mi arma" }
      ];
    }
    if (topic === "item") {
      return [
        { label: "Steel", q: "¿Cómo consigo Steel?" },
        { label: "Gemstone C", q: "¿Dónde dropea Gemstone C?" },
        { label: "Enria", q: "¿Cómo consigo Enria?" },
        { label: "Soul Crystal", q: "Cómo levear Soul Crystal" }
      ];
    }
    return base;
  }

  function suggestionsForLocal(result) {
    const src = (result && result.sources) || [];
    if (src.some(s => String(s).startsWith("Nivel"))) return defaultSuggestions("level");
    if (src.some(s => String(s).startsWith("class-"))) return defaultSuggestions("class");
    return defaultSuggestions();
  }

  function answer(question, ctx) {
    const raw = (question || "").trim();
    ctx = ctx || {};
    if (!raw) {
      return {
        html: formatAnswer("Escribe una pregunta sobre Lu4 (nivel, NPC, quest, zona, clase, material…)."),
        sources: [],
        suggestions: defaultSuggestions(),
        mode: "local"
      };
    }
    const qNorm = normalize(raw);
    const tokens = qNorm.split(" ").filter(t => t.length > 2);
    const G = global.Lu4Guides;
    const I = global.Lu4Items;
    const Rag = global.Lu4Rag;

    if (/^(hola|hey|buenas|hi|hello|que tal|qué tal)\b/.test(qNorm)) {
      const st = Rag && Rag.status ? Rag.status() : null;
      const n = st && st.chunks ? st.chunks : "…";
      return {
        html: formatAnswer(
          `¡Hola! Soy el asistente **Lu4** con índice RAG local (**${n} trozos** de la guía, SA, clases e ítems).\n\nPregúntame:\n• «Explícame el Path de Storm Screamer»\n• «¿Qué armas uso de C a B?»\n• «¿Cómo consigo Gemstone C?»\n• «¿Qué hago en el 40?»`
        ),
        sources: [],
        suggestions: defaultSuggestions(),
        mode: "local"
      };
    }

    // 1) RAG — recuperación sobre todo el corpus “entrenado”
    if (Rag && Rag.answer) {
      if (!Rag.status().ready) Rag.train();
      const rag = Rag.answer(raw, { classId: ctx.classId, limit: 5 });
      if (rag && rag.score >= 10) {
        let html = formatAnswer(rag.text);
        // Complemento corto de nivel si aplica
        const lv = extractLevel(raw);
        if (lv != null && /(que|qué|hacer|hago|nivel)/.test(qNorm)) {
          const byLv = answerByLevel(lv);
          if (byLv) html += "<br><br><hr style='border-color:#3a4454;margin:10px 0'>" + formatAnswer(byLv);
        }
        return {
          html,
          sources: rag.sources,
          suggestions: defaultSuggestions(
            /(item|gemstone|steel|material|drop)/.test(qNorm) ? "item"
              : (G && G.findClassByText && G.findClassByText(raw)) || ctx.classId ? "class"
                : "level"
          ),
          mode: "rag"
        };
      }
    }

    // 2) Ítems / materiales (prioridad si RAG flojo)
    if (I && /(dropea|drop|spoil|material|conseguir|gemstone|crystal|steel|acero|enria|asofe|thons|varnish|animal skin|mithril|oriharukon|mold|soul crystal stage)/.test(qNorm)) {
      const hits = I.searchItems(raw, 6);
      if (hits.length) {
        const body = hits.map(it => I.explainItem(it)).join("\n\n---\n\n");
        return {
          html: formatAnswer("Encontré esto en el índice Lu4:\n\n" + body +
            "\n\nSi no es el ítem exacto, usa el buscador **Items** de la guía o: " + I.wikiItemSearchUrl(raw)),
          sources: hits.map(h => "item-" + h.id),
          suggestions: defaultSuggestions("item"),
          mode: "local"
        };
      }
    }

    // 3) Digests de la guía
    if (G && G.explainGuideTopic) {
      const explained = G.explainGuideTopic(raw, ctx);
      if (explained && (/(explica|explicame|explícame|cómo|como|armas|equipo|sa|path|saga|mi clase|guía|guia|set|soul)/.test(qNorm) || G.findClassByText(raw) || ctx.classId)) {
        const rankedQuick = KB.map(e => ({ e, s: scoreEntry(e, qNorm, tokens) }))
          .filter(x => x.s >= 8)
          .sort((a, b) => b.s - a.s)
          .slice(0, 1);
        let html = formatAnswer(explained);
        if (rankedQuick[0]) {
          html += "<br><br><hr style='border-color:#3a4454;margin:10px 0'>" + formatAnswer(rankedQuick[0].e.a);
        }
        return {
          html,
          sources: ["guide-digest"],
          suggestions: defaultSuggestions(G.findClassByText(raw) || ctx.classId ? "class" : "item"),
          mode: "local"
        };
      }
    }

    const lv = extractLevel(raw);
    if (
      lv != null &&
      (/(que|qué|hacer|hago|farmear|ir|zona|subir|estoy|tengo|lleg|consejo|ruta)/.test(qNorm) ||
        /(nivel|lv|lvl|level)/.test(qNorm))
    ) {
      let a = answerByLevel(lv);
      if (a && G && ctx.classId && G.getClass) {
        const cls = G.getClass(ctx.classId);
        if (cls) {
          const rows = G.getRoadmapRows(cls).filter(r => lv >= r.min - 2 && lv <= r.max + 4).slice(0, 5);
          if (rows.length) {
            a += "\n\n**Para " + cls.name + " en ~" + lv + ":**\n" +
              rows.map((r, i) => (i + 1) + ". " + r.nombre + " — " + r.detalle).join("\n");
          }
        }
      }
      if (a) {
        return {
          html: formatAnswer(a),
          sources: [`Nivel ${lv}`],
          suggestions: defaultSuggestions("level"),
          mode: "local"
        };
      }
    }

    const ranked = KB.map(e => ({ e, s: scoreEntry(e, qNorm, tokens) }))
      .filter(x => x.s > 0)
      .sort((a, b) => b.s - a.s);

    if (G && G.findClassByText) {
      const cls = G.findClassByText(raw);
      if (cls && (!ranked.length || ranked[0].s < 8)) {
        return {
          html: formatAnswer(G.classDigest(cls)),
          sources: ["class-" + cls.id],
          suggestions: defaultSuggestions("class"),
          mode: "local"
        };
      }
    }

    if (!ranked.length || ranked[0].s < 4) {
      const wikiItem = I ? I.wikiItemSearchUrl(raw) : W + "/lu4/search";
      return {
        html: formatAnswer(
          "No encontré una respuesta clara en el índice.\n\nPrueba:\n• Nivel: «qué hago en el 35»\n• Clase: «explícame Destroyer»\n• SA: «cómo levear Soul Crystal»\n• Ítem: «Gemstone C» / «Steel»\n\nWiki ítems: " + wikiItem
        ),
        sources: [],
        suggestions: defaultSuggestions(),
        mode: "local"
      };
    }

    const top = ranked.slice(0, 2);
    let html = formatAnswer(top[0].e.a);
    if (top[1] && top[1].s >= top[0].s * 0.7 && top[1].s >= 6) {
      html += "<br><br><hr style='border-color:#3a4454;margin:10px 0'>" + formatAnswer(top[1].e.a);
    }
    if (G && G.explainGuideTopic) {
      const extra = G.explainGuideTopic(raw, ctx);
      if (extra && extra.length > 80) {
        html += "<br><br><hr style='border-color:#3a4454;margin:10px 0'><strong>Desde la guía:</strong><br>" + formatAnswer(extra);
      }
    }
    const result = {
      html,
      sources: top.map(t => t.e.id),
      mode: "local"
    };
    result.suggestions = suggestionsForLocal(result);
    return result;
  }

  /**
   * Respuesta: IA (Groq) + RAG si está configurada; si no, índice local.
   * ctx: { className, raceName, level, classId }
   */
  async function ask(question, ctx) {
    const raw = (question || "").trim();
    if (!raw) {
      return {
        html: formatAnswer("Escribe una pregunta sobre Lu4…"),
        sources: [],
        suggestions: defaultSuggestions(),
        mode: "local"
      };
    }

    const Ai = global.Lu4Ai;
    if (Ai && Ai.hasAi()) {
      try {
        const res = await Ai.chat(raw, ctx || {});
        pushHistory("user", raw);
        pushHistory("model", res.text.slice(0, 800));
        return {
          html: formatAnswer(res.text),
          sources: ["ai-groq"],
          suggestions: defaultSuggestions(),
          mode: "ai"
        };
      } catch (e) {
        const msg = String(e.message || e)
          .replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
        const local = answer(raw, ctx || {});
        pushHistory("user", raw);
        pushHistory("model", local.html.replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim().slice(0, 800));
        let hint = "";
        if (/Failed to fetch|CORS|NetworkError/i.test(String(e.message || e))) {
          hint = " El navegador bloqueó Groq (CORS): usa el Cloudflare Worker o solo la URL del worker.";
        }
        return {
          html: "<p class='chat-fallback-note'>IA no disponible (" + msg + ")." + hint + " Respuesta del índice local:</p>" + local.html,
          sources: local.sources,
          suggestions: local.suggestions || defaultSuggestions(),
          mode: "local-fallback"
        };
      }
    }

    const local = answer(raw, ctx || {});
    pushHistory("user", raw);
    pushHistory("model", local.html.replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim().slice(0, 800));
    return local;
  }

  global.Lu4Chat = {
    answer,
    ask,
    KB,
    answerByLevel,
    clearHistory,
    formatAnswer,
    defaultSuggestions
  };
})(window);
