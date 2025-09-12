"use client"

import { Shield } from "lucide-react"
import { ThemeToggle } from "@/components/theme-toggle"
import { LanguageToggle } from "@/components/language-toggle"
import { MobileNav } from "@/components/mobile-nav"
import { useTranslation } from "@/hooks/use-translation"
import Link from "next/link"

export function SiteHeader() {
  const { t } = useTranslation()

  return (
    <header className="border-b border-border/50 bg-card/50 backdrop-blur-sm sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 sm:gap-3 hover:opacity-80 transition-opacity">
            <Shield className="h-5 w-5 sm:h-6 sm:w-6 royal-text flex-shrink-0" />
            <h1 className="text-base sm:text-lg md:text-xl lg:text-2xl font-bold text-primary font-cinzel">
              {t("siteTitle")}
            </h1>
          </Link>

          <nav className="hidden lg:flex items-center gap-4 xl:gap-6">
            <Link
              href="/initiative"
              className="text-xs xl:text-sm font-medium text-foreground hover:text-primary transition-colors whitespace-nowrap"
            >
              {t("initiativeTracker")}
            </Link>
            <Link
              href="/compendium"
              className="text-xs xl:text-sm font-medium text-foreground hover:text-primary transition-colors whitespace-nowrap"
            >
              {t("compendium")}
            </Link>
            <Link
              href="/dice"
              className="text-xs xl:text-sm font-medium text-foreground hover:text-primary transition-colors whitespace-nowrap"
            >
              {t("diceRoller")}
            </Link>
            <Link
              href="/characters"
              className="text-xs xl:text-sm font-medium text-foreground hover:text-primary transition-colors whitespace-nowrap"
            >
              {t("characterSheets")}
            </Link>
            <Link
              href="/maps"
              className="text-xs xl:text-sm font-medium text-foreground hover:text-primary transition-colors whitespace-nowrap"
            >
              {t("mapGenerator")}
            </Link>
            <Link
              href="/npcs"
              className="text-xs xl:text-sm font-medium text-foreground hover:text-primary transition-colors whitespace-nowrap"
            >
              {t("npcGenerator")}
            </Link>
          </nav>

          <div className="flex items-center gap-2">
            <div className="hidden sm:flex items-center gap-2">
              <LanguageToggle />
              <ThemeToggle />
            </div>
            <div className="sm:hidden flex items-center gap-1">
              <LanguageToggle />
              <ThemeToggle />
            </div>
            <MobileNav />
          </div>
        </div>
      </div>
    </header>
  )
}

export default SiteHeader
