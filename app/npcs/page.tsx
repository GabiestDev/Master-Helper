"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Shield, User, RefreshCw, Save, Trash2, Users } from "lucide-react"
import Link from "next/link"
import { useTranslation } from "@/hooks/use-translation"

interface GeneratedNPC {
  id: string
  name: string
  race: string
  class: string
  background: string
  level: number
  personality: string[]
  appearance: string[]
  backstory: string
  abilities: {
    strength: number
    dexterity: number
    constitution: number
    intelligence: number
    wisdom: number
    charisma: number
  }
  hp: number
  ac: number
  createdAt: Date
}

const races = [
  "Human",
  "Elf",
  "Dwarf",
  "Halfling",
  "Dragonborn",
  "Gnome",
  "Half-Elf",
  "Half-Orc",
  "Tiefling",
  "Orc",
  "Goblin",
]
const classes = [
  "Fighter",
  "Wizard",
  "Rogue",
  "Cleric",
  "Ranger",
  "Paladin",
  "Barbarian",
  "Bard",
  "Sorcerer",
  "Warlock",
  "Monk",
  "Druid",
  "Commoner",
  "Noble",
  "Merchant",
  "Guard",
]
const backgrounds = [
  "Acolyte",
  "Criminal",
  "Folk Hero",
  "Noble",
  "Sage",
  "Soldier",
  "Charlatan",
  "Entertainer",
  "Guild Artisan",
  "Hermit",
  "Outlander",
  "Sailor",
  "Merchant",
  "Farmer",
  "Innkeeper",
  "Blacksmith",
]

const personalityTraits = [
  "Cheerful and optimistic",
  "Gruff and serious",
  "Mysterious and secretive",
  "Friendly and talkative",
  "Suspicious and paranoid",
  "Brave and heroic",
  "Cowardly and nervous",
  "Wise and thoughtful",
  "Impulsive and reckless",
  "Calm and collected",
  "Ambitious and driven",
  "Lazy and unmotivated",
  "Honest and trustworthy",
  "Deceitful and cunning",
  "Compassionate and kind",
  "Cold and calculating",
]

const appearanceTraits = [
  "Tall and imposing",
  "Short and stocky",
  "Lean and athletic",
  "Heavyset and strong",
  "Scarred face",
  "Bright colored eyes",
  "Long flowing hair",
  "Bald head",
  "Weathered skin",
  "Elegant clothing",
  "Rough and worn attire",
  "Distinctive jewelry",
  "Missing limb",
  "Unusual birthmark",
  "Piercing gaze",
  "Warm smile",
  "Stern expression",
  "Nervous twitch",
]

const backstoryElements = [
  "seeking revenge for a past wrong",
  "hiding from a dark secret",
  "searching for a lost family member",
  "trying to restore their family's honor",
  "fleeing from their past",
  "on a quest for knowledge",
  "protecting an ancient artifact",
  "serving a mysterious patron",
  "atoning for past mistakes",
  "building a new life in this town",
  "investigating strange occurrences",
  "gathering information",
  "looking for adventure and fortune",
  "retired from a life of danger",
  "recently arrived from distant lands",
]

const humanNames = {
  male: ["Aerdrie", "Beiro", "Carric", "Drannor", "Enna", "Galinndan", "Hadarai", "Immeral", "Ivellios", "Laucian"],
  female: ["Adrie", "Birel", "Caelynn", "Dara", "Enna", "Galinndan", "Halimath", "Immeral", "Ivellios", "Lamlis"],
}

const elfNames = {
  male: ["Adran", "Beiro", "Carric", "Drannor", "Enna", "Galinndan", "Hadarai", "Immeral", "Ivellios", "Laucian"],
  female: ["Adrie", "Birel", "Caelynn", "Dara", "Enna", "Galinndan", "Halimath", "Immeral", "Ivellios", "Lamlis"],
}

const dwarfNames = {
  male: ["Adrik", "Baern", "Darrak", "Eberk", "Fargrim", "Gardain", "Harbek", "Kildrak", "Morgran", "Orsik"],
  female: ["Amber", "Bardryn", "Diesa", "Eldeth", "Gunnloda", "Greta", "Helja", "Kathra", "Kristryd", "Mardred"],
}

