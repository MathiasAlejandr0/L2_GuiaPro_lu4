/**
 * Lu4 Guide Chat — base de conocimiento local (wiki Lu4 / MasterWork)
 * Responde en español sin API externa.
 */
(function (global) {
  const W = "https://masterwork.wiki";

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
      a: `**Cadena del Ejecutor del Templo (35–45)** — HACELA ANTES DEL 45 (después no da EXP/SP).\n\nOrden: Misionero → Ejecutor → Campeón 1 → Campeón 2 → Zorro de las Sombras 1–3 → Ángel Caído Amanecer **o** Anochecer.\n\nTotal ≈ **2.5–2.7M EXP** + adena/consumibles.\n\nWiki: ${W}/lu4/posts/post/380-temple-executor-quest-chain-35`
    },
    {
      id: "kusto",
      tags: ["kusto", "relic exploration", "nikola", "vain conclusion", "loraine"],
      q: ["qué es kusto", "cadena kusto"],
      a: `**Cadena Kusto (40–45)** — también **antes del 45**.\n\n4 misiones (~590–615k EXP):\nRelic Exploration → Nikola (elección) → Heart/Seal/Contract → Lost Dream / Vain Conclusion / Contract Completion.\n\nNPC inicio: **Herrero Jefe Kusto** (Herrería de Giran).\n\nWiki: ${W}/lu4/posts/post/386-lu4-kusto-quest-chain-40`
    },
    {
      id: "alligator",
      tags: ["alligator", "alligators", "cazador", "enverun", "heine", "fisico", "warrior"],
      q: ["alligator hunter", "dónde es alligator"],
      a: `**Cazador de cocodrilos / Alligator Hunter (40–47)** — solo **guerreros y chamanes orcos** con 2ª profesión.\n\nNPC: **Enverun** (comerciante de accesorios) — Heine, tienda de comestibles.\nRecompensas: adena, equipo C/D, pergaminos, tintes, EXP por minijuegos.\n\nMagos: usa **Bajo la sombra de la Torre de Marfil** en vez de esta.`
    },
    {
      id: "ivory",
      tags: ["ivory", "ivory tower", "cema", "hardin", "mage", "mistico", "nebulite"],
      q: ["ivory tower quest", "shadow of the ivory"],
      a: `**Bajo la sombra de la Torre de Marfil (40–47)** — solo **místicos y chamanes orcos** con 2ª.\n\nNPC: **Cema** (comerciante mágico) — Academia de Hardin (territorio de Giran).\nFarmea Orbes de Nebulita → juegos / lotería → equipo C, tintes, EXP.\n\nWiki equipo: ${W}/lu4/posts/post/368-lu4-equipment-quests`
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
      a: `**Coleccionista Pippi** — norte de la **Aldea Enana**. Inicia *Path of the Scavenger* (18+).\nCambio a Scavenger: **Jefe de Almacén Moke** en el Almacén de **Gludin**.`
    },
    {
      id: "npc-mion",
      tags: ["mion", "grocer mion"],
      q: ["dónde está mion"],
      a: `**Mion (tendera)** — tienda de comestibles de la **Aldea Enana**. Parte del Path Scavenger (entregas hasta la Carta de Mion).`
    },
    {
      id: "npc-toma",
      tags: ["toma", "master toma"],
      q: ["dónde está toma", "master toma"],
      a: `**Master Toma** — Zona de Minería Occidental (isla cerca de la desembocadura del río).\nEn **Lu4 no teleporta**: existe a la vez en todos sus hábitats.`
    },
    {
      id: "npc-karukia",
      tags: ["karukia", "orc raider", "hall of kings"],
      q: ["dónde está karukia"],
      a: `**Prefecto Karukia** — 1er piso del **Salón de los Reyes**, Aldea Orco. Inicia *Path of the Orc Raider*.\nCambio de clase: **Alto Prefecto Osborn**, Gremio Orco de **Gludin**.`
    },
    {
      id: "npc-kasman",
      tags: ["kasman"],
      q: ["dónde está kasman"],
      a: `**Prefecto Kasman** — Gremio Orco de **Gludin**. Parte del Path Orc Raider.`
    },
    {
      id: "npc-varika",
      tags: ["varika", "altar of rites", "dark wizard"],
      q: ["dónde está varika"],
      a: `**Bruja Varika** — pie del **Altar de los Ritos**, sur de las tierras de Elfos Oscuros. Inicia *Path of the Dark Wizard*.\nCambio: **Grand Master Tobias**, Gremio DE de **Gludio**.`
    },
    {
      id: "npc-arkenia",
      tags: ["arkenia", "hub scent"],
      q: ["dónde está arkenia", "hub scent"],
      a: `**Bruja Arkenia** — cerca del **Altar de los Ritos** (tierras DE). Te da **Hub Scent** — sin eso pueden fallar drops del Path Dark Wizard (Hearts of Lunacy).`
    },
    {
      id: "npc-kusto",
      tags: ["kusto blacksmith", "head blacksmith kusto"],
      q: ["dónde está kusto"],
      a: `**Herrero Jefe Kusto** — Herrería de **Giran**. Inicia la cadena Relic Exploration / Kusto (40–45).`
    },
    {
      id: "npc-enverun",
      tags: ["enverun"],
      q: ["dónde está enverun"],
      a: `**Enverun** (accesorios) — **Heine**, tienda de comestibles. Misión *Alligator Hunter* (40–47).`
    },
    {
      id: "npc-cema",
      tags: ["cema"],
      q: ["dónde está cema"],
      a: `**Cema** (comerciante mágico) — **Academia de Hardin** (territorio de Giran). Misión *Bajo la sombra de la Torre de Marfil* (40–47).`
    },
    {
      id: "npc-fairen",
      tags: ["fairen", "storm screamer saga"],
      q: ["dónde está fairen"],
      a: `**Grand Magister Fairen** — **4º piso de la Torre de Marfil**. Inicia *Saga of the Storm Screamer* (76+).`
    },
    {
      id: "npc-tazki",
      tags: ["tazki", "titan saga"],
      q: ["dónde está tazki"],
      a: `**Prefecto Tazki** — Gremio de Guerreros de **Rune**. Inicia *Saga of the Titan* (76+).`
    },
    {
      id: "npc-mond",
      tags: ["mond", "fortune seeker saga"],
      q: ["dónde está mond"],
      a: `**Inspector Jefe Mond** — Almacén de **Rune**. Inicia *Saga of the Fortune Seeker* (76+).`
    },
    {
      id: "npc-grey",
      tags: ["grey", "song of hunter", "hunter guild", "hunter's village"],
      q: ["dónde está grey", "song of the hunter"],
      a: `**Grey (miembro del gremio)** — edificio central de la **Aldea de los Cazadores**. Misión *Canción del Cazador* (30+, reworkeada en Lu4).\nWiki: ${W}/lu4/posts/post/379-lu4-quest-song-of-hunter-30`
    },
    {
      id: "npc-ranspo",
      tags: ["ranspo", "magnificent feast", "dion feast"],
      q: ["magnificent feast", "dónde feast"],
      a: `**Festín Magnífico (20–40)** — Jefe de Almacén de Dion **Ranspo**.\nCadena previa: Vino Fantástico (Harlan), Adepto del Gusto (Jonas), Sacar el Sabor (Rollant), partituras de músicos (Barbado/Nanarin/Swan).\nRecompensa: joyería D al azar.`
    },

    // —— Clases fichas ——
    {
      id: "class-spoiler",
      tags: ["spoiler", "scavenger", "bounty hunter", "fortune seeker", "enano", "dwarf spoil"],
      q: ["guía spoiler", "cómo subir spoiler", "fortune seeker"],
      a: `**Spoiler → Fortune Seeker (Enano)**\n\n1. Inicio enano: Jaleo de diamantes, Negocio encubierto (Anillo del Mapache)\n2. **18:** Path Scavenger — Pippi → Mion → Toma (Spoil) → Moke en Gludin\n3. **35–40:** 3-en-1 BH (Guildsman+Prosperity+Searcher) — prepara Acero/Barniz/Piel/Cristales\n4. **Antes del 45:** Templo + Kusto + Alligator\n5. **76:** Saga Mond (Almacén de Rune) — Cristal de Hielo + Piedra Divina\n\nPath: ${W}/lu4/posts/post/77-path-of-the-scavanger-18\n3-en-1: ${W}/lu4/posts/post/319-3-in-1-bounty-hunter-profession-quest\nSaga: ${W}/lu4/posts/post/433-saga-of-the-fortune-seeker-76`
    },
    {
      id: "class-destroyer",
      tags: ["destroyer", "titan", "orc raider", "destru"],
      q: ["guía destroyer", "cómo subir destroyer", "titan"],
      a: `**Destroyer → Titan (Orco)**\n\n1. Inicio: ¡Larga vida al Señor Pa'agrio!, Prueba de valor, Castigo sin piedad (Espada del Carnicero)\n2. **18:** Path Raider — Karukia → dientes Kuruka → Kasman → Umbar Orcs → Osborn Gludin\n3. **35–40:** 3-en-1 Destroyer (Challenger+Glory+Champion)\n4. **Antes del 45:** Templo + Kusto + Alligator\n5. **76:** Saga Tazki (Gremio de Guerreros de Rune)\n\nPath: ${W}/lu4/posts/post/69-path-of-the-orc-raider-18\n3-en-1: ${W}/lu4/posts/post/315-3-in-1-destroyer-profession-quest\nSaga: ${W}/lu4/posts/post/428-saga-of-the-titan-76`
    },
    {
      id: "class-storm",
      tags: ["storm screamer", "storm", "spellhowler", "dark wizard", "ss"],
      q: ["guía storm screamer", "cómo subir storm", "spellhowler"],
      a: `**Storm Screamer (Elfo Oscuro)**\n\n1. Inicio DE: Verdad olvidada (libro), Sello, Colmillos de dragón\n2. **18:** Path Dark Wizard — Varika → Arkenia (**Hub Scent**) → Annika → Charkeren → Tobias Gludio\n3. **35–40:** 3-en-1 Spellhowler (Scholar+Fate+Magus)\n4. **Antes del 45:** Templo + Kusto + **Torre de Marfil** (no Alligator)\n5. **76:** Saga Fairen (Torre de Marfil 4º piso) — Allector se mata **con skills**\n\nPath: ${W}/lu4/posts/post/81-path-of-the-dark-wizard-18\n3-en-1: ${W}/lu4/posts/post/312-3-in-1-spellhowler-profession-quest\nSaga: ${W}/lu4/posts/post/425-saga-of-the-storm-screamer-76`
    },

    // —— Zonas ——
    {
      id: "zone-crypts",
      tags: ["crypts", "crypts of disgrace", "schuttgart", "33", "34", "35", "30-36"],
      q: ["dónde farmear 30", "crypts"],
      a: `**Criptas de la Desgracia** — monstruos Élite **33–35**, pensado para **grupo**. Ideal niveles ~30–36.\nWiki: ${W}/lu4/posts/post/322-update-crypts-of-disgrace-3236`
    },
    {
      id: "zone-grave",
      tags: ["grave robber", "grave", "42", "43", "44", "45", "40-48"],
      q: ["dónde farmear 40", "grave robber"],
      a: `**Guarida de los ladrones de tumbas** — Élite **42–45**, grupo. Ideal ~40–48.\nWiki: ${W}/lu4/posts/post/323-update-grave-robber-hideout-4050`
    },
    {
      id: "zone-den",
      tags: ["den of evil", "den", "47", "50", "55", "57"],
      q: ["dónde farmear 50", "den of evil"],
      a: `**Guarida del Mal (Den of Evil)** — ~47–57. Sirve solo, grupo chico o grupo completo.\nWiki: ${W}/lu4/posts/post/324-update-den-of-evil-4757`
    },
    {
      id: "zone-caron",
      tags: ["caron", "caron's", "59", "60", "56-64"],
      q: ["dónde farmear 60", "caron"],
      a: `**Mazmorra de Caron** — Élite **59–60**, grupo. Ideal ~56–64.\nWiki: ${W}/lu4/posts/post/325-update-carons-dungeon-5664`
    },
    {
      id: "zone-lab",
      tags: ["archaic", "laboratory", "lab", "61", "65"],
      q: ["archaic laboratory"],
      a: `**Laboratorio Arcaico** — ~60–65.\nWiki: ${W}/lu4/posts/post/326-update-archaic-laboratory-6065`
    },
    {
      id: "zone-hatoum",
      tags: ["hatoum", "66", "68", "70", "72", "74"],
      q: ["hatoum", "dónde farmear 70"],
      a: `**Asentamiento Hatoum** — grupo ~**68–72**, misión pasiva de recetas.\nWiki: ${W}/lu4/posts/post/174-new-hatoum-settlement-6674`
    },
    {
      id: "zone-iop",
      tags: ["isle of prayer", "chromatic", "74", "75", "76", "77", "78", "80", "83", "island"],
      q: ["isle of prayer", "chromatic", "dónde farmear 80"],
      a: `**Isla de la Oración / Tierras Altas Cromáticas (74–83)**\n• Isla: mecánica *no more than three* → **máx. 3 jugadores**\n• Cromáticas: grupo grande + dragones reworkeados (buena EXP)\nWiki: ${W}/lu4/posts/post/171-isle-of-prayer-and-chromatic-highlands-7483`
    },
    {
      id: "zone-pagan",
      tags: ["pagan", "pagan temple", "78-83"],
      q: ["pagan temple"],
      a: `**Templo Pagano (78–83)** — monstruos ~80, solo/grupo, farmeo A/S.\nWiki: ${W}/lu4/posts/post/241-update-pagan-temple-7883`
    },
    {
      id: "zone-fairy",
      tags: ["fairy", "fairy settlement", "78-85", "85"],
      q: ["fairy settlement"],
      a: `**Asentamiento de las Hadas (78–85)** — 3 zonas de dificultad + misiones semanales.\nWiki: ${W}/lu4/posts/post/173-new-fairy-settlement-7885`
    },

    // —— Quests sueltas ——
    {
      id: "dragon-fangs",
      tags: ["dragon fangs", "fangs", "19", "langk"],
      q: ["dragon fangs"],
      a: `**Colmillos de dragón (19–29)** — gran EXP (~350k) + armadura D al azar.\nInicio: Guardia Luis (zona Gludin / cadena lagartos Langk).\nWiki: ${W}/quest/38/lu4`
    },
    {
      id: "red-eyed",
      tags: ["red-eyed", "red eyed", "invaders", "20", "28", "babenco"],
      q: ["red-eyed invaders"],
      a: `**Invasores de ojos rojos (20–28)** — única ≈ **280–330k EXP**.\nNPC: **Guardia Babenco**, puerta oeste de Gludio.`
    },
    {
      id: "seal",
      tags: ["seal", "will the seal", "sellado"],
      q: ["will the seal be broken"],
      a: `**¿Se romperá el sello? (16–26)** — misión única. Armadura NG al azar + pergaminos enchant D. Hazla sí o sí en niveles bajos.`
    },
    {
      id: "coins",
      tags: ["coins of magic", "monedas"],
      q: ["coins of magic"],
      a: `**Coins of Magic no está disponible en Lu4.** Usa Alligator / Torre de Marfil / Pasatiempo / Caza del tesoro para grado C.`
    }
  ];

  /** Respuestas por rango de nivel */
  function answerByLevel(lv) {
    if (lv < 1 || lv > 85) return null;
    let steps = [];
    if (lv <= 17) {
      steps = [
        "Misiones únicas de tu aldea + equipo de raza",
        "¿Se romperá el sello? (16–26) y Colmillos de dragón (19–29) cuando puedas",
        "Farmea monstruos blancos (−5/+4)",
        "Al 18: Path de 1ª profesión (250k EXP)"
      ];
    } else if (lv <= 19) {
      steps = [
        "Haz el **Path** de tu clase (18+) → 250k EXP",
        "Colmillos de dragón si no lo terminaste",
        "Empieza la cadena del Festín Magnífico en Dion (20+)"
      ];
    } else if (lv <= 29) {
      steps = [
        "Festín Magnífico + Adepto del gusto / Vino fantástico (Dion)",
        "Invasores de ojos rojos (20–28) — mucha EXP",
        "Actos del mal (27–32) para armadura D",
        "Criptas de la Desgracia en grupo (~30–36)"
      ];
    } else if (lv <= 34) {
      steps = [
        "Criptas de la Desgracia (Élite 33–35) en grupo 5–9",
        "Canción del Cazador (Grey en Aldea de los Cazadores)",
        "Prepara la cadena del Templo (desde 35)"
      ];
    } else if (lv <= 39) {
      steps = [
        "**PRIORIDAD:** cadena del Ejecutor del Templo (antes del 45)",
        "Empieza las marcas 3-en-1 de tu 2ª (disponibles desde 35)",
        "Criptas / transición a Guarida de ladrones cerca del 40"
      ];
    } else if (lv <= 44) {
      steps = [
        "Toma la **2ª profesión** al 40",
        "**Kusto** + termina el **Templo** ANTES del 45",
        "Alligator (físicos/chamán) o Torre de Marfil (magos/chamán)",
        "Guarida de ladrones de tumbas (Élite 42–45)"
      ];
    } else if (lv <= 51) {
      steps = [
        "Guarida del Mal (~47–57)",
        "Pasatiempo del almacén / Caza del tesoro / Canción del Cazador",
        "Al 52: Fate's Whisper → subclase"
      ];
    } else if (lv <= 59) {
      steps = [
        "Subclase si todavía no la tienes",
        "Guarida del Mal → Mazmorra de Caron (59–60)",
        "Sigue misiones de Cazador / adena"
      ];
    } else if (lv <= 65) {
      steps = [
        "Mazmorra de Caron / Laboratorio Arcaico",
        "Prepara rumbo a Hatoum (~68–72)"
      ];
    } else if (lv <= 73) {
      steps = [
        "Asentamiento Hatoum en grupo",
        "**72+:** The Finest Ingredients → Cristal de Hielo",
        "**72–74:** Alianza Ketra o Varka → Piedra Divina de la Sabiduría"
      ];
    } else if (lv <= 75) {
      steps = [
        "Isla de la Oración (máx. 3) o Tierras Altas Cromáticas (grupo)",
        "Asegura Cristal de Hielo + Piedra Divina",
        "Al 76: Saga de tu clase → 3ª"
      ];
    } else if (lv <= 85) {
      steps = [
        "Saga si aún no eres 3ª clase",
        "Cromáticas / Templo Pagano / Asentamiento de las Hadas",
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
    return text
      .replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>")
      .replace(/\n/g, "<br>");
  }

  function answer(question) {
    const raw = (question || "").trim();
    if (!raw) {
      return { html: "Escribe una pregunta sobre Lu4 (nivel, NPC, quest, zona, clase…).", sources: [] };
    }
    const qNorm = normalize(raw);
    const tokens = qNorm.split(" ").filter(t => t.length > 2);

    // Saludos
    if (/^(hola|hey|buenas|hi|hello|que tal|qué tal)\b/.test(qNorm)) {
      return {
        html: formatAnswer("¡Hola! Soy el asistente de la guía **Lu4**.\n\nPregúntame cosas como:\n• «¿Qué hago en el nivel 40?»\n• «¿Dónde está Varika?»\n• «Guía Storm Screamer»\n• «¿Qué es Fatigue?»\n• «¿Dónde farmear 70?»"),
        sources: []
      };
    }

    // Nivel
    const lv = extractLevel(raw);
    if (
      lv != null &&
      (/(que|qué|hacer|hago|farmear|ir|zona|subir|estoy|tengo|lleg|consejo|ruta)/.test(qNorm) ||
        /(nivel|lv|lvl|level)/.test(qNorm))
    ) {
      const a = answerByLevel(lv);
      if (a) return { html: formatAnswer(a), sources: [`Nivel ${lv}`] };
    }

    // Score KB
    const ranked = KB.map(e => ({ e, s: scoreEntry(e, qNorm, tokens) }))
      .filter(x => x.s > 0)
      .sort((a, b) => b.s - a.s);

    if (!ranked.length || ranked[0].s < 4) {
      return {
        html: formatAnswer(
          "No encontré una respuesta clara en la base Lu4.\n\nPrueba ser más específico:\n• Nivel: «qué hago en el 35»\n• NPC: «dónde está Karukia»\n• Clase: «guía destroyer»\n• Zona: «dónde farmear 50»\n• Mecánica: «fatigue» / «temple» / «kusto»\n\nTambién puedes abrir las secciones de esta guía o la wiki: " + W + "/lu4/main"
        ),
        sources: []
      };
    }

    const top = ranked.slice(0, 2);
    let html = formatAnswer(top[0].e.a);
    if (top[1] && top[1].s >= top[0].s * 0.7 && top[1].s >= 6) {
      html += "<br><br><hr style='border-color:#3a4454;margin:10px 0'>" + formatAnswer(top[1].e.a);
    }
    return {
      html,
      sources: top.map(t => t.e.id)
    };
  }

  global.Lu4Chat = { answer, KB, answerByLevel };
})(window);
