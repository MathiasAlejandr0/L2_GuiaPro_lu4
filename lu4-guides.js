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
      do: "Usa Alligator Hunter (warriors/shamans), Under the Shadow of the Ivory Tower (mages/shamans), Warehouse Pastime o Treasure Hunt."
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
      do: "Desde 72: Ice Crystal (The Finest Ingredients). Desde 74: Divine Stone of Wisdom (Ketra o Varka alliance lv.2)."
    }
  ];

  const RACES = {
    human: {
      id: "human", name: "Humano", village: "Talking Island",
      raceIcon: `${W}/i64/t_ic_humanoid_big.png`,
      blurb: "Empiezas en Talking Island. Casi todos los Paths de 1ª clase se hacen después en Gludin o Gludio.",
      starters: [
        { lv: "2–5", name: "Letters of Love", npc: "Darin — plaza central de Talking Island", reward: "Necklace of Knowledge (NG)", tip: "Misión única — joyería" },
        { lv: "2–7", name: "Deliver Goods", npc: "Guard Arnold — puerta sureste", reward: "Ring of Knowledge ×2 + EXP", tip: "Obligatoria" },
        { lv: "2–7", name: "Sacrifice to the Sea", npc: "Rockswell — faro", reward: "Mystic's Earring + EXP", tip: "Muy útil para magos" },
        { lv: "3–6", name: "Find Sir Windawood", npc: "Guard Abellos — puerta sureste", reward: "Pociones + EXP", tip: "Rápida" },
        { lv: "3–6", name: "Otras misiones únicas de Talking Island", npc: "Guards de Talking Island", reward: "EXP / Adena", tip: "Completa todas" },
        { lv: "5–9", name: "Recover Smuggled Goods", npc: "Talking Island", reward: "Skeleton Buckler (NG)", tip: "Escudo" },
        { lv: "9–16", name: "Sword of Solidarity (solo Human)", npc: "Cadena en Talking Island", reward: "Sword of Solidarity (NG)", tip: "Arma clave melee" },
        { lv: "10–14", name: "Collect Arrowheads", npc: "Talking Island", reward: "Armadura NG / bow al azar", tip: "Prioridad archer/rogue" },
        { lv: "10–15", name: "Spirit of Mirrors (solo Human)", npc: "Talking Island / Gludio", reward: "Wand of Adept", tip: "Magos" },
        { lv: "15–21", name: "Cure for Fever", npc: "Zonas bajas de Gludio", reward: "Bone Shield", tip: "Hazla antes del nivel 20–25" },
        { lv: "16–26", name: "Will the Seal be Broken?", npc: "Ver equipment quests en la wiki", reward: "Armadura NG + scrolls D", tip: "OBLIGATORIA" },
        { lv: "19–29", name: "Dragon Fangs", npc: "Guard Luis / Langk Lizardmen", reward: "~350k EXP + armadura D", tip: "OBLIGATORIA — mucha EXP" }
      ]
    },
    elf: {
      id: "elf", name: "Elfo", village: "Elven Village",
      raceIcon: `${W}/images/wiki/class_icon/class_icon_18.png`,
      blurb: "Empiezas en Elven Village. Prioriza armas de Sentinel y misiones del Mother Tree.",
      starters: [
        { lv: "2–5", name: "What Women Want", npc: "Arujien — oeste de la aldea", reward: "Earring o EXP", tip: "Human y Elf" },
        { lv: "3–7", name: "Fruit of the Mother Tree", npc: "Andellia — plaza", reward: "Pociones + EXP", tip: "Solo Elf" },
        { lv: "3–7", name: "Nerupa's Request", npc: "Nerupa — zona inicial", reward: "Pociones + EXP", tip: "Solo Elf" },
        { lv: "3–8", name: "Pixies' Plea / Keen Claws", npc: "Pixy Murika — puerta sureste", reward: "Adena / pociones", tip: "Repetible" },
        { lv: "10–15", name: "Skirmish with the Orcs", npc: "Solo Elf", reward: "Red Sunset Sword/Staff", tip: "Arma de 1ª" },
        { lv: "12–18", name: "Sea of Spores Fever", npc: "Solo Elf", reward: "Sword/Staff of Sentinel", tip: "Arma fuerte low" },
        { lv: "11–15", name: "Dreaming of the Skies", npc: "—", reward: "Firefly Ring", tip: "Joyería" },
        { lv: "16–26", name: "Will the Seal be Broken?", npc: "—", reward: "Armadura NG + scrolls D", tip: "OBLIGATORIA" },
        { lv: "19–29", name: "Dragon Fangs", npc: "Langk Lizardmen", reward: "EXP + armadura D", tip: "OBLIGATORIA" }
      ]
    },
    darkelf: {
      id: "darkelf", name: "Elfo Oscuro", village: "Dark Elven Village",
      raceIcon: `${W}/i64/t_ic_dark_elves_big.png`,
      blurb: "Empiezas en Dark Elven Village. El Path de Dark Wizard empieza en el Altar of Rites.",
      starters: [
        { lv: "2–5", name: "Mass of Darkness", npc: "Undrias — zona inicial", reward: "EXP / Adena", tip: "Solo Dark Elf" },
        { lv: "3–6", name: "Supply Check / Deliver Supplies", npc: "Jenna — puerta este", reward: "EXP / Adena", tip: "Solo Dark Elf" },
        { lv: "3–7", name: "Shilen's Hunt", npc: "Nelsya — puerta este", reward: "Adena por Bezoar", tip: "Colección" },
        { lv: "10–14", name: "Forgotten Truth", npc: "Solo Dark Elf", reward: "Eldritch Dagger / spellbook", tip: "Elige según tu build" },
        { lv: "10–17", name: "Spirit of Craftsman", npc: "Solo Dark Elf", reward: "Blood Saber", tip: "Melee" },
        { lv: "11–18", name: "Scent of Death", npc: "—", reward: "Adena", tip: "Repetible" },
        { lv: "16–26", name: "Will the Seal be Broken?", npc: "—", reward: "Armadura NG", tip: "OBLIGATORIA" },
        { lv: "19–29", name: "Dragon Fangs", npc: "Langk Lizardmen", reward: "EXP + armadura D", tip: "OBLIGATORIA" }
      ]
    },
    orc: {
      id: "orc", name: "Orco", village: "Orc Village",
      raceIcon: `${W}/i64/t_ic_orcs_big.png`,
      blurb: "Immortal Plateau / Orc Village. Los shamans pueden hacer Alligator and Ivory a partir del 40.",
      starters: [
        { lv: "2–5", name: "Long Live the Pa'agrio Lord!", npc: "Nakusin — puerta este", reward: "Club (NG)", tip: "Arma inicial" },
        { lv: "4–8", name: "Proof of Valor", npc: "Solo Orc", reward: "Necklace of Courage/Valor", tip: "Joyería" },
        { lv: "6–14", name: "Invaders of the Holy Land", npc: "—", reward: "Adena + ammo", tip: "Farmeo + misión" },
        { lv: "6–16", name: "Orc Hunting", npc: "—", reward: "Adena + ammo", tip: "Repetible" },
        { lv: "10–16", name: "Merciless Punishment", npc: "Solo Orc", reward: "Butcher's Sword", tip: "Arma clave para Destroyer" },
        { lv: "15–21", name: "Totem of the Hestui", npc: "—", reward: "Adena", tip: "Colección" },
        { lv: "16–26", name: "Will the Seal be Broken?", npc: "—", reward: "Armadura NG", tip: "OBLIGATORIA" },
        { lv: "19–29", name: "Dragon Fangs", npc: "Langk Lizardmen", reward: "EXP + armadura D", tip: "OBLIGATORIA" }
      ]
    },
    dwarf: {
      id: "dwarf", name: "Enano", village: "Dwarven Village",
      raceIcon: `${W}/i64/t_ic_dwarf_big.png`,
      blurb: "Spoil desde el Path of the Scavenger. Muy fuerte en economía en zonas Élite.",
      starters: [
        { lv: "2–5", name: "Miner's Favor", npc: "Bolter — camino inicial", reward: "EXP / Adena", tip: "Primera misión" },
        { lv: "5–18", name: "Brigands Sweep", npc: "—", reward: "Adena", tip: "Colección" },
        { lv: "6–15", name: "The Hidden Veins", npc: "—", reward: "Adena + ammo", tip: "Buen farmeo" },
        { lv: "10–14", name: "Jumble, Tumble, Diamond Fuss", npc: "Solo Dwarf", reward: "Silversmith Hammer", tip: "Arma" },
        { lv: "10–16", name: "Covert Business", npc: "Solo Dwarf", reward: "Ring of Raccoon", tip: "Joyería clave" },
        { lv: "15–21", name: "Collector's Dream / Tarantula's Spider Silk", npc: "—", reward: "Adena", tip: "Práctica de spoil" },
        { lv: "16–26", name: "Will the Seal be Broken?", npc: "—", reward: "Armadura NG", tip: "OBLIGATORIA" },
        { lv: "19–29", name: "Dragon Fangs", npc: "Langk Lizardmen", reward: "EXP + armadura D", tip: "OBLIGATORIA" }
      ]
    },
    kamael: {
      id: "kamael", name: "Kamael", village: "Kamael Village / Island",
      raceIcon: `${W}/images/wiki/class_icon/class_icon_1.png`,
      blurb: "Trooper (♂) / Warder (♀). Certificates de 2ª desde el 35. Misma ruta general de Lu4.",
      starters: [
        { lv: "1–17", name: "Starter quests Kamael + Seal + Dragon Fangs", npc: "Kamael Village", reward: "Equipo / EXP", tip: "Completa las únicas" },
        { lv: "18", name: "Path of the Trooper / Warder", npc: "Ver Path en la wiki", reward: "250k EXP", tip: "Según el sexo" },
        { lv: "16–26", name: "Will the Seal be Broken?", npc: "—", reward: "Armadura NG", tip: "OBLIGATORIA" },
        { lv: "19–29", name: "Dragon Fangs", npc: "Langk Lizardmen", reward: "EXP + D", tip: "OBLIGATORIA" }
      ]
    }
  };

  /** Primera profesión */
  const FIRST = {
    warrior: {
      race: "human", name: "Warrior", classId: 1,
      pathUrl: `${W}/lu4/posts/post/64-path-of-the-warrior-18`,
      startNpc: "Master Auron — Warriors Guild, Gludin",
      where: "Gludin: Warriors Guild (Auron) → Gludio Weapon Shop → Ruins of Agony / Windmill Hill",
      changeNpc: "Grand Master — Warriors Guild, Gludin/Gludio",
      reward: "Medallón del Guerrero + 250k EXP + cupón NG→D",
      opens: ["Gladiator", "Warlord"],
      steps: [
        "Habla con **Master Auron** (Warriors Guild, Gludin)",
        "Tienda de armas de Gludio: **Simplon**",
        "Ruins of Agony: Skeleton Tracker / Leader → 10 espadas de bronce oxidadas",
        "Vuelve a Simplon → Auron (te da la espada oxidada)",
        "Windmill Hill: Venomous Spider / Arachnid Tracker (según la wiki)",
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
      startNpc: "Sir Klaus Vasper — near Warriors Guild, Gludin",
      where: "Gludin: Klaus + Bezique + Templo Levian → Windmill Hill",
      changeNpc: "Grand Master (Caballero)",
      reward: "Espada del Ritual + 250k EXP + cupón NG→D",
      opens: ["Paladin", "Dark Avenger"],
      steps: [
        "**Sir Klaus Vasper** (Gludin)",
        "**Captain Bezique** — western gate, Gludin",
        "**High Priestess Levian** — Temple of Gludin",
        "Windmill Hill: Langk Lizardmen / Arachnid / Venomous Spider (objetos del Path)",
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
      startNpc: "Captain Bezique — western gate, Gludin",
      where: "Gludin: puerta oeste (Bezique) → plaza norte (Neti) → Ramos",
      changeNpc: "Grand Master Ramos",
      reward: "Recomendación de Bezique + 250k EXP",
      opens: ["Treasure Hunter", "Hawkeye"],
      steps: [
        "**Bezique** → carta",
        "**Neti** (north square Gludin) → daga/arco de Neti",
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
      startNpc: "Parina — Temple of Gludin",
      where: "Gludin: Templo (Parina) → Ruins of Despair / Wasteland",
      changeNpc: "Grand Magister de Gludio/Gludin",
      reward: "Cuenta de la Estación + 250k EXP",
      opens: ["Sorcerer", "Necromancer", "Warlock"],
      steps: [
        "**Parina** (Temple of Gludin)",
        "Ruins of Despair: **Flame Salamander**",
        "Ratman Warrior → Llave de la Llama",
        "**Wind Sylph** / lagartos del Wasteland / **Water Undine** (espíritus del Path)",
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
      startNpc: "Priest Zigaunt — Temple of Gludin",
      where: "Gludin: Templo (Zigaunt) → Gludio (Simplon / Praga / Lionel)",
      changeNpc: "High Priest / Grand Master Cleric",
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
    elvenknight: {
      race: "elf", name: "Elven Knight", classId: 19,
      pathUrl: `${W}/lu4/posts/post/76-path-of-the-elven-knight-18`,
      startNpc: "Master Sorius — Warriors Guild, Elven Village",
      changeNpc: "Grand Master Elf",
      where: "Elven Village → Gludio/Gludin (según pasos wiki)",
      reward: "250k EXP + cupón NG→D (Lu4)",
      opens: ["Temple Knight", "Swordsinger"],
      steps: [
        "**Warriors Guild**, Elven Village: habla con **Master Sorius**",
        "Sigue cartas/entregas hacia Gludio (NPCs listados en la wiki)",
        "Farmea monstruos blancos (−5/+4) de cada paso",
        "En grupo, los objetos de misión cuentan para todos",
        "Cambia a **Elven Knight** → abre Temple Knight / Swordsinger"
      ]
    },
    elvenscout: {
      race: "elf", name: "Elven Scout", classId: 22,
      pathUrl: `${W}/lu4/posts/post/72-path-of-the-elven-scout-18`,
      startNpc: "Master Reisa — Elven Village",
      changeNpc: "Grand Master Elf",
      where: "Elven Village → zonas bajas cerca de Gludio",
      reward: "250k EXP (Lu4)",
      opens: ["Plains Walker", "Silver Ranger"],
      steps: [
        "Habla con **Master Reisa** en la Elven Village",
        "Completa recomendaciones y farm de la cadena (wiki)",
        "Cambia a **Elven Scout** → Plains Walker o Silver Ranger"
      ]
    },
    elvenwizard: {
      race: "elf", name: "Elven Wizard", classId: 26,
      pathUrl: `${W}/lu4/posts/post/75-path-of-the-elven-wizard-18`,
      startNpc: "Rosella — Elven Village",
      changeNpc: "High Priest Raymond — Gludio",
      where: "Elven Village (Rosella) → Temple / Gludio (Raymond)",
      reward: "250k EXP (Lu4)",
      opens: ["Spellsinger", "Elemental Summoner"],
      steps: [
        "Habla con **Rosella** en la Elven Village",
        "Completa pruebas de libros/espíritus (pasos en la wiki)",
        "Cierra con **Raymond** en Gludio → **Elven Wizard**"
      ]
    },
    oracle: {
      race: "elf", name: "Elven Oracle", classId: 29,
      pathUrl: `${W}/lu4/posts/post/70-path-of-the-elven-oracle-18`,
      startNpc: "NPC Path Oracle — Elven Village (ver wiki)",
      changeNpc: "Grand Master / High Priest Elfo",
      where: "Elven Village → Gludio",
      reward: "250k EXP (Lu4)",
      opens: ["Elven Elder"],
      steps: [
        "Inicia Path of the Elven Oracle (NPC en la wiki)",
        "Completa cartas/libros sagrados de la cadena",
        "Cambia a **Elven Oracle** → camino a Elven Elder"
      ]
    },
    palus: {
      race: "darkelf", name: "Palus Knight", classId: 32,
      pathUrl: `${W}/lu4/posts/post/78-path-of-the-palus-knight-18`,
      startNpc: "Master Virgil — Dark Elven Village",
      changeNpc: "Grand Master Dark Elf — Gludio",
      where: "Dark Elven Village → Dark Elf Guild Gludio",
      reward: "250k EXP (Lu4)",
      opens: ["Shillien Knight", "Bladedancer"],
      steps: [
        "Habla con **Master Virgil** (Path Palus) en la aldea DE",
        "Completa pruebas/cartas de la wiki",
        "Cambia en Gludio a **Palus Knight** → SK o Bladedancer"
      ]
    },
    assassin: {
      race: "darkelf", name: "Assassin", classId: 35,
      pathUrl: `${W}/lu4/posts/post/67-path-of-the-assassin-18`,
      startNpc: "Triskel — Dark Elven Village",
      changeNpc: "Grand Master Dark Elf — Gludio",
      where: "Dark Elven Village → Gludio",
      reward: "250k EXP (Lu4)",
      opens: ["Abyss Walker", "Phantom Ranger"],
      steps: [
        "Habla con **Triskel** (Path Assassin)",
        "Farmea objetivos de daga/arco de la cadena",
        "Cambia a **Assassin** → Abyss Walker o Phantom Ranger"
      ]
    },
    darkwizard: {
      race: "darkelf", name: "Dark Wizard", classId: 39,
      pathUrl: `${W}/lu4/posts/post/81-path-of-the-dark-wizard-18`,
      startNpc: "Varika — Altar of Rites",
      where: "Altar of Rites (Varika / Arkenia) → Gludio gremio DE (Tobias)",
      changeNpc: "Grand Master Tobias — Dark Elf Guild, Gludio",
      reward: "Joya Oscura + 250k EXP",
      opens: ["Spellhowler", "Phantom Summoner"],
      steps: [
        "**Varika** → Semilla de la Desesperación",
        "**Arkenia** → **Hub Scent** (secreto: sin esto fallan los Hearts)",
        "Annika → esqueletos de la Escuela → Knee Bones",
        "Charkeren → Marsh Zombies → Restos familiares",
        "Ruins of Agony → Hearts of Lunacy",
        "Arkenia/Varika → **Tobias** en Gludio → Dark Wizard"
      ],
      shots: [
        { alt: "Varika", src: `${W}/file/12225_5130904553_1746268722.jpg` },
        { alt: "Arkenia", src: `${W}/file/12221_3772361744_1746267327.jpg` },
        { alt: "Tobias", src: `${W}/file/12219_2891836565_1746266210.jpg` }
      ]
    },
    shillienoracle: {
      race: "darkelf", name: "Shillien Oracle", classId: 42,
      pathUrl: `${W}/lu4/posts/post/71-path-of-the-shillien-oracle-18`,
      startNpc: "Magister Sidra / NPC Path — Dark Elven Village (wiki)",
      changeNpc: "Grand Master Dark Elf — Gludio",
      where: "Dark Elven Village → Gludio",
      reward: "250k EXP (Lu4)",
      opens: ["Shillien Elder"],
      steps: [
        "Inicia Path of the Shillien Oracle (NPC en la wiki)",
        "Completa la cadena de oráculos de Shilen",
        "Cambia a **Shillien Oracle** → Shillien Elder (SE)"
      ]
    },
    orcraider: {
      race: "orc", name: "Orc Raider", classId: 45,
      pathUrl: `${W}/lu4/posts/post/69-path-of-the-orc-raider-18`,
      startNpc: "Prefect Karukia — Hall of Kings, Orc Village",
      where: "Orc Village (Karukia) → Gludin Orc Guild (Kasman / Osborn)",
      changeNpc: "High Prefect Osborn — Orc Guild, Gludin",
      reward: "Marca del Raider + 250k EXP",
      opens: ["Destroyer"],
      steps: [
        "**Karukia** → Immortal Plateau North",
        "Goblin Tomb Raiders hasta **Kuruka Ratman Leader** → 10 dientes",
        "Karukia → Informe del Traidor (línea Gludin)",
        "**Kasman** en Gludin → Spider Nest **Umbar Orc** ×2 cabezas",
        "Kasman → **Osborn** → Orc Raider"
      ],
      shots: [
        { alt: "Karukia", src: `${W}/file/12293_1628390772_1746868529.jpg` },
        { alt: "Kuruka", src: `${W}/file/12295_9626609540_1746868569.jpg` },
        { alt: "Osborn", src: `${W}/file/12298_4977469374_1746868623.jpg` }
      ]
    },
    orcmonk: {
      race: "orc", name: "Orc Monk", classId: 47,
      pathUrl: `${W}/lu4/posts/post/68-path-of-the-orc-monk-18`,
      startNpc: "Gantaki Zu Urutu — Orc Village",
      changeNpc: "High Prefect — Gludin (Orc Guild)",
      where: "Orc Village → Gludin Orc Guild",
      reward: "250k EXP (Lu4)",
      opens: ["Tyrant"],
      steps: [
        "Habla con **Gantaki Zu Urutu** (Path Monk) en Orc Village",
        "Completa pruebas de puños / tótems de la wiki",
        "Cambia con el High Prefect → **Orc Monk** → Tyrant"
      ]
    },
    orcshaman: {
      race: "orc", name: "Orc Shaman", classId: 50,
      pathUrl: `${W}/lu4/posts/post/79-path-of-the-orc-shaman-18`,
      startNpc: "Tataru Zu Hestui — Orc Village",
      changeNpc: "High Prefect — Gludin",
      where: "Orc Village → Gludin Orc Guild",
      reward: "250k EXP (Lu4)",
      opens: ["Overlord", "Warcryer"],
      steps: [
        "Habla con **Tataru Zu Hestui** (Path Shaman)",
        "Completa tótems / espíritus de la cadena (wiki)",
        "Cambia a **Orc Shaman** → Overlord o Warcryer",
        "SECRETO Lu4: desde el 40 puedes hacer **Alligator and Ivory**"
      ]
    },
    scavenger: {
      race: "dwarf", name: "Scavenger", classId: 54,
      pathUrl: `${W}/lu4/posts/post/77-path-of-the-scavanger-18`,
      startNpc: "Collector Pippi — norte de la Dwarven Village",
      where: "Dwarven Village (Pippi / Mion) → Western Mining Zone (Toma) → Gludin Warehouse (Moke)",
      changeNpc: "Warehouse Chief Moke — Warehouse, Gludin",
      reward: "Anillo del Cuervo + 250k EXP",
      opens: ["Bounty Hunter"],
      steps: [
        "**Pippi** → carta → **Mion** (entregas en bucle) → Carta de Mion",
        "**Master Toma** en Western Mining Zone (en Lu4 está en todos sus hábitats)",
        "Spoil+Sweep Honey Bear → 5 frascos · Tarántulas → 20 cuentas",
        "Raut en Gludin → Torai en Dragon Valley → Anillo del Cuervo",
        "**Moke** → Scavenger"
      ],
      shots: [
        { alt: "Pippi", src: `${W}/file/12315_3683284336_1746870042.jpg` },
        { alt: "Mion", src: `${W}/file/12316_1960413220_1746870042.jpg` }
      ]
    },
    artisan: {
      race: "dwarf", name: "Artisan", classId: 56,
      pathUrl: `${W}/lu4/posts/post/73-path-of-the-artisan-18`,
      startNpc: "Blacksmith Silvera — Dwarven Village",
      changeNpc: "Head Blacksmith — Gludin/Gludio",
      where: "Dwarven Village (herrería) → Gludin Blacksmith",
      reward: "250k EXP (Lu4)",
      opens: ["Warsmith"],
      steps: [
        "Habla con **Blacksmith Silvera** en la Dwarven Village",
        "Completa encargos de craft/materiales de la wiki",
        "Cambia a **Artisan** → Warsmith (Maestro)"
      ]
    },
    geomancer: {
      race: "dwarf", name: "Geomancer", classId: 209,
      pathUrl: `${W}/lu4/posts/post/153-path-of-geomancer`,
      startNpc: "Trial of Geomancer — ver wiki Lu4",
      changeNpc: "NPC de cambio en la wiki",
      where: "Dwarven Village / zona del Trial (wiki)",
      reward: "250k EXP (Lu4)",
      opens: ["Terramancer"],
      steps: [
        "Abre la guía **Path of Geomancer** en la wiki (clase especial Lu4)",
        "Completa el Trial paso a paso",
        "Cambia a **Geomancer** → Terramancer (Tectonic Sage)"
      ]
    },
    trooper: {
      race: "kamael", name: "Trooper", classId: 1,
      pathUrl: `${W}/masterwork/posts/post/278-path-of-the-trooper-18`,
      startNpc: "Path of the Trooper — Isla/Kamael Village",
      changeNpc: "Grand Master Kamael",
      where: "Kamael Village (solo personajes masculinos)",
      reward: "250k EXP (Lu4)",
      opens: ["Berserker", "Soul Breaker"],
      steps: [
        "En la aldea Kamael inicia **Path of the Trooper** (♂)",
        "Sigue los pasos de la wiki MasterWork/Lu4",
        "Cambia a **Trooper** → Berserker o Soul Breaker",
        "Certificados de 2ª clase disponibles desde el **35**"
      ]
    },
    warder: {
      race: "kamael", name: "Warder", classId: 1,
      pathUrl: `${W}/masterwork/posts/post/277-path-of-the-warder-18`,
      startNpc: "Path of the Warder — Isla/Kamael Village",
      changeNpc: "Grand Master Kamael",
      where: "Kamael Village (solo personajes femeninos)",
      reward: "250k EXP (Lu4)",
      opens: ["Arbalester", "Soul Breaker"],
      steps: [
        "En la aldea Kamael inicia **Path of the Warder** (♀)",
        "Sigue los pasos de la wiki",
        "Cambia a **Warder** → Arbalester o Soul Breaker",
        "Certificados de 2ª desde el **35**"
      ]
    }
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
    { id: "archmage", race: "human", first: "hwizard", name: "Archmage", name2: "Sorcerer", classId: 12, marks: "Scholar + Trust + Magus", threeInOne: `${W}/lu4/posts/post/296-3-in-1-sorcerer-profession-quest`, saga: `${W}/lu4/posts/post/409-saga-of-the-archmage-76`, sagaNpc: "Saga Archmage", gear: "ivory", role: "Mago nuker", tip: "Ivory Tower quest al 40; no Alligator" },
    { id: "soultaker", race: "human", first: "hwizard", name: "Soultaker", name2: "Necromancer", classId: 13, marks: "Scholar + Trust + Witchcraft", threeInOne: `${W}/lu4/posts/post/297-3-in-1-necromancer-profession-quest`, saga: `${W}/lu4/posts/post/410-saga-of-the-soultaker-76`, sagaNpc: "Hardin — Saga Soultaker (wiki 76+)", gear: "ivory", role: "Mago / maldiciones", tip: "Ivory Tower + zonas de Hardin" },
    { id: "arcana", race: "human", first: "hwizard", name: "Arcana Lord", name2: "Warlock", classId: 14, marks: "Scholar + Trust + Summoner", threeInOne: `${W}/lu4/posts/post/298-3-in-1-warlock-profession-quest`, saga: `${W}/lu4/posts/post/411-saga-of-the-arcana-lord-76`, sagaNpc: "Saga Arcana Lord", gear: "ivory", role: "Invocador", tip: "Mascotas de misión desactivadas; tu invocación sí" },
    { id: "cardinal", race: "human", first: "cleric", name: "Cardinal", name2: "Bishop", classId: 16, marks: "Pilgrim + Trust + Healer", threeInOne: `${W}/lu4/posts/post/299-3-in-1-bishop-profession-quest`, saga: `${W}/lu4/posts/post/413-saga-of-the-cardinal-76`, sagaNpc: "Saga Cardinal", gear: "ivory", role: "Sanador", tip: "Siempre hay grupo para ti; en Lu4 también recibes los objetos de misión del grupo" },
    { id: "hierophant", race: "human", first: "cleric", name: "Hierophant", name2: "Prophet", classId: 17, marks: "Pilgrim + Trust + Reformer", threeInOne: `${W}/lu4/posts/post/300-3-in-1-prophet-profession-quest`, saga: `${W}/lu4/posts/post/412-saga-of-the-hierophant-76`, sagaNpc: "Saga Hierophant", gear: "ivory", role: "Buffer / apoyo", tip: "Tus buffs hacen que todo el grupo farmee más rápido" },
    // Elfo
    { id: "evatemplar", race: "elf", first: "elvenknight", name: "Eva's Templar", name2: "Temple Knight", classId: 20, marks: "Duty + Life + Healer", threeInOne: `${W}/lu4/posts/post/301-3-in-1-temple-knight-profession-quest`, saga: `${W}/lu4/posts/post/414-saga-of-evas-templar-76`, sagaNpc: "Saga Eva's Templar", gear: "alligator", role: "Tanque", tip: "Tanque elfo" },
    { id: "swordmuse", race: "elf", first: "elvenknight", name: "Sword Muse", name2: "Swordsinger", classId: 21, marks: "Challenger + Life + Duelist", threeInOne: `${W}/lu4/posts/post/302-3-in-1-swordsinger-profession-quest`, saga: `${W}/lu4/posts/post/415-saga-of-the-sword-muse-76`, sagaNpc: "Saga Sword Muse", gear: "alligator", role: "Bardo", tip: "Los ritmos = más kills en grupo" },
    { id: "windrider", race: "elf", first: "elvenscout", name: "Wind Rider", name2: "Plains Walker", classId: 23, marks: "Seeker + Life + Searcher", threeInOne: `${W}/lu4/posts/post/303-3-in-1-plains-walker-profession-quest`, saga: `${W}/lu4/posts/post/416-saga-of-the-wind-rider-76`, sagaNpc: "Saga Wind Rider", gear: "alligator", role: "Daga", tip: "Daga elfa" },
    { id: "moonlight", race: "elf", first: "elvenscout", name: "Moonlight Sentinel", name2: "Silver Ranger", classId: 24, marks: "Seeker + Life + Sagittarius", threeInOne: `${W}/lu4/posts/post/304-3-in-1-silver-ranger-profession-quest`, saga: `${W}/lu4/posts/post/417-saga-of-the-moonlight-sentinel-76`, sagaNpc: "Saga Moonlight", gear: "alligator", role: "Arquero", tip: "Arquero elfo" },
    { id: "mysticmuse", race: "elf", first: "elvenwizard", name: "Mystic Muse", name2: "Spellsinger", classId: 27, marks: "Scholar + Life + Magus", threeInOne: `${W}/lu4/posts/post/305-3-in-1-spellsinger-profession-quest`, saga: `${W}/lu4/posts/post/418-saga-of-the-mystic-muse-76`, sagaNpc: "Saga Mystic Muse", gear: "ivory", role: "Mago nuker", tip: "Ivory Tower + Cromáticas al final" },
    { id: "elemaster", race: "elf", first: "elvenwizard", name: "Elemental Master", name2: "Elemental Summoner", classId: 28, marks: "Scholar + Life + Summoner", threeInOne: `${W}/lu4/posts/post/306-3-in-1-elemental-summoner-profession-quest`, saga: `${W}/lu4/posts/post/419-saga-of-the-elemental-master-76`, sagaNpc: "Saga Elemental Master", gear: "ivory", role: "Invocador", tip: "Ivory Tower al 40+" },
    { id: "evasant", race: "elf", first: "oracle", name: "Eva's Saint", name2: "Elven Elder", classId: 30, marks: "Pilgrim + Life + Healer", threeInOne: `${W}/lu4/posts/post/307-3-in-1-elven-elder-profession-quest`, saga: `${W}/lu4/posts/post/420-saga-of-evas-saint-76`, sagaNpc: "Saga Eva's Saint", gear: "ivory", role: "Sanador", tip: "EE muy pedido en grupos" },
    // DE
    { id: "shilientemplar", race: "darkelf", first: "palus", name: "Shillien Templar", name2: "Shillien Knight", classId: 33, marks: "Duty + Fate + Witchcraft", threeInOne: `${W}/lu4/posts/post/308-3-in-1-shillien-knight-profession-quest`, saga: `${W}/lu4/posts/post/421-saga-of-the-shillien-templar-76`, sagaNpc: "Saga Shillien Templar", gear: "alligator", role: "Tanque", tip: "Tanque elfo oscuro" },
    { id: "spectraldancer", race: "darkelf", first: "palus", name: "Spectral Dancer", name2: "Bladedancer", classId: 34, marks: "Challenger + Fate + Duelist", threeInOne: `${W}/lu4/posts/post/309-3-in-1-bladedancer-profession-quest`, saga: `${W}/lu4/posts/post/422-saga-of-the-spectral-dancer-76`, sagaNpc: "Saga Spectral Dancer", gear: "alligator", role: "Bardo", tip: "BD = ritmos de grupo" },
    { id: "ghosthunter", race: "darkelf", first: "assassin", name: "Ghost Hunter", name2: "Abyss Walker", classId: 36, marks: "Seeker + Fate + Searcher", threeInOne: `${W}/lu4/posts/post/310-3-in-1-abyss-walker-profession-quest`, saga: `${W}/lu4/posts/post/423-saga-of-the-ghost-hunter-76`, sagaNpc: "Saga Ghost Hunter", gear: "alligator", role: "Daga", tip: "Daga elfo oscuro" },
    { id: "ghostsentinel", race: "darkelf", first: "assassin", name: "Ghost Sentinel", name2: "Phantom Ranger", classId: 37, marks: "Seeker + Fate + Sagittarius", threeInOne: `${W}/lu4/posts/post/311-3-in-1-phantom-ranger-profession-quest`, saga: `${W}/lu4/posts/post/424-saga-of-the-ghost-sentinel-76`, sagaNpc: "Saga Ghost Sentinel", gear: "alligator", role: "Arquero", tip: "Arquero elfo oscuro" },
    { id: "stormscreamer", race: "darkelf", first: "darkwizard", name: "Storm Screamer", name2: "Spellhowler", classId: 40, marks: "Scholar + Fate + Magus", threeInOne: `${W}/lu4/posts/post/312-3-in-1-spellhowler-profession-quest`, saga: `${W}/lu4/posts/post/425-saga-of-the-storm-screamer-76`, sagaNpc: "Fairen — Ivory Tower 4F", gear: "ivory", role: "Mago nuker (viento)", tip: "En el Path no pierdas el Hub Scent; en la Saga mata a Allector usando skills (no solo auto-attack)" },
    { id: "spectralmaster", race: "darkelf", first: "darkwizard", name: "Spectral Master", name2: "Phantom Summoner", classId: 41, marks: "Scholar + Fate + Summoner", threeInOne: `${W}/lu4/posts/post/313-3-in-1-phantom-summoner-profession-quest`, saga: `${W}/lu4/posts/post/426-saga-of-the-spectral-master-76`, sagaNpc: "Saga Spectral Master", gear: "ivory", role: "Invocador", tip: "Ivory Tower al 40+" },
    { id: "shilliensaint", race: "darkelf", first: "shillienoracle", name: "Shillien Saint", name2: "Shillien Elder", classId: 43, marks: "Pilgrim + Fate + Reformer", threeInOne: `${W}/lu4/posts/post/314-3-in-1-shillien-elder-profession-quest`, saga: `${W}/lu4/posts/post/427-saga-of-the-shillien-saint-76`, sagaNpc: "Saga Shillien Saint", gear: "ivory", role: "Buffer / sanador", tip: "SE muy pedido en grupos" },
    // Orc
    { id: "titan", race: "orc", first: "orcraider", name: "Titan", name2: "Destroyer", classId: 46, marks: "Challenger + Glory + Champion", threeInOne: `${W}/lu4/posts/post/315-3-in-1-destroyer-profession-quest`, saga: `${W}/lu4/posts/post/428-saga-of-the-titan-76`, sagaNpc: "Prefect Tazki — Rune Warriors Guild", gear: "alligator", role: "Daño a dos manos", tip: "Rey de las zonas Élite de Schuttgart" },
    { id: "khavatari", race: "orc", first: "orcmonk", name: "Grand Khavatari", name2: "Tyrant", classId: 48, marks: "Challenger + Glory + Duelist", threeInOne: `${W}/lu4/posts/post/316-3-in-1-tyrant-profession-quest`, saga: `${W}/lu4/posts/post/429-saga-of-the-grand-khavatari-76`, sagaNpc: "Saga Grand Khavatari", gear: "alligator", role: "Daño con puños", tip: "Alligator + grupo" },
    { id: "dominator", race: "orc", first: "orcshaman", name: "Dominator", name2: "Overlord", classId: 51, marks: "Pilgrim + Glory + Lord", threeInOne: `${W}/lu4/posts/post/317-3-in-1-overlord-profession-quest`, saga: `${W}/lu4/posts/post/430-saga-of-the-dominator-76`, sagaNpc: "Saga Dominator", gear: "both", role: "Buffer de clan", tip: "Puedes hacer Alligator and Ivory" },
    { id: "doomcryer", race: "orc", first: "orcshaman", name: "Doomcryer", name2: "Warcryer", classId: 52, marks: "Pilgrim + Glory + War Spirit", threeInOne: `${W}/lu4/posts/post/318-3-in-1-warcryer-profession-quest`, saga: `${W}/lu4/posts/post/431-saga-of-the-doomcryer-76`, sagaNpc: "Saga Doomcryer", gear: "both", role: "Buffer de grupo", tip: "Alligator and Ivory" },
    // Dwarf
    { id: "fortuneseeker", race: "dwarf", first: "scavenger", name: "Fortune Seeker", name2: "Bounty Hunter", classId: 55, marks: "Guildsman + Prosperity + Searcher", threeInOne: `${W}/lu4/posts/post/319-3-in-1-bounty-hunter-profession-quest`, saga: `${W}/lu4/posts/post/433-saga-of-the-fortune-seeker-76`, sagaNpc: "Mond — Rune Warehouse", gear: "alligator", role: "Spoil + daño", tip: "Antes del 3-en-1 prepara: Acero×7, Barniz×70, Piel×100, Cristal D×80" },
    { id: "maestro", race: "dwarf", first: "artisan", name: "Maestro", name2: "Warsmith", classId: 57, marks: "Guildsman + Prosperity + Maestro", threeInOne: `${W}/lu4/posts/post/320-3-in-1-warsmith-profession-quest`, saga: `${W}/lu4/posts/post/432-saga-of-the-maestro-76`, sagaNpc: "Saga Maestro", gear: "alligator", role: "Craft / daño", tip: "Economía de craft + Alligator" },
    { id: "tectonic", race: "dwarf", first: "geomancer", name: "Tectonic Sage", name2: "Terramancer", classId: 210, marks: "Scholar + Prosperity + Magus", threeInOne: `${W}/lu4/posts/post/321-3-in-1-terramancer-profession-quest-35`, saga: `${W}/lu4/posts/post/164-saga-of-tectonic-sage-76`, sagaNpc: "Saga Tectonic Sage", gear: "ivory", role: "Mago enano", tip: "Ivory Tower quest" },
    // Kamael
    { id: "doombringer", race: "kamael", first: "trooper", name: "Doombringer", name2: "Berserker", classId: 46, marks: "Certified Berserker", threeInOne: `${W}/lu4/posts/post/48-quests-for-1-2-and-3-classes`, saga: `${W}/lu4/posts/post/434-saga-of-the-doombringer-76`, sagaNpc: "Saga Doombringer", gear: "alligator", role: "Kamael cuerpo a cuerpo", tip: "Certificado desde el 35" },
    { id: "soulhound", race: "kamael", first: "trooper", name: "Soul Hound", name2: "Soul Breaker", classId: 46, marks: "Certified Soul Breaker", threeInOne: `${W}/lu4/posts/post/48-quests-for-1-2-and-3-classes`, saga: `${W}/lu4/posts/post/435-saga-of-the-soul-hound-76`, sagaNpc: "Saga Soul Hound", gear: "ivory", role: "Kamael mágico", tip: "Soul Breaker (♂ o ♀) → Soul Hound" },
    { id: "trickster", race: "kamael", first: "warder", name: "Trickster", name2: "Arbalester", classId: 9, marks: "Certified Arbalester", threeInOne: `${W}/lu4/posts/post/48-quests-for-1-2-and-3-classes`, saga: `${W}/lu4/posts/post/436-saga-of-the-trickster-76`, sagaNpc: "Saga Trickster", gear: "alligator", role: "Kamael arquero", tip: "Path Warder (femenino)" }
  ];

  function gearBlock(gear) {
    if (gear === "alligator") return {
      title: "Alligator Hunter (40–47)",
      body: "NPC Enverun, Grocery Store de Heine. Solo guerreros y Orc Shamans con 2ª clase. Da equipo C/D, pergaminos y tintes.",
      where: "Heine → Grocery Store (Grocery) → Enverun",
      wiki: `${W}/lu4/posts/post/368-lu4-equipment-quests`
    };
    if (gear === "ivory") return {
      title: "Under the Shadow of the Ivory Tower (40–47)",
      body: "NPC Cema — Hardin's Academy. Solo místicos y Orc Shamans con 2ª clase. Farmeas Nebulite Orbs y canjeas por equipo grado C.",
      where: "Hardin's Academy (territorio Giran) → Cema Magic Trader",
      wiki: `${W}/lu4/posts/post/368-lu4-equipment-quests`
    };
    return {
      title: "Alligator + Ivory Tower (ventaja de Orc Shaman)",
      body: "Como Orc Shaman puedes hacer las dos misiones de equipo del 40–47. Es una ventaja única.",
      where: "Heine (Enverun) + Hardin's Academy (Cema)",
      wiki: `${W}/lu4/posts/post/368-lu4-equipment-quests`
    };
  }

  /** Perfil de arma/armadura según clase (nombres wiki en inglés). */
  function weaponProfile(cls) {
    const n = `${cls.id} ${cls.name} ${cls.name2} ${cls.role}`.toLowerCase();
    if (/duelist|gladiator|spectraldancer|bladedancer|swordmuse|swordsinger/.test(n)) return "dual";
    if (/dreadnought|warlord|lanza|área/.test(n)) return "spear";
    if (/titan|destroyer|doombringer|berserker|dos manos|twohand|two hand/.test(n)) return "twohand";
    if (/khavatari|tyrant|puño|fist/.test(n)) return "fist";
    if (/adventurer|treasure|windrider|plains|ghosthunter|abyss|daga|dagger/.test(n)) return "dagger";
    if (/sagittarius|hawkeye|moonlight|silver|ghostsentinel|phantom ranger|trickster|arbalester|arquero/.test(n)) return "bow";
    if (/phoenix|hell|evatemplar|temple knight|shilientemplar|shillien knight|tanque/.test(n)) return "tank";
    if (/cardinal|bishop|evasant|elven elder|sanador/.test(n)) return "healer";
    if (/hierophant|prophet|shilliensaint|shillien elder|dominator|overlord|doomcryer|warcryer|buffer/.test(n)) return "buffer";
    if (/archmage|sorcerer|soultaker|necromancer|mysticmuse|spellsinger|storm|spellhowler|tectonic|terramancer|soulhound|soul breaker|mago|nuker|mágico/.test(n)) return "mage";
    if (/arcana|warlock|elemaster|elemental|spectralmaster|phantom summoner|invocador/.test(n)) return "summoner";
    if (/fortune|bounty|maestro|warsmith|spoil|craft/.test(n)) return "dwarf";
    return "melee";
  }

  const WEAPON_REC = {
    dual: {
      label: "Dual swords",
      armor: "Light (Rind / Drake Leather) o Heavy (Full Plate) según playstyle",
      saNote: "Las duals NO llevan Soul Crystal: el SA sale al enchant +4 o superior.",
      grades: [
        { g: "NG→D", w: "Cupón del Path: mejora tu arma starter a D (low). Luego Dual D (shop / craft)." },
        { g: "C", w: "Stormbringer*Katana / Shamshir*Spirit Sword / Sword of Revolution duals (Alligator / craft / Mammon)." },
        { g: "B+", w: "Duals B (Samurai Duals, etc.) vía craft, drop o Blacksmith of Mammon." }
      ]
    },
    spear: {
      label: "Spear / polearm",
      armor: "Heavy — Full Plate C → Zubei / Doom B → Majestic A",
      saNote: "SA con Soul Crystal (Red/Green/Blue) en herrero de ciudad.",
      grades: [
        { g: "NG→D", w: "Cupón Path + polearm D (Winged Spear / Pike)." },
        { g: "C", w: "Orcish Poleaxe / Widow Maker / Bec de Corbin (Alligator / Mammon)." },
        { g: "B+", w: "Lance / Tiphon's Spear vía craft o Mammon." }
      ]
    },
    twohand: {
      label: "Two-handed sword / blunt",
      armor: "Heavy — Full Plate C (STR/HP) → Blue Wolf / Doom B → Majestic Plate A",
      saNote: "SA con Soul Crystal en Blacksmith. Prioriza daño / crit según color.",
      grades: [
        { g: "NG→D", w: "Butcher's Sword / 2H D del cupón Path." },
        { g: "C", w: "Samurai Longsword / Battle Axe / War Axe C (Alligator pool)." },
        { g: "B+", w: "Great Sword / Guardian Sword / Damascus → luego A (Tallum Blade, etc.)." }
      ]
    },
    fist: {
      label: "Fists",
      armor: "Light — Rind / Drake → Zubei Leather → Tallum / Majestic Leather",
      saNote: "SA con Soul Crystal en Blacksmith.",
      grades: [
        { g: "NG→D", w: "Fist D del cupón Path / shop." },
        { g: "C", w: "Bich'Hwa / Scallop Jamadhr / Chakram (Alligator / craft)." },
        { g: "B+", w: "Arthro Nail / Bellion Cestus → A fists." }
      ]
    },
    dagger: {
      label: "Dagger",
      armor: "Light — Rind / Drake Leather → Zubei / Leather of Doom → Tallum Leather",
      saNote: "SA con Soul Crystal (suele buscarse Crit / Haste según build).",
      grades: [
        { g: "NG→D", w: "Cupón Path → dagger D (Mithril Dagger)." },
        { g: "C", w: "Crystal Dagger / Cursed Dagger / Dark Screamer (Alligator)." },
        { g: "B+", w: "Demon's Dagger / Kris → A (Naga Storm, etc.)." }
      ]
    },
    bow: {
      label: "Bow",
      armor: "Light — Reinforced Mithril / Rind → Zubei Leather → Majestic Leather",
      saNote: "SA con Soul Crystal en Blacksmith.",
      grades: [
        { g: "NG→D", w: "Cupón Path → bow D (Light Bow / Reinforced Bow)." },
        { g: "C", w: "Akat Long Bow / Eminence Bow (Alligator / craft)." },
        { g: "B+", w: "Dark Elven Long Bow / Carnage Bow → A (Shyeed's Bow)." }
      ]
    },
    tank: {
      label: "Sword + shield (tank)",
      armor: "Heavy — Chain / Composite / Full Plate C → Avadon / Doom B → Dark Crystal / Nightmare / Majestic A",
      saNote: "SA en el arma (Blacksmith). Escudo aparte; sets heavy dan bonus con shield.",
      grades: [
        { g: "NG→D", w: "Sword of Solidarity / one-hand D + Bone Shield → Hoplon (Acts of Evil)." },
        { g: "C", w: "Homunkulus's Sword / Stormbringer + Chain/Composite Shield (Alligator)." },
        { g: "B+", w: "Sword of Valhalla / Keshanberk + Avadon/Doom shield path." }
      ]
    },
    mage: {
      label: "Magic blunt / staff",
      armor: "Robe — Karmian / Demon / Seal C → Zubei / Blue Wolf / Doom robe B → Tallum / Dark Crystal / Nightmare robe A",
      saNote: "SA mágico con Soul Crystal (Acumen / Magic Power / Conversion según arma).",
      grades: [
        { g: "NG→D", w: "Wand of Adept / Staff of Mana → cupón Path a D (Buffalo's Horn / Mystic Staff)." },
        { g: "C", w: "Homunkulus's Sword (magic) / Staff of Life / Crystal Staff / Pa'agrian Axe (Ivory Tower)." },
        { g: "B+", w: "Deadman's Staff / Ghoul Staff / Dasparion's Staff → A (Cabrio's Hand, etc.)." }
      ]
    },
    healer: {
      label: "Healer blunt / staff",
      armor: "Robe — Karmian / Divine C → Avadon / Blue Wolf robe B → Majestic / Dark Crystal robe A",
      saNote: "SA de cast speed / heal (Acumen, Conversion) vía Soul Crystal.",
      grades: [
        { g: "NG→D", w: "Cupón Path → healer blunt D." },
        { g: "C", w: "Staff of Life / Stick of Eternity / Divine Tome path (Ivory)." },
        { g: "B+", w: "Spell Breaker / Kaim Vanul's Bones → A healer weapons." }
      ]
    },
    buffer: {
      label: "Buffer blunt / staff",
      armor: "Robe o Light según clase — Karmian C → Blue Wolf / Doom robe → Tallum / Majestic robe",
      saNote: "SA Acumen / Magic Power con Soul Crystal.",
      grades: [
        { g: "NG→D", w: "Cupón Path → magic blunt D." },
        { g: "C", w: "Igual que magos: Crystal Staff / Homunkulus (Ivory o Alligator si eres Shaman)." },
        { g: "B+", w: "Mismo camino de armas mágicas B→A." }
      ]
    },
    summoner: {
      label: "Summoner staff / blunt",
      armor: "Robe — Karmian / Demon → Zubei robe → Tallum / Nightmare robe",
      saNote: "SA mágico con Soul Crystal.",
      grades: [
        { g: "NG→D", w: "Cupón Path → magic weapon D." },
        { g: "C", w: "Ivory Tower rewards (staffs / magic swords)." },
        { g: "B+", w: "Craft / Mammon magic weapons B→A." }
      ]
    },
    dwarf: {
      label: "Blunt / sword (spoil-friendly)",
      armor: "Heavy o Light — Dwarven Chain / Full Plate C → Zubei / Doom → Majestic",
      saNote: "SA con Soul Crystal. Spoil > DPS puro al principio.",
      grades: [
        { g: "NG→D", w: "Silversmith Hammer → cupón Path a D blunt." },
        { g: "C", w: "War Axe / Battle Axe / Dwarven War Hammer (Alligator)." },
        { g: "B+", w: "Artisan's / craft B blunts → A." }
      ]
    },
    melee: {
      label: "One-hand melee",
      armor: "Heavy o Light según build",
      saNote: "SA con Soul Crystal en Blacksmith.",
      grades: [
        { g: "NG→D", w: "Cupón Path NG→D." },
        { g: "C", w: "Alligator / Ivory según tu tipo → arma C del pool." },
        { g: "B+", w: "Craft, drop Élite o Blacksmith of Mammon." }
      ]
    }
  };

  function armorSetsForProfile(profile) {
    const mageLike = /mage|healer|buffer|summoner/.test(profile);
    const lightLike = /dual|dagger|bow|fist/.test(profile);
    if (mageLike) {
      return [
        { g: "C", s: "Karmian Set (Cast. Spd.) · Demon's Set (INT) · Divine Set (heal)" },
        { g: "B", s: "Tunic of Zubei · Blue Wolf Tunic · Tunic of Doom" },
        { g: "A", s: "Tallum Tunic · Dark Crystal Robe · Robe of Nightmare · Majestic Robe" }
      ];
    }
    if (lightLike) {
      return [
        { g: "C", s: "Rind Leather (Atk. Spd.) · Drake Leather · Plated Leather (STR)" },
        { g: "B", s: "Zubei's Leather · Leather Armor of Doom · Blue Wolf Leather" },
        { g: "A", s: "Tallum Leather · Dark Crystal Leather · Leather of Nightmare · Majestic Leather" }
      ];
    }
    return [
      { g: "C", s: "Full Plate (STR/HP) · Composite · Chain Mail · Dwarven Chain" },
      { g: "B", s: "Avadon / Zubei / Blue Wolf / Doom Plate" },
      { g: "A", s: "Tallum Plate · Dark Crystal · Nightmare · Majestic Plate" }
    ];
  }

  function gearGradesHtml(cls) {
    const g = gearBlock(cls.gear);
    const cQuest = cls.gear === "ivory"
      ? "Under the Shadow of the Ivory Tower (Cema, Hardin's)"
      : cls.gear === "both"
        ? "Alligator (Enverun) + Ivory Tower (Cema)"
        : "Alligator Hunter (Enverun, Heine)";
    return `
      <div class="table-scroll">
        <table class="roadmap responsive">
          <thead><tr><th>Grado</th><th>Nivel típico</th><th>Cómo conseguirlo (Lu4)</th><th>Sets / nota</th></tr></thead>
          <tbody>
            <tr>
              <td data-label="Grado"><strong>NG</strong></td>
              <td data-label="Nivel">1–20</td>
              <td data-label="Cómo">Quests de ${RACES[cls.race].village} + shops. Seal be Broken (armadura NG).</td>
              <td data-label="Sets">Sets NG con bonus Lu4 en shops.
                <a href="${W}/lu4/posts/post/362-ngd-grade-sets-upgrades" target="_blank">Ng/D Sets</a></td>
            </tr>
            <tr>
              <td data-label="Grado"><strong>D</strong></td>
              <td data-label="Nivel">18–40</td>
              <td data-label="Cómo">Cupón Path (arma NG→D) · Dragon Fangs · Magnificent Feast · Acts of Evil · upgrade en merchant.</td>
              <td data-label="Sets"><a href="${W}/lu4/posts/post/362-ngd-grade-sets-upgrades" target="_blank">Ng/D upgrades</a></td>
            </tr>
            <tr>
              <td data-label="Grado"><strong>C</strong></td>
              <td data-label="Nivel">40–52</td>
              <td data-label="Cómo"><strong>${cQuest}</strong> · Warehouse Pastime · Treasure Hunt.
                <span class="tag warn">No Coins of Magic</span></td>
              <td data-label="Sets">Karmian / Full Plate / Rind / Drake…
                <a href="${W}/lu4/posts/post/558-cba-grade-sets-upgrades" target="_blank">C/B/A Sets</a>
                · <a href="${g.wiki}" target="_blank">Equipment Quests</a></td>
            </tr>
            <tr>
              <td data-label="Grado"><strong>B</strong></td>
              <td data-label="Nivel">~52–61</td>
              <td data-label="Cómo">Craft, spoil/drop Élite, exchange Blacksmith of Mammon (Ancient Adena).</td>
              <td data-label="Sets">Avadon / Zubei / Blue Wolf / Doom.
                <a href="${W}/lu4/posts/post/558-cba-grade-sets-upgrades" target="_blank">Bonos B</a>
                · <a href="${W}/lu4/posts/post/12-blacksmith-of-mammon-weapon-upgradeexchange" target="_blank">Mammon</a></td>
            </tr>
            <tr>
              <td data-label="Grado"><strong>A</strong></td>
              <td data-label="Nivel">~61–76</td>
              <td data-label="Cómo">Craft, RBs, Mammon exchange, MasterWork crystals.</td>
              <td data-label="Sets">Tallum / Dark Crystal / Nightmare / Majestic.
                <a href="${W}/lu4/posts/post/558-cba-grade-sets-upgrades" target="_blank">Bonos A</a></td>
            </tr>
            <tr>
              <td data-label="Grado"><strong>S+</strong></td>
              <td data-label="Nivel">76–85</td>
              <td data-label="Cómo">Tras Saga / endgame. Sets S y S80–84 en wiki MasterWork.</td>
              <td data-label="Sets"><a href="${W}/lu4/posts/post/556-enchantment-bonuses-for-sets-dcba-grade" target="_blank">Enchant de sets</a></td>
            </tr>
          </tbody>
        </table>
      </div>
      <p class="muted" style="margin-top:10px">Enchant: usa scrolls del grado correcto. Los sets dan bonus extra al enchant —
        <a href="${W}/lu4/posts/post/556-enchantment-bonuses-for-sets-dcba-grade" target="_blank">Enchantment bonuses D/C/B/A</a>.</p>`;
  }

  function weaponsAndSaHtml(cls) {
    const profile = weaponProfile(cls);
    const rec = WEAPON_REC[profile] || WEAPON_REC.melee;
    const sets = armorSetsForProfile(profile);
    const weaponRows = rec.grades.map(x =>
      `<tr><td data-label="Grado"><strong>${x.g}</strong></td><td data-label="Arma">${x.w}</td></tr>`
    ).join("");
    const setRows = sets.map(x =>
      `<tr><td data-label="Grado"><strong>${x.g}</strong></td><td data-label="Set">${x.s}</td></tr>`
    ).join("");
    return `
      <p><span class="tag info">${rec.label}</span> para <strong>${cls.name2} → ${cls.name}</strong></p>
      <p><strong>Armadura recomendada:</strong> ${rec.armor}</p>
      <div class="table-scroll">
        <table class="responsive">
          <thead><tr><th>Grado</th><th>Arma objetivo</th></tr></thead>
          <tbody>${weaponRows}</tbody>
        </table>
      </div>
      <div class="table-scroll" style="margin-top:12px">
        <table class="responsive">
          <thead><tr><th>Grado</th><th>Sets útiles (Lu4)</th></tr></thead>
          <tbody>${setRows}</tbody>
        </table>
      </div>
      <p style="margin-top:14px"><span class="tag warn">${rec.saNote}</span>
        Guía completa de cristales abajo → <strong>Soul Crystals (SA)</strong>.</p>`;
  }

  /** Guía completa Soul Crystal / SA (wiki Lu4 post 367) */
  function soulCrystalHtml() {
    const wiki = `${W}/lu4/posts/post/367-soul-crystal-sa-enhancement`;
    return `
      <p>En Lu4 los <strong>Soul Crystals</strong> (SA) dan efectos especiales al arma.
        Fuente: <a href="${wiki}" target="_blank" rel="noopener">Soul Crystal (SA) Enhancement</a>.</p>

      <h4>Qué debes saber</h4>
      <ul>
        <li>Se insertan en armas <strong>D, C, B y A</strong>. <strong>NoGrade no admite SA</strong>.</li>
        <li>Hay 3 colores: <strong>Red / Green / Blue</strong> (eligen el efecto al insertar).</li>
        <li><strong>Dual weapons</strong> (swords / daggers / blunts duales): <em>no</em> usan cristal. El SA sale al enchant <strong>+4 o más</strong>.</li>
        <li>Insertar y quitar: <strong>Blacksmith de cualquier ciudad</strong>. Al quitar, el cristal <strong>no vuelve</strong>.</li>
      </ul>

      <h4>1) Cómo conseguir / “crear” el cristal</h4>
      <ol>
        <li>Ve a un <strong>Blacksmith</strong> de ciudad.</li>
        <li>Compra un Soul Crystal <strong>vacío nivel 0</strong> (Red, Green o Blue).</li>
        <li>Solo puedes comprar <strong>uno por diálogo</strong>; habla otra vez si quieres otro.</li>
        <li>Para levear necesitas <strong>exactamente 1 cristal</strong> en el inventario (si hay varios → mensaje de <em>crystal resonance</em> y no sube).</li>
      </ol>

      <h4>2) Cómo levearlo (absorber almas)</h4>
      <div class="place-box">
        <ul style="margin:0;padding-left:1.2rem">
          <li>En Lu4 el leveo fue <strong>reworkeado</strong>: deja el cristal en el inventario y mata mobs. <strong>No hace falta usarlo sobre el monstruo</strong>.</li>
          <li>La quest de SA se <strong>activa al loguear</strong> (no hay que aceptarla en un NPC). Si la cancelaste a mano → relog.</li>
          <li>La chance no es 100%: por nivel puedes necesitar de 1 a varias docenas de kills.</li>
          <li><strong>Atajo Lu4:</strong> para subir del stage 1 al stage que necesitas, puedes farmear solo los mobs del <em>nivel objetivo</em> (no hace falta cambiar de mob en cada stage intermedio).</li>
          <li>Stages <strong>11–13 (A-grade)</strong>: se suben con <strong>Raid Bosses / Epics</strong> (cristal en inventario; tampoco hace falta usarlo en el boss).</li>
        </ul>
      </div>

      <h4>3) Stage del cristal según el arma + Gemstones</h4>
      <div class="table-scroll">
        <table class="responsive">
          <thead><tr><th>Arma</th><th>Soul Crystal</th><th>Gemstones al insertar</th></tr></thead>
          <tbody>
            <tr><td data-label="Arma">D low</td><td data-label="Cristal">Stage 2</td><td data-label="Gems">Gemstone D ×75</td></tr>
            <tr><td data-label="Arma">D middle</td><td data-label="Cristal">Stage 3</td><td data-label="Gems">Gemstone D ×120</td></tr>
            <tr><td data-label="Arma">D top</td><td data-label="Cristal">Stage 4</td><td data-label="Gems">Gemstone D ×150</td></tr>
            <tr><td data-label="Arma">C low</td><td data-label="Cristal">Stage 5</td><td data-label="Gems">Gemstone C ×97</td></tr>
            <tr><td data-label="Arma">C middle</td><td data-label="Cristal">Stage 6</td><td data-label="Gems">Gemstone C ×238</td></tr>
            <tr><td data-label="Arma">C high</td><td data-label="Cristal">Stage 7</td><td data-label="Gems">Gemstone C ×306</td></tr>
            <tr><td data-label="Arma">C top</td><td data-label="Cristal">Stage 8</td><td data-label="Gems">Gemstone C ×555</td></tr>
            <tr><td data-label="Arma">B low</td><td data-label="Cristal">Stage 9</td><td data-label="Gems">Gemstone B ×222</td></tr>
            <tr><td data-label="Arma">B top</td><td data-label="Cristal">Stage 10</td><td data-label="Gems">Gemstone B ×339</td></tr>
            <tr><td data-label="Arma">A low</td><td data-label="Cristal">Stage 11</td><td data-label="Gems">Gemstone A ×170</td></tr>
            <tr><td data-label="Arma">A middle</td><td data-label="Cristal">Stage 12</td><td data-label="Gems">Gemstone A ×260</td></tr>
            <tr><td data-label="Arma">A top</td><td data-label="Cristal">Stage 13</td><td data-label="Gems">Gemstone A ×400</td></tr>
          </tbody>
        </table>
      </div>

      <h4>4) Dónde farmear cada stage (mobs recomendados)</h4>
      <p class="muted">Lista resumida de la wiki. Puedes usar cualquier mob de esa columna Stage.</p>
      <div class="table-scroll">
        <table class="roadmap responsive">
          <thead><tr><th>Stage</th><th>Para arma</th><th>Mobs ejemplo (Lv)</th></tr></thead>
          <tbody>
            <tr><td data-label="Stage"><strong>2</strong></td><td data-label="Arma">D low</td><td data-label="Mobs">Ol Mahum Captain / Langk Lizardman Leader / Cloudy Beast Turen (25–29)</td></tr>
            <tr><td data-label="Stage"><strong>3</strong></td><td data-label="Arma">D mid</td><td data-label="Mobs">Delu Lizardman Warrior / Ant Captain / Ghoul / Marsh Stakato Drone (30–35)</td></tr>
            <tr><td data-label="Stage"><strong>4</strong></td><td data-label="Arma">D top</td><td data-label="Mobs">Hatu Onyx Beast / Noble Ant / Ogre / Porta / Lienrik (36–40)</td></tr>
            <tr><td data-label="Stage"><strong>5</strong></td><td data-label="Arma">C low</td><td data-label="Mobs">Timak Orc / Blade Stakato / Great White Shark / Zaken's Pikeman (40–43)</td></tr>
            <tr><td data-label="Stage"><strong>6</strong></td><td data-label="Arma">C mid</td><td data-label="Mobs">Timak Orc Overlord / Water Giant / Forest of Mirrors Ghost / Unpleasant Humming (44–46)</td></tr>
            <tr><td data-label="Stage"><strong>7</strong></td><td data-label="Arma">C high</td><td data-label="Mobs">Eva's Seeker / Death Flyer / Fiend Archer / Garden Guard / Musveren (47–50)</td></tr>
            <tr><td data-label="Stage"><strong>8</strong></td><td data-label="Arma">C top</td><td data-label="Mobs">Doll Blader / Sairon's Doll / Veil Master / Sairon / Harit Lizardman (53–54)</td></tr>
            <tr><td data-label="Stage"><strong>9</strong></td><td data-label="Arma">B low</td><td data-label="Mobs">Unicorn Elder / Thunder Wyrm / Drake / Maluk Succubus / Halingka (55–59)</td></tr>
            <tr><td data-label="Stage"><strong>10</strong></td><td data-label="Arma">B top</td><td data-label="Mobs">Maluk Knight / Pytan / Platinum Tribe / Seal Angel / Doom Knight (62–73)</td></tr>
            <tr><td data-label="Stage"><strong>11–13</strong></td><td data-label="Arma">A</td><td data-label="Mobs">Raid Bosses / Epics (ver tabla abajo)</td></tr>
          </tbody>
        </table>
      </div>

      <h4>5) Stage 10 → 11+ (Raid Bosses)</h4>
      <p>Cristal en inventario. Chance personal por miembro de party (salvo Epics).</p>
      <div class="table-scroll">
        <table class="responsive">
          <thead><tr><th>Boss</th><th>Nota</th><th>Chance</th></tr></thead>
          <tbody>
            <tr><td data-label="Boss">Queen Ant / Core / Orfen / Zaken (Epic Lv.66)</td><td data-label="Nota">Epic Boss</td><td data-label="Chance"><strong>100%</strong> para todo el party</td></tr>
            <tr><td data-label="Boss">Giant Marpanak / Ancient Drake / Fierce Tiger King Angel / Gargoyle Lord Tiphon (RB ~64–65)</td><td data-label="Nota">Raid Boss</td><td data-label="Chance">~3% personal</td></tr>
            <tr><td data-label="Boss">Ghost of the Well Lidia / Rahha / Hekaton Prime / Demon Kuri / Roaring Lord Kastor / etc.</td><td data-label="Nota">Raid Boss</td><td data-label="Chance">~1% personal</td></tr>
          </tbody>
        </table>
      </div>
      <p class="muted">Lista completa de RBs y mobs: <a href="${wiki}" target="_blank" rel="noopener">wiki post 367</a>.</p>

      <h4>6) Cómo usar / insertar el SA</h4>
      <ol>
        <li>Arma del grado correcto en inventario (o equipada, según UI del herrero).</li>
        <li>Cristal al <strong>Stage</strong> requerido + <strong>Gemstones</strong> del grado.</li>
        <li>Habla con el <strong>Blacksmith</strong> → opción de insertar Soul Crystal.</li>
        <li>Elige el color/efecto disponible para esa arma.</li>
        <li>Para cambiar de SA: quita el actual (pierdes el cristal) y vuelve a insertar otro.</li>
      </ol>

      <p class="pin">💡 Tip rápido: si farmeas C top, sube directo a Stage 8 en Doll Blader / Sairon zone; si vas a B, apunta Stage 10 en Maluk / Platinum. Para A, prioriza Epics (100%).</p>`;
  }

  /** Lugares clave con ubicación simple (+ capturas cuando hay) */
  const PLACES = {
    gludin: { name: "Gludin", tip: "Pueblo costero oeste. Gremios, templo, almacén, puerta oeste." },
    gludio: { name: "Gludio", tip: "Capital del territorio. Gremios humanos/DE, templo, tiendas." },
    dion: { name: "Dion", tip: "Pueblo. Almacén (Ranspo) para el Magnificent Feast." },
    giran: { name: "Giran", tip: "Ciudad grande. Herrería (Kusto) en la zona de blacksmith." },
    heine: { name: "Heine", tip: "Ciudad de Innadril. Grocery Store → Enverun (Alligator)." },
    hunters: { name: "Hunter's Village", tip: "Edificio central → Grey (Song of the Hunter)." },
    hardin: { name: "Hardin's Academy", tip: "Territorio Giran. Cema (Ivory Tower quest)." },
    schuttgart: { name: "Schuttgart Elite zones", tip: "Crypts, Grave Robber, Den of Evil, Caron (party 5–9)." },
    ivory: { name: "Ivory Tower", tip: "4th floor: Fairen (Saga Storm Screamer). Cráter para farm Mage." },
    rune: { name: "Rune", tip: "Warriors Guild (Tazki) / Warehouse (Mond) for Sagas." }
  };

  const NPC_INDEX = [
    { q: ["varika", "bruja varika"], name: "Varika", where: "Foot of the Altar of Rites (south Dark Elf lands)", tip: "Inicia Path Dark Wizard", wiki: `${W}/lu4/posts/post/81-path-of-the-dark-wizard-18` },
    { q: ["arkenia", "hub scent"], name: "Arkenia", where: "Cerca del Altar of Rites", tip: "Te da Hub Scent (obligatorio en Path DW)", wiki: `${W}/lu4/posts/post/81-path-of-the-dark-wizard-18` },
    { q: ["karukia"], name: "Karukia", where: "Hall of Kings, Orc Village (1er piso)", tip: "Path Orc Raider", wiki: `${W}/lu4/posts/post/69-path-of-the-orc-raider-18` },
    { q: ["pippi", "mion", "toma", "moke"], name: "Pippi / Mion / Toma / Moke", where: "Dwarven Village → Western Mining Zone → Gludin Warehouse", tip: "Path Scavenger", wiki: `${W}/lu4/posts/post/77-path-of-the-scavanger-18` },
    { q: ["kusto"], name: "Kusto", where: "Giran Blacksmith (Head Blacksmith)", tip: "Kusto chain 40–45", wiki: `${W}/lu4/posts/post/386-lu4-kusto-quest-chain-40` },
    { q: ["enverun", "alligator"], name: "Enverun", where: "Heine, Grocery Store", tip: "Alligator Hunter 40–47", wiki: `${W}/lu4/posts/post/368-lu4-equipment-quests` },
    { q: ["cema", "ivory", "hardin"], name: "Cema", where: "Hardin's Academy", tip: "Ivory Tower quest 40–47", wiki: `${W}/lu4/posts/post/368-lu4-equipment-quests` },
    { q: ["fairen", "storm"], name: "Fairen", where: "Ivory Tower, 4th floor", tip: "Saga Storm Screamer 76+", wiki: `${W}/lu4/posts/post/425-saga-of-the-storm-screamer-76` },
    { q: ["tazki", "titan"], name: "Tazki", where: "Warriors Guild de Rune", tip: "Saga Titan 76+", wiki: `${W}/lu4/posts/post/428-saga-of-the-titan-76` },
    { q: ["mond", "fortune", "spoiler"], name: "Mond", where: "Rune Warehouse", tip: "Saga Fortune Seeker 76+", wiki: `${W}/lu4/posts/post/433-saga-of-the-fortune-seeker-76` },
    { q: ["grey", "cazador", "hunter"], name: "Grey", where: "Central building, Hunter's Village", tip: "Song of the Hunter 30+", wiki: `${W}/lu4/posts/post/379-lu4-quest-song-of-hunter-30` },
    { q: ["babenco", "ojos rojos"], name: "Babenco", where: "Puerta oeste de Gludio", tip: "Red-Eyed Invaders 20–28", wiki: `${W}/lu4/posts/post/369-lu4-quests-20-39` },
    { q: ["ranspo", "festín", "feast", "dion"], name: "Ranspo", where: "Dion Warehouse", tip: "Magnificent Feast 20–40", wiki: `${W}/lu4/posts/post/369-lu4-quests-20-39` },
    { q: ["auron", "warrior"], name: "Auron", where: "Warriors Guild Gludin", tip: "Path Warrior", wiki: `${W}/lu4/posts/post/64-path-of-the-warrior-18` },
    { q: ["zigaunt", "cleric"], name: "Zigaunt", where: "Gludin Temple", tip: "Path Cleric", wiki: `${W}/lu4/posts/post/65-path-of-the-cleric-18` },
    { q: ["parina", "wizard"], name: "Parina", where: "Gludin Temple", tip: "Path Human Wizard", wiki: `${W}/lu4/posts/post/66-path-of-the-human-wizard-18` }
  ];

  function parseLvRange(lv) {
    if (lv.includes("+")) {
      const n = parseInt(lv, 10);
      return { min: n || 0, max: 85 };
    }
    const m = lv.match(/(\d+)\s*[–-]\s*(\d+)/);
    if (m) return { min: +m[1], max: +m[2] };
    const one = parseInt(lv, 10);
    return { min: one || 0, max: one || 85 };
  }

  function getRoadmapRows(cls) {
    const first = FIRST[cls.first];
    const g = gearBlock(cls.gear);
    const gearLabel = g.title.split("—")[0].trim();
    return [
      { lv: "1–17", tipo: "Misión", nombre: "Starter one-time quests (tu aldea)", detalle: "Haz todas. Equipo NG, adena y EXP.", where: RACES[cls.race].village, wiki: `${W}/lu4/posts/post/365-lu4-quests-in-starter-zones-1-19` },
      { lv: "1–17", tipo: "Zona", nombre: "Farm cerca de tu starter village", detalle: "Solo monstruos blancos (−5/+4).", where: RACES[cls.race].village, wiki: `${W}/lu4/posts/post/498-gaining-experience-and-penalties` },
      { lv: "16–26", tipo: "Misión", nombre: "Will the Seal be Broken?", detalle: "Obligatoria. Armadura NG + pergaminos D.", where: "Cadena de equipo (wiki)", wiki: `${W}/lu4/posts/post/368-lu4-equipment-quests` },
      { lv: "18", tipo: "Clase", nombre: `Path → ${first.name}`, detalle: "250k EXP. Hazlo entre 18 y 20.", where: first.where || first.startNpc, wiki: first.pathUrl },
      { lv: "19–29", tipo: "Misión", nombre: "Dragon Fangs", detalle: "~350k EXP + armadura D. Guard Luis / Langk.", where: "Gludin / Langk Lizardmen", wiki: `${W}/quest/38/lu4` },
      { lv: "20–28", tipo: "Misión", nombre: "Red-Eyed Invaders", detalle: "~280–330k EXP. Guard Babenco.", where: "Gludio Western Gate", wiki: `${W}/lu4/posts/post/369-lu4-quests-20-39` },
      { lv: "20–40", tipo: "Misión", nombre: "Magnificent Feast (Dion)", detalle: "Cadena → joyería D. Harlan / Jonas / Rollant → Ranspo.", where: "Dion Warehouse (Ranspo)", wiki: `${W}/lu4/posts/post/369-lu4-quests-20-39` },
      { lv: "27–32", tipo: "Misión", nombre: "Acts of Evil", detalle: "Armadura grado D.", where: "Ver wiki misiones 20–39", wiki: `${W}/lu4/posts/post/369-lu4-quests-20-39` },
      { lv: "30–36", tipo: "Zona", nombre: "Crypts of Disgrace", detalle: "Élite 33–35. Mejor zona. Grupo 5–9.", where: "Schuttgart — Crypts of Disgrace", wiki: `${W}/lu4/posts/post/322-update-crypts-of-disgrace-3236` },
      { lv: "30–85", tipo: "Misión", nombre: "Song of the Hunter", detalle: "Grey. Adena y consumibles a largo plazo.", where: "Hunter's Village — edificio central", wiki: `${W}/lu4/posts/post/379-lu4-quest-song-of-hunter-30` },
      { lv: "35–44", tipo: "Misión", nombre: "Temple Executor chain", detalle: "CRÍTICO antes del 45. ~2.5–2.7M EXP.", where: "Empieza cadena Missionary/Executor (wiki)", wiki: `${W}/lu4/posts/post/380-temple-executor-quest-chain-35` },
      { lv: "35–40", tipo: "Misión", nombre: `Marcas 3-en-1 → ${cls.name2}`, detalle: `${cls.marks}. ~750k EXP c/u.`, where: "NPCs de cada marca (guía 3-en-1)", wiki: cls.threeInOne },
      { lv: "40", tipo: "Clase", nombre: `Cambio a ${cls.name2}`, detalle: "Cuando tengas las 3 marcas.", where: "Grand Master / Prefect de tu raza", wiki: cls.threeInOne },
      { lv: "40–44", tipo: "Misión", nombre: "Kusto chain", detalle: "CRÍTICO antes del 45. ~600k EXP.", where: "Giran — Herrería (Kusto)", wiki: `${W}/lu4/posts/post/386-lu4-kusto-quest-chain-40` },
      { lv: "40–47", tipo: "Misión", nombre: gearLabel, detalle: g.body, where: g.where, wiki: g.wiki },
      { lv: "40–60", tipo: "Misión", nombre: "Soul Crystal SA", detalle: "Blacksmith: cristal vacío → levear (1 en inventario) → insertar + Gemstones. Stages 2–10 mobs; 11–13 RBs/Epics.", where: "Blacksmith de cualquier ciudad", wiki: `${W}/lu4/posts/post/367-soul-crystal-sa-enhancement` },
      { lv: "40–52", tipo: "Misión", nombre: "Warehouse Pastime / Treasure Hunt", detalle: "Más equipo C y adena.", where: "Almacenes / Heine zona Alligator", wiki: `${W}/lu4/posts/post/368-lu4-equipment-quests` },
      { lv: "40–48", tipo: "Zona", nombre: "Grave Robber Hideout", detalle: "Élite 42–45. Grupo 5–9.", where: "Schuttgart — Grave Robber Hideout", wiki: `${W}/lu4/posts/post/323-update-grave-robber-hideout-4050` },
      { lv: "47–57", tipo: "Zona", nombre: "Den of Evil", detalle: "Mejor zona mid.", where: "Schuttgart — Den of Evil", wiki: `${W}/lu4/posts/post/324-update-den-of-evil-4757` },
      { lv: "52–85", tipo: "Clase", nombre: "Subclase (Fate's Whisper)", detalle: "Desde 52. Subclase también a 85.", where: "Ver wiki subclasses", wiki: `${W}/lu4/posts/post/45-subclasses-on-masterwork` },
      { lv: "56–64", tipo: "Zona", nombre: "Caron's Dungeon", detalle: "Élite 59–60. Grupo.", where: "Caron's Dungeon", wiki: `${W}/lu4/posts/post/325-update-carons-dungeon-5664` },
      { lv: "60–65", tipo: "Zona", nombre: "Archaic Laboratory", detalle: "Siguiente zona después de Caron.", where: "Archaic Laboratory", wiki: `${W}/lu4/posts/post/326-update-archaic-laboratory-6065` },
      { lv: "66–74", tipo: "Zona", nombre: "Hatoum Settlement Settlement", detalle: "Grupo ~68–72.", where: "Hatoum Settlement Settlement", wiki: `${W}/lu4/posts/post/174-new-hatoum-settlement-6674` },
      { lv: "72–74", tipo: "Misión", nombre: "Prepare Saga items", detalle: "Ice Crystal + Divine Stone of Wisdom Ketra/Varka.", where: "Hot Springs / Ketra o Varka", wiki: cls.saga },
      { lv: "74–83", tipo: "Zona", nombre: "Isle of Prayer / Cromáticas", detalle: "Isla máx. 3 · Cromáticas grupo grande.", where: "Isle of Prayer / Chromatic Highlands", wiki: `${W}/lu4/posts/post/171-isle-of-prayer-and-chromatic-highlands-7483` },
      { lv: "76–85", tipo: "Clase", nombre: `Saga → ${cls.name}`, detalle: `${cls.sagaNpc}. ~2.3M EXP.`, where: cls.sagaNpc, wiki: cls.saga },
      { lv: "78–85", tipo: "Zona", nombre: "Pagan Temple / Fairy Settlement", detalle: "Hasta el tope 85.", where: "Pagan Temple / Fairy Settlement", wiki: `${W}/lu4/posts/post/173-new-fairy-settlement-7885` }
    ].map(r => {
      const range = parseLvRange(r.lv);
      return { ...r, lvMin: range.min, lvMax: range.max };
    });
  }

  function rowMatchesLevel(row, level) {
    if (level == null || Number.isNaN(level)) return true;
    // relevante: estás dentro del rango, o a punto de empezar (−3), o acabas de pasar (+2)
    return level >= row.lvMin - 3 && level <= row.lvMax + 2;
  }

  function roadmapTableHtml(cls, filterLevel) {
    const rows = getRoadmapRows(cls).filter(r => rowMatchesLevel(r, filterLevel));
    if (!rows.length) {
      return `<tr><td colspan="5">No hay filas para el nivel ${filterLevel}. Prueba otro número o limpia el filtro.</td></tr>`;
    }
    return rows.map(r => {
      const tag = r.tipo === "Misión" ? "mision" : r.tipo === "Zona" ? "zona" : "clase";
      const wiki = r.wiki ? `<a class="wiki-link" href="${r.wiki}" target="_blank" rel="noopener">Wiki</a>` : "";
      return `<tr class="road-row" data-min="${r.lvMin}" data-max="${r.lvMax}">
        <td data-label="Nivel">${r.lv}</td>
        <td data-label="Tipo"><span class="tag ${tag}">${r.tipo}</span></td>
        <td data-label="Qué hacer"><strong>${r.nombre}</strong>${wiki}</td>
        <td data-label="Dónde"><span class="pin">${r.where || "—"}</span></td>
        <td data-label="Detalle">${r.detalle}</td>
      </tr>`;
    }).join("");
  }

  function compareClasses(idA, idB) {
    const a = getClass(idA), b = getClass(idB);
    if (!a || !b) return "<p>Elige dos clases válidas.</p>";
    const fa = FIRST[a.first], fb = FIRST[b.first];
    const gearName = g => g === "alligator" ? "Alligator (guerrero)" : g === "ivory" ? "Ivory Tower (mago)" : "Alligator + Ivory";
    const rows = [
      ["Clase final", a.name, b.name],
      ["2ª clase", a.name2, b.name2],
      ["Raza", RACES[a.race].name, RACES[b.race].name],
      ["1ª (Path)", fa.name, fb.name],
      ["Rol", a.role, b.role],
      ["Tip", a.tip, b.tip],
      ["Marcas", a.marks, b.marks],
      ["Equipo 40+", gearName(a.gear), gearName(b.gear)],
      ["Saga", a.sagaNpc, b.sagaNpc]
    ];
    return `
      <table class="compare-table">
        <thead><tr><th>Aspecto</th><th>${a.name}</th><th>${b.name}</th></tr></thead>
        <tbody>
          ${rows.map(([k, x, y]) => `<tr><td data-label="Aspecto"><strong>${k}</strong></td><td data-label="${a.name}">${x}</td><td data-label="${b.name}">${y}</td></tr>`).join("")}
        </tbody>
      </table>
      <p class="muted" style="margin-top:10px">
        <a href="?class=${a.id}">Abrir guía ${a.name}</a> ·
        <a href="?class=${b.id}">Abrir guía ${b.name}</a>
      </p>`;
  }

  function searchAll(query) {
    const q = (query || "").toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").trim();
    if (!q || q.length < 2) return { classes: [], npcs: [] };
    const classes = CLASSES.filter(c => {
      const blob = `${c.id} ${c.name} ${c.name2} ${c.role} ${c.tip} ${c.marks}`.toLowerCase()
        .normalize("NFD").replace(/[\u0300-\u036f]/g, "");
      return blob.includes(q) || q.split(/\s+/).every(t => blob.includes(t));
    }).slice(0, 12);
    const npcs = NPC_INDEX.filter(n =>
      n.q.some(t => t.includes(q) || q.includes(t)) ||
      n.name.toLowerCase().includes(q) ||
      n.tip.toLowerCase().includes(q)
    ).slice(0, 10);
    return { classes, npcs };
  }

  function buildGuideHtml(cls, opts) {
    opts = opts || {};
    const filterLevel = opts.level != null && opts.level !== "" ? +opts.level : null;
    const race = RACES[cls.race];
    const first = FIRST[cls.first];
    const g = gearBlock(cls.gear);
    const cid = cls.classId;

    const starterRows = race.starters.map(s =>
      `<tr><td data-label="Nv.">${s.lv}</td><td data-label="Misión"><strong>${s.name}</strong><br><span class="muted">${s.npc}</span></td><td data-label="Recompensa">${s.reward}</td><td data-label="Nota"><span class="tag ok">${s.tip}</span></td></tr>`
    ).join("");

    const pathSteps = (first.steps || []).map((s) => `<li>${s}</li>`).join("");
    const shots = (first.shots || []).map(s =>
      `<div><img class="shot" src="${s.src}" alt="${s.alt}" data-full="${s.src}"/><div class="shot-cap">${s.alt}</div></div>`
    ).join("");

    const secrets = SECRETS.map(s =>
      `<div class="secret"><h4>${s.title}</h4><p class="what"><strong>Qué significa:</strong> ${s.what}</p><p class="do"><strong>Qué hacer:</strong> ${s.do}</p></div>`
    ).join("");

    const roadmap = roadmapTableHtml(cls, filterLevel);
    const filterNote = filterLevel
      ? `<p class="filter-note">Mostrando lo relevante cerca del nivel <strong>${filterLevel}</strong>. <button type="button" class="linkish" data-clear-level="1">Ver lista completa</button></p>`
      : `<p class="muted">Usa el filtro de arriba si quieres ver solo tu nivel actual.</p>`;

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
        <div class="level-filter card soft" style="margin:12px 0;padding:12px">
          <label for="levelFilter"><strong>Estoy en el nivel</strong></label>
          <div class="level-filter-row">
            <input id="levelFilter" type="number" min="1" max="85" placeholder="ej. 37" value="${filterLevel || ""}" />
            <button type="button" class="btn accent" id="btnApplyLevel">Filtrar lista</button>
            <button type="button" class="btn" id="btnClearLevel">Ver todo</button>
          </div>
          <p class="muted" style="margin:8px 0 0;font-size:.85rem">Escribe tu nivel y verás solo misiones/zonas relevantes (no toda la guía).</p>
        </div>
        <div class="howto">
          <p><strong>Cómo usar esta guía:</strong> lee el aviso Lu4 → <em>Equipo / Armas+SA</em> → Lista → Path y fases.</p>
          <p class="muted">Verde = zona · Azul = misión · Dorado = clase · Pin = dónde ir · Wiki = enlace</p>
        </div>
        <div class="hero-badges">
          <a class="badge" href="${first.pathUrl}" target="_blank" rel="noopener">Path wiki</a>
          <a class="badge" href="${cls.threeInOne}" target="_blank" rel="noopener">Marcas 3-en-1</a>
          <a class="badge" href="${cls.saga}" target="_blank" rel="noopener">Saga 76+</a>
          <a class="badge" href="${W}/lu4/posts/post/367-soul-crystal-sa-enhancement" target="_blank" rel="noopener">Soul Crystal wiki</a>
          <a class="badge" href="?class=${cls.id}">Link de esta clase</a>
        </div>
      </div>

      <h2>Secretos de Lu4</h2>
      <div class="card" style="border-color:var(--accent)">
        <div class="secrets">${secrets}</div>
      </div>

      <h2>Equipo por grados (NG → S)</h2>
      <div class="card">
        <p>Progresión de armadura/arma en Lu4. Tu misión de equipo C: <strong>${g.title}</strong>.</p>
        ${gearGradesHtml(cls)}
      </div>

      <h2>Armas recomendadas</h2>
      <div class="card">
        ${weaponsAndSaHtml(cls)}
      </div>

      <h2>Soul Crystals (SA) — guía completa</h2>
      <div class="card">
        ${soulCrystalHtml()}
      </div>

      <h2>Lista — Misiones + zonas ${filterLevel ? `(nivel ~${filterLevel})` : "(1 → 85)"}</h2>
      <div class="card">
        ${filterNote}
        <div class="table-scroll">
          <table class="roadmap responsive">
            <thead><tr><th>Nivel</th><th>Tipo</th><th>Qué hacer</th><th>Dónde</th><th>Detalle</th></tr></thead>
            <tbody>${roadmap}</tbody>
          </table>
        </div>
      </div>

      <h2>Detalle por fase</h2>

      <h3>Fase 1 — Levels 1–17 · ${race.village}</h3>
      <div class="card">
        <p><strong>Objetivo:</strong> misiones únicas y llegar a 18 con equipo NG.</p>
        <p class="pin"><strong>Dónde farmear:</strong> around ${race.village}. Monstruos blancos (−5/+4).</p>
        <div class="table-scroll">
          <table class="responsive">
            <thead><tr><th>Nv.</th><th>Misión / NPC</th><th>Recompensa</th><th>Nota</th></tr></thead>
            <tbody>${starterRows}</tbody>
          </table>
        </div>
      </div>

      <h3>Fase 2 — Nivel 18 · Path → ${first.name}</h3>
      <div class="card">
        <p><strong>Objetivo:</strong> 1ª clase + 250.000 EXP.</p>
        <div class="place-box">
          <strong>📍 Ubicación</strong>
          <p>${first.where || first.startNpc}</p>
          <p class="muted">Inicio: ${first.startNpc}<br>Cambio: ${first.changeNpc}</p>
        </div>
        <p><strong>Recompensa Lu4:</strong> ${first.reward}<br>
        <strong>Después puedes ser:</strong> ${first.opens.join(" / ")}</p>
        <ol>${pathSteps}</ol>
        ${shots ? `<div class="shots" style="margin-top:12px">${shots}</div>` : `<p class="muted">Capturas: abre la <a href="${first.pathUrl}" target="_blank">wiki del Path</a> (ahí están las imágenes de NPCs).</p>`}
        <p><a href="${first.pathUrl}" target="_blank">Path completo en la wiki →</a></p>
      </div>

      <h3>Fase 3 — Niveles 20 a 34</h3>
      <div class="card">
        <p class="pin"><strong>📍 Mejor zona:</strong> Crypts of Disgrace (Schuttgart, Élite 33–35, grupo 5–9).
          <a href="${W}/lu4/posts/post/322-update-crypts-of-disgrace-3236" target="_blank">Wiki</a></p>
        <ol>
          <li><strong>Magnificent Feast</strong> — Dion Almacén (Ranspo).</li>
          <li><strong>Red-Eyed Invaders</strong> — Babenco, Gludio Western Gate.</li>
          <li><strong>Acts of Evil</strong> — armadura D.</li>
          <li><strong>Song of the Hunter</strong> — Grey, Hunter's Village.</li>
        </ol>
      </div>

      <h3>Fase 4 — 35 a 40 · Templo + marcas → ${cls.name2}</h3>
      <div class="card">
        <p><span class="tag warn">IMPORTANTE</span> Templo <strong>antes del 45</strong>.</p>
        <p class="pin">📍 Marcas: <a href="${cls.threeInOne}" target="_blank">guía 3-en-1 ${cls.name2}</a> · ${cls.marks}</p>
        <p>📍 Templo: <a href="${W}/lu4/posts/post/380-temple-executor-quest-chain-35" target="_blank">cadena Executor</a></p>
      </div>

      <h3>Fase 5 — 40 a 45 · Kusto + equipo C + SA</h3>
      <div class="card">
        <p class="pin">📍 <strong>Kusto:</strong> Giran Blacksmith.
          <a href="${W}/lu4/posts/post/386-lu4-kusto-quest-chain-40" target="_blank">Wiki</a></p>
        <p class="pin">📍 <strong>${g.title}</strong><br>${g.where}<br>${g.body}
          <a href="${g.wiki}" target="_blank">Wiki</a></p>
        <p class="pin">📍 <strong>SA / Soul Crystal:</strong> compra cristal vacío en Blacksmith → levea con 1 solo en inventario → inserta con Gemstones.
          Guía completa arriba · <a href="${W}/lu4/posts/post/367-soul-crystal-sa-enhancement" target="_blank">Wiki SA</a></p>
        <p class="pin">📍 Zona: Grave Robber Hideout (Élite 42–45).
          <a href="${W}/lu4/posts/post/323-update-grave-robber-hideout-4050" target="_blank">Wiki</a></p>
      </div>

      <h3>Fase 6 — 45 a 75 · Zonas</h3>
      <div class="card">
        <div class="table-scroll">
          <table class="roadmap responsive">
            <thead><tr><th>Nivel</th><th>Zona</th><th>Dónde / nota</th></tr></thead>
            <tbody>
              <tr><td data-label="Nivel">47–57</td><td data-label="Zona"><a href="${W}/lu4/posts/post/324-update-den-of-evil-4757" target="_blank">Den of Evil</a></td><td data-label="Nota">Schuttgart</td></tr>
              <tr><td data-label="Nivel">52+</td><td data-label="Zona"><a href="${W}/lu4/posts/post/45-subclasses-on-masterwork" target="_blank">Subclase</a></td><td data-label="Nota">Fate's Whisper</td></tr>
              <tr><td data-label="Nivel">56–64</td><td data-label="Zona"><a href="${W}/lu4/posts/post/325-update-carons-dungeon-5664" target="_blank">Caron</a></td><td data-label="Nota">Élite 59–60</td></tr>
              <tr><td data-label="Nivel">60–65</td><td data-label="Zona"><a href="${W}/lu4/posts/post/326-update-archaic-laboratory-6065" target="_blank">Archaic Laboratory</a></td><td data-label="Nota">Siguiente zona</td></tr>
              <tr><td data-label="Nivel">66–74</td><td data-label="Zona"><a href="${W}/lu4/posts/post/174-new-hatoum-settlement-6674" target="_blank">Hatoum Settlement</a></td><td data-label="Nota">Grupo ~68–72</td></tr>
            </tbody>
          </table>
        </div>
      </div>

      <h3>Fase 7–8 — Saga y 76–85</h3>
      <div class="card">
        <p class="pin">📍 Saga: ${cls.sagaNpc} · <a href="${cls.saga}" target="_blank">Wiki Saga</a></p>
        <p class="pin">📍 Endgame: <a href="${W}/lu4/posts/post/171-isle-of-prayer-and-chromatic-highlands-7483" target="_blank">Isle of Prayer / Chromatic</a> ·
          <a href="${W}/lu4/posts/post/241-update-pagan-temple-7883" target="_blank">Pagan Temple</a> ·
          <a href="${W}/lu4/posts/post/173-new-fairy-settlement-7885" target="_blank">Fairy Settlement</a></p>
        <p>Tope <strong>85</strong>. Monstruos blancos. Si fatiga agotada → solo misiones.</p>
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
    W, RACES, FIRST, CLASSES, SECRETS, PLACES, NPC_INDEX,
    icon, art, getClassesByRace, getClass, buildGuideHtml,
    getRoadmapRows, compareClasses, searchAll, gearBlock,
    weaponProfile, WEAPON_REC
  };
})(window);
