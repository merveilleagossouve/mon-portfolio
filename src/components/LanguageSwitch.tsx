import { useI18n } from '../i18n/LanguageContext'

/** Un seul bouton doré : il affiche la langue du site, un clic passe à l'autre. */
export default function LanguageSwitch() {
  const { lang, setLang } = useI18n()
  const next = lang === 'fr' ? 'en' : 'fr'

  return (
    <button
      type="button"
      className="lang"
      onClick={() => setLang(next)}
      aria-label={next === 'en' ? 'Switch to English' : 'Passer en français'}
      title={next === 'en' ? 'English' : 'Français'}
    >
      <span key={lang} className="lang__code">
        {lang.toUpperCase()}
      </span>
    </button>
  )
}
