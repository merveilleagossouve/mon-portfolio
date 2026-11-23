import { site } from '../data/content'

/** Les liens de contact, construits une seule fois à partir de content.ts. */
export const links = {
  mail: `mailto:${site.email}`,
  tel: `tel:+${site.phoneDigits}`,
  whatsapp: `https://wa.me/${site.whatsapp}`,
}
