/**
 * Guías Lu4 completas: Raza → Clase → Pasos 1–85
 * Fuente: masterwork.wiki/lu4
 */
(function (global) {
  const W = "https://masterwork.wiki";
  const icon = (id) => `${W}/images/wiki/class_icon/class_icon_${id}.png`;
  const art = (id) => `${W}/images/wiki/classes/${id}.png`;

  const SECRETS = [
    {
      title: "1. Fatiga (Fatigue)",
      what: "El servidor te da puntos de fatiga. Cuando se acaban, pasas a estado «agotado» (Battle Worn) y los monstruos dan solo el 10% de experiencia.",
      do: "Si estás agotado: deja de farmear monstruos y haz misiones (Templo, Kusto, Cazador, equipo). Las misiones siempre dan 100%. Se recarga ~06:30 hora del servidor."
    },
    {
      title: "2. Color del monstruo = si vale la pena",
      what: "Solo dan buena EXP y botín los monstruos de tu nivel ± unos pocos. En Lu4 la ventana ideal es de −5 a +4 (nombre en blanco).",
      do: "Caza monstruos blancos. Azules sirven si no hay mejor. Rojos: no. No pierdas tiempo ahí."
    },
    {
      title: "3. Grupo de 5 a 9 personas",
      what: "En Lu4, en un grupo de 5–9, todos reciben la misma EXP por cada kill. Más gente = más kills = subes más rápido.",
      do: "En zonas Élite busca grupo completo (5–9). Solo o dúo es más lento."
    },
    {
      title: "4. Objetos de misión para todo el grupo",
      what: "En Path y marcas, si un compañero recoge el item, también te cuenta a ti.",
      do: "Haz Path y marcas en dúo o grupo. Es mucho más rápido."
    },
    {
      title: "5. Templo y Kusto: antes del nivel 45",
      what: "Estas cadenas dan mucha EXP, pero desde el nivel 45 ya no dan EXP ni SP.",
      do: "Termínalas entre 35 y 44. Si las dejas para después, pierdes ~3 millones de EXP."
    },
    {
      title: "6. Sin mascotas ni pesca",
      what: "En Lu4 no existen pets ni fishing.",
      do: "No hagas misiones de Get a Pet / Help Son / Sister / Uncle. No están."
    },
    {
      title: "7. Cómo conseguir equipo grado C",
      what: "Coins of Magic no existe en Lu4.",
      do: "Usa Alligator Hunter (guerreros/chamanes), Torre de Marfil (magos/chamanes), Pasatiempo del almacén o Caza del tesoro."
    },
    {
      title: "8. Path (1ª clase) entre 18 y 20",
      what: "El Path da 250.000 EXP, pero si lo haces después del nivel 26 esa EXP se pierde (igual te dan objetos).",
      do: "Hazlo apenas llegues a 18. No esperes."
    },
    {
      title: "9. Marcas de 2ª clase desde el 35",
      what: "Cada marca da ~750.000 EXP. Las tres = ~2.25M. Se pueden empezar en 35.",
      do: "Empieza las marcas en 35 (guía 3-en-1 de tu clase). Cambias de clase al 40."
    },
    {
      title: "10. Preparar la Saga (antes del 76)",
      what: "Para la 3ª clase necesitas dos items especiales.",
      do: "Desde 72: Cristal de Hielo (The Finest Ingredients). Desde 74: Piedra Divina (alianza Ketra o Varka nivel 2)."
    }
  ];

  const RACES = {
    human: {
      id: "human", name: "Humano", village: "Aldea de la Isla que Habla (Talking Island)",
      raceIcon: `${W}/i64/t_ic_humanoid_big.png`,
      blurb: "Empiezas en la Isla que Habla. Casi todos los Paths de 1ª clase se hacen después en Gludin o Gludio.",
      starters: [
        { lv: "2–5", name: "Cartas de amor (Letters of Love)", npc: "Darin — plaza central de Talking Island", reward: "Collar del conocimiento (NG)", tip: "Misión única — joyería" },
        { lv: "2–7", name: "Entregar mercancías (Deliver Goods)", npc: "Guardia Arnold — puerta sureste", reward: "Anillo del conocimiento ×2 + EXP", tip: "Obligatoria" },
        { lv: "2–7", name: "Sacrificio al mar (Sacrifice to the Sea)", npc: "Rockswell — faro", reward: "Pendiente místico + EXP", tip: "Muy útil para magos" },
        { lv: "3–6", name: "Buscar a Sir Windawood", npc: "Guardia Abellos — puerta sureste", reward: "Pociones + EXP", tip: "Rápida" },
        { lv: "3–6", name: "Otras misiones únicas de la isla", npc: "Guardias de Talking Island", reward: "EXP / Adena", tip: "Completa todas" },
        { lv: "5–9", name: "Recuperar mercancía de contrabando", npc: "Talking Island", reward: "Escudo de esqueleto (NG)", tip: "Escudo" },
        { lv: "9–16", name: "Espada de la solidaridad (solo humano)", npc: "Cadena en Talking Island", reward: "Espada de la solidaridad (NG)", tip: "Arma clave cuerpo a cuerpo" },
        { lv: "10–14", name: "Recolectar puntas de flecha", npc: "Talking Island", reward: "Armadura NG / arco al azar", tip: "Prioridad arquero/pícaro" },
        { lv: "10–15", name: "Espíritu de los espejos (solo humano)", npc: "Talking Island / Gludio", reward: "Varita del adepto", tip: "Magos" },
        { lv: "15–21", name: "Cura para la fiebre", npc: "Zonas bajas de Gludio", reward: "Escudo de hueso", tip: "Hazla antes del nivel 20–25" },
        { lv: "16–26", name: "¿Se romperá el sello?", npc: "Ver misiones de equipo en la wiki", reward: "Armadura NG + pergaminos D", tip: "OBLIGATORIA" },
        { lv: "19–29", name: "Colmillos de dragón (Dragon Fangs)", npc: "Guardia Luis / lagartos Langk", reward: "~350k EXP + armadura D", tip: "OBLIGATORIA — mucha EXP" }
      ]
    },
    elf: {
      id: "elf", name: "Elfo", village: "Aldea Élfica (Elven Village)",
      raceIcon: `${W}/images/wiki/class_icon/class_icon_18.png`,
      blurb: "Empiezas en la Aldea Élfica. Prioriza armas de Centinela y misiones del Árbol Madre.",
      starters: [
        { lv: "2–5", name: "Lo que quieren las mujeres", npc: "Arujien — oeste de la aldea", reward: "Pendiente o EXP", tip: "Humanos y elfos" },
        { lv: "3–7", name: "Fruto del Árbol Madre", npc: "Andellia — plaza", reward: "Pociones + EXP", tip: "Solo elfo" },
        { lv: "3–7", name: "Petición de Nerupa", npc: "Nerupa — zona inicial", reward: "Pociones + EXP", tip: "Solo elfo" },
        { lv: "3–8", name: "Súplicas de las pixies", npc: "Pixy Murika — puerta sureste", reward: "Adena / pociones", tip: "Repetible" },
        { lv: "10–15", name: "Escaramuza con los orcos", npc: "Solo elfo", reward: "Espada/bastón Red Sunset", tip: "Arma de 1ª" },
        { lv: "12–18", name: "Fiebre del Mar de Esporas", npc: "Solo elfo", reward: "Espada/bastón de Centinela", tip: "Arma fuerte low" },
        { lv: "11–15", name: "Soñando con los cielos", npc: "—", reward: "Anillo de luciérnaga", tip: "Joyería" },
        { lv: "16–26", name: "¿Se romperá el sello?", npc: "—", reward: "Armadura NG + pergaminos D", tip: "OBLIGATORIA" },
        { lv: "19–29", name: "Colmillos de dragón", npc: "Lagartos Langk", reward: "EXP + armadura D", tip: "OBLIGATORIA" }
      ]
    },
    darkelf: {
      id: "darkelf", name: "Elfo Oscuro", village: "Aldea de los Elfos Oscuros",
      raceIcon: `${W}/i64/t_ic_dark_elves_big.png`,
      blurb: "Empiezas en la aldea DE. El Path de Mago Oscuro empieza en el Altar de los Ritos.",
      starters: [
        { lv: "2–5", name: "Misa de la oscuridad", npc: "Undrias — zona inicial", reward: "EXP / Adena", tip: "Solo elfo oscuro" },
        { lv: "3–6", name: "Entregar suministros", npc: "Jenna — puerta este", reward: "EXP / Adena", tip: "Solo elfo oscuro" },
        { lv: "3–7", name: "Cacería de Shilen", npc: "Nelsya — puerta este", reward: "Adena por Bezoar", tip: "Colección" },
        { lv: "10–14", name: "Verdad olvidada", npc: "Solo elfo oscuro", reward: "Daga Eldritch / libro de hechizos", tip: "Elige según tu build" },
        { lv: "10–17", name: "Espíritu del artesano", npc: "Solo elfo oscuro", reward: "Sable de sangre", tip: "Cuerpo a cuerpo" },
        { lv: "11–18", name: "Olor a muerte", npc: "—", reward: "Adena", tip: "Repetible" },
        { lv: "16–26", name: "¿Se romperá el sello?", npc: "—", reward: "Armadura NG", tip: "OBLIGATORIA" },
        { lv: "19–29", name: "Colmillos de dragón", npc: "Lagartos Langk", reward: "EXP + armadura D", tip: "OBLIGATORIA" }
      ]
    },
    orc: {
      id: "orc", name: "Orco", village: "Aldea Orco (Orc Village)",
      raceIcon: `${W}/i64/t_ic_orcs_big.png`,
      blurb: "Meseta Inmortal / Aldea Orco. Los chamanes pueden hacer Alligator e Ivory a partir del 40.",
      starters: [
        { lv: "2–5", name: "¡Larga vida al Señor Pa'agrio!", npc: "Nakusin — puerta este", reward: "Garrote (NG)", tip: "Arma inicial" },
        { lv: "4–8", name: "Prueba de valor", npc: "Solo orco", reward: "Collar de coraje/valor", tip: "Joyería" },
        { lv: "6–14", name: "Invasores de la Tierra Santa", npc: "—", reward: "Adena + munición", tip: "Farmeo + misión" },
        { lv: "6–16", name: "Caza de orcos", npc: "—", reward: "Adena + munición", tip: "Repetible" },
        { lv: "10–16", name: "Castigo sin piedad", npc: "Solo orco", reward: "Espada del carnicero", tip: "Arma clave para Destroyer" },
        { lv: "15–21", name: "Tótem de los Hestui", npc: "—", reward: "Adena", tip: "Colección" },
        { lv: "16–26", name: "¿Se romperá el sello?", npc: "—", reward: "Armadura NG", tip: "OBLIGATORIA" },
        { lv: "19–29", name: "Colmillos de dragón", npc: "Lagartos Langk", reward: "EXP + armadura D", tip: "OBLIGATORIA" }
      ]
    },
    dwarf: {
      id: "dwarf", name: "Enano", village: "Aldea Enana (Dwarven Village)",
      raceIcon: `${W}/i64/t_ic_dwarf_big.png`,
      blurb: "Spoil desde el Path de Scavenger. Muy fuerte en economía en zonas Élite.",
      starters: [
        { lv: "2–5", name: "Favor del minero", npc: "Bolter — camino inicial", reward: "EXP / Adena", tip: "Primera misión" },
        { lv: "5–18", name: "Barrida de bandidos", npc: "—", reward: "Adena", tip: "Colección" },
        { lv: "6–15", name: "Las vetas ocultas", npc: "—", reward: "Adena + munición", tip: "Buen farmeo" },
        { lv: "10–14", name: "Jaleo de diamantes", npc: "Solo enano", reward: "Martillo de platero", tip: "Arma" },
        { lv: "10–16", name: "Negocio encubierto", npc: "Solo enano", reward: "Anillo del mapache", tip: "Joyería clave" },
        { lv: "15–21", name: "Sueño del coleccionista / seda de tarántula", npc: "—", reward: "Adena", tip: "Práctica de spoil" },
        { lv: "16–26", name: "¿Se romperá el sello?", npc: "—", reward: "Armadura NG", tip: "OBLIGATORIA" },
        { lv: "19–29", name: "Colmillos de dragón", npc: "Lagartos Langk", reward: "EXP + armadura D", tip: "OBLIGATORIA" }
      ]
    },
    kamael: {
      id: "kamael", name: "Kamael", village: "Aldea / isla Kamael",
      raceIcon: `${W}/images/wiki/class_icon/class_icon_1.png`,
      blurb: "Trooper (♂) / Warder (♀). Certificados de 2ª desde el 35. Misma ruta general de Lu4.",
      starters: [
        { lv: "1–17", name: "Misiones iniciales Kamael + Sello + Colmillos", npc: "Aldea Kamael", reward: "Equipo / EXP", tip: "Completa las únicas" },
        { lv: "18", name: "Path Trooper o Warder", npc: "Ver Path en la wiki", reward: "250k EXP", tip: "Según el sexo" },
        { lv: "16–26", name: "¿Se romperá el sello?", npc: "—", reward: "Armadura NG", tip: "OBLIGATORIA" },
        { lv: "19–29", name: "Colmillos de dragón", npc: "Lagartos Langk", reward: "EXP + D", tip: "OBLIGATORIA" }
      ]
    }
  };

  /** Primera profesión */
  const FIRST = {
    warrior: {
      race: "human", name: "Warrior", classId: 1,
      pathUrl: `${W}/lu4/posts/post/64-path-of-the-warrior-18`,
      startNpc: "Auron (Master) — Gremio de Guerreros de Gludin",
      changeNpc: "Grand Master en Gludin/Gludio (Gremio de Guerreros)",
      reward: "Medallón del Guerrero + 250k EXP + cupón NG→D",
      opens: ["Gladiator", "Warlord"],
      steps: [
        "Habla con **Auron** (Gremio de Guerreros de Gludin)",
        "Tienda de armas de Gludio: **Simplon**",
        "Ruinas de la Agonía: Skeleton Tracker / Leader → 10 espadas de bronce oxidadas",
        "Vuelve a Simplon → Auron (te da la espada oxidada)",
        "Colina del Molino: Venomous Spider / Arachnid Tracker (según la wiki)",
        "Completa con Auron → cambio a **Warrior**"
      ],
      shots: [
        { alt: "Auron", src: `${W}/file/12168_1035410983_1746185754.jpg` },
        { alt: "Simplon", src: `${W}/file/12169_2215801607_1746185754.jpg` },
        { alt: "Skeleton", src: `${W}/file/12170_3378723605_1746185755.jpg` }
      ]
    },
    knight: {
      race: "human", name: "Human Knight", classId: 4,
      pathUrl: `${W}/lu4/posts/post/74-path-of-the-human-knight-18`,
      startNpc: "Sir Klaus Vasper — cerca del Gremio de Guerreros de Gludin",
      changeNpc: "Grand Master (Caballero)",
      reward: "Espada del Ritual + 250k EXP + cupón NG→D",
      opens: ["Paladin", "Dark Avenger"],
      steps: [
        "**Sir Klaus Vasper** (Gludin)",
        "**Capitán Bezique** — puerta oeste de Gludin",
        "**Suma Sacerdotisa Levian** — Templo de Gludin",
        "Colina del Molino: lagartos Langk / Arachnid / Venomous Spider (objetos del Path)",
        "Vuelve la cadena Bezique/Levian/Klaus → **Human Knight**"
      ],
      shots: [
        { alt: "Klaus", src: `${W}/file/12159_6736251295_1746182981.jpg` },
        { alt: "Bezique", src: `${W}/file/12160_5793654148_1746182981.jpg` },
        { alt: "Levian", src: `${W}/file/12161_7244508518_1746182981.jpg` }
      ]
    },
    rogue: {
      race: "human", name: "Rogue", classId: 7,
      pathUrl: `${W}/lu4/posts/post/80-path-of-the-rogue-18`,
      startNpc: "Capitán Bezique — puerta oeste de Gludin",
      changeNpc: "Grand Master Ramos",
      reward: "Recomendación de Bezique + 250k EXP",
      opens: ["Treasure Hunter", "Hawkeye"],
      steps: [
        "**Bezique** → carta",
        "**Neti** (plaza norte de Gludin) → daga/arco de Neti",
        "Farmea Skeleton Tracker etc. según la wiki",
        "Bandido Ojo de Gato (misión)",
        "Bezique → **Grand Master Ramos** → Rogue"
      ],
      shots: [
        { alt: "Bezique", src: `${W}/file/12160_5793654148_1746182981.jpg` },
        { alt: "Neti", src: `${W}/file/12174_3348290814_1746186456.jpg` },
        { alt: "Ramos", src: `${W}/file/13081_6444142914_1750324695.jpg` }
      ]
    },
    hwizard: {
      race: "human", name: "Human Wizard", classId: 11,
      pathUrl: `${W}/lu4/posts/post/66-path-of-the-human-wizard-18`,
      startNpc: "Parina — Templo de Gludin",
      changeNpc: "Grand Magister de Gludio/Gludin",
      reward: "Cuenta de la Estación + 250k EXP",
      opens: ["Sorcerer", "Necromancer", "Warlock"],
      steps: [
        "**Parina** (Templo de Gludin)",
        "Ruinas de la Desesperación: **Flame Salamander**",
        "Ratman Warrior → Llave de la Llama",
        "**Wind Sylph** / lagartos del Páramo / **Water Undine** (espíritus del Path)",
        "Completa con Parina → **Human Wizard**"
      ],
      shots: [
        { alt: "Parina", src: `${W}/file/12176_1393324132_1746189704.jpg` },
        { alt: "Salamander", src: `${W}/file/12177_3565349460_1746189705.jpg` },
        { alt: "Undine", src: `${W}/file/12181_4974649893_1746189706.jpg` }
      ]
    },
    cleric: {
      race: "human", name: "Cleric", classId: 15,
      pathUrl: `${W}/lu4/posts/post/65-path-of-the-cleric-18`,
      startNpc: "Sacerdote Zigaunt — Templo de Gludin",
      changeNpc: "Sumo Sacerdote / Grand Master Cleric",
      reward: "Marca de la Fe + 250k EXP",
      opens: ["Bishop", "Prophet"],
      steps: [
        "**Zigaunt** → 1ª Carta de Orden",
        "Gludio: **Simplon** → Libro de Simplon ×2",
        "Cadena Vivyann / Praga / Ruin Zombie Leader",
        "**Lionel** y vuelve a Zigaunt → **Cleric**"
      ],
      shots: [
        { alt: "Zigaunt", src: `${W}/file/12186_8584842737_1746191527.jpg` },
        { alt: "Praga", src: `${W}/file/12188_2060651081_1746191527.jpg` },
        { alt: "Lionel", src: `${W}/file/12190_5903296837_1746191528.jpg` }
      ]
    },
    // Otras razas — Paths compactos con enlace a la wiki
    elvenknight: { race: "elf", name: "Elven Knight", classId: 19, pathUrl: `${W}/lu4/posts/post/76-path-of-the-elven-knight-18`, startNpc: "Path Elven Knight (wiki)", changeNpc: "Grand Master Elfo", reward: "250k EXP Lu4", opens: ["Temple Knight", "Swordsinger"], steps: ["Sigue el Path of the Elven Knight en la wiki desde el nivel 18", "En grupo los objetos de misión dropean para todos", "Cambio a Elven Knight → abre Temple Knight / Swordsinger"] },
    elvenscout: { race: "elf", name: "Elven Scout", classId: 22, pathUrl: `${W}/lu4/posts/post/72-path-of-the-elven-scout-18`, startNpc: "Path Elven Scout (wiki)", changeNpc: "Grand Master Elfo", reward: "250k EXP", opens: ["Plains Walker", "Silver Ranger"], steps: ["Path of the Elven Scout al nivel 18", "Cambio → Plains Walker o Silver Ranger"] },
    elvenwizard: { race: "elf", name: "Elven Wizard", classId: 26, pathUrl: `${W}/lu4/posts/post/75-path-of-the-elven-wizard-18`, startNpc: "Rosella — Aldea Élfica", changeNpc: "Sumo Sacerdote Raymond (Gludio)", reward: "250k EXP", opens: ["Spellsinger", "Elemental Summoner"], steps: ["Path of the Elven Wizard al nivel 18", "Cambio en Gludio → Spellsinger o Elemental Summoner"] },
    oracle: { race: "elf", name: "Elven Oracle", classId: 29, pathUrl: `${W}/lu4/posts/post/70-path-of-the-elven-oracle-18`, startNpc: "Path Elven Oracle (wiki)", changeNpc: "Grand Master Elfo", reward: "250k EXP", opens: ["Elven Elder"], steps: ["Path of the Elven Oracle al nivel 18", "Cambio → Elven Elder"] },
    palus: { race: "darkelf", name: "Palus Knight", classId: 32, pathUrl: `${W}/lu4/posts/post/78-path-of-the-palus-knight-18`, startNpc: "Path Palus Knight (wiki)", changeNpc: "Grand Master Elfo Oscuro", reward: "250k EXP", opens: ["Shillien Knight", "Bladedancer"], steps: ["Path Palus Knight al nivel 18", "Cambio → Shillien Knight o Bladedancer"] },
    assassin: { race: "darkelf", name: "Assassin", classId: 35, pathUrl: `${W}/lu4/posts/post/67-path-of-the-assassin-18`, startNpc: "Path Assassin (wiki)", changeNpc: "Grand Master Elfo Oscuro", reward: "250k EXP", opens: ["Abyss Walker", "Phantom Ranger"], steps: ["Path Assassin al nivel 18", "Cambio → Abyss Walker o Phantom Ranger"] },
    darkwizard: {
      race: "darkelf", name: "Dark Wizard", classId: 39,
      pathUrl: `${W}/lu4/posts/post/81-path-of-the-dark-wizard-18`,
      startNpc: "Bruja Varika — Altar de los Ritos",
      changeNpc: "Grand Master Tobias — Gremio DE de Gludio",
      reward: "Joya Oscura + 250k EXP",
      opens: ["Spellhowler", "Phantom Summoner"],
      steps: [
        "**Varika** → Semilla de la Desesperación",
        "**Arkenia** → **Hub Scent** (secreto: sin esto fallan los Hearts)",
        "Annika → esqueletos de la Escuela → Knee Bones",
        "Charkeren → Marsh Zombies → Restos familiares",
        "Ruinas de la Agonía → Hearts of Lunacy",
        "Arkenia/Varika → **Tobias** en Gludio → Dark Wizard"
      ],
      shots: [
        { alt: "Varika", src: `${W}/file/12225_5130904553_1746268722.jpg` },
        { alt: "Arkenia", src: `${W}/file/12221_3772361744_1746267327.jpg` },
        { alt: "Tobias", src: `${W}/file/12219_2891836565_1746266210.jpg` }
      ]
    },
    shillienoracle: { race: "darkelf", name: "Shillien Oracle", classId: 42, pathUrl: `${W}/lu4/posts/post/71-path-of-the-shillien-oracle-18`, startNpc: "Path Shillien Oracle (wiki)", changeNpc: "Grand Master Elfo Oscuro", reward: "250k EXP", opens: ["Shillien Elder"], steps: ["Path Shillien Oracle al nivel 18", "Cambio → Shillien Elder"] },
    orcraider: {
      race: "orc", name: "Orc Raider", classId: 45,
      pathUrl: `${W}/lu4/posts/post/69-path-of-the-orc-raider-18`,
      startNpc: "Prefecto Karukia — Salón de los Reyes",
      changeNpc: "Alto Prefecto Osborn — Gremio Orco de Gludin",
      reward: "Marca del Raider + 250k EXP",
      opens: ["Destroyer"],
      steps: [
        "**Karukia** → Meseta Inmortal Norte",
        "Goblin Tomb Raiders hasta **Kuruka Ratman Leader** → 10 dientes",
        "Karukia → Informe del Traidor (línea Gludin)",
        "**Kasman** en Gludin → Nido de Arañas **Umbar Orc** ×2 cabezas",
        "Kasman → **Osborn** → Orc Raider"
      ],
      shots: [
        { alt: "Karukia", src: `${W}/file/12293_1628390772_1746868529.jpg` },
        { alt: "Kuruka", src: `${W}/file/12295_9626609540_1746868569.jpg` },
        { alt: "Osborn", src: `${W}/file/12298_4977469374_1746868623.jpg` }
      ]
    },
    orcmonk: { race: "orc", name: "Orc Monk", classId: 47, pathUrl: `${W}/lu4/posts/post/68-path-of-the-orc-monk-18`, startNpc: "Path Orc Monk (wiki)", changeNpc: "Alto Prefecto", reward: "250k EXP", opens: ["Tyrant"], steps: ["Path Orc Monk al nivel 18", "Cambio → Tyrant"] },
    orcshaman: { race: "orc", name: "Orc Shaman", classId: 50, pathUrl: `${W}/lu4/posts/post/79-path-of-the-orc-shaman-18`, startNpc: "Path Orc Shaman (wiki)", changeNpc: "Alto Prefecto", reward: "250k EXP", opens: ["Overlord", "Warcryer"], steps: ["Path Orc Shaman al nivel 18", "Cambio → Overlord o Warcryer", "SECRETO: a partir del 40 puedes hacer Alligator e Ivory"] },
    scavenger: {
      race: "dwarf", name: "Scavenger", classId: 54,
      pathUrl: `${W}/lu4/posts/post/77-path-of-the-scavanger-18`,
      startNpc: "Coleccionista Pippi — norte de la Aldea Enana",
      changeNpc: "Jefe de Almacén Moke — Almacén de Gludin",
      reward: "Anillo del Cuervo + 250k EXP",
      opens: ["Bounty Hunter"],
      steps: [
        "**Pippi** → carta → **Mion** (entregas en bucle) → Carta de Mion",
        "**Master Toma** en Minería Occidental (en Lu4 está en todos sus hábitats)",
        "Spoil+Sweep Honey Bear → 5 frascos · Tarántulas → 20 cuentas",
        "Raut en Gludin → Torai en Valle del Dragón → Anillo del Cuervo",
        "**Moke** → Scavenger"
      ],
      shots: [
        { alt: "Pippi", src: `${W}/file/12315_3683284336_1746870042.jpg` },
        { alt: "Mion", src: `${W}/file/12316_1960413220_1746870042.jpg` }
      ]
    },
    artisan: { race: "dwarf", name: "Artisan", classId: 56, pathUrl: `${W}/lu4/posts/post/73-path-of-the-artisan-18`, startNpc: "Path Artisan (wiki)", changeNpc: "Herrero Jefe", reward: "250k EXP", opens: ["Warsmith"], steps: ["Path Artisan al nivel 18", "Cambio → Warsmith"] },
    geomancer: { race: "dwarf", name: "Geomancer", classId: 209, pathUrl: `${W}/lu4/posts/post/153-path-of-geomancer`, startNpc: "Prueba del Geomancer (wiki)", changeNpc: "Ver wiki", reward: "250k EXP", opens: ["Terramancer"], steps: ["Prueba del Geomancer al nivel 18", "Cambio → Terramancer (mago enano)"] },
    trooper: { race: "kamael", name: "Trooper", classId: 1, pathUrl: `${W}/masterwork/posts/post/278-path-of-the-trooper-18`, startNpc: "Path of the Trooper", changeNpc: "Grand Master Kamael", reward: "250k EXP", opens: ["Berserker", "Soul Breaker"], steps: ["Path Trooper al nivel 18 (masculino)", "Certificados de 2ª desde el 35"] },
    warder: { race: "kamael", name: "Warder", classId: 1, pathUrl: `${W}/masterwork/posts/post/277-path-of-the-warder-18`, startNpc: "Path of the Warder", changeNpc: "Grand Master Kamael", reward: "250k EXP", opens: ["Arbalester", "Soul Breaker"], steps: ["Path Warder al nivel 18 (femenino)", "Certificados de 2ª desde el 35"] }
  };

  /** Segunda → tercera (clase final jugable) */
  const CLASSES = [
    // Humano
    { id: "duelist", race: "human", first: "warrior", name: "Duelist", name2: "Gladiator", classId: 2, marks: "Challenger + Trust + Duelist", threeInOne: `${W}/lu4/posts/post/290-3-in-1-gladiator-profession-quest`, saga: `${W}/lu4/posts/post/403-saga-of-the-duelist-76`, sagaNpc: "Saga of the Duelist — wiki 76+", gear: "alligator", role: "Daño cuerpo a cuerpo (dual)", tip: "Excelente daño en grupo en zonas Élite" },
    { id: "dreadnought", race: "human", first: "warrior", name: "Dreadnought", name2: "Warlord", classId: 3, marks: "Challenger + Trust + Champion", threeInOne: `${W}/lu4/posts/post/291-3-in-1-warlord-profession-quest`, saga: `${W}/lu4/posts/post/404-saga-of-the-dreadnought-76`, sagaNpc: "Saga Dreadnought", gear: "alligator", role: "Daño con lanza (área)", tip: "Muy fuerte en grupos de monstruos Élite" },
    { id: "phoenix", race: "human", first: "knight", name: "Phoenix Knight", name2: "Paladin", classId: 5, marks: "Duty + Trust + Healer", threeInOne: `${W}/lu4/posts/post/292-3-in-1-paladin-profession-quest`, saga: `${W}/lu4/posts/post/405-saga-of-the-phoenix-knight-76`, sagaNpc: "Saga Phoenix Knight", gear: "alligator", role: "Tanque / apoyo", tip: "Tanque ideal en zonas Élite" },
    { id: "hell", race: "human", first: "knight", name: "Hell Knight", name2: "Dark Avenger", classId: 6, marks: "Duty + Trust + Witchcraft", threeInOne: `${W}/lu4/posts/post/293-3-in-1-dark-avanger-profession-quest`, saga: `${W}/lu4/posts/post/406-saga-of-the-hell-knight-76`, sagaNpc: "Saga Hell Knight", gear: "alligator", role: "Tanque oscuro", tip: "Similar al Paladín, estilo oscuro" },
    { id: "adventurer", race: "human", first: "rogue", name: "Adventurer", name2: "Treasure Hunter", classId: 8, marks: "Seeker + Trust + Searcher", threeInOne: `${W}/lu4/posts/post/294-3-in-1-treasure-hunter-profession-quest`, saga: `${W}/lu4/posts/post/407-saga-of-the-adventurer-76`, sagaNpc: "Saga Adventurer", gear: "alligator", role: "Daño con daga", tip: "Daga y buen farmeo" },
    { id: "sagittarius", race: "human", first: "rogue", name: "Sagittarius", name2: "Hawkeye", classId: 9, marks: "Seeker + Trust + Sagittarius", threeInOne: `${W}/lu4/posts/post/295-3-in-1-hawkeye-profession-quest`, saga: `${W}/lu4/posts/post/408-saga-of-the-sagittarius-76`, sagaNpc: "Saga Sagittarius", gear: "alligator", role: "Arquero", tip: "Haz temprano la misión de puntas de flecha + gremio de cazadores" },
    { id: "archmage", race: "human", first: "hwizard", name: "Archmage", name2: "Sorcerer", classId: 12, marks: "Scholar + Trust + Magus", threeInOne: `${W}/lu4/posts/post/296-3-in-1-sorcerer-profession-quest`, saga: `${W}/lu4/posts/post/409-saga-of-the-archmage-76`, sagaNpc: "Saga Archmage", gear: "ivory", role: "Mago nuker", tip: "Misión Torre de Marfil al 40; no Alligator" },
    { id: "soultaker", race: "human", first: "hwizard", name: "Soultaker", name2: "Necromancer", classId: 13, marks: "Scholar + Trust + Witchcraft", threeInOne: `${W}/lu4/posts/post/297-3-in-1-necromancer-profession-quest`, saga: `${W}/lu4/posts/post/410-saga-of-the-soultaker-76`, sagaNpc: "Hardin — Saga Soultaker (wiki 76+)", gear: "ivory", role: "Mago / maldiciones", tip: "Torre de Marfil + zonas de Hardin" },
    { id: "arcana", race: "human", first: "hwizard", name: "Arcana Lord", name2: "Warlock", classId: 14, marks: "Scholar + Trust + Summoner", threeInOne: `${W}/lu4/posts/post/298-3-in-1-warlock-profession-quest`, saga: `${W}/lu4/posts/post/411-saga-of-the-arcana-lord-76`, sagaNpc: "Saga Arcana Lord", gear: "ivory", role: "Invocador", tip: "Mascotas de misión desactivadas; tu invocación sí" },
    { id: "cardinal", race: "human", first: "cleric", name: "Cardinal", name2: "Bishop", classId: 16, marks: "Pilgrim + Trust + Healer", threeInOne: `${W}/lu4/posts/post/299-3-in-1-bishop-profession-quest`, saga: `${W}/lu4/posts/post/413-saga-of-the-cardinal-76`, sagaNpc: "Saga Cardinal", gear: "ivory", role: "Sanador", tip: "Siempre hay grupo para ti; en Lu4 también recibes los objetos de misión del grupo" },
    { id: "hierophant", race: "human", first: "cleric", name: "Hierophant", name2: "Prophet", classId: 17, marks: "Pilgrim + Trust + Reformer", threeInOne: `${W}/lu4/posts/post/300-3-in-1-prophet-profession-quest`, saga: `${W}/lu4/posts/post/412-saga-of-the-hierophant-76`, sagaNpc: "Saga Hierophant", gear: "ivory", role: "Buffer / apoyo", tip: "Tus buffs hacen que todo el grupo farmee más rápido" },
    // Elfo
    { id: "evatemplar", race: "elf", first: "elvenknight", name: "Eva's Templar", name2: "Temple Knight", classId: 20, marks: "Duty + Life + Healer", threeInOne: `${W}/lu4/posts/post/301-3-in-1-temple-knight-profession-quest`, saga: `${W}/lu4/posts/post/414-saga-of-evas-templar-76`, sagaNpc: "Saga Eva's Templar", gear: "alligator", role: "Tanque", tip: "Tanque elfo" },
    { id: "swordmuse", race: "elf", first: "elvenknight", name: "Sword Muse", name2: "Swordsinger", classId: 21, marks: "Challenger + Life + Duelist", threeInOne: `${W}/lu4/posts/post/302-3-in-1-swordsinger-profession-quest`, saga: `${W}/lu4/posts/post/415-saga-of-the-sword-muse-76`, sagaNpc: "Saga Sword Muse", gear: "alligator", role: "Bardo", tip: "Los ritmos = más kills en grupo" },
    { id: "windrider", race: "elf", first: "elvenscout", name: "Wind Rider", name2: "Plains Walker", classId: 23, marks: "Seeker + Life + Searcher", threeInOne: `${W}/lu4/posts/post/303-3-in-1-plains-walker-profession-quest`, saga: `${W}/lu4/posts/post/416-saga-of-the-wind-rider-76`, sagaNpc: "Saga Wind Rider", gear: "alligator", role: "Daga", tip: "Daga elfa" },
    { id: "moonlight", race: "elf", first: "elvenscout", name: "Moonlight Sentinel", name2: "Silver Ranger", classId: 24, marks: "Seeker + Life + Sagittarius", threeInOne: `${W}/lu4/posts/post/304-3-in-1-silver-ranger-profession-quest`, saga: `${W}/lu4/posts/post/417-saga-of-the-moonlight-sentinel-76`, sagaNpc: "Saga Moonlight", gear: "alligator", role: "Arquero", tip: "Arquero elfo" },
    { id: "mysticmuse", race: "elf", first: "elvenwizard", name: "Mystic Muse", name2: "Spellsinger", classId: 27, marks: "Scholar + Life + Magus", threeInOne: `${W}/lu4/posts/post/305-3-in-1-spellsinger-profession-quest`, saga: `${W}/lu4/posts/post/418-saga-of-the-mystic-muse-76`, sagaNpc: "Saga Mystic Muse", gear: "ivory", role: "Mago nuker", tip: "Torre de Marfil + Cromáticas al final" },
    { id: "elemaster", race: "elf", first: "elvenwizard", name: "Elemental Master", name2: "Elemental Summoner", classId: 28, marks: "Scholar + Life + Summoner", threeInOne: `${W}/lu4/posts/post/306-3-in-1-elemental-summoner-profession-quest`, saga: `${W}/lu4/posts/post/419-saga-of-the-elemental-master-76`, sagaNpc: "Saga Elemental Master", gear: "ivory", role: "Invocador", tip: "Torre de Marfil al 40+" },
    { id: "evasant", race: "elf", first: "oracle", name: "Eva's Saint", name2: "Elven Elder", classId: 30, marks: "Pilgrim + Life + Healer", threeInOne: `${W}/lu4/posts/post/307-3-in-1-elven-elder-profession-quest`, saga: `${W}/lu4/posts/post/420-saga-of-evas-saint-76`, sagaNpc: "Saga Eva's Saint", gear: "ivory", role: "Sanador", tip: "EE muy pedido en grupos" },
    // DE
    { id: "shilientemplar", race: "darkelf", first: "palus", name: "Shillien Templar", name2: "Shillien Knight", classId: 33, marks: "Duty + Fate + Witchcraft", threeInOne: `${W}/lu4/posts/post/308-3-in-1-shillien-knight-profession-quest`, saga: `${W}/lu4/posts/post/421-saga-of-the-shillien-templar-76`, sagaNpc: "Saga Shillien Templar", gear: "alligator", role: "Tanque", tip: "Tanque elfo oscuro" },
    { id: "spectraldancer", race: "darkelf", first: "palus", name: "Spectral Dancer", name2: "Bladedancer", classId: 34, marks: "Challenger + Fate + Duelist", threeInOne: `${W}/lu4/posts/post/309-3-in-1-bladedancer-profession-quest`, saga: `${W}/lu4/posts/post/422-saga-of-the-spectral-dancer-76`, sagaNpc: "Saga Spectral Dancer", gear: "alligator", role: "Bardo", tip: "BD = ritmos de grupo" },
    { id: "ghosthunter", race: "darkelf", first: "assassin", name: "Ghost Hunter", name2: "Abyss Walker", classId: 36, marks: "Seeker + Fate + Searcher", threeInOne: `${W}/lu4/posts/post/310-3-in-1-abyss-walker-profession-quest`, saga: `${W}/lu4/posts/post/423-saga-of-the-ghost-hunter-76`, sagaNpc: "Saga Ghost Hunter", gear: "alligator", role: "Daga", tip: "Daga elfo oscuro" },
    { id: "ghostsentinel", race: "darkelf", first: "assassin", name: "Ghost Sentinel", name2: "Phantom Ranger", classId: 37, marks: "Seeker + Fate + Sagittarius", threeInOne: `${W}/lu4/posts/post/311-3-in-1-phantom-ranger-profession-quest`, saga: `${W}/lu4/posts/post/424-saga-of-the-ghost-sentinel-76`, sagaNpc: "Saga Ghost Sentinel", gear: "alligator", role: "Arquero", tip: "Arquero elfo oscuro" },
    { id: "stormscreamer", race: "darkelf", first: "darkwizard", name: "Storm Screamer", name2: "Spellhowler", classId: 40, marks: "Scholar + Fate + Magus", threeInOne: `${W}/lu4/posts/post/312-3-in-1-spellhowler-profession-quest`, saga: `${W}/lu4/posts/post/425-saga-of-the-storm-screamer-76`, sagaNpc: "Fairen — 4º piso Torre de Marfil", gear: "ivory", role: "Mago nuker (viento)", tip: "En el Path no pierdas el Hub Scent; en la Saga mata a Allector usando skills (no solo auto-attack)" },
    { id: "spectralmaster", race: "darkelf", first: "darkwizard", name: "Spectral Master", name2: "Phantom Summoner", classId: 41, marks: "Scholar + Fate + Summoner", threeInOne: `${W}/lu4/posts/post/313-3-in-1-phantom-summoner-profession-quest`, saga: `${W}/lu4/posts/post/426-saga-of-the-spectral-master-76`, sagaNpc: "Saga Spectral Master", gear: "ivory", role: "Invocador", tip: "Torre de Marfil al 40+" },
    { id: "shilliensaint", race: "darkelf", first: "shillienoracle", name: "Shillien Saint", name2: "Shillien Elder", classId: 43, marks: "Pilgrim + Fate + Reformer", threeInOne: `${W}/lu4/posts/post/314-3-in-1-shillien-elder-profession-quest`, saga: `${W}/lu4/posts/post/427-saga-of-the-shillien-saint-76`, sagaNpc: "Saga Shillien Saint", gear: "ivory", role: "Buffer / sanador", tip: "SE muy pedido en grupos" },
    // Orc
    { id: "titan", race: "orc", first: "orcraider", name: "Titan", name2: "Destroyer", classId: 46, marks: "Challenger + Glory + Champion", threeInOne: `${W}/lu4/posts/post/315-3-in-1-destroyer-profession-quest`, saga: `${W}/lu4/posts/post/428-saga-of-the-titan-76`, sagaNpc: "Prefecto Tazki — Gremio de Guerreros de Rune", gear: "alligator", role: "Daño a dos manos", tip: "Rey de las zonas Élite de Schuttgart" },
    { id: "khavatari", race: "orc", first: "orcmonk", name: "Grand Khavatari", name2: "Tyrant", classId: 48, marks: "Challenger + Glory + Duelist", threeInOne: `${W}/lu4/posts/post/316-3-in-1-tyrant-profession-quest`, saga: `${W}/lu4/posts/post/429-saga-of-the-grand-khavatari-76`, sagaNpc: "Saga Grand Khavatari", gear: "alligator", role: "Daño con puños", tip: "Alligator + grupo" },
    { id: "dominator", race: "orc", first: "orcshaman", name: "Dominator", name2: "Overlord", classId: 51, marks: "Pilgrim + Glory + Lord", threeInOne: `${W}/lu4/posts/post/317-3-in-1-overlord-profession-quest`, saga: `${W}/lu4/posts/post/430-saga-of-the-dominator-76`, sagaNpc: "Saga Dominator", gear: "both", role: "Buffer de clan", tip: "Puedes hacer Alligator e Ivory" },
    { id: "doomcryer", race: "orc", first: "orcshaman", name: "Doomcryer", name2: "Warcryer", classId: 52, marks: "Pilgrim + Glory + War Spirit", threeInOne: `${W}/lu4/posts/post/318-3-in-1-warcryer-profession-quest`, saga: `${W}/lu4/posts/post/431-saga-of-the-doomcryer-76`, sagaNpc: "Saga Doomcryer", gear: "both", role: "Buffer de grupo", tip: "Alligator e Ivory" },
    // Dwarf
    { id: "fortuneseeker", race: "dwarf", first: "scavenger", name: "Fortune Seeker", name2: "Bounty Hunter", classId: 55, marks: "Guildsman + Prosperity + Searcher", threeInOne: `${W}/lu4/posts/post/319-3-in-1-bounty-hunter-profession-quest`, saga: `${W}/lu4/posts/post/433-saga-of-the-fortune-seeker-76`, sagaNpc: "Mond — Almacén de Rune", gear: "alligator", role: "Spoil + daño", tip: "Antes del 3-en-1 prepara: Acero×7, Barniz×70, Piel×100, Cristal D×80" },
    { id: "maestro", race: "dwarf", first: "artisan", name: "Maestro", name2: "Warsmith", classId: 57, marks: "Guildsman + Prosperity + Maestro", threeInOne: `${W}/lu4/posts/post/320-3-in-1-warsmith-profession-quest`, saga: `${W}/lu4/posts/post/432-saga-of-the-maestro-76`, sagaNpc: "Saga Maestro", gear: "alligator", role: "Craft / daño", tip: "Economía de craft + Alligator" },
    { id: "tectonic", race: "dwarf", first: "geomancer", name: "Tectonic Sage", name2: "Terramancer", classId: 210, marks: "Scholar + Prosperity + Magus", threeInOne: `${W}/lu4/posts/post/321-3-in-1-terramancer-profession-quest-35`, saga: `${W}/lu4/posts/post/164-saga-of-tectonic-sage-76`, sagaNpc: "Saga Tectonic Sage", gear: "ivory", role: "Mago enano", tip: "Misión Torre de Marfil" },
    // Kamael
    { id: "doombringer", race: "kamael", first: "trooper", name: "Doombringer", name2: "Berserker", classId: 46, marks: "Certified Berserker", threeInOne: `${W}/lu4/posts/post/48-quests-for-1-2-and-3-classes`, saga: `${W}/lu4/posts/post/434-saga-of-the-doombringer-76`, sagaNpc: "Saga Doombringer", gear: "alligator", role: "Kamael cuerpo a cuerpo", tip: "Certificado desde el 35" },
    { id: "soulhound", race: "kamael", first: "trooper", name: "Soul Hound", name2: "Soul Breaker", classId: 46, marks: "Certified Soul Breaker", threeInOne: `${W}/lu4/posts/post/48-quests-for-1-2-and-3-classes`, saga: `${W}/lu4/posts/post/435-saga-of-the-soul-hound-76`, sagaNpc: "Saga Soul Hound", gear: "ivory", role: "Kamael mágico", tip: "Soul Breaker (♂ o ♀) → Soul Hound" },
    { id: "trickster", race: "kamael", first: "warder", name: "Trickster", name2: "Arbalester", classId: 9, marks: "Certified Arbalester", threeInOne: `${W}/lu4/posts/post/48-quests-for-1-2-and-3-classes`, saga: `${W}/lu4/posts/post/436-saga-of-the-trickster-76`, sagaNpc: "Saga Trickster", gear: "alligator", role: "Kamael arquero", tip: "Path Warder (femenino)" }
  ];

  function gearBlock(gear) {
    if (gear === "alligator") return {
      title: "Alligator Hunter — Cazador de cocodrilos (40–47)",
      body: "NPC Enverun, tienda de comestibles de Heine. Solo guerreros y chamanes orcos con 2ª clase. Da equipo C/D, pergaminos y tintes."
    };
    if (gear === "ivory") return {
      title: "Torre de Marfil — Under the Shadow of the Ivory Tower (40–47)",
      body: "NPC Cema, Academia de Hardin. Solo místicos y chamanes orcos con 2ª clase. Farmeas Orbes de Nebulita y canjeas por equipo grado C."
    };
    return {
      title: "Alligator + Torre de Marfil (ventaja de chamán orco)",
      body: "Como chamán orco puedes hacer las dos misiones de equipo del 40–47. Es una ventaja única."
    };
  }

  /** Lista maestra: misiones + mejores zonas (misma para todas las clases; equipo C según rol) */
  function roadmapTable(cls, gear) {
    const gearLabel = gear === "alligator"
      ? "Alligator Hunter (Heine — Enverun)"
      : gear === "ivory"
        ? "Torre de Marfil (Hardin — Cema)"
        : "Alligator + Torre de Marfil (puedes hacer ambas)";

    const rows = [
      ["1–17", "Misión", "Misiones únicas de tu aldea", "Haz todas. Dan equipo NG, adena y EXP. Ver tabla de abajo."],
      ["1–17", "Zona", "Alrededores de tu aldea", "Solo monstruos blancos (tu nivel −5 a +4)."],
      ["16–26", "Misión", "¿Se romperá el sello?", "Obligatoria. Armadura NG + pergaminos D."],
      ["18", "Clase", `Path → ${FIRST[cls.first].name}`, "250k EXP. Hazlo entre 18 y 20 (después del 26 no da EXP)."],
      ["19–29", "Misión", "Colmillos de dragón (Dragon Fangs)", "~350k EXP + armadura D. Guardia Luis / lagartos Langk."],
      ["20–28", "Misión", "Invasores de ojos rojos", "~280–330k EXP. Guardia Babenco, puerta oeste de Gludio."],
      ["20–40", "Misión", "Festín Magnífico (Dion)", "Cadena larga → joyería D. Empieza por Harlan / Jonas / Rollant → Ranspo."],
      ["27–32", "Misión", "Actos del mal", "Armadura grado D."],
      ["30–36", "Zona", "Criptas de la Desgracia (Élite 33–35)", "Mejor zona de este rango. Grupo de 5–9."],
      ["30+", "Misión", "Canción del Cazador", "Grey en Aldea de los Cazadores. Adena y consumibles a largo plazo."],
      ["35–44", "Misión", "Cadena del Templo (Executor)", "CRÍTICO: antes del 45. ~2.5–2.7M EXP. Misionero → … → Ángel Caído."],
      ["35–40", "Misión", `Marcas 3-en-1 → ${cls.name2}`, `${cls.marks}. ~750k EXP por marca. Guía 3-en-1 en la wiki.`],
      ["40", "Clase", `Cambio a ${cls.name2}`, "Cuando tengas las 3 marcas."],
      ["40–44", "Misión", "Cadena Kusto (Giran)", "CRÍTICO: antes del 45. ~600k EXP. Herrero Jefe Kusto."],
      ["40–47", "Misión", gearLabel, "Tu misión de equipo grado C según rol."],
      ["40–52", "Misión", "Pasatiempo del almacén / Caza del tesoro", "Más equipo C y adena."],
      ["40–48", "Zona", "Guarida de ladrones de tumbas (Élite 42–45)", "Mejor zona ~40–48. Grupo 5–9."],
      ["47–57", "Zona", "Guarida del Mal (Den of Evil)", "Mejor zona mid. Solo, dúo o grupo."],
      ["52+", "Clase", "Subclase (Fate's Whisper)", "Desde 52. La subclase también llega a 85."],
      ["56–64", "Zona", "Mazmorra de Caron (Élite 59–60)", "Grupo. Ideal ~56–64."],
      ["60–65", "Zona", "Laboratorio Arcaico", "Siguiente paso después de Caron."],
      ["66–74", "Zona", "Asentamiento Hatoum", "Grupo ~68–72. Muy buena EXP."],
      ["72–74", "Misión", "Preparar Saga", "Cristal de Hielo (72+) + Piedra Divina Ketra/Varka (74+)."],
      ["74–83", "Zona", "Isla de la Oración / Tierras Altas Cromáticas", "Isla: máx. 3 jugadores. Cromáticas: grupo grande (mejor EXP)."],
      ["76", "Clase", `Saga → ${cls.name}`, `${cls.sagaNpc}. ~2.3M EXP + Códice.`],
      ["78–85", "Zona", "Templo Pagano / Asentamiento de las Hadas", "Hasta el tope 85."],
    ];

    return rows.map(([lv, tipo, nombre, detalle]) => {
      const clsTag = tipo === "Misión" ? "mision" : tipo === "Zona" ? "zona" : "clase";
      return `<tr><td>${lv}</td><td><span class="tag ${clsTag}">${tipo}</span></td><td><strong>${nombre}</strong></td><td>${detalle}</td></tr>`;
    }).join("");
  }

  function buildGuideHtml(cls) {
    const race = RACES[cls.race];
    const first = FIRST[cls.first];
    const g = gearBlock(cls.gear);
    const cid = cls.classId;

    const starterRows = race.starters.map(s =>
      `<tr><td>${s.lv}</td><td><strong>${s.name}</strong><br><span class="muted">${s.npc}</span></td><td>${s.reward}</td><td><span class="tag ok">${s.tip}</span></td></tr>`
    ).join("");

    const pathSteps = (first.steps || []).map((s) => `<li>${s}</li>`).join("");
    const shots = (first.shots || []).map(s =>
      `<div><img class="shot" src="${s.src}" alt="${s.alt}" data-full="${s.src}"/><div class="shot-cap">${s.alt}</div></div>`
    ).join("");

    const secrets = SECRETS.map(s =>
      `<div class="secret"><h4>${s.title}</h4><p class="what"><strong>Qué significa:</strong> ${s.what}</p><p class="do"><strong>Qué hacer:</strong> ${s.do}</p></div>`
    ).join("");

    const roadmap = roadmapTable(cls, cls.gear);

    return `
      <div class="guide-hero card">
        <div class="card-head">
          <img class="class-art" src="${art(cid)}" alt="${cls.name2}" onerror="this.style.display='none'"/>
          <img class="race-art" src="${race.raceIcon}" alt="${race.name}"/>
          <div>
            <p class="muted" style="margin:0">${race.name} · ${race.village}</p>
            <h1 style="margin:4px 0">${cls.name}</h1>
            <p class="muted" style="margin:0">Ruta: <strong>${first.name}</strong> → <strong>${cls.name2}</strong> → <strong>${cls.name}</strong></p>
            <p style="margin:8px 0 0"><span class="tag info">${cls.role}</span> <span class="tag ok">${cls.tip}</span></p>
          </div>
        </div>
        <p>${race.blurb}</p>
        <div class="howto">
          <p><strong>Cómo usar esta guía:</strong> primero lee los <em>Secretos</em> (reglas del servidor). Después mira la <em>Lista completa</em> (misiones + mejores zonas). Al final están los pasos detallados por fase.</p>
          <p class="muted">Verde = zona de farmeo · Azul = misión · Dorado = cambio de clase</p>
        </div>
        <div class="hero-badges">
          <a class="badge" href="${first.pathUrl}" target="_blank" rel="noopener">Path en la wiki</a>
          <a class="badge" href="${cls.threeInOne}" target="_blank" rel="noopener">Marcas 3-en-1</a>
          <a class="badge" href="${cls.saga}" target="_blank" rel="noopener">Saga 76+</a>
          <a class="badge" href="${W}/lu4/posts/post/365-lu4-quests-in-starter-zones-1-19" target="_blank" rel="noopener">Misiones 1–19</a>
        </div>
      </div>

      <h2>Secretos de Lu4 (léelos primero)</h2>
      <div class="card" style="border-color:var(--accent)">
        <p class="muted" style="margin-top:0">Estas reglas son del servidor Lu4. Si las ignoras, subes mucho más lento.</p>
        <div class="secrets">${secrets}</div>
      </div>

      <h2>Lista completa — Misiones + mejores zonas (1 → 85)</h2>
      <div class="card">
        <p>Sigue esta lista en orden. Cuando diga <span class="tag zona">Zona</span>, ve a farmear ahí. Cuando diga <span class="tag mision">Misión</span>, haz esa quest.</p>
        <table class="roadmap">
          <thead><tr><th>Nivel</th><th>Tipo</th><th>Qué hacer</th><th>Detalle / por qué</th></tr></thead>
          <tbody>${roadmap}</tbody>
        </table>
      </div>

      <h2>Detalle por fase</h2>

      <h3>Fase 1 — Niveles 1 a 17 · Aldea ${race.name}</h3>
      <div class="card">
        <p><strong>Objetivo:</strong> terminar todas las misiones únicas y llegar a 18 con buen equipo NG.</p>
        <p><strong>Dónde farmear:</strong> alrededores de ${race.village}. Solo monstruos blancos (tu nivel −5 a +4).</p>
        <table>
          <thead><tr><th>Nv.</th><th>Misión / NPC</th><th>Recompensa</th><th>Nota</th></tr></thead>
          <tbody>${starterRows}</tbody>
        </table>
        <p class="muted">Más detalle: <a href="${W}/lu4/posts/post/365-lu4-quests-in-starter-zones-1-19" target="_blank">Misiones 1–19</a> · <a href="${W}/lu4/posts/post/368-lu4-equipment-quests" target="_blank">Misiones de equipo</a></p>
      </div>

      <h3>Fase 2 — Nivel 18 · Path → ${first.name}</h3>
      <div class="card">
        <p><strong>Objetivo:</strong> cambiar a 1ª clase y ganar 250.000 EXP.</p>
        <p><strong>Inicio:</strong> ${first.startNpc}<br>
        <strong>Cambio de clase:</strong> ${first.changeNpc}<br>
        <strong>Recompensa Lu4:</strong> ${first.reward}<br>
        <strong>Después puedes ser:</strong> ${first.opens.join(" / ")}</p>
        <ol>${pathSteps}</ol>
        ${shots ? `<div class="shots" style="margin-top:12px">${shots}</div>` : ""}
        <p><a href="${first.pathUrl}" target="_blank">Abrir el Path paso a paso en la wiki →</a></p>
      </div>

      <h3>Fase 3 — Niveles 20 a 34 · EXP + equipo D</h3>
      <div class="card">
        <p><strong>Objetivo:</strong> mucha EXP con misiones + primer zona Élite.</p>
        <p><strong>Mejor zona:</strong> Criptas de la Desgracia (Élite 33–35), en grupo de 5–9. <a href="${W}/lu4/posts/post/322-update-crypts-of-disgrace-3236" target="_blank">Ver zona</a></p>
        <ol>
          <li><strong>Festín Magnífico</strong> (Dion, 20–40): Vino fantástico → Adepto del gusto → Sacar el sabor → partituras → Ranspo (Almacén). Recompensa: joyería D.</li>
          <li><strong>Invasores de ojos rojos</strong> (20–28): Guardia Babenco, puerta oeste de Gludio → ~280–330k EXP.</li>
          <li>Demonio de sangre / Seducción peligrosa / Semilla del mal (21–26).</li>
          <li><strong>Actos del mal</strong> (27–32): armadura D.</li>
          <li><strong>Canción del Cazador</strong> (30+): Grey — Aldea de los Cazadores.</li>
          <li>Si estás agotado (Fatigue): haz misiones. No farmees monstruos al 10% de EXP.</li>
        </ol>
      </div>

      <h3>Fase 4 — Niveles 35 a 40 · Templo + marcas → ${cls.name2}</h3>
      <div class="card">
        <p><span class="tag warn">IMPORTANTE</span> La cadena del Templo <strong>antes del nivel 45</strong>. Si no, pierdes ~2.7M de EXP.</p>
        <ol>
          <li><strong>Cadena del Ejecutor del Templo</strong>: Misionero → Ejecutor → Campeón 1–2 → Zorro de las Sombras 1–3 → Ángel Caído (Amanecer o Anochecer).<br>
            <a href="${W}/lu4/posts/post/380-temple-executor-quest-chain-35" target="_blank">Guía del Templo</a></li>
          <li><strong>Marcas 3-en-1</strong> desde el 35: <em>${cls.marks}</em><br>
            Guía: <a href="${cls.threeInOne}" target="_blank">3-en-1 ${cls.name2}</a><br>
            Recompensa Lu4: ~750k EXP <strong>por marca</strong> (≈2.25M las 3).</li>
          <li>Nivel 40: cambia a <strong>${cls.name2}</strong>.</li>
        </ol>
      </div>

      <h3>Fase 5 — Niveles 40 a 45 · Kusto + equipo C</h3>
      <div class="card">
        <p><strong>Mejor zona:</strong> Guarida de ladrones de tumbas (Élite 42–45). <a href="${W}/lu4/posts/post/323-update-grave-robber-hideout-4050" target="_blank">Ver zona</a></p>
        <ol>
          <li><strong>Kusto</strong> (4 misiones, antes del 45): Herrero Kusto en Giran → ~600k EXP. <a href="${W}/lu4/posts/post/386-lu4-kusto-quest-chain-40" target="_blank">Ver guía</a></li>
          <li><strong>${g.title}</strong><br>${g.body}</li>
          <li>Pasatiempo del almacenero (40–52) · Caza del tesoro (42–50).</li>
        </ol>
      </div>

      <h3>Fase 6 — Niveles 45 a 75 · Escalera de zonas</h3>
      <div class="card">
        <table class="roadmap">
          <thead><tr><th>Nivel</th><th>Mejor zona / tarea</th><th>Nota</th></tr></thead>
          <tbody>
            <tr><td>47–57</td><td><a href="${W}/lu4/posts/post/324-update-den-of-evil-4757" target="_blank">Guarida del Mal (Den of Evil)</a></td><td>Zona principal de este rango</td></tr>
            <tr><td>52+</td><td>Subclase — Fate's Whisper</td><td>Simplificado en MasterWork/Lu4</td></tr>
            <tr><td>56–64</td><td><a href="${W}/lu4/posts/post/325-update-carons-dungeon-5664" target="_blank">Mazmorra de Caron</a></td><td>Élite 59–60, grupo</td></tr>
            <tr><td>60–65</td><td><a href="${W}/lu4/posts/post/326-update-archaic-laboratory-6065" target="_blank">Laboratorio Arcaico</a></td><td>Siguiente zona</td></tr>
            <tr><td>66–74</td><td><a href="${W}/lu4/posts/post/174-new-hatoum-settlement-6674" target="_blank">Asentamiento Hatoum</a></td><td>Grupo ~68–72</td></tr>
            <tr><td>72–74</td><td>Preparar Saga</td><td>Cristal de Hielo + Piedra Divina (Ketra o Varka)</td></tr>
          </tbody>
        </table>
      </div>

      <h3>Fase 7 — Nivel 76+ · Saga → ${cls.name}</h3>
      <div class="card">
        <p><strong>Inicio de la Saga:</strong> ${cls.sagaNpc}</p>
        <p>Recompensa típica: ~2.3M EXP · 5M Adena · Códice de los Gigantes</p>
        <p><a href="${cls.saga}" target="_blank">Abrir la Saga en la wiki →</a></p>
        <ol>
          <li>Sigue las tabletas: Valle Encantado Norte → Valle de los Santos → Ketra/Varka según tu clase</li>
          <li>Entrega la Piedra Divina y el Cristal de Hielo donde lo pida la saga</li>
          <li>Cambia a <strong>${cls.name}</strong></li>
        </ol>
      </div>

      <h3>Fase 8 — 76 a 85 · Nivel máximo</h3>
      <div class="card">
        <p><strong>Mejores zonas:</strong></p>
        <ul>
          <li><a href="${W}/lu4/posts/post/171-isle-of-prayer-and-chromatic-highlands-7483" target="_blank">Isla de la Oración</a> (máximo 3 jugadores) o <strong>Tierras Altas Cromáticas</strong> (grupo grande, mejor EXP)</li>
          <li><a href="${W}/lu4/posts/post/241-update-pagan-temple-7883" target="_blank">Templo Pagano</a> · <a href="${W}/lu4/posts/post/173-new-fairy-settlement-7885" target="_blank">Asentamiento de las Hadas</a></li>
        </ul>
        <p>Tope de nivel: <strong>85</strong> (también la subclase). Siempre monstruos blancos (−5/+4). Si estás agotado, haz misiones.</p>
      </div>

      <div class="card soft" style="margin-top:16px">
        <h3 style="margin-top:0">Lista de control — ${cls.name}</h3>
        <ul>
          <li>☐ Aldea ${race.name} completa + Sello + Colmillos de dragón</li>
          <li>☐ Path ${first.name} en el nivel 18</li>
          <li>☐ Festín + Invasores ojos rojos + Criptas</li>
          <li>☐ Templo + marcas 3-en-1 antes del 45</li>
          <li>☐ Kusto + equipo 40+ antes del 45</li>
          <li>☐ Subclase 52 · Cristal/Piedra 72–74</li>
          <li>☐ Saga → ${cls.name} · Cromáticas/Hadas → 85</li>
        </ul>
      </div>
    `;
  }

  function getClassesByRace(raceId) {
    return CLASSES.filter(c => c.race === raceId);
  }

  function getClass(id) {
    return CLASSES.find(c => c.id === id);
  }

  global.Lu4Guides = {
    W, RACES, FIRST, CLASSES, SECRETS,
    icon, art, getClassesByRace, getClass, buildGuideHtml
  };
})(window);
