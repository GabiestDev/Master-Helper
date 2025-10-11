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
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Sword, Plus, Trash2, Edit, Play, Pause, RotateCcw, Shield, Heart } from "lucide-react"
import Link from "next/link"

interface Character {
  id: string
  name: string
  initiative: number
  hp: number
  maxHp: number
  ac: number
  type: "player" | "npc" | "monster"
  notes?: string
}

export default function InitiativeTracker() {
  const [characters, setCharacters] = useState<Character[]>([])
  const [currentTurn, setCurrentTurn] = useState(0)
  const [round, setRound] = useState(1)
  const [isRunning, setIsRunning] = useState(false)
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [editingCharacter, setEditingCharacter] = useState<Character | null>(null)

  // Form state for adding/editing characters
  const [formData, setFormData] = useState({
    name: "",
    initiative: "",
    hp: "",
    maxHp: "",
    ac: "",
    type: "player" as Character["type"],
    notes: "",
  })

  const sortedCharacters = [...characters].sort((a, b) => b.initiative - a.initiative)

  const handleAddCharacter = () => {
    if (!formData.name || !formData.initiative) return

    const newCharacter: Character = {
      id: Date.now().toString(),
      name: formData.name,
      initiative: Number.parseInt(formData.initiative),
      hp: Number.parseInt(formData.hp) || 0,
      maxHp: Number.parseInt(formData.maxHp) || Number.parseInt(formData.hp) || 0,
      ac: Number.parseInt(formData.ac) || 10,
      type: formData.type,
      notes: formData.notes,
    }

    setCharacters([...characters, newCharacter])
    resetForm()
    setIsAddDialogOpen(false)
  }

  const handleEditCharacter = () => {
    if (!editingCharacter || !formData.name || !formData.initiative) return

    setCharacters(
      characters.map((char) =>
        char.id === editingCharacter.id
          ? {
              ...char,
              name: formData.name,
              initiative: Number.parseInt(formData.initiative),
              hp: Number.parseInt(formData.hp) || 0,
              maxHp: Number.parseInt(formData.maxHp) || Number.parseInt(formData.hp) || 0,
              ac: Number.parseInt(formData.ac) || 10,
              type: formData.type,
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
  }

  const resetForm = () => {
    setFormData({
      name: "",
      initiative: "",
      hp: "",
      maxHp: "",
      ac: "",
      type: "player",
      notes: "",
    })
  }

  const startEditCharacter = (character: Character) => {
    setEditingCharacter(character)
    setFormData({
      name: character.name,
      initiative: character.initiative.toString(),
      hp: character.hp.toString(),
      maxHp: character.maxHp.toString(),
      ac: character.ac.toString(),
      type: character.type,
      notes: character.notes || "",
    })
  }

  const nextTurn = () => {
    if (sortedCharacters.length === 0) return

    const nextIndex = (currentTurn + 1) % sortedCharacters.length
    setCurrentTurn(nextIndex)

    if (nextIndex === 0) {
      setRound(round + 1)
    }
  }

  const resetCombat = () => {
    setCurrentTurn(0)
    setRound(1)
    setIsRunning(false)
  }

  const updateHP = (id: string, newHp: number) => {
    setCharacters(
      characters.map((char) => (char.id === id ? { ...char, hp: Math.max(0, Math.min(newHp, char.maxHp)) } : char)),
    )
  }

  const getTypeColor = (type: Character["type"]) => {
    switch (type) {
      case "player":
        return "bg-secondary text-secondary-foreground"
      case "npc":
        return "bg-accent text-accent-foreground"
      case "monster":
        return "bg-destructive text-destructive-foreground"
      default:
        return "bg-muted text-muted-foreground"
    }
  }

  const getHPColor = (hp: number, maxHp: number) => {
    const percentage = (hp / maxHp) * 100
    if (percentage > 75) return "text-green-600"
    if (percentage > 50) return "text-yellow-600"
    if (percentage > 25) return "text-orange-600"
    return "text-red-600"
  }

  return (
    <div className="min-h-screen">
      <div className="container mx-auto px-4 py-8">
        <div className="medieval-border p-6 mb-8">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-3xl font-bold flex items-center gap-3">
                <Sword className="h-8 w-8 text-primary" />
                Initiative Tracker
              </h1>
              <p className="text-muted-foreground mt-2">Manage your combat encounters with precision</p>
            </div>
            <div className="flex items-center gap-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-primary">Round {round}</div>
                <div className="text-sm text-muted-foreground">Current Round</div>
              </div>
            </div>
          </div>

          {/* Combat Controls */}
          <div className="flex flex-wrap gap-4 mb-6">
            <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
              <DialogTrigger asChild>
                <Button className="gap-2">
                  <Plus className="h-4 w-4" />
                  Add Character
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Add New Character</DialogTitle>
                  <DialogDescription>Add a player, NPC, or monster to the initiative order.</DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="name">Name</Label>
                      <Input
                        id="name"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="Character name"
                      />
                    </div>
                    <div>
                      <Label htmlFor="initiative">Initiative</Label>
                      <Input
                        id="initiative"
                        type="number"
                        value={formData.initiative}
                        onChange={(e) => setFormData({ ...formData, initiative: e.target.value })}
                        placeholder="20"
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-3 gap-4">
                    <div>
                      <Label htmlFor="hp">Current HP</Label>
                      <Input
                        id="hp"
                        type="number"
                        value={formData.hp}
                        onChange={(e) => setFormData({ ...formData, hp: e.target.value })}
                        placeholder="25"
                      />
                    </div>
                    <div>
                      <Label htmlFor="maxHp">Max HP</Label>
                      <Input
                        id="maxHp"
                        type="number"
                        value={formData.maxHp}
                        onChange={(e) => setFormData({ ...formData, maxHp: e.target.value })}
                        placeholder="25"
                      />
                    </div>
                    <div>
                      <Label htmlFor="ac">Armor Class</Label>
                      <Input
                        id="ac"
                        type="number"
                        value={formData.ac}
                        onChange={(e) => setFormData({ ...formData, ac: e.target.value })}
                        placeholder="15"
                      />
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="type">Type</Label>
                    <select
                      id="type"
                      value={formData.type}
                      onChange={(e) => setFormData({ ...formData, type: e.target.value as Character["type"] })}
                      className="w-full p-2 border border-border rounded-md bg-background"
                    >
                      <option value="player">Player</option>
                      <option value="npc">NPC</option>
                      <option value="monster">Monster</option>
                    </select>
                  </div>
                  <div>
                    <Label htmlFor="notes">Notes</Label>
                    <Textarea
                      id="notes"
                      value={formData.notes}
                      onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                      placeholder="Status effects, conditions, etc."
                    />
                  </div>
                </div>
                <div className="flex justify-end gap-2">
                  <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
                    Cancel
                  </Button>
                  <Button onClick={handleAddCharacter}>Add Character</Button>
                </div>
              </DialogContent>
            </Dialog>

            <Button
              variant={isRunning ? "secondary" : "default"}
              onClick={() => setIsRunning(!isRunning)}
              disabled={sortedCharacters.length === 0}
              className="gap-2"
            >
              {isRunning ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
              {isRunning ? "Pause" : "Start"} Combat
            </Button>

            <Button
              variant="outline"
              onClick={nextTurn}
              disabled={!isRunning || sortedCharacters.length === 0}
              className="gap-2 bg-transparent"
            >
              Next Turn
            </Button>

            <Button variant="outline" onClick={resetCombat} className="gap-2 bg-transparent">
              <RotateCcw className="h-4 w-4" />
              Reset
            </Button>
          </div>

          {/* Initiative Order Table */}
          {sortedCharacters.length > 0 ? (
            <Card>
              <CardHeader>
                <CardTitle>Initiative Order</CardTitle>
                <CardDescription>
                  {isRunning && sortedCharacters.length > 0
                    ? `Current turn: ${sortedCharacters[currentTurn]?.name}`
                    : "Combat not started"}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Initiative</TableHead>
                      <TableHead>Name</TableHead>
                      <TableHead>Type</TableHead>
                      <TableHead>HP</TableHead>
                      <TableHead>AC</TableHead>
                      <TableHead>Notes</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {sortedCharacters.map((character, index) => (
                      <TableRow
                        key={character.id}
                        className={isRunning && index === currentTurn ? "bg-primary/10 border-primary/20" : ""}
                      >
                        <TableCell className="font-bold text-lg">{character.initiative}</TableCell>
                        <TableCell className="font-medium">{character.name}</TableCell>
                        <TableCell>
                          <Badge className={getTypeColor(character.type)}>{character.type}</Badge>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <Heart className="h-4 w-4" />
                            <span className={getHPColor(character.hp, character.maxHp)}>
                              {character.hp}/{character.maxHp}
                            </span>
                            <div className="flex gap-1">
                              <Button
                                size="sm"
                                variant="outline"
                                onClick={() => updateHP(character.id, character.hp - 1)}
                                className="h-6 w-6 p-0"
                              >
                                -
                              </Button>
                              <Button
                                size="sm"
                                variant="outline"
                                onClick={() => updateHP(character.id, character.hp + 1)}
                                className="h-6 w-6 p-0"
                              >
                                +
                              </Button>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>{character.ac}</TableCell>
                        <TableCell className="max-w-32 truncate">{character.notes}</TableCell>
                        <TableCell>
                          <div className="flex gap-2">
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => startEditCharacter(character)}
                              className="h-8 w-8 p-0"
                            >
                              <Edit className="h-4 w-4" />
                            </Button>
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => handleDeleteCharacter(character.id)}
                              className="h-8 w-8 p-0 text-destructive hover:text-destructive"
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          ) : (
            <Card>
              <CardContent className="py-12 text-center">
                <Sword className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-2">No Characters Added</h3>
                <p className="text-muted-foreground mb-4">
                  Add players, NPCs, and monsters to start tracking initiative.
                </p>
                <Button onClick={() => setIsAddDialogOpen(true)} className="gap-2">
                  <Plus className="h-4 w-4" />
                  Add Your First Character
                </Button>
              </CardContent>
            </Card>
          )}
        </div>
      </div>

      {/* Edit Character Dialog */}
      <Dialog open={!!editingCharacter} onOpenChange={() => setEditingCharacter(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Character</DialogTitle>
            <DialogDescription>Update character information and stats.</DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="edit-name">Name</Label>
                <Input
                  id="edit-name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="Character name"
                />
              </div>
              <div>
                <Label htmlFor="edit-initiative">Initiative</Label>
                <Input
                  id="edit-initiative"
                  type="number"
                  value={formData.initiative}
                  onChange={(e) => setFormData({ ...formData, initiative: e.target.value })}
                  placeholder="20"
                />
              </div>
            </div>
            <div className="grid grid-cols-3 gap-4">
              <div>
                <Label htmlFor="edit-hp">Current HP</Label>
                <Input
                  id="edit-hp"
                  type="number"
                  value={formData.hp}
                  onChange={(e) => setFormData({ ...formData, hp: e.target.value })}
                  placeholder="25"
                />
              </div>
              <div>
                <Label htmlFor="edit-maxHp">Max HP</Label>
                <Input
                  id="edit-maxHp"
                  type="number"
                  value={formData.maxHp}
                  onChange={(e) => setFormData({ ...formData, maxHp: e.target.value })}
                  placeholder="25"
                />
              </div>
              <div>
                <Label htmlFor="edit-ac">Armor Class</Label>
                <Input
                  id="edit-ac"
                  type="number"
                  value={formData.ac}
                  onChange={(e) => setFormData({ ...formData, ac: e.target.value })}
                  placeholder="15"
                />
              </div>
            </div>
            <div>
              <Label htmlFor="edit-type">Type</Label>
              <select
                id="edit-type"
                value={formData.type}
                onChange={(e) => setFormData({ ...formData, type: e.target.value as Character["type"] })}
                className="w-full p-2 border border-border rounded-md bg-background"
              >
                <option value="player">Player</option>
                <option value="npc">NPC</option>
                <option value="monster">Monster</option>
              </select>
            </div>
            <div>
              <Label htmlFor="edit-notes">Notes</Label>
              <Textarea
                id="edit-notes"
                value={formData.notes}
                onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                placeholder="Status effects, conditions, etc."
              />
            </div>
          </div>
          <div className="flex justify-end gap-2">
            <Button variant="outline" onClick={() => setEditingCharacter(null)}>
              Cancel
            </Button>
            <Button onClick={handleEditCharacter}>Save Changes</Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
