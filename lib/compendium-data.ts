export interface CompendiumItem {
  id: string
  name: string
  type: "spell" | "monster" | "item"
  level?: number
  school?: string
  challengeRating?: string
  rarity?: string
  description: string
  details: {
    [key: string]: string | number
  }
  isFavorite?: boolean
}

export const compendiumData: CompendiumItem[] = [
  // Spells
  {
    id: "spell-1",
    name: "Fireball",
    type: "spell",
    level: 3,
    school: "Evocation",
    description:
      "A bright streak flashes from your pointing finger to a point you choose within range and then blossoms with a low roar into an explosion of flame.",
    details: {
      "Casting Time": "1 action",
      Range: "150 feet",
      Components: "V, S, M (a tiny ball of bat guano and sulfur)",
      Duration: "Instantaneous",
      Damage: "8d6 fire damage",
      Save: "Dexterity",
    },
  },
  {
    id: "spell-2",
    name: "Magic Missile",
    type: "spell",
    level: 1,
    school: "Evocation",
    description:
      "You create three glowing darts of magical force. Each dart hits a creature of your choice that you can see within range.",
    details: {
      "Casting Time": "1 action",
      Range: "120 feet",
      Components: "V, S",
      Duration: "Instantaneous",
      Damage: "1d4 + 1 force damage per dart",
      "Higher Levels": "One additional dart per slot level above 1st",
    },
  },
  {
    id: "spell-3",
    name: "Cure Wounds",
    type: "spell",
    level: 1,
    school: "Evocation",
    description:
      "A creature you touch regains a number of hit points equal to 1d8 + your spellcasting ability modifier.",
    details: {
      "Casting Time": "1 action",
      Range: "Touch",
      Components: "V, S",
      Duration: "Instantaneous",
      Healing: "1d8 + spellcasting modifier",
      "Higher Levels": "+1d8 per slot level above 1st",
    },
  },
  {
    id: "spell-4",
    name: "Lightning Bolt",
    type: "spell",
    level: 3,
    school: "Evocation",
    description:
      "A stroke of lightning forming a line 100 feet long and 5 feet wide blasts out from you in a direction you choose.",
    details: {
      "Casting Time": "1 action",
      Range: "Self (100-foot line)",
      Components: "V, S, M (a bit of fur and a rod of amber, crystal, or glass)",
      Duration: "Instantaneous",
      Damage: "8d6 lightning damage",
      Save: "Dexterity",
    },
  },
  {
    id: "spell-5",
    name: "Shield",
    type: "spell",
    level: 1,
    school: "Abjuration",
    description:
      "An invisible barrier of magical force appears and protects you. Until the start of your next turn, you have a +5 bonus to AC.",
    details: {
      "Casting Time": "1 reaction",
      Range: "Self",
      Components: "V, S",
      Duration: "1 round",
      Effect: "+5 bonus to AC and immunity to Magic Missile",
    },
  },

  // Monsters
  {
    id: "monster-1",
    name: "Ancient Red Dragon",
    type: "monster",
    challengeRating: "24",
    description:
      "The most covetous of the true dragons, red dragons tirelessly seek to increase their treasure hoards.",
    details: {
      "Armor Class": "22 (Natural Armor)",
      "Hit Points": "546 (28d20 + 252)",
      Speed: "40 ft., climb 40 ft., fly 80 ft.",
      STR: "30 (+10)",
      DEX: "10 (+0)",
      CON: "29 (+9)",
      INT: "18 (+4)",
      WIS: "15 (+2)",
      CHA: "23 (+6)",
      "Damage Immunities": "Fire",
      "Legendary Actions": "3 per turn",
    },
  },
  {
    id: "monster-2",
    name: "Goblin",
    type: "monster",
    challengeRating: "1/4",
    description:
      "Goblins are small, black-hearted humanoids that lair in despoiled dungeons and other dismal settings.",
    details: {
      "Armor Class": "15 (Leather Armor, Shield)",
      "Hit Points": "7 (2d6)",
      Speed: "30 ft.",
      STR: "8 (-1)",
      DEX: "14 (+2)",
      CON: "10 (+0)",
      INT: "10 (+0)",
      WIS: "8 (-1)",
      CHA: "8 (-1)",
      Skills: "Stealth +6",
      Languages: "Common, Goblin",
    },
  },
  {
    id: "monster-3",
    name: "Owlbear",
    type: "monster",
    challengeRating: "3",
    description:
      "An owlbear's screech echoes through dark valleys and benighted forests, piercing the quiet night to announce the death of its prey.",
    details: {
      "Armor Class": "13 (Natural Armor)",
      "Hit Points": "59 (7d10 + 21)",
      Speed: "40 ft.",
      STR: "20 (+5)",
      DEX: "12 (+1)",
      CON: "17 (+3)",
      INT: "3 (-4)",
      WIS: "12 (+1)",
      CHA: "7 (-2)",
      Skills: "Perception +3",
      Senses: "Darkvision 60 ft.",
    },
  },
  {
    id: "monster-4",
    name: "Beholder",
    type: "monster",
    challengeRating: "13",
    description:
      "A beholder's central eye creates an area of antimagic, as in the antimagic field spell, in a 150-foot cone.",
    details: {
      "Armor Class": "18 (Natural Armor)",
      "Hit Points": "180 (19d10 + 76)",
      Speed: "0 ft., fly 20 ft. (hover)",
      STR: "10 (+0)",
      DEX: "14 (+2)",
      CON: "18 (+4)",
      INT: "17 (+3)",
      WIS: "15 (+2)",
      CHA: "17 (+3)",
      "Damage Immunities": "Prone",
      "Eye Rays": "10 different magical effects",
    },
  },
  {
    id: "monster-5",
    name: "Skeleton",
    type: "monster",
    challengeRating: "1/4",
    description:
      "Skeletons arise when animated by dark magic. They heed the summons of spellcasters who call them from their stony tombs.",
    details: {
      "Armor Class": "13 (Armor Scraps)",
      "Hit Points": "13 (2d8 + 4)",
      Speed: "30 ft.",
      STR: "10 (+0)",
      DEX: "14 (+2)",
      CON: "15 (+2)",
      INT: "6 (-2)",
      WIS: "8 (-1)",
      CHA: "5 (-3)",
      "Damage Vulnerabilities": "Bludgeoning",
      "Damage Immunities": "Poison",
    },
  },

  // Items
  {
    id: "item-1",
    name: "Sword of Flame",
    type: "item",
    rarity: "Rare",
    description:
      "This magic sword's blade is wreathed in flames when drawn. The flames shed bright light in a 10-foot radius.",
    details: {
      Type: "Weapon (longsword)",
      Rarity: "Rare (requires attunement)",
      Damage: "+1 longsword, +1d6 fire damage",
      Properties: "Versatile (1d10)",
      "Light Radius": "10 feet bright, 10 feet dim",
    },
  },
  {
    id: "item-2",
    name: "Healing Potion",
    type: "item",
    rarity: "Common",
    description: "A character who drinks the magical red fluid in this vial regains hit points.",
    details: {
      Type: "Potion",
      Rarity: "Common",
      Effect: "Regain 2d4 + 2 hit points",
      Usage: "Drink as an action",
      Weight: "0.5 lb",
    },
  },
  {
    id: "item-3",
    name: "Cloak of Elvenkind",
    type: "item",
    rarity: "Uncommon",
    description:
      "While you wear this cloak with its hood up, Wisdom (Perception) checks made to see you have disadvantage.",
    details: {
      Type: "Wondrous item",
      Rarity: "Uncommon (requires attunement)",
      Effect: "Advantage on Dexterity (Stealth) checks",
      "Perception Disadvantage": "When hood is up",
      Weight: "1 lb",
    },
  },
  {
    id: "item-4",
    name: "Bag of Holding",
    type: "item",
    rarity: "Uncommon",
    description:
      "This bag has an interior space considerably larger than its outside dimensions, roughly 2 feet in diameter at the mouth and 4 feet deep.",
    details: {
      Type: "Wondrous item",
      Rarity: "Uncommon",
      Capacity: "500 pounds, 64 cubic feet",
      Weight: "15 pounds (regardless of contents)",
      "Retrieval Time": "1 action",
    },
  },
  {
    id: "item-5",
    name: "Ring of Protection",
    type: "item",
    rarity: "Rare",
    description: "You gain a +1 bonus to AC and saving throws while wearing this ring.",
    details: {
      Type: "Ring",
      Rarity: "Rare (requires attunement)",
      "AC Bonus": "+1",
      "Saving Throw Bonus": "+1",
      Weight: "0 lb",
    },
  },
  {
    id: "item-6",
    name: "Wand of Magic Missiles",
    type: "item",
    rarity: "Uncommon",
    description:
      "This wand has 7 charges. While holding it, you can use an action to expend 1 or more of its charges to cast the magic missile spell.",
    details: {
      Type: "Wand",
      Rarity: "Uncommon (requires attunement by a spellcaster)",
      Charges: "7 (regains 1d6+1 at dawn)",
      Spell: "Magic Missile (1st to 3rd level)",
      Weight: "1 lb",
    },
  },
]
