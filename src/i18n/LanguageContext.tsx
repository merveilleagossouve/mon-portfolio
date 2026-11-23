import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react'
import { getContent, type Content, type Lang } from '../data/content'

type LanguageContextValue = {
  lang: Lang
  setLang: (lang: Lang) => void
  c: Content
}

const STORAGE_KEY = 'portfolio-lang'
const LanguageContext = createContext<LanguageContextValue | null>(null)

function readSavedLang(): Lang {
  try {
    const saved = localStorage.getItem(STORAGE_KEY)
    return saved === 'en' || saved === 'fr' ? saved : 'fr'
  } catch {
    return 'fr'
  }
}

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<Lang>(readSavedLang)

  useEffect(() => {
    const c = getContent(lang)
    document.documentElement.lang = lang
    document.title = c.seo.title
    document.querySelector('meta[name="description"]')?.setAttribute('content', c.seo.description)
    document.querySelector('meta[property="og:title"]')?.setAttribute('content', c.seo.title)
    document.querySelector('meta[property="og:description"]')?.setAttribute('content', c.seo.ogDescription)
    document.querySelector('meta[property="og:locale"]')?.setAttribute('content', c.seo.locale)
    document.querySelector('meta[name="twitter:title"]')?.setAttribute('content', c.seo.title)
    document.querySelector('meta[name="twitter:description"]')?.setAttribute('content', c.seo.twitterDescription)

    try {
      localStorage.setItem(STORAGE_KEY, lang)
    } catch {
      // Navigation privée : on ignore, la langue tient juste pour cette visite.
    }

    // Certaines animations GSAP calculent des distances : on les rafraîchit
    // après le changement de texte pour éviter un décalage.
    const id = requestAnimationFrame(() => window.dispatchEvent(new Event('resize')))
    return () => cancelAnimationFrame(id)
  }, [lang])

  const value = useMemo<LanguageContextValue>(
    () => ({ lang, setLang, c: getContent(lang) }),
    [lang],
  )

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>
}

export function useI18n(): LanguageContextValue {
  const ctx = useContext(LanguageContext)
  if (!ctx) throw new Error('useI18n doit être utilisé à l’intérieur de LanguageProvider')
  return ctx
}
