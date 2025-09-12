"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Sword, BookOpen, Scroll } from "lucide-react"
import { useTranslation } from "@/hooks/use-translation"
import Link from "next/link"

export default function HomePage() {
  const { t } = useTranslation()

  return (
    <div>
      {/* Hero Section */}
      <section className="py-12 sm:py-16 px-4">
        <div className="container mx-auto text-center">
          <div className="medieval-border royal-border p-6 sm:p-8 max-w-4xl mx-auto royal-glow">
            <Scroll className="h-12 w-12 sm:h-16 sm:w-16 text-primary mx-auto mb-6" />
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-4 text-balance">{t("welcomeTitle")}</h2>
            <p className="text-lg sm:text-xl text-muted-foreground mb-8 text-pretty">{t("welcomeDescription")}</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" className="gap-2">
                <Link href="/initiative">
                  <Sword className="h-5 w-5" />
                  {t("startInitiativeTracker")}
                </Link>
              </Button>
              <Button asChild variant="secondary" size="lg" className="gap-2 royal-accent">
                <Link href="/compendium">
                  <BookOpen className="h-5 w-5" />
                  {t("browseCompendium")}
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      <div className="py-8"></div>

      {/* Features Section */}
      <section className="py-12 sm:py-16 px-4 border-t border-border/50 bg-accent/20 dark:bg-accent/10">
        <div className="container mx-auto">
          <h3 className="text-2xl sm:text-3xl font-bold text-center mb-8 sm:mb-12">{t("featuresTitle")}</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 sm:gap-8 max-w-7xl mx-auto">
            <Card className="medieval-border h-full flex flex-col">
              <CardHeader>
                <CardTitle className="flex items-center gap-3 text-base sm:text-lg">
                  <Sword className="h-5 w-5 sm:h-6 sm:w-6 text-primary" />
                  {t("initiativeTracker")}
                </CardTitle>
                <CardDescription className="text-sm">{t("manageEncounters")}</CardDescription>
              </CardHeader>
              <CardContent className="flex-1 flex flex-col justify-between">
                <ul className="space-y-2 text-sm text-muted-foreground mb-4">
                  <li>• {t("addManageCharacters")}</li>
                  <li>• {t("trackInitiativeOrder")}</li>
                  <li>• {t("monitorHealth")}</li>
                  <li>• {t("quickActions")}</li>
                </ul>
                <Button asChild className="w-full mt-auto">
                  <Link href="/initiative">{t("launchTracker")}</Link>
                </Button>
              </CardContent>
            </Card>

            <Card className="medieval-border royal-border h-full flex flex-col">
              <CardHeader>
                <CardTitle className="flex items-center gap-3 text-base sm:text-lg">
                  <BookOpen className="h-5 w-5 sm:h-6 sm:w-6 royal-text" />
                  {t("compendium")}
                </CardTitle>
                <CardDescription className="text-sm">{t("exploreLibrary")}</CardDescription>
              </CardHeader>
              <CardContent className="flex-1 flex flex-col justify-between">
                <ul className="space-y-2 text-sm text-muted-foreground mb-4">
                  <li>• {t("browseContent")}</li>
                  <li>• {t("advancedSearch")}</li>
                  <li>• {t("detailedStats")}</li>
                  <li>• {t("bookmarkFavorites")}</li>
                </ul>
                <Button asChild className="w-full mt-auto royal-accent">
                  <Link href="/compendium">{t("exploreContent")}</Link>
                </Button>
              </CardContent>
            </Card>

            <Card className="medieval-border h-full flex flex-col">
              <CardHeader>
                <CardTitle className="flex items-center gap-3 text-base sm:text-lg">
                  <div className="h-5 w-5 sm:h-6 sm:w-6 text-primary flex items-center justify-center">
                    <svg
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="h-full w-full"
                    >
                      <rect width="12" height="12" x="2" y="10" rx="2" ry="2" />
                      <path d="m17.92 14 3.5-3.5a2.24 2.24 0 0 0 0-3l-5-4.92a2.24 2.24 0 0 0-3 0L10 6" />
                      <path d="M6 18h.01" />
                      <path d="M10 14h.01" />
                      <path d="M15 6h.01" />
                      <path d="M18 9h.01" />
                    </svg>
                  </div>
                  {t("diceRollerTitle")}
                </CardTitle>
                <CardDescription className="text-sm">{t("diceRollerDescription")}</CardDescription>
              </CardHeader>
              <CardContent className="flex-1 flex flex-col justify-between">
                <ul className="space-y-2 text-sm text-muted-foreground mb-4">
                  <li>• {t("rollMultipleDice")}</li>
                  <li>• {t("customModifiers")}</li>
                  <li>• {t("rollHistory")}</li>
                  <li>• {t("quickRollButtons")}</li>
                </ul>
                <Button asChild className="w-full mt-auto">
                  <Link href="/dice">{t("rollDice")}</Link>
                </Button>
              </CardContent>
            </Card>

            <Card className="medieval-border h-full flex flex-col">
              <CardHeader>
                <CardTitle className="flex items-center gap-3 text-base sm:text-lg">
                  <Scroll className="h-5 w-5 sm:h-6 sm:w-6 text-primary" />
                  {t("characterSheetsTitle")}
                </CardTitle>
                <CardDescription className="text-sm">{t("characterSheetsDescription")}</CardDescription>
              </CardHeader>
              <CardContent className="flex-1 flex flex-col justify-between">
                <ul className="space-y-2 text-sm text-muted-foreground mb-4">
                  <li>• {t("createCharacters")}</li>
                  <li>• {t("manageStats")}</li>
                  <li>• {t("trackEquipment")}</li>
                  <li>• {t("saveProgress")}</li>
                </ul>
                <Button asChild className="w-full mt-auto">
                  <Link href="/characters">{t("createCharacter")}</Link>
                </Button>
              </CardContent>
            </Card>

            <Card className="medieval-border h-full flex flex-col">
              <CardHeader>
                <CardTitle className="flex items-center gap-3 text-base sm:text-lg">
                  <div className="h-5 w-5 sm:h-6 sm:w-6 text-primary flex items-center justify-center">
                    <svg
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="h-full w-full"
                    >
                      <polygon points="3 6 9 3 15 6 21 3 21 18 15 21 9 18 3 21" />
                      <line x1="9" x2="9" y1="3" y2="18" />
                      <line x1="15" x2="15" y1="6" y2="21" />
                    </svg>
                  </div>
                  {t("mapGeneratorTitle")}
                </CardTitle>
                <CardDescription className="text-sm">{t("mapGeneratorDescription")}</CardDescription>
              </CardHeader>
              <CardContent className="flex-1 flex flex-col justify-between">
                <ul className="space-y-2 text-sm text-muted-foreground mb-4">
                  <li>• {t("generateDungeons")}</li>
                  <li>• {t("createCities")}</li>
                  <li>• {t("customizeSettings")}</li>
                  <li>• {t("exportMaps")}</li>
                </ul>
                <Button asChild className="w-full mt-auto">
                  <Link href="/maps">{t("generateMap")}</Link>
                </Button>
              </CardContent>
            </Card>

            <Card className="medieval-border h-full flex flex-col">
              <CardHeader>
                <CardTitle className="flex items-center gap-3 text-base sm:text-lg">
                  <div className="h-5 w-5 sm:h-6 sm:w-6 text-primary flex items-center justify-center">
                    <svg
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="h-full w-full"
                    >
                      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                      <circle cx="12" cy="7" r="4" />
                    </svg>
                  </div>
                  {t("npcGeneratorTitle")}
                </CardTitle>
                <CardDescription className="text-sm">{t("npcGeneratorDescription")}</CardDescription>
              </CardHeader>
              <CardContent className="flex-1 flex flex-col justify-between">
                <ul className="space-y-2 text-sm text-muted-foreground mb-4">
                  <li>• {t("randomNames")}</li>
                  <li>• {t("generateStats")}</li>
                  <li>• {t("createBackstories")}</li>
                  <li>• {t("saveNPCs")}</li>
                </ul>
                <Button asChild className="w-full mt-auto">
                  <Link href="/npcs">{t("generateNPC")}</Link>
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </div>
  )
}
