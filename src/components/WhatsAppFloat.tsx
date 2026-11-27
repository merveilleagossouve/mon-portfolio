import { site } from '../data/content'
import { links } from '../lib/links'
import { useI18n } from '../i18n/LanguageContext'
import { WhatsApp } from './BrandIcons'
import ExternalLink from './ExternalLink'

/** Icône WhatsApp fixe en bas à droite : le vrai logo, dans le vert de WhatsApp. */
export default function WhatsAppFloat() {
  const { c } = useI18n()
  if (!site.whatsapp) return null

  return (
    <ExternalLink
      className="wa-float"
      href={links.whatsapp}
      aria-label="WhatsApp"
      data-tip={c.ui.whatsappTip}
    >
      <WhatsApp />
    </ExternalLink>
  )
}
