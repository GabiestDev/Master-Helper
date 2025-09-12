"use client"

import { useState, useRef, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Shield, Map, RefreshCw, Download, Settings } from "lucide-react"
import Link from "next/link"
import { useTranslation } from "@/hooks/use-translation"

type MapType = "dungeon" | "wilderness" | "city"
type MapSize = "small" | "medium" | "large"

interface MapCell {
  type: "wall" | "floor" | "door" | "water" | "tree" | "building" | "road" | "empty"
  x: number
  y: number
}

const mapSizes = {
  small: { width: 20, height: 15 },
  medium: { width: 30, height: 22 },
  large: { width: 40, height: 30 },
}

export default function MapGenerator() {
  const { t } = useTranslation()
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [mapType, setMapType] = useState<MapType>("dungeon")
  const [mapSize, setMapSize] = useState<MapSize>("medium")
  const [generatedMap, setGeneratedMap] = useState<MapCell[][]>([])
  const [isGenerating, setIsGenerating] = useState(false)

  const cellSize = 20

  const generateDungeon = (width: number, height: number): MapCell[][] => {
    const map: MapCell[][] = Array(height)
      .fill(null)
      .map((_, y) =>
        Array(width)
          .fill(null)
          .map((_, x) => ({ type: "wall" as const, x, y })),
      )

    // Generate rooms
    const rooms: { x: number; y: number; width: number; height: number }[] = []
    const numRooms = Math.floor(Math.random() * 8) + 5

    for (let i = 0; i < numRooms; i++) {
      const roomWidth = Math.floor(Math.random() * 8) + 4
      const roomHeight = Math.floor(Math.random() * 6) + 3
      const roomX = Math.floor(Math.random() * (width - roomWidth - 2)) + 1
      const roomY = Math.floor(Math.random() * (height - roomHeight - 2)) + 1

      // Check for overlap
      let overlap = false
      for (const room of rooms) {
        if (
          roomX < room.x + room.width + 1 &&
          roomX + roomWidth + 1 > room.x &&
          roomY < room.y + room.height + 1 &&
          roomY + roomHeight + 1 > room.y
        ) {
          overlap = true
          break
        }
      }

      if (!overlap) {
        rooms.push({ x: roomX, y: roomY, width: roomWidth, height: roomHeight })

        // Carve out room
        for (let y = roomY; y < roomY + roomHeight; y++) {
          for (let x = roomX; x < roomX + roomWidth; x++) {
            map[y][x].type = "floor"
          }
        }
      }
    }

    // Generate corridors
    for (let i = 0; i < rooms.length - 1; i++) {
      const room1 = rooms[i]
      const room2 = rooms[i + 1]

      const x1 = Math.floor(room1.x + room1.width / 2)
      const y1 = Math.floor(room1.y + room1.height / 2)
      const x2 = Math.floor(room2.x + room2.width / 2)
      const y2 = Math.floor(room2.y + room2.height / 2)

      // Horizontal corridor
      const startX = Math.min(x1, x2)
      const endX = Math.max(x1, x2)
      for (let x = startX; x <= endX; x++) {
        if (map[y1] && map[y1][x]) map[y1][x].type = "floor"
      }

      // Vertical corridor
      const startY = Math.min(y1, y2)
      const endY = Math.max(y1, y2)
      for (let y = startY; y <= endY; y++) {
        if (map[y] && map[y][x2]) map[y][x2].type = "floor"
      }
    }

    // Add doors
    for (const room of rooms) {
      const doorPositions = [
        { x: room.x + Math.floor(room.width / 2), y: room.y }, // Top
        { x: room.x + Math.floor(room.width / 2), y: room.y + room.height - 1 }, // Bottom
        { x: room.x, y: room.y + Math.floor(room.height / 2) }, // Left
        { x: room.x + room.width - 1, y: room.y + Math.floor(room.height / 2) }, // Right
      ]

      for (const pos of doorPositions) {
        if (Math.random() < 0.3 && map[pos.y] && map[pos.y][pos.x]) {
          // Check if there's a corridor adjacent
          const adjacent = [
            { x: pos.x, y: pos.y - 1 },
            { x: pos.x, y: pos.y + 1 },
            { x: pos.x - 1, y: pos.y },
            { x: pos.x + 1, y: pos.y },
          ]

          for (const adj of adjacent) {
            if (map[adj.y] && map[adj.y][adj.x] && map[adj.y][adj.x].type === "floor") {
              map[pos.y][pos.x].type = "door"
              break
            }
          }
        }
      }
    }

    return map
  }

  const generateWilderness = (width: number, height: number): MapCell[][] => {
    const map: MapCell[][] = Array(height)
      .fill(null)
      .map((_, y) =>
        Array(width)
          .fill(null)
          .map((_, x) => ({ type: "empty" as const, x, y })),
      )

    // Add water features
    const numLakes = Math.floor(Math.random() * 3) + 1
    for (let i = 0; i < numLakes; i++) {
      const centerX = Math.floor(Math.random() * width)
      const centerY = Math.floor(Math.random() * height)
      const radius = Math.floor(Math.random() * 4) + 2

      for (let y = Math.max(0, centerY - radius); y < Math.min(height, centerY + radius); y++) {
        for (let x = Math.max(0, centerX - radius); x < Math.min(width, centerX + radius); x++) {
          const distance = Math.sqrt((x - centerX) ** 2 + (y - centerY) ** 2)
          if (distance <= radius) {
            map[y][x].type = "water"
          }
        }
      }
    }

    // Add trees
    for (let y = 0; y < height; y++) {
      for (let x = 0; x < width; x++) {
        if (map[y][x].type === "empty" && Math.random() < 0.3) {
          map[y][x].type = "tree"
        }
      }
    }

    // Add roads
    const numRoads = Math.floor(Math.random() * 3) + 1
    for (let i = 0; i < numRoads; i++) {
      if (Math.random() < 0.5) {
        // Horizontal road
        const y = Math.floor(Math.random() * height)
        for (let x = 0; x < width; x++) {
          if (map[y][x].type !== "water") {
            map[y][x].type = "road"
          }
        }
      } else {
        // Vertical road
        const x = Math.floor(Math.random() * width)
        for (let y = 0; y < height; y++) {
          if (map[y][x].type !== "water") {
            map[y][x].type = "road"
          }
        }
      }
    }

    return map
  }

  const generateCity = (width: number, height: number): MapCell[][] => {
    const map: MapCell[][] = Array(height)
      .fill(null)
      .map((_, y) =>
        Array(width)
          .fill(null)
          .map((_, x) => ({ type: "road" as const, x, y })),
      )

    // Generate city blocks
    const blockSize = 6
    for (let y = 1; y < height - 1; y += blockSize) {
      for (let x = 1; x < width - 1; x += blockSize) {
        const blockWidth = Math.min(blockSize - 2, width - x - 1)
        const blockHeight = Math.min(blockSize - 2, height - y - 1)

        // Fill block with buildings
        for (let by = y; by < y + blockHeight; by++) {
          for (let bx = x; bx < x + blockWidth; bx++) {
            if (bx < width && by < height) {
              map[by][bx].type = "building"
            }
          }
        }
      }
    }

    // Add some water features (fountains, rivers)
    if (Math.random() < 0.4) {
      const centerX = Math.floor(width / 2)
      const centerY = Math.floor(height / 2)
      const radius = 2

      for (let y = Math.max(0, centerY - radius); y < Math.min(height, centerY + radius); y++) {
        for (let x = Math.max(0, centerX - radius); x < Math.min(width, centerX + radius); x++) {
          const distance = Math.sqrt((x - centerX) ** 2 + (y - centerY) ** 2)
          if (distance <= radius) {
            map[y][x].type = "water"
          }
        }
      }
    }

    return map
  }

  const generateMap = async () => {
    setIsGenerating(true)
    const { width, height } = mapSizes[mapSize]

    // Simulate generation delay
    await new Promise((resolve) => setTimeout(resolve, 500))

    let newMap: MapCell[][]
    switch (mapType) {
      case "dungeon":
        newMap = generateDungeon(width, height)
        break
      case "wilderness":
        newMap = generateWilderness(width, height)
        break
      case "city":
        newMap = generateCity(width, height)
        break
      default:
        newMap = generateDungeon(width, height)
    }

    setGeneratedMap(newMap)
    setIsGenerating(false)
  }

  const drawMap = () => {
    const canvas = canvasRef.current
    if (!canvas || generatedMap.length === 0) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const { width, height } = mapSizes[mapSize]
    canvas.width = width * cellSize
    canvas.height = height * cellSize

    ctx.clearRect(0, 0, canvas.width, canvas.height)

    const colors = {
      wall: "#4a4a4a",
      floor: "#f5f5dc",
      door: "#8b4513",
      water: "#4169e1",
      tree: "#228b22",
      building: "#696969",
      road: "#d3d3d3",
      empty: "#90ee90",
    }

    for (let y = 0; y < generatedMap.length; y++) {
      for (let x = 0; x < generatedMap[y].length; x++) {
        const cell = generatedMap[y][x]
        ctx.fillStyle = colors[cell.type]
        ctx.fillRect(x * cellSize, y * cellSize, cellSize, cellSize)

        // Add borders for better visibility
        ctx.strokeStyle = "#000000"
        ctx.lineWidth = 0.5
        ctx.strokeRect(x * cellSize, y * cellSize, cellSize, cellSize)
      }
    }
  }

  const downloadMap = () => {
    const canvas = canvasRef.current
    if (!canvas) return

    const link = document.createElement("a")
    link.download = `${mapType}-map-${mapSize}-${Date.now()}.png`
    link.href = canvas.toDataURL()
    link.click()
  }

  useEffect(() => {
    drawMap()
  }, [generatedMap, mapSize])

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
              <Link href="/maps" className="text-primary font-medium">
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
                <Map className="h-8 w-8 text-primary" />
                {t("mapGeneratorTitle")}
              </h1>
              <p className="text-muted-foreground mt-2">{t("mapGeneratorDescription")}</p>
            </div>
          </div>

          <div className="grid lg:grid-cols-4 gap-6">
            {/* Map Configuration */}
            <div className="lg:col-span-1">
              <Card className="medieval-border">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Settings className="h-5 w-5" />
                    Map Settings
                  </CardTitle>
                  <CardDescription>Configure your map generation</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div>
                    <Label className="text-sm font-medium">{t("mapType")}</Label>
                    <div className="grid gap-2 mt-2">
                      {(["dungeon", "wilderness", "city"] as MapType[]).map((type) => (
                        <Button
                          key={type}
                          variant={mapType === type ? "default" : "outline"}
                          onClick={() => setMapType(type)}
                          className="justify-start"
                        >
                          {t(type)}
                        </Button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <Label className="text-sm font-medium">{t("mapSize")}</Label>
                    <div className="grid gap-2 mt-2">
                      {(["small", "medium", "large"] as MapSize[]).map((size) => (
                        <Button
                          key={size}
                          variant={mapSize === size ? "default" : "outline"}
                          onClick={() => setMapSize(size)}
                          className="justify-start"
                        >
                          <span className="capitalize">{size}</span>
                          <Badge variant="secondary" className="ml-auto">
                            {mapSizes[size].width}x{mapSizes[size].height}
                          </Badge>
                        </Button>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Button onClick={generateMap} disabled={isGenerating} className="w-full gap-2">
                      {isGenerating ? <RefreshCw className="h-4 w-4 animate-spin" /> : <Map className="h-4 w-4" />}
                      {isGenerating ? "Generating..." : t("generateMap")}
                    </Button>

                    {generatedMap.length > 0 && (
                      <Button variant="outline" onClick={downloadMap} className="w-full gap-2 bg-transparent">
                        <Download className="h-4 w-4" />
                        Download PNG
                      </Button>
                    )}
                  </div>
                </CardContent>
              </Card>

              {/* Legend */}
              <Card className="medieval-border mt-4">
                <CardHeader>
                  <CardTitle className="text-sm">Legend</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2 text-sm">
                    {mapType === "dungeon" && (
                      <>
                        <div className="flex items-center gap-2">
                          <div className="w-4 h-4 bg-[#4a4a4a] border border-border"></div>
                          <span>Wall</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="w-4 h-4 bg-[#f5f5dc] border border-border"></div>
                          <span>Floor</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="w-4 h-4 bg-[#8b4513] border border-border"></div>
                          <span>Door</span>
                        </div>
                      </>
                    )}
                    {mapType === "wilderness" && (
                      <>
                        <div className="flex items-center gap-2">
                          <div className="w-4 h-4 bg-[#90ee90] border border-border"></div>
                          <span>Grass</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="w-4 h-4 bg-[#228b22] border border-border"></div>
                          <span>Trees</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="w-4 h-4 bg-[#4169e1] border border-border"></div>
                          <span>Water</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="w-4 h-4 bg-[#d3d3d3] border border-border"></div>
                          <span>Road</span>
                        </div>
                      </>
                    )}
                    {mapType === "city" && (
                      <>
                        <div className="flex items-center gap-2">
                          <div className="w-4 h-4 bg-[#d3d3d3] border border-border"></div>
                          <span>Street</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="w-4 h-4 bg-[#696969] border border-border"></div>
                          <span>Building</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="w-4 h-4 bg-[#4169e1] border border-border"></div>
                          <span>Fountain</span>
                        </div>
                      </>
                    )}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Map Display */}
            <div className="lg:col-span-3">
              <Card className="medieval-border royal-border">
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    Generated Map
                    {generatedMap.length > 0 && (
                      <Badge variant="outline" className="royal-accent">
                        {mapSizes[mapSize].width} x {mapSizes[mapSize].height}
                      </Badge>
                    )}
                  </CardTitle>
                  <CardDescription>
                    {mapType === "dungeon" && "A procedurally generated dungeon with rooms and corridors"}
                    {mapType === "wilderness" && "A natural landscape with trees, water, and paths"}
                    {mapType === "city" && "An urban environment with buildings and streets"}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  {generatedMap.length > 0 ? (
                    <div className="flex justify-center">
                      <div className="border border-border rounded-lg overflow-hidden">
                        <canvas ref={canvasRef} className="max-w-full h-auto" style={{ imageRendering: "pixelated" }} />
                      </div>
                    </div>
                  ) : (
                    <div className="text-center py-16">
                      <Map className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
                      <h3 className="text-xl font-semibold mb-2">No Map Generated</h3>
                      <p className="text-muted-foreground mb-4">
                        Configure your settings and click "Generate Map" to create a new map.
                      </p>
                      <Button onClick={generateMap} className="gap-2">
                        <Map className="h-4 w-4" />
                        {t("generateMap")}
                      </Button>
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
