import { site } from '../data/content'
import { ComeUp, Github, Gitlab, TikTok } from './BrandIcons'
import ExternalLink from './ExternalLink'

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
          <ExternalLink className={`social--${key}`} href={site.socials[key]} aria-label={label} title={label}>
            <Icon size={18} />
          </ExternalLink>
        </li>
      ))}
    </ul>
  )
}
