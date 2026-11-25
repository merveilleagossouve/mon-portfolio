import { site } from '../data/content'

/**
 * GitHub et GitLab : les logos au trait, tels que la bibliothèque Lucide les dessinait
 * (elle a retiré les logos de marques dans sa version 1).
 */
function Github({ size = 18 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
      <path d="M9 18c-4.51 2-5-2-7-2" />
    </svg>
  )
}

function Gitlab({ size = 18 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="m22 13.29-3.33-10a.42.42 0 0 0-.14-.18.38.38 0 0 0-.22-.11.39.39 0 0 0-.23.07.42.42 0 0 0-.14.18l-2.26 6.67H8.32L6.1 3.26a.42.42 0 0 0-.1-.18.38.38 0 0 0-.26-.08.39.39 0 0 0-.23.07.42.42 0 0 0-.14.18L2 13.29a.74.74 0 0 0 .27.83L12 21l9.69-6.88a.71.71 0 0 0 .31-.83Z" />
    </svg>
  )
}

/** Le logo TikTok (absent de la bibliothèque d'icônes), dessiné à la main. */
function TikTok({ size = 18 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M16.6 3c.4 2.1 1.7 3.6 3.9 3.8v3a7.4 7.4 0 0 1-3.9-1.2v6.2A5.8 5.8 0 1 1 10.8 9v3.1a2.8 2.8 0 1 0 2.8 2.8V3h3z" />
    </svg>
  )
}

/** ComeUp (plateforme de freelances) : un « C » ouvert, dessiné à la main. */
function ComeUp({ size = 18 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" aria-hidden="true">
      <path d="M17.5 7.2A7 7 0 1 0 17.5 16.8" />
      <circle cx="18.6" cy="12" r="1.3" fill="currentColor" stroke="none" />
    </svg>
  )
}

const LIST = [
  { key: 'github', label: 'GitHub', Icon: Github },
  { key: 'gitlab', label: 'GitLab', Icon: Gitlab },
  { key: 'tiktok', label: 'TikTok', Icon: TikTok },
  { key: 'comeup', label: 'ComeUp', Icon: ComeUp },
] as const

/** Les liens vers mes réseaux. Seuls ceux remplis dans content.ts s'affichent. */
export default function Socials({ className = '' }: { className?: string }) {
  const links = LIST.filter((l) => site.socials[l.key])
  if (!links.length) return null
  return (
    <ul className={`socials ${className}`}>
      {links.map(({ key, label, Icon }) => (
        <li key={key}>
          <a className={`social--${key}`} href={site.socials[key]} target="_blank" rel="noreferrer" aria-label={label} title={label}>
            <Icon size={18} />
          </a>
        </li>
      ))}
    </ul>
  )
}
