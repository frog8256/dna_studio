import { useCallback, useEffect, useLayoutEffect, useMemo, useState, type ReactNode } from 'react'
import { LanguageContext, languageKey, savedLanguage, translations, type Language } from './i18n'

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, select] = useState(savedLanguage)
  const setLanguage = useCallback((next: Language) => {
    select(next)
    try { localStorage.setItem(languageKey, next) } catch { /* Keep the selection for this page. */ }
  }, [])

  useLayoutEffect(() => { document.documentElement.lang = language }, [language])
  useEffect(() => {
    function sync(event: StorageEvent) {
      if (event.key === languageKey || event.key === null) select(savedLanguage())
    }
    function restore(event: PageTransitionEvent) {
      if (event.persisted) select(savedLanguage())
    }
    window.addEventListener('storage', sync)
    window.addEventListener('pageshow', restore)
    return () => {
      window.removeEventListener('storage', sync)
      window.removeEventListener('pageshow', restore)
    }
  }, [])

  const value = useMemo(() => ({ language, setLanguage, t: translations[language] }), [language, setLanguage])
  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>
}
