"use client"

import type React from "react"
import { createContext, useContext, useEffect, useState } from "react"
import type { Language } from "@/lib/translations"

type LanguageProviderProps = {
  children: React.ReactNode
  defaultLanguage?: Language
  storageKey?: string
}

type LanguageProviderState = {
  language: Language
  setLanguage: (language: Language) => void
}

const initialState: LanguageProviderState = {
  language: "en",
  setLanguage: () => null,
}

const LanguageProviderContext = createContext<LanguageProviderState>(initialState)

export function LanguageProvider({
  children,
  defaultLanguage = "en",
  storageKey = "vite-ui-language",
  ...props
}: LanguageProviderProps) {
  const [mounted, setMounted] = useState(false)
  const [language, setLanguageState] = useState<Language>(defaultLanguage)

  useEffect(() => {
    setMounted(true)
    if (typeof window !== "undefined") {
      const stored = localStorage.getItem(storageKey) as Language
      if (stored && (stored === "en" || stored === "pt")) {
        setLanguageState(stored)
      }
    }
  }, [storageKey])

  useEffect(() => {
    if (mounted && typeof window !== "undefined") {
      localStorage.setItem(storageKey, language)
    }
  }, [language, storageKey, mounted])

  const setLanguage = (newLanguage: Language) => {
    setLanguageState(newLanguage)
    if (typeof window !== "undefined") {
      localStorage.setItem(storageKey, newLanguage)
    }
  }

  const value = {
    language,
    setLanguage,
  }

  if (!mounted) {
    return (
      <LanguageProviderContext.Provider {...props} value={{ language: defaultLanguage, setLanguage }}>
        {children}
      </LanguageProviderContext.Provider>
    )
  }

  return (
    <LanguageProviderContext.Provider {...props} value={value}>
      {children}
    </LanguageProviderContext.Provider>
  )
}

export const useLanguage = () => {
  const context = useContext(LanguageProviderContext)

  if (context === undefined) throw new Error("useLanguage must be used within a LanguageProvider")

  return context
}
