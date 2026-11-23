import { useRef } from 'react'
import { BookOpen, Clapperboard, Music2, Shirt } from 'lucide-react'
import { useI18n } from '../i18n/LanguageContext'
import { usePointer } from '../hooks/useMotion'
import SectionHead from './SectionHead'

const ICONS = [Shirt, BookOpen, Music2, Clapperboard]

export default function HorsEcran() {
  const { c } = useI18n()
  const fieldRef = useRef<HTMLDivElement>(null)

  // Les étiquettes s'écartent doucement de la souris
  const tagsOf = (field: HTMLElement) => field.querySelectorAll<HTMLElement>('.tag')
  usePointer(
    fieldRef,
    (e, field) =>
      tagsOf(field).forEach((tag) => {
        const r = tag.getBoundingClientRect()
        const dx = r.left + r.width / 2 - e.clientX
        const dy = r.top + r.height / 2 - e.clientY
        const d = Math.hypot(dx, dy)
        const force = Math.max(0, 1 - d / 220) * 38
        tag.style.setProperty('--px', `${(dx / (d || 1)) * force}px`)
        tag.style.setProperty('--py', `${(dy / (d || 1)) * force}px`)
      }),
    (field) =>
      tagsOf(field).forEach((tag) => {
        tag.style.setProperty('--px', '0px')
        tag.style.setProperty('--py', '0px')
      }),
  )

  return (
    <section className="section hors" id="hors-ecran">
      <div className="container">
        <SectionHead copy={c.horsEcran} />

        <div className="hors__grid">
          <article className="biz" data-reveal>
            <p className="mono biz__kicker">{c.horsEcran.kicker}</p>
            <div className="biz__brand">
              <span className="biz__logo">
                <img src="/marche-et-style.webp" alt="" width={320} height={320} />
              </span>
              <h3 className="biz__name">
                {c.horsEcran.business.name.split('&').map((part, i) => (
                  <span key={i}>
                    {i > 0 && <em>&amp;</em>}
                    {part.trim()}
                  </span>
                ))}
              </h3>
            </div>
            <p>{c.horsEcran.business.text}</p>
            <div className="biz__steps" aria-hidden="true">
              {Array.from({ length: 7 }, (_, i) => (
                <span key={i} style={{ animationDelay: `${i * 0.35}s` }} />
              ))}
            </div>
          </article>

          <div className="hors__field" ref={fieldRef}>
            <p className="mono hors__label">{c.horsEcran.hobbiesLabel}</p>
            {c.horsEcran.hobbies.map((h, i) => {
              const Icon = ICONS[i % ICONS.length]
              return (
                <span key={h} className={`tag tag--${i}`} style={{ animationDelay: `${i * -1.4}s` }}>
                  <Icon size={18} /> {h}
                </span>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
