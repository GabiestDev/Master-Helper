"use client"

import { useState, useMemo } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { BookOpen, Search, Star, StarOff, Shield, Zap, Swords, Eye, Filter } from "lucide-react"
import Link from "next/link"
import { compendiumData, type CompendiumItem } from "@/lib/compendium-data"

export default function CompendiumBrowser() {
  const [items, setItems] = useState<CompendiumItem[]>(compendiumData)
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedType, setSelectedType] = useState<"all" | "spell" | "monster" | "item">("all")
  const [selectedItem, setSelectedItem] = useState<CompendiumItem | null>(null)
  const [showFavoritesOnly, setShowFavoritesOnly] = useState(false)
  const [levelFilter, setLevelFilter] = useState<string>("all")
  const [rarityFilter, setRarityFilter] = useState<string>("all")

  const filteredItems = useMemo(() => {
    return items.filter((item) => {
      const matchesSearch =
        item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (item.school && item.school.toLowerCase().includes(searchTerm.toLowerCase()))

      const matchesType = selectedType === "all" || item.type === selectedType
      const matchesFavorites = !showFavoritesOnly || item.isFavorite

      const matchesLevel = levelFilter === "all" || (item.level !== undefined && item.level.toString() === levelFilter)

      const matchesRarity =
        rarityFilter === "all" || (item.rarity && item.rarity.toLowerCase() === rarityFilter.toLowerCase())

      return matchesSearch && matchesType && matchesFavorites && matchesLevel && matchesRarity
    })
  }, [items, searchTerm, selectedType, showFavoritesOnly, levelFilter, rarityFilter])

  const toggleFavorite = (id: string) => {
    setItems(items.map((item) => (item.id === id ? { ...item, isFavorite: !item.isFavorite } : item)))
  }

  const getTypeIcon = (type: CompendiumItem["type"]) => {
    switch (type) {
      case "spell":
        return <Zap className="h-4 w-4" />
      case "monster":
        return <Swords className="h-4 w-4" />
      case "item":
        return <Shield className="h-4 w-4" />
      default:
        return <BookOpen className="h-4 w-4" />
    }
  }

  const getTypeColor = (type: CompendiumItem["type"]) => {
    switch (type) {
      case "spell":
        return "bg-secondary text-secondary-foreground"
      case "monster":
        return "bg-destructive text-destructive-foreground"
      case "item":
        return "bg-accent text-accent-foreground"
      default:
        return "bg-muted text-muted-foreground"
    }
  }

  const getRarityColor = (rarity?: string) => {
    switch (rarity?.toLowerCase()) {
      case "common":
        return "text-gray-600"
      case "uncommon":
        return "text-green-600"
      case "rare":
        return "text-blue-600"
      case "very rare":
        return "text-purple-600"
      case "legendary":
        return "text-orange-600"
      default:
        return "text-foreground"
    }
  }

  // Get unique values for filters
  const availableLevels = [...new Set(items.filter((item) => item.level !== undefined).map((item) => item.level))].sort(
    (a, b) => a! - b!,
  )
  const availableRarities = [...new Set(items.filter((item) => item.rarity).map((item) => item.rarity))].sort()

  return (
    <div className="min-h-screen">
      <div className="container mx-auto px-4 py-8">
        <div className="medieval-border p-6 mb-8">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-3xl font-bold flex items-center gap-3">
                <BookOpen className="h-8 w-8 text-primary" />
                Compendium Browser
              </h1>
              <p className="text-muted-foreground mt-2">Explore spells, monsters, and magical items</p>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-primary">{filteredItems.length}</div>
              <div className="text-sm text-muted-foreground">Items Found</div>
            </div>
          </div>

          {/* Search and Filters */}
          <div className="space-y-4 mb-6">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search spells, monsters, items..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              <div className="flex gap-2">
                <Button
                  variant={showFavoritesOnly ? "default" : "outline"}
                  onClick={() => setShowFavoritesOnly(!showFavoritesOnly)}
                  className="gap-2"
                >
                  <Star className="h-4 w-4" />
                  Favorites
                </Button>
              </div>
            </div>

            {/* Advanced Filters */}
            <div className="flex flex-wrap gap-4 p-4 bg-muted/30 rounded-lg">
              <div className="flex items-center gap-2">
                <Filter className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm font-medium">Filters:</span>
              </div>

              {selectedType === "spell" && (
                <div className="flex items-center gap-2">
                  <label className="text-sm">Level:</label>
                  <select
                    value={levelFilter}
                    onChange={(e) => setLevelFilter(e.target.value)}
                    className="text-sm border border-border rounded px-2 py-1 bg-background"
                  >
                    <option value="all">All Levels</option>
                    {availableLevels.map((level) => (
                      <option key={level} value={level?.toString()}>
                        {level}
                      </option>
                    ))}
                  </select>
                </div>
              )}

              {selectedType === "item" && (
                <div className="flex items-center gap-2">
                  <label className="text-sm">Rarity:</label>
                  <select
                    value={rarityFilter}
                    onChange={(e) => setRarityFilter(e.target.value)}
                    className="text-sm border border-border rounded px-2 py-1 bg-background"
                  >
                    <option value="all">All Rarities</option>
                    {availableRarities.map((rarity) => (
                      <option key={rarity} value={rarity}>
                        {rarity}
                      </option>
                    ))}
                  </select>
                </div>
              )}

              {(levelFilter !== "all" || rarityFilter !== "all") && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => {
                    setLevelFilter("all")
                    setRarityFilter("all")
                  }}
                  className="text-xs"
                >
                  Clear Filters
                </Button>
              )}
            </div>
          </div>

          {/* Category Tabs */}
          <Tabs value={selectedType} onValueChange={(value) => setSelectedType(value as typeof selectedType)}>
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="all">All ({filteredItems.length})</TabsTrigger>
              <TabsTrigger value="spell">
                Spells ({filteredItems.filter((item) => item.type === "spell").length})
              </TabsTrigger>
              <TabsTrigger value="monster">
                Monsters ({filteredItems.filter((item) => item.type === "monster").length})
              </TabsTrigger>
              <TabsTrigger value="item">
                Items ({filteredItems.filter((item) => item.type === "item").length})
              </TabsTrigger>
            </TabsList>

            <TabsContent value={selectedType} className="mt-6">
              {filteredItems.length > 0 ? (
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                  {filteredItems.map((item) => (
                    <Card key={item.id} className="medieval-border hover:shadow-lg transition-shadow">
                      <CardHeader className="pb-3">
                        <div className="flex items-start justify-between">
                          <div className="flex items-center gap-2">
                            {getTypeIcon(item.type)}
                            <CardTitle className="text-lg">{item.name}</CardTitle>
                          </div>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => toggleFavorite(item.id)}
                            className="h-8 w-8 p-0"
                          >
                            {item.isFavorite ? (
                              <Star className="h-4 w-4 fill-current text-yellow-500" />
                            ) : (
                              <StarOff className="h-4 w-4" />
                            )}
                          </Button>
                        </div>
                        <div className="flex flex-wrap gap-2">
                          <Badge className={getTypeColor(item.type)}>{item.type}</Badge>
                          {item.level && <Badge variant="outline">Level {item.level}</Badge>}
                          {item.school && <Badge variant="outline">{item.school}</Badge>}
                          {item.challengeRating && <Badge variant="outline">CR {item.challengeRating}</Badge>}
                          {item.rarity && (
                            <Badge variant="outline" className={getRarityColor(item.rarity)}>
                              {item.rarity}
                            </Badge>
                          )}
                        </div>
                      </CardHeader>
                      <CardContent>
                        <CardDescription className="mb-4 line-clamp-3">{item.description}</CardDescription>
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button variant="outline" className="w-full gap-2 bg-transparent">
                              <Eye className="h-4 w-4" />
                              View Details
                            </Button>
                          </DialogTrigger>
                          <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
                            <DialogHeader>
                              <DialogTitle className="flex items-center gap-2">
                                {getTypeIcon(item.type)}
                                {item.name}
                              </DialogTitle>
                              <div className="flex flex-wrap gap-2">
                                <Badge className={getTypeColor(item.type)}>{item.type}</Badge>
                                {item.level && <Badge variant="outline">Level {item.level}</Badge>}
                                {item.school && <Badge variant="outline">{item.school}</Badge>}
                                {item.challengeRating && <Badge variant="outline">CR {item.challengeRating}</Badge>}
                                {item.rarity && (
                                  <Badge variant="outline" className={getRarityColor(item.rarity)}>
                                    {item.rarity}
                                  </Badge>
                                )}
                              </div>
                            </DialogHeader>
                            <div className="py-4">
                              <DialogDescription className="text-base mb-6">{item.description}</DialogDescription>
                              <div className="space-y-4">
                                <h4 className="font-semibold text-lg">Details</h4>
                                <div className="grid gap-3">
                                  {Object.entries(item.details).map(([key, value]) => (
                                    <div key={key} className="flex flex-col sm:flex-row sm:items-center gap-2">
                                      <span className="font-medium text-sm min-w-32">{key}:</span>
                                      <span className="text-sm text-muted-foreground">{value}</span>
                                    </div>
                                  ))}
                                </div>
                              </div>
                            </div>
                          </DialogContent>
                        </Dialog>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              ) : (
                <Card>
                  <CardContent className="py-12 text-center">
                    <BookOpen className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
                    <h3 className="text-xl font-semibold mb-2">No Items Found</h3>
                    <p className="text-muted-foreground mb-4">
                      {searchTerm
                        ? `No results found for "${searchTerm}"`
                        : showFavoritesOnly
                          ? "No favorites added yet. Star items to add them to your favorites."
                          : "No items available in this category."}
                    </p>
                    {(searchTerm || showFavoritesOnly || levelFilter !== "all" || rarityFilter !== "all") && (
                      <Button
                        variant="outline"
                        onClick={() => {
                          setSearchTerm("")
                          setShowFavoritesOnly(false)
                          setLevelFilter("all")
                          setRarityFilter("all")
                        }}
                      >
                        Clear All Filters
                      </Button>
                    )}
                  </CardContent>
                </Card>
              )}
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  )
}
