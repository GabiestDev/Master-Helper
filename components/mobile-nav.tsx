"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Menu, Sword, BookOpen, Scroll } from "lucide-react"
import { useTranslation } from "@/hooks/use-translation"
import Link from "next/link"

export function MobileNav() {
  const { t } = useTranslation()
  const [open, setOpen] = useState(false)

  const navItems = [
    {
      href: "/initiative",
      label: t("initiativeTracker"),
      icon: Sword,
    },
    {
      href: "/compendium",
      label: t("compendium"),
      icon: BookOpen,
    },
    {
      href: "/dice",
      label: t("diceRoller"),
      icon: "🎲",
    },
    {
      href: "/characters",
      label: t("characterSheets"),
      icon: Scroll,
    },
    {
      href: "/maps",
      label: t("mapGenerator"),
      icon: "🗺️",
    },
    {
      href: "/npcs",
      label: t("npcGenerator"),
      icon: "👤",
    },
  ]

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="lg:hidden">
          <Menu className="h-5 w-5" />
          <span className="sr-only">Toggle menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="right" className="w-[300px] sm:w-[400px]">
        <div className="flex flex-col gap-4 mt-8">
          <div className="flex items-center gap-2 mb-6">
            <h2 className="text-lg font-bold text-primary font-cinzel">{t("siteTitle")}</h2>
          </div>

          <nav className="flex flex-col gap-2">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-muted transition-colors"
              >
                {typeof item.icon === "string" ? (
                  <span className="text-xl">{item.icon}</span>
                ) : (
                  <item.icon className="h-5 w-5 text-primary" />
                )}
                <span className="font-medium">{item.label}</span>
              </Link>
            ))}
          </nav>
        </div>
      </SheetContent>
    </Sheet>
  )
}
