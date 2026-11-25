import { createContext, useContext } from 'react'

export const languages = ['ko', 'en', 'ja'] as const
export type Language = typeof languages[number]

export type Translate = (ko: string, en: string, ja: string) => string
export const translations: Record<Language, Translate> = {
  ko: ko => ko,
  en: (_, en) => en,
  ja: (_, __, ja) => ja,
}

export const languageKey = 'dna-studio-language'

export function savedLanguage(): Language {
  try {
    const saved = localStorage.getItem(languageKey)
    if (saved === 'en' || saved === 'ja') return saved
  } catch { /* Storage may be disabled in a private browsing session. */ }
  return 'ko'
}

export const LanguageContext = createContext<{
  language: Language
  setLanguage: (language: Language) => void
  t: Translate
} | null>(null)

export function useLanguage() {
  const context = useContext(LanguageContext)
  if (!context) throw new Error('LanguageContext provider is required')
  return context
}