export default function NPCGenerator() {
  const { t } = useTranslation()
  const [currentNPC, setCurrentNPC] = useState<GeneratedNPC | null>(null)
  const [savedNPCs, setSavedNPCs] = useState<GeneratedNPC[]>([])
  const [isGenerating, setIsGenerating] = useState(false)

  const getRandomElement = <T,>(array: T[]): T => {
    return array[Math.floor(Math.random() * array.length)]
  }

  const rollAbilityScore = (): number => {
    // Roll 4d6, drop lowest
    const rolls = Array.from({ length: 4 }, () => Math.floor(Math.random() * 6) + 1)
    rolls.sort((a, b) => b - a)
    return rolls.slice(0, 3).reduce((sum, roll) => sum + roll, 0)
  }

  const generateName = (race: string): string => {
    const gender = Math.random() < 0.5 ? "male" : "female"

    switch (race.toLowerCase()) {
      case "human":
        return getRandomElement(humanNames[gender])
      case "elf":
      case "half-elf":
        return getRandomElement(elfNames[gender])
      case "dwarf":
        return getRandomElement(dwarfNames[gender])
      default:
        return getRandomElement(humanNames[gender])
    }
  }

  const generateBackstory = (npc: Partial<GeneratedNPC>): string => {
    const element = getRandomElement(backstoryElements)
    const profession = npc.background?.toLowerCase() || "commoner"

    const backstories = [
      `This ${profession} is ${element} and has found themselves in this area recently.`,
      `A former ${profession}, they are now ${element} after a life-changing event.`,
      `Born into the life of a ${profession}, they are currently ${element}.`,
      `Once a respected ${profession}, they are now ${element} due to circumstances beyond their control.`,
      `This ${profession} has been ${element} for several years now.`,
    ]

    return getRandomElement(backstories)
  }

  const generateNPC = async () => {
    setIsGenerating(true)

    // Simulate generation delay
    await new Promise((resolve) => setTimeout(resolve, 800))

    const race = getRandomElement(races)
    const npcClass = getRandomElement(classes)
    const background = getRandomElement(backgrounds)
    const level = Math.floor(Math.random() * 10) + 1

    const abilities = {
      strength: rollAbilityScore(),
      dexterity: rollAbilityScore(),
      constitution: rollAbilityScore(),
      intelligence: rollAbilityScore(),
      wisdom: rollAbilityScore(),
      charisma: rollAbilityScore(),
    }

    const hp = Math.floor(Math.random() * (level * 8)) + level + Math.floor((abilities.constitution - 10) / 2)
    const ac = 10 + Math.floor((abilities.dexterity - 10) / 2) + Math.floor(Math.random() * 5)

    const personality = [getRandomElement(personalityTraits), getRandomElement(personalityTraits)].filter(
      (trait, index, arr) => arr.indexOf(trait) === index,
    ) // Remove duplicates

    const appearance = [
      getRandomElement(appearanceTraits),
      getRandomElement(appearanceTraits),
      getRandomElement(appearanceTraits),
    ].filter((trait, index, arr) => arr.indexOf(trait) === index) // Remove duplicates

    const newNPC: GeneratedNPC = {
      id: Date.now().toString(),
      name: generateName(race),
      race,
      class: npcClass,
      background,
      level,
      personality,
      appearance,
      backstory: "",
      abilities,
      hp,
      ac,
      createdAt: new Date(),
    }

    newNPC.backstory = generateBackstory(newNPC)

    setCurrentNPC(newNPC)
    setIsGenerating(false)
  }

  const saveNPC = () => {
    if (currentNPC) {
      setSavedNPCs([currentNPC, ...savedNPCs])
    }
  }

  const deleteSavedNPC = (id: string) => {
    setSavedNPCs(savedNPCs.filter((npc) => npc.id !== id))
  }

  const loadNPC = (npc: GeneratedNPC) => {
    setCurrentNPC(npc)
  }

  const getAbilityModifier = (score: number): number => {
    return Math.floor((score - 10) / 2)
  }

  return (
    <div className="min-h-screen">
      {/* Header */}
      <header className="border-b border-border/50 bg-card/50 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Link href="/" className="flex items-center gap-3 hover:opacity-80 transition-opacity">
                <Shield className="h-8 w-8 text-primary" />
                <span className="text-2xl font-bold text-primary">{t("siteTitle")}</span>
              </Link>
            </div>
            <nav className="flex items-center gap-6">
              <Link href="/initiative" className="text-foreground hover:text-primary transition-colors">
                {t("initiativeTracker")}
              </Link>
              <Link href="/compendium" className="text-foreground hover:text-primary transition-colors">
                {t("compendium")}
              </Link>
              <Link href="/dice" className="text-foreground hover:text-primary transition-colors">
                {t("diceRoller")}
              </Link>
              <Link href="/characters" className="text-foreground hover:text-primary transition-colors">
                {t("characterSheets")}
              </Link>
              <Link href="/maps" className="text-foreground hover:text-primary transition-colors">
                {t("mapGenerator")}
              </Link>
              <Link href="/npcs" className="text-primary font-medium">
                {t("npcGenerator")}
              </Link>
            </nav>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="medieval-border p-6 mb-8">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-3xl font-bold flex items-center gap-3">
                <Users className="h-8 w-8 text-primary" />
                {t("npcGeneratorTitle")}
              </h1>
              <p className="text-muted-foreground mt-2">{t("npcGeneratorDescription")}</p>
            </div>
            <Button onClick={generateNPC} disabled={isGenerating} className="gap-2">
              {isGenerating ? <RefreshCw className="h-4 w-4 animate-spin" /> : <User className="h-4 w-4" />}
              {isGenerating ? "Generating..." : t("generateNPC")}
            </Button>
          </div>

          <div className="grid lg:grid-cols-3 gap-6">
            {/* Generated NPC */}
            <div className="lg:col-span-2">
              {currentNPC ? (
                <Card className="medieval-border royal-border">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle className="flex items-center gap-3">
                        <User className="h-6 w-6 royal-text" />
                        {currentNPC.name}
                      </CardTitle>
                      <Button onClick={saveNPC} variant="outline" className="gap-2 bg-transparent">
                        <Save className="h-4 w-4" />
                        Save NPC
                      </Button>
                    </div>
                    <CardDescription>
                      Level {currentNPC.level} {currentNPC.race} {currentNPC.class}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    {/* Basic Info */}
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <h3 className="font-semibold mb-2">Basic Information</h3>
                        <div className="space-y-2 text-sm">
                          <div>
                            <strong>{t("npcRace")}:</strong> {currentNPC.race}
                          </div>
                          <div>
                            <strong>{t("npcClass")}:</strong> {currentNPC.class}
                          </div>
                          <div>
                            <strong>{t("npcBackground")}:</strong> {currentNPC.background}
                          </div>
                          <div>
                            <strong>{t("characterLevel")}:</strong> {currentNPC.level}
                          </div>
                        </div>
                      </div>
                      <div>
                        <h3 className="font-semibold mb-2">Combat Stats</h3>
                        <div className="space-y-2 text-sm">
                          <div>
                            <strong>Hit Points:</strong> {currentNPC.hp}
                          </div>
                          <div>
                            <strong>Armor Class:</strong> {currentNPC.ac}
                          </div>
                          <div>
                            <strong>Proficiency:</strong> +{Math.ceil(currentNPC.level / 4) + 1}
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Ability Scores */}
                    <div>
                      <h3 className="font-semibold mb-3">{t("abilities")}</h3>
                      <div className="grid grid-cols-3 gap-3">
                        {Object.entries(currentNPC.abilities).map(([ability, value]) => (
                          <div key={ability} className="text-center p-3 border border-border rounded-lg">
                            <div className="text-sm font-medium capitalize mb-1">{t(ability)}</div>
                            <div className="text-lg font-bold">{value}</div>
                            <div className="text-xs text-muted-foreground">
                              ({getAbilityModifier(value) >= 0 ? "+" : ""}
                              {getAbilityModifier(value)})
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Personality */}
                    <div>
                      <h3 className="font-semibold mb-3">{t("personality")}</h3>
                      <div className="flex flex-wrap gap-2">
                        {currentNPC.personality.map((trait, index) => (
                          <Badge key={index} variant="secondary" className="text-sm">
                            {trait}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    {/* Appearance */}
                    <div>
                      <h3 className="font-semibold mb-3">{t("appearance")}</h3>
                      <div className="flex flex-wrap gap-2">
                        {currentNPC.appearance.map((trait, index) => (
                          <Badge key={index} variant="outline" className="text-sm">
                            {trait}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    {/* Backstory */}
                    <div>
                      <h3 className="font-semibold mb-3">{t("backstory")}</h3>
                      <div className="p-4 border border-border rounded-lg bg-muted/30">
                        <p className="text-sm">{currentNPC.backstory}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ) : (
                <Card className="medieval-border">
                  <CardContent className="py-16 text-center">
                    <Users className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
                    <h3 className="text-xl font-semibold mb-2">No NPC Generated</h3>
                    <p className="text-muted-foreground mb-4">
                      Click "Generate NPC" to create a unique character with stats, personality, and backstory.
                    </p>
                    <Button onClick={generateNPC} className="gap-2">
                      <User className="h-4 w-4" />
                      {t("generateNPC")}
                    </Button>
                  </CardContent>
                </Card>
              )}
            </div>

            {/* Saved NPCs */}
            <div className="lg:col-span-1">
              <Card className="medieval-border">
                <CardHeader>
                  <CardTitle>Saved NPCs ({savedNPCs.length})</CardTitle>
                  <CardDescription>Your generated characters</CardDescription>
                </CardHeader>
                <CardContent>
                  {savedNPCs.length > 0 ? (
                    <div className="space-y-2 max-h-96 overflow-y-auto">
                      {savedNPCs.map((npc) => (
                        <div
                          key={npc.id}
                          className="p-3 border border-border rounded-lg cursor-pointer hover:bg-muted/50 transition-colors"
                          onClick={() => loadNPC(npc)}
                        >
                          <div className="flex items-center justify-between">
                            <div>
                              <div className="font-medium">{npc.name}</div>
                              <div className="text-sm text-muted-foreground">
                                {npc.race} {npc.class}
                              </div>
                              <div className="text-xs text-muted-foreground">
                                Level {npc.level} • {npc.background}
                              </div>
                            </div>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={(e) => {
                                e.stopPropagation()
                                deleteSavedNPC(npc.id)
                              }}
                              className="h-8 w-8 p-0 text-destructive hover:text-destructive"
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-8">
                      <User className="h-12 w-12 text-muted-foreground mx-auto mb-2" />
                      <p className="text-muted-foreground text-sm">No saved NPCs yet</p>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
