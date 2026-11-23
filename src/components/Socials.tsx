import { Github, Gitlab } from 'lucide-react'
import { site } from '../data/content'

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
