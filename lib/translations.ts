export type Language = "en" | "pt"

export const translations = {
  en: {
    // Header
    siteTitle: "Medieval RPG Companion",
    initiativeTracker: "Initiative Tracker",
    compendium: "Compendium",
    diceRoller: "Dice Roller",
    characterSheets: "Character Sheets",
    mapGenerator: "Map Generator",
    npcGenerator: "NPC Generator",

    // Home Page
    welcomeTitle: "Welcome to Your Digital Grimoire",
    welcomeDescription:
      "Enhance your tabletop adventures with our comprehensive suite of tools. Track initiative, browse creatures and spells, and manage your campaigns like a true dungeon master.",
    startInitiativeTracker: "Start Initiative Tracker",
    browseCompendium: "Browse Compendium",
    featuresTitle: "Features for Every Adventure",

    // Initiative Tracker
    initiativeTrackerTitle: "Initiative Tracker",
    initiativeTrackerDescription: "Manage your combat encounters with precision",
    currentRound: "Current Round",
    addCharacter: "Add Character",
    startCombat: "Start Combat",
    pauseCombat: "Pause Combat",
    nextTurn: "Next Turn",
    reset: "Reset",
    initiativeOrder: "Initiative Order",
    combatNotStarted: "Combat not started",
    currentTurn: "Current turn",

    // Character Form
    addNewCharacter: "Add New Character",
    addCharacterDescription: "Add a player, NPC, or monster to the initiative order.",
    characterName: "Character name",
    name: "Name",
    initiative: "Initiative",
    currentHP: "Current HP",
    maxHP: "Max HP",
    armorClass: "Armor Class",
    type: "Type",
    player: "Player",
    npc: "NPC",
    monster: "Monster",
    notes: "Notes",
    statusEffects: "Status effects, conditions, etc.",
    cancel: "Cancel",
    saveChanges: "Save Changes",
    editCharacter: "Edit Character",
    editCharacterDescription: "Update character information and stats.",

    // Compendium
    compendiumTitle: "Compendium Browser",
    compendiumDescription: "Explore spells, monsters, and magical items",
    itemsFound: "Items Found",
    searchPlaceholder: "Search spells, monsters, items...",
    favorites: "Favorites",
    filters: "Filters",
    level: "Level",
    allLevels: "All Levels",
    rarity: "Rarity",
    allRarities: "All Rarities",
    clearFilters: "Clear Filters",
    all: "All",
    spells: "Spells",
    monsters: "Monsters",
    items: "Items",
    viewDetails: "View Details",
    details: "Details",
    noItemsFound: "No Items Found",
    noResultsFor: "No results found for",
    noFavorites: "No favorites added yet. Star items to add them to your favorites.",
    noItemsCategory: "No items available in this category.",
    clearAllFilters: "Clear All Filters",

    // Footer
    footerText: "Crafted for adventurers, by adventurers. May your dice roll high!",
    footer: {
      developedBy: "Desenvolvido por Gabriel Neto",
      copyright: "© 2024 Medieval RPG Companion. All rights reserved.",
    },

    // Feature Cards
    manageEncounters: "Manage combat encounters with ease",
    addManageCharacters: "Add and manage characters and monsters",
    trackInitiativeOrder: "Track initiative order automatically",
    monitorHealth: "Monitor health and status effects",
    quickActions: "Quick actions for common combat scenarios",
    launchTracker: "Begin Battle!",
    exploreLibrary: "Explore a vast library of game content",
    browseContent: "Browse spells, monsters, and items",
    advancedSearch: "Advanced search and filtering",
    detailedStats: "Detailed stat blocks and descriptions",
    bookmarkFavorites: "Bookmark favorites for quick access",
    exploreContent: "Discover Secrets",

    // Empty States
    noCharactersAdded: "No Characters Added",
    noCharactersDescription: "Add players, NPCs, and monsters to start tracking initiative.",
    addFirstCharacter: "Add Your First Character",

    // New Features
    diceRollerTitle: "Dice Roller",
    diceRollerDescription: "Roll any combination of dice for your adventures",
    characterSheetsTitle: "Character Sheets",
    characterSheetsDescription: "Create and manage detailed character sheets",
    mapGeneratorTitle: "Map Generator",
    mapGeneratorDescription: "Generate random maps for your campaigns",
    npcGeneratorTitle: "NPC Generator",
    npcGeneratorDescription: "Create unique NPCs with backstories and stats",
    rollMultipleDice: "Roll Multiple Dice",
    customModifiers: "Custom Modifiers",
    quickRollButtons: "Quick Roll Buttons",
    createCharacters: "Create Characters",
    manageStats: "Manage Stats",
    trackEquipment: "Track Equipment",
    saveProgress: "Save Progress",
    generateDungeons: "Generate Dungeons",
    createCities: "Create Cities",
    customizeSettings: "Customize Settings",
    exportMaps: "Export Maps",
    randomNames: "Random Names",
    generateStats: "Generate Stats",
    createBackstories: "Create Backstories",
    saveNPCs: "Save NPCs",
    rollDice: "Cast the Dice",
    createCharacter: "Forge Hero",
    generateMap: "Chart New Lands",
    generateNPC: "Summon Character",
  },
  pt: {
    // Header
    siteTitle: "Companheiro RPG Medieval",
    initiativeTracker: "Rastreador de Iniciativa",
    compendium: "Compêndio",
    diceRoller: "Rolador de Dados",
    characterSheets: "Fichas de Personagem",
    mapGenerator: "Gerador de Mapas",
    npcGenerator: "Gerador de NPCs",

    // Home Page
    welcomeTitle: "Bem-vindo ao Seu Grimório Digital",
    welcomeDescription:
      "Aprimore suas aventuras de mesa com nosso conjunto abrangente de ferramentas. Rastreie iniciativa, navegue por criaturas e magias, e gerencie suas campanhas como um verdadeiro mestre de masmorras.",
    startInitiativeTracker: "Iniciar Rastreador de Iniciativa",
    browseCompendium: "Navegar Compêndio",
    featuresTitle: "Recursos para Cada Aventura",

    // Initiative Tracker
    initiativeTrackerTitle: "Rastreador de Iniciativa",
    initiativeTrackerDescription: "Gerencie seus encontros de combate com precisão",
    currentRound: "Rodada Atual",
    addCharacter: "Adicionar Personagem",
    startCombat: "Iniciar Combate",
    pauseCombat: "Pausar Combate",
    nextTurn: "Próximo Turno",
    reset: "Reiniciar",
    initiativeOrder: "Ordem de Iniciativa",
    combatNotStarted: "Combate não iniciado",
    currentTurn: "Turno atual",

    // Character Form
    addNewCharacter: "Adicionar Novo Personagem",
    addCharacterDescription: "Adicione um jogador, NPC ou monstro à ordem de iniciativa.",
    characterName: "Nome do personagem",
    name: "Nome",
    initiative: "Iniciativa",
    currentHP: "PV Atual",
    maxHP: "PV Máximo",
    armorClass: "Classe de Armadura",
    type: "Tipo",
    player: "Jogador",
    npc: "NPC",
    monster: "Monstro",
    notes: "Anotações",
    statusEffects: "Efeitos de status, condições, etc.",
    cancel: "Cancelar",
    saveChanges: "Salvar Alterações",
    editCharacter: "Editar Personagem",
    editCharacterDescription: "Atualizar informações e estatísticas do personagem.",

    // Compendium
    compendiumTitle: "Navegador do Compêndio",
    compendiumDescription: "Explore magias, monstros e itens mágicos",
    itemsFound: "Itens Encontrados",
    searchPlaceholder: "Buscar magias, monstros, itens...",
    favorites: "Favoritos",
    filters: "Filtros",
    level: "Nível",
    allLevels: "Todos os Níveis",
    rarity: "Raridade",
    allRarities: "Todas as Raridades",
    clearFilters: "Limpar Filtros",
    all: "Todos",
    spells: "Magias",
    monsters: "Monstros",
    items: "Itens",
    viewDetails: "Ver Detalhes",
    details: "Detalhes",
    noItemsFound: "Nenhum Item Encontrado",
    noResultsFor: "Nenhum resultado encontrado para",
    noFavorites: "Nenhum favorito adicionado ainda. Marque itens com estrela para adicioná-los aos seus favoritos.",
    noItemsCategory: "Nenhum item disponível nesta categoria.",
    clearAllFilters: "Limpar Todos os Filtros",

    // Footer
    footerText: "Criado para aventureiros, por aventureiros. Que seus dados rolem alto!",
    footer: {
      developedBy: "Desenvolvido por Gabriel Neto",
      copyright: "© 2024 Companheiro RPG Medieval. Todos os direitos reservados.",
    },

    // Feature Cards
    manageEncounters: "Gerencie encontros de combate com facilidade",
    addManageCharacters: "Adicione e gerencie personagens e monstros",
    trackInitiativeOrder: "Rastreie a ordem de iniciativa automaticamente",
    monitorHealth: "Monitore saúde e efeitos de status",
    quickActions: "Ações rápidas para cenários de combate comuns",
    launchTracker: "Iniciar Batalha!",
    exploreLibrary: "Explore uma vasta biblioteca de conteúdo do jogo",
    browseContent: "Navegue por magias, monstros e itens",
    advancedSearch: "Busca e filtragem avançadas",
    detailedStats: "Blocos de estatísticas e descrições detalhadas",
    bookmarkFavorites: "Marque favoritos para acesso rápido",
    exploreContent: "Descobrir Segredos",

    // Empty States
    noCharactersAdded: "Nenhum Personagem Adicionado",
    noCharactersDescription: "Adicione jogadores, NPCs e monstros para começar a rastrear iniciativa.",
    addFirstCharacter: "Adicionar Seu Primeiro Personagem",

    // New Features
    diceRollerTitle: "Rolador de Dados",
    diceRollerDescription: "Role qualquer combinação de dados para suas aventuras",
    characterSheetsTitle: "Fichas de Personagem",
    characterSheetsDescription: "Crie e gerencie fichas de personagem detalhadas",
    mapGeneratorTitle: "Gerador de Mapas",
    mapGeneratorDescription: "Gere mapas aleatórios para suas campanhas",
    npcGeneratorTitle: "Gerador de NPCs",
    npcGeneratorDescription: "Crie NPCs únicos com histórias e estatísticas",
    rollMultipleDice: "Role Múltiplos Dados",
    customModifiers: "Modificadores Personalizados",
    quickRollButtons: "Botões de Rolagem Rápida",
    createCharacters: "Criar Personagens",
    manageStats: "Gerenciar Estatísticas",
    trackEquipment: "Rastrear Equipamentos",
    saveProgress: "Salvar Progresso",
    generateDungeons: "Gerar Masmorras",
    createCities: "Criar Cidades",
    customizeSettings: "Personalizar Configurações",
    exportMaps: "Exportar Mapas",
    randomNames: "Nomes Aleatórios",
    generateStats: "Gerar Estatísticas",
    createBackstories: "Criar Histórias",
    saveNPCs: "Salvar NPCs",
    rollDice: "Lançar os Dados",
    createCharacter: "Forjar Herói",
    generateMap: "Mapear Novas Terras",
    generateNPC: "Invocar Personagem",
  },
}

export function getTranslation(key: string, language: Language): string {
  const keys = key.split(".")
  let value: any = translations[language]

  for (const k of keys) {
    value = value?.[k]
  }

  return value || key
}
