"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Shield, Dices, Plus, Minus, History, Trash2 } from "lucide-react"
import Link from "next/link"
import { useTranslation } from "@/hooks/use-translation"

interface DiceRoll {
  id: string
  dice: string
  result: number
  individual: number[]
  modifier: number
  timestamp: Date
}

interface DiceSet {
  type: number
  count: number
}

export default function DiceRoller() {
  const { t } = useTranslation()
  const [diceSets, setDiceSets] = useState<DiceSet[]>([{ type: 20, count: 1 }])
  const [modifier, setModifier] = useState(0)
  const [rollHistory, setRollHistory] = useState<DiceRoll[]>([])
  const [lastRoll, setLastRoll] = useState<DiceRoll | null>(null)

  const diceTypes = [4, 6, 8, 10, 12, 20, 100]

  const rollDice = (sides: number): number => {
    return Math.floor(Math.random() * sides) + 1
  }

  const handleRoll = () => {
    let totalResult = modifier
    const allIndividual: number[] = []
    let diceString = ""

    diceSets.forEach((diceSet, index) => {
      if (diceSet.count > 0) {
        const rolls = Array.from({ length: diceSet.count }, () => rollDice(diceSet.type))
        const sum = rolls.reduce((acc, roll) => acc + roll, 0)
        totalResult += sum
        allIndividual.push(...rolls)

        if (diceString) diceString += " + "
        diceString += `${diceSet.count}d${diceSet.type}`
      }
    })

    if (modifier !== 0) {
      diceString += modifier > 0 ? ` + ${modifier}` : ` - ${Math.abs(modifier)}`
    }

    const newRoll: DiceRoll = {
      id: Date.now().toString(),
      dice: diceString,
      result: totalResult,
      individual: allIndividual,
      modifier,
      timestamp: new Date(),
    }

    setLastRoll(newRoll)
    setRollHistory([newRoll, ...rollHistory.slice(0, 19)]) // Keep last 20 rolls
  }

  const updateDiceSet = (index: number, field: "type" | "count", value: number) => {
    const newDiceSets = [...diceSets]
    newDiceSets[index] = { ...newDiceSets[index], [field]: value }
    setDiceSets(newDiceSets)
  }

  const addDiceSet = () => {
    setDiceSets([...diceSets, { type: 6, count: 1 }])
  }

  const removeDiceSet = (index: number) => {
    if (diceSets.length > 1) {
      setDiceSets(diceSets.filter((_, i) => i !== index))
    }
  }

  const clearHistory = () => {
    setRollHistory([])
    setLastRoll(null)
  }

  const quickRoll = (dice: string) => {
    // Parse dice notation like "1d20", "2d6+3", etc.
    const match = dice.match(/(\d+)d(\d+)(?:([+-])(\d+))?/)
    if (match) {
      const count = Number.parseInt(match[1])
      const sides = Number.parseInt(match[2])
      const modifierSign = match[3]
      const modifierValue = match[4] ? Number.parseInt(match[4]) : 0
      const finalModifier = modifierSign === "-" ? -modifierValue : modifierValue

      setDiceSets([{ type: sides, count }])
      setModifier(finalModifier)

      // Auto roll
      setTimeout(() => {
        let total = finalModifier
        const rolls = Array.from({ length: count }, () => rollDice(sides))
        total += rolls.reduce((acc, roll) => acc + roll, 0)

        const newRoll: DiceRoll = {
          id: Date.now().toString(),
          dice,
          result: total,
          individual: rolls,
          modifier: finalModifier,
          timestamp: new Date(),
        }

        setLastRoll(newRoll)
        setRollHistory([newRoll, ...rollHistory.slice(0, 19)])
      }, 100)
    }
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
              <Link href="/dice" className="text-primary font-medium">
                {t("diceRoller")}
              </Link>
              <Link href="/characters" className="text-foreground hover:text-primary transition-colors">
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
                <Dices className="h-8 w-8 text-primary" />
                {t("diceRollerTitle")}
              </h1>
              <p className="text-muted-foreground mt-2">{t("diceRollerDescription")}</p>
            </div>
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            {/* Dice Configuration */}
            <div className="space-y-6">
              <Card className="medieval-border">
                <CardHeader>
                  <CardTitle>{t("diceType")}</CardTitle>
                  <CardDescription>Configure your dice combinations</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {diceSets.map((diceSet, index) => (
                    <div key={index} className="flex items-center gap-4 p-4 border border-border rounded-lg">
                      <div className="flex items-center gap-2">
                        <Label className="text-sm">{t("numberOfDice")}:</Label>
                        <Input
                          type="number"
                          min="0"
                          max="20"
                          value={diceSet.count}
                          onChange={(e) => updateDiceSet(index, "count", Number.parseInt(e.target.value) || 0)}
                          className="w-20"
                        />
                      </div>
                      <div className="flex items-center gap-2">
                        <Label className="text-sm">d</Label>
                        <select
                          value={diceSet.type}
                          onChange={(e) => updateDiceSet(index, "type", Number.parseInt(e.target.value))}
                          className="p-2 border border-border rounded-md bg-background"
                        >
                          {diceTypes.map((type) => (
                            <option key={type} value={type}>
                              {type}
                            </option>
                          ))}
                        </select>
                      </div>
                      {diceSets.length > 1 && (
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => removeDiceSet(index)}
                          className="h-8 w-8 p-0"
                        >
                          <Minus className="h-4 w-4" />
                        </Button>
                      )}
                    </div>
                  ))}

                  <div className="flex gap-2">
                    <Button variant="outline" onClick={addDiceSet} className="gap-2 bg-transparent">
                      <Plus className="h-4 w-4" />
                      Add Dice Set
                    </Button>
                  </div>

                  <div className="flex items-center gap-4 p-4 border border-border rounded-lg">
                    <Label className="text-sm">{t("modifier")}:</Label>
                    <Input
                      type="number"
                      value={modifier}
                      onChange={(e) => setModifier(Number.parseInt(e.target.value) || 0)}
                      className="w-24"
                      placeholder="0"
                    />
                  </div>
                </CardContent>
              </Card>

              {/* Quick Roll Buttons */}
              <Card className="medieval-border">
                <CardHeader>
                  <CardTitle>Quick Rolls</CardTitle>
                  <CardDescription>Common dice combinations</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-3 gap-2">
                    {["1d4", "1d6", "1d8", "1d10", "1d12", "1d20", "1d100", "2d6", "3d6", "4d6", "2d8", "2d10"].map(
                      (dice) => (
                        <Button key={dice} variant="outline" onClick={() => quickRoll(dice)} className="text-sm">
                          {dice}
                        </Button>
                      ),
                    )}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Roll Results */}
            <div className="space-y-6">
              {/* Current Roll */}
              <Card className="medieval-border royal-border">
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    {t("rollResult")}
                    <Button onClick={handleRoll} className="gap-2 royal-accent">
                      <Dices className="h-4 w-4" />
                      {t("rollDice")}
                    </Button>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {lastRoll ? (
                    <div className="text-center space-y-4">
                      <div className="text-6xl font-bold text-primary royal-glow">{lastRoll.result}</div>
                      <div className="text-lg text-muted-foreground">{lastRoll.dice}</div>
                      {lastRoll.individual.length > 1 && (
                        <div className="flex flex-wrap gap-2 justify-center">
                          {lastRoll.individual.map((roll, index) => (
                            <Badge key={index} variant="outline" className="text-sm">
                              {roll}
                            </Badge>
                          ))}
                          {lastRoll.modifier !== 0 && (
                            <Badge variant="secondary" className="text-sm">
                              {lastRoll.modifier > 0 ? "+" : ""}
                              {lastRoll.modifier}
                            </Badge>
                          )}
                        </div>
                      )}
                    </div>
                  ) : (
                    <div className="text-center py-12">
                      <Dices className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
                      <p className="text-muted-foreground">Click "Roll Dice" to get started!</p>
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* Roll History */}
              <Card className="medieval-border">
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <History className="h-5 w-5" />
                      {t("rollHistory")}
                    </div>
                    {rollHistory.length > 0 && (
                      <Button variant="outline" size="sm" onClick={clearHistory} className="gap-2 bg-transparent">
                        <Trash2 className="h-4 w-4" />
                        {t("clearHistory")}
                      </Button>
                    )}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {rollHistory.length > 0 ? (
                    <div className="space-y-2 max-h-64 overflow-y-auto">
                      {rollHistory.map((roll) => (
                        <div
                          key={roll.id}
                          className="flex items-center justify-between p-3 border border-border rounded-lg"
                        >
                          <div className="flex items-center gap-3">
                            <div className="text-lg font-bold text-primary">{roll.result}</div>
                            <div className="text-sm text-muted-foreground">{roll.dice}</div>
                          </div>
                          <div className="text-xs text-muted-foreground">{roll.timestamp.toLocaleTimeString()}</div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-8">
                      <History className="h-12 w-12 text-muted-foreground mx-auto mb-2" />
                      <p className="text-muted-foreground text-sm">No rolls yet</p>
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
