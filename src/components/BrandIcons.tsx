import type { ReactNode, SVGProps } from 'react'

type IconProps = { size?: number }

/** Le cadre commun à toutes les icônes dessinées à la main (24×24, couleur du texte). */
function Glyph({ size, children, ...rest }: IconProps & SVGProps<SVGSVGElement> & { children: ReactNode }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" aria-hidden="true" {...rest}>
      {children}
    </svg>
  )
}

/** Icône au trait (comme celles de la bibliothèque Lucide). */
const line = { fill: 'none', stroke: 'currentColor', strokeWidth: 2, strokeLinecap: 'round', strokeLinejoin: 'round' } as const

/** GitHub et GitLab : les logos au trait que Lucide dessinait avant sa version 1. */
export function Github({ size = 18 }: IconProps) {
  return (
    <Glyph size={size} {...line}>
      <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
      <path d="M9 18c-4.51 2-5-2-7-2" />
    </Glyph>
  )
}

export function Gitlab({ size = 18 }: IconProps) {
  return (
    <Glyph size={size} {...line}>
      <path d="m22 13.29-3.33-10a.42.42 0 0 0-.14-.18.38.38 0 0 0-.22-.11.39.39 0 0 0-.23.07.42.42 0 0 0-.14.18l-2.26 6.67H8.32L6.1 3.26a.42.42 0 0 0-.1-.18.38.38 0 0 0-.26-.08.39.39 0 0 0-.23.07.42.42 0 0 0-.14.18L2 13.29a.74.74 0 0 0 .27.83L12 21l9.69-6.88a.71.71 0 0 0 .31-.83Z" />
    </Glyph>
  )
}

/** TikTok (absent de Lucide), dessiné à la main. */
export function TikTok({ size = 18 }: IconProps) {
  return (
    <Glyph size={size} fill="currentColor">
      <path d="M16.6 3c.4 2.1 1.7 3.6 3.9 3.8v3a7.4 7.4 0 0 1-3.9-1.2v6.2A5.8 5.8 0 1 1 10.8 9v3.1a2.8 2.8 0 1 0 2.8 2.8V3h3z" />
    </Glyph>
  )
}

/** ComeUp (plateforme de freelances) : un « C » ouvert, dessiné à la main. */
export function ComeUp({ size = 18 }: IconProps) {
  return (
    <Glyph size={size} {...line} strokeWidth={2.6} strokeLinejoin={undefined}>
      <path d="M17.5 7.2A7 7 0 1 0 17.5 16.8" />
      <circle cx="18.6" cy="12" r="1.3" fill="currentColor" stroke="none" />
    </Glyph>
  )
}

/** Le vrai logo WhatsApp. Sans taille, c'est le CSS qui la décide. */
export function WhatsApp({ size }: IconProps) {
  return (
    <Glyph size={size} fill="currentColor">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
    </Glyph>
  )
}
