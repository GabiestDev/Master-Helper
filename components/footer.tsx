"use client"

import Image from "next/image"
import { useTranslation } from "@/hooks/use-translation"

export function Footer() {
  const { t } = useTranslation()

  return (
    <footer className="border-t border-royal-purple/20 bg-parchment/50 dark:bg-slate-900/50 mt-auto">
      <div className="container mx-auto px-4 py-6">
        <div className="flex flex-col items-center justify-center space-y-3">
          <div className="flex items-center space-x-3">
            <Image
              src="/images/gabriel-neto-logo.png"
              alt="Gabriel Neto Logo"
              width={40}
              height={40}
              className="rounded-lg"
            />
            <div className="text-center">
              <p className="text-sm font-medium text-slate-700 dark:text-slate-300">{t("footer.developedBy")}</p>
              <p className="text-xs text-slate-500 dark:text-slate-400">Backend Developer</p>
            </div>
          </div>
          <div className="w-16 h-px bg-gradient-to-r from-transparent via-royal-purple/30 to-transparent"></div>
          <p className="text-xs text-slate-400 dark:text-slate-500 text-center">{t("footer.copyright")}</p>
        </div>
      </div>
    </footer>
  )
}

export default Footer
