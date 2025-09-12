"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Textarea } from "@/components/ui/textarea"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Shield, Scroll, Plus, Edit, Trash2, User, Sword, Heart } from "lucide-react"
import Link from "next/link"
import { useTranslation } from "@/hooks/use-translation"

interface Character {
  id: string
  name: string
  race: string
  class: string
  level: number
  background: string
  abilities: {
    strength: number
    dexterity: number
    constitution: number
    intelligence: number
    wisdom: number
    charisma: number
  }
  hp: number
  maxHp: number
  ac: number
  proficiencyBonus: number
  skills: string[]
  equipment: string[]
  spells: string[]
  notes: string
  createdAt: Date
}

const races = ["Human", "Elf", "Dwarf", "Halfling", "Dragonborn", "Gnome", "Half-Elf", "Half-Orc", "Tiefling"]
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
]

export default function CharacterSheets() {
  const { t } = useTranslation()
  const [characters, setCharacters] = useState<Character[]>([])
  const [selectedCharacter, setSelectedCharacter] = useState<Character | null>(null)
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false)
  const [editingCharacter, setEditingCharacter] = useState<Character | null>(null)

  const [formData, setFormData] = useState({
    name: "",
    race: "Human",
    class: "Fighter",
    level: 1,
    background: "Folk Hero",
    abilities: {
      strength: 10,
      dexterity: 10,
      constitution: 10,
      intelligence: 10,
      wisdom: 10,
      charisma: 10,
    },
    hp: 10,
    maxHp: 10,
    ac: 10,
    notes: "",
  })

  const getAbilityModifier = (score: number): number => {
    return Math.floor((score - 10) / 2)
  }

  const getProficiencyBonus = (level: number): number => {
    return Math.ceil(level / 4) + 1
  }

  const handleCreateCharacter = () => {
    if (!formData.name) return

    const newCharacter: Character = {
      id: Date.now().toString(),
      name: formData.name,
      race: formData.race,
      class: formData.class,
      level: formData.level,
      background: formData.background,
      abilities: { ...formData.abilities },
      hp: formData.hp,
      maxHp: formData.maxHp,
      ac: formData.ac,
      proficiencyBonus: getProficiencyBonus(formData.level),
      skills: [],
      equipment: [],
      spells: [],
      notes: formData.notes,
      createdAt: new Date(),
    }

    setCharacters([...characters, newCharacter])
    resetForm()
    setIsCreateDialogOpen(false)
  }

  const handleEditCharacter = () => {
    if (!editingCharacter || !formData.name) return

    setCharacters(
      characters.map((char) =>
        char.id === editingCharacter.id
          ? {
              ...char,
              name: formData.name,
              race: formData.race,
              class: formData.class,
              level: formData.level,
              background: formData.background,
              abilities: { ...formData.abilities },
              hp: formData.hp,
              maxHp: formData.maxHp,
              ac: formData.ac,
              proficiencyBonus: getProficiencyBonus(formData.level),
              notes: formData.notes,
            }
          : char,
      ),
    )
    setEditingCharacter(null)
    resetForm()
  }

  const handleDeleteCharacter = (id: string) => {
    setCharacters(characters.filter((char) => char.id !== id))
    if (selectedCharacter?.id === id) {
      setSelectedCharacter(null)
    }
  }

  const resetForm = () => {
    setFormData({
      name: "",
      race: "Human",
      class: "Fighter",
      level: 1,
      background: "Folk Hero",
      abilities: {
        strength: 10,
        dexterity: 10,
        constitution: 10,
        intelligence: 10,
        wisdom: 10,
        charisma: 10,
      },
      hp: 10,
      maxHp: 10,
      ac: 10,
      notes: "",
    })
  }

  const startEditCharacter = (character: Character) => {
    setEditingCharacter(character)
    setFormData({
      name: character.name,
      race: character.race,
      class: character.class,
      level: character.level,
      background: character.background,
      abilities: { ...character.abilities },
      hp: character.hp,
      maxHp: character.maxHp,
      ac: character.ac,
      notes: character.notes,
    })
  }

  const rollAbilityScores = () => {
    const rollStat = () => {
      // Roll 4d6, drop lowest
      const rolls = Array.from({ length: 4 }, () => Math.floor(Math.random() * 6) + 1)
      rolls.sort((a, b) => b - a)
      return rolls.slice(0, 3).reduce((sum, roll) => sum + roll, 0)
    }

    setFormData({
      ...formData,
      abilities: {
        strength: rollStat(),
        dexterity: rollStat(),
        constitution: rollStat(),
        intelligence: rollStat(),
        wisdom: rollStat(),
        charisma: rollStat(),
      },
    })
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
              <Link href="/characters" className="text-primary font-medium">
                {t("characterSheets")}
              </Link>
              <Link href="/maps" className="text-foreground hover:text-primary transition-colors">
                {t("mapGenerator")}
              </Link>
              <Link href="/npcs" className="text-foreground hover:text-primary transition-colors">
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
                <Scroll className="h-8 w-8 text-primary" />
                {t("characterSheetsTitle")}
              </h1>
              <p className="text-muted-foreground mt-2">{t("characterSheetsDescription")}</p>
            </div>
            <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
              <DialogTrigger asChild>
                <Button className="gap-2">
                  <Plus className="h-4 w-4" />
                  {t("createCharacter")}
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
                <DialogHeader>
                  <DialogTitle>{t("createCharacter")}</DialogTitle>
                  <DialogDescription>
                    Create a new character sheet with detailed stats and information.
                  </DialogDescription>
                </DialogHeader>
                <Tabs defaultValue="basic" className="w-full">
                  <TabsList className="grid w-full grid-cols-3">
                    <TabsTrigger value="basic">Basic Info</TabsTrigger>
                    <TabsTrigger value="abilities">{t("abilities")}</TabsTrigger>
                    <TabsTrigger value="details">Details</TabsTrigger>
                  </TabsList>

                  <TabsContent value="basic" className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="name">{t("name")}</Label>
                        <Input
                          id="name"
                          value={formData.name}
                          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                          placeholder="Character name"
                        />
                      </div>
                      <div>
                        <Label htmlFor="level">{t("characterLevel")}</Label>
                        <Input
                          id="level"
                          type="number"
                          min="1"
                          max="20"
                          value={formData.level}
                          onChange={(e) => setFormData({ ...formData, level: Number.parseInt(e.target.value) || 1 })}
                        />
                      </div>
                    </div>
                    <div className="grid grid-cols-3 gap-4">
                      <div>
                        <Label htmlFor="race">{t("characterRace")}</Label>
                        <select
                          id="race"
                          value={formData.race}
                          onChange={(e) => setFormData({ ...formData, race: e.target.value })}
                          className="w-full p-2 border border-border rounded-md bg-background"
                        >
                          {races.map((race) => (
                            <option key={race} value={race}>
                              {race}
                            </option>
                          ))}
                        </select>
                      </div>
                      <div>
                        <Label htmlFor="class">{t("characterClass")}</Label>
                        <select
                          id="class"
                          value={formData.class}
                          onChange={(e) => setFormData({ ...formData, class: e.target.value })}
                          className="w-full p-2 border border-border rounded-md bg-background"
                        >
                          {classes.map((cls) => (
                            <option key={cls} value={cls}>
                              {cls}
                            </option>
                          ))}
                        </select>
                      </div>
                      <div>
                        <Label htmlFor="background">{t("npcBackground")}</Label>
                        <select
                          id="background"
                          value={formData.background}
                          onChange={(e) => setFormData({ ...formData, background: e.target.value })}
                          className="w-full p-2 border border-border rounded-md bg-background"
                        >
                          {backgrounds.map((bg) => (
                            <option key={bg} value={bg}>
                              {bg}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>
                  </TabsContent>

                  <TabsContent value="abilities" className="space-y-4">
                    <div className="flex justify-between items-center">
                      <h3 className="text-lg font-semibold">{t("abilities")}</h3>
                      <Button variant="outline" onClick={rollAbilityScores} className="gap-2 bg-transparent">
                        <Sword className="h-4 w-4" />
                        Roll Stats (4d6)
                      </Button>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      {Object.entries(formData.abilities).map(([ability, value]) => (
                        <div key={ability} className="space-y-2">
                          <Label htmlFor={ability} className="capitalize">
                            {t(ability)} ({getAbilityModifier(value) >= 0 ? "+" : ""}
                            {getAbilityModifier(value)})
                          </Label>
                          <Input
                            id={ability}
                            type="number"
                            min="1"
                            max="20"
                            value={value}
                            onChange={(e) =>
                              setFormData({
                                ...formData,
                                abilities: {
                                  ...formData.abilities,
                                  [ability]: Number.parseInt(e.target.value) || 10,
                                },
                              })
                            }
                          />
                        </div>
                      ))}
                    </div>
                  </TabsContent>

                  <TabsContent value="details" className="space-y-4">
                    <div className="grid grid-cols-3 gap-4">
                      <div>
                        <Label htmlFor="hp">{t("currentHP")}</Label>
                        <Input
                          id="hp"
                          type="number"
                          value={formData.hp}
                          onChange={(e) => setFormData({ ...formData, hp: Number.parseInt(e.target.value) || 0 })}
                        />
                      </div>
                      <div>
                        <Label htmlFor="maxHp">{t("maxHP")}</Label>
                        <Input
                          id="maxHp"
                          type="number"
                          value={formData.maxHp}
                          onChange={(e) => setFormData({ ...formData, maxHp: Number.parseInt(e.target.value) || 0 })}
                        />
                      </div>
                      <div>
                        <Label htmlFor="ac">{t("armorClass")}</Label>
                        <Input
                          id="ac"
                          type="number"
                          value={formData.ac}
                          onChange={(e) => setFormData({ ...formData, ac: Number.parseInt(e.target.value) || 10 })}
                        />
                      </div>
                    </div>
                    <div>
                      <Label htmlFor="notes">{t("notes")}</Label>
                      <Textarea
                        id="notes"
                        value={formData.notes}
                        onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                        placeholder="Character backstory, personality, equipment, etc."
                        rows={4}
                      />
                    </div>
                  </TabsContent>
                </Tabs>
                <div className="flex justify-end gap-2 pt-4">
                  <Button variant="outline" onClick={() => setIsCreateDialogOpen(false)}>
                    {t("cancel")}
                  </Button>
                  <Button onClick={handleCreateCharacter}>{t("createCharacter")}</Button>
                </div>
              </DialogContent>
            </Dialog>
          </div>

          <div className="grid lg:grid-cols-3 gap-6">
            {/* Character List */}
            <div className="lg:col-span-1">
              <Card className="medieval-border">
                <CardHeader>
                  <CardTitle>Characters ({characters.length})</CardTitle>
                  <CardDescription>Your created characters</CardDescription>
                </CardHeader>
                <CardContent>
                  {characters.length > 0 ? (
                    <div className="space-y-2">
                      {characters.map((character) => (
                        <div
                          key={character.id}
                          className={`p-3 border border-border rounded-lg cursor-pointer transition-colors ${
                            selectedCharacter?.id === character.id
                              ? "bg-primary/10 border-primary/20"
                              : "hover:bg-muted/50"
                          }`}
                          onClick={() => setSelectedCharacter(character)}
                        >
                          <div className="flex items-center justify-between">
                            <div>
                              <div className="font-medium">{character.name}</div>
                              <div className="text-sm text-muted-foreground">
                                Level {character.level} {character.race} {character.class}
                              </div>
                            </div>
                            <div className="flex gap-1">
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={(e) => {
                                  e.stopPropagation()
                                  startEditCharacter(character)
                                }}
                                className="h-8 w-8 p-0"
                              >
                                <Edit className="h-4 w-4" />
                              </Button>
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={(e) => {
                                  e.stopPropagation()
                                  handleDeleteCharacter(character.id)
                                }}
                                className="h-8 w-8 p-0 text-destructive hover:text-destructive"
                              >
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-8">
                      <User className="h-12 w-12 text-muted-foreground mx-auto mb-2" />
                      <p className="text-muted-foreground text-sm">No characters created yet</p>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>

            {/* Character Details */}
            <div className="lg:col-span-2">
              {selectedCharacter ? (
                <Card className="medieval-border royal-border">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-3">
                      <User className="h-6 w-6 royal-text" />
                      {selectedCharacter.name}
                      <Badge variant="outline">Level {selectedCharacter.level}</Badge>
                    </CardTitle>
                    <CardDescription>
                      {selectedCharacter.race} {selectedCharacter.class} • {selectedCharacter.background}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    {/* Stats Overview */}
                    <div className="grid grid-cols-3 gap-4">
                      <div className="text-center p-4 border border-border rounded-lg">
                        <div className="flex items-center justify-center gap-2 mb-2">
                          <Heart className="h-4 w-4 text-red-500" />
                          <span className="text-sm font-medium">Hit Points</span>
                        </div>
                        <div className="text-2xl font-bold">
                          {selectedCharacter.hp}/{selectedCharacter.maxHp}
                        </div>
                      </div>
                      <div className="text-center p-4 border border-border rounded-lg">
                        <div className="flex items-center justify-center gap-2 mb-2">
                          <Shield className="h-4 w-4 text-blue-500" />
                          <span className="text-sm font-medium">Armor Class</span>
                        </div>
                        <div className="text-2xl font-bold">{selectedCharacter.ac}</div>
                      </div>
                      <div className="text-center p-4 border border-border rounded-lg">
                        <div className="flex items-center justify-center gap-2 mb-2">
                          <Sword className="h-4 w-4 text-green-500" />
                          <span className="text-sm font-medium">Proficiency</span>
                        </div>
                        <div className="text-2xl font-bold">+{selectedCharacter.proficiencyBonus}</div>
                      </div>
                    </div>

                    {/* Ability Scores */}
                    <div>
                      <h3 className="text-lg font-semibold mb-4">{t("abilities")}</h3>
                      <div className="grid grid-cols-3 gap-4">
                        {Object.entries(selectedCharacter.abilities).map(([ability, value]) => (
                          <div key={ability} className="text-center p-3 border border-border rounded-lg">
                            <div className="text-sm font-medium capitalize mb-1">{t(ability)}</div>
                            <div className="text-xl font-bold">{value}</div>
                            <div className="text-sm text-muted-foreground">
                              ({getAbilityModifier(value) >= 0 ? "+" : ""}
                              {getAbilityModifier(value)})
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Notes */}
                    {selectedCharacter.notes && (
                      <div>
                        <h3 className="text-lg font-semibold mb-2">{t("notes")}</h3>
                        <div className="p-4 border border-border rounded-lg bg-muted/30">
                          <p className="text-sm whitespace-pre-wrap">{selectedCharacter.notes}</p>
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>
              ) : (
                <Card className="medieval-border">
                  <CardContent className="py-12 text-center">
                    <Scroll className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
                    <h3 className="text-xl font-semibold mb-2">Select a Character</h3>
                    <p className="text-muted-foreground mb-4">
                      Choose a character from the list to view their details, or create a new one.
                    </p>
                    <Button onClick={() => setIsCreateDialogOpen(true)} className="gap-2">
                      <Plus className="h-4 w-4" />
                      {t("createCharacter")}
                    </Button>
                  </CardContent>
                </Card>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Edit Character Dialog */}
      <Dialog open={!!editingCharacter} onOpenChange={() => setEditingCharacter(null)}>
        <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>{t("editCharacter")}</DialogTitle>
            <DialogDescription>Update character information and stats.</DialogDescription>
          </DialogHeader>
          <Tabs defaultValue="basic" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="basic">Basic Info</TabsTrigger>
              <TabsTrigger value="abilities">{t("abilities")}</TabsTrigger>
              <TabsTrigger value="details">Details</TabsTrigger>
            </TabsList>

            <TabsContent value="basic" className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="edit-name">{t("name")}</Label>
                  <Input
                    id="edit-name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="Character name"
                  />
                </div>
                <div>
                  <Label htmlFor="edit-level">{t("characterLevel")}</Label>
                  <Input
                    id="edit-level"
                    type="number"
                    min="1"
                    max="20"
                    value={formData.level}
                    onChange={(e) => setFormData({ ...formData, level: Number.parseInt(e.target.value) || 1 })}
                  />
                </div>
              </div>
              <div className="grid grid-cols-3 gap-4">
                <div>
                  <Label htmlFor="edit-race">{t("characterRace")}</Label>
                  <select
                    id="edit-race"
                    value={formData.race}
                    onChange={(e) => setFormData({ ...formData, race: e.target.value })}
                    className="w-full p-2 border border-border rounded-md bg-background"
                  >
                    {races.map((race) => (
                      <option key={race} value={race}>
                        {race}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <Label htmlFor="edit-class">{t("characterClass")}</Label>
                  <select
                    id="edit-class"
                    value={formData.class}
                    onChange={(e) => setFormData({ ...formData, class: e.target.value })}
                    className="w-full p-2 border border-border rounded-md bg-background"
                  >
                    {classes.map((cls) => (
                      <option key={cls} value={cls}>
                        {cls}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <Label htmlFor="edit-background">{t("npcBackground")}</Label>
                  <select
                    id="edit-background"
                    value={formData.background}
                    onChange={(e) => setFormData({ ...formData, background: e.target.value })}
                    className="w-full p-2 border border-border rounded-md bg-background"
                  >
                    {backgrounds.map((bg) => (
                      <option key={bg} value={bg}>
                        {bg}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="abilities" className="space-y-4">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-semibold">{t("abilities")}</h3>
                <Button variant="outline" onClick={rollAbilityScores} className="gap-2 bg-transparent">
                  <Sword className="h-4 w-4" />
                  Roll Stats (4d6)
                </Button>
              </div>
              <div className="grid grid-cols-2 gap-4">
                {Object.entries(formData.abilities).map(([ability, value]) => (
                  <div key={ability} className="space-y-2">
                    <Label htmlFor={`edit-${ability}`} className="capitalize">
                      {t(ability)} ({getAbilityModifier(value) >= 0 ? "+" : ""}
                      {getAbilityModifier(value)})
                    </Label>
                    <Input
                      id={`edit-${ability}`}
                      type="number"
                      min="1"
                      max="20"
                      value={value}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          abilities: {
                            ...formData.abilities,
                            [ability]: Number.parseInt(e.target.value) || 10,
                          },
                        })
                      }
                    />
                  </div>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="details" className="space-y-4">
              <div className="grid grid-cols-3 gap-4">
                <div>
                  <Label htmlFor="edit-hp">{t("currentHP")}</Label>
                  <Input
                    id="edit-hp"
                    type="number"
                    value={formData.hp}
                    onChange={(e) => setFormData({ ...formData, hp: Number.parseInt(e.target.value) || 0 })}
                  />
                </div>
                <div>
                  <Label htmlFor="edit-maxHp">{t("maxHP")}</Label>
                  <Input
                    id="edit-maxHp"
                    type="number"
                    value={formData.maxHp}
                    onChange={(e) => setFormData({ ...formData, maxHp: Number.parseInt(e.target.value) || 0 })}
                  />
                </div>
                <div>
                  <Label htmlFor="edit-ac">{t("armorClass")}</Label>
                  <Input
                    id="edit-ac"
                    type="number"
                    value={formData.ac}
                    onChange={(e) => setFormData({ ...formData, ac: Number.parseInt(e.target.value) || 10 })}
                  />
                </div>
              </div>
              <div>
                <Label htmlFor="edit-notes">{t("notes")}</Label>
                <Textarea
                  id="edit-notes"
                  value={formData.notes}
                  onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                  placeholder="Character backstory, personality, equipment, etc."
                  rows={4}
                />
              </div>
            </TabsContent>
          </Tabs>
          <div className="flex justify-end gap-2 pt-4">
            <Button variant="outline" onClick={() => setEditingCharacter(null)}>
              {t("cancel")}
            </Button>
            <Button onClick={handleEditCharacter}>{t("saveChanges")}</Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
