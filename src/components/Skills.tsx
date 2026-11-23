import { useRef, useState } from 'react'
import { gsap } from '../lib/gsap'
import { type SkillSide } from '../data/content'
import { useI18n } from '../i18n/LanguageContext'
import { useChangeAnimation, useScrollScene } from '../hooks/useMotion'
import SectionHead from './SectionHead'

const LINES: SkillSide[] = ['code', 'territoire']

/**
 * Compétences façon maison de couture : deux collections,
 * chaque compétence est une étiquette suspendue à un portant doré.
 */
export default function Skills() {
  const { lang, c } = useI18n()
  const [line, setLine] = useState<SkillSide>('code')
  const rackRef = useRef<HTMLUListElement>(null)
  const sectionRef = useRef<HTMLElement>(null)

  const items = c.skills.items.filter((s) => s.side === line)
  const count = (side: SkillSide) => c.skills.items.filter((s) => s.side === side).length

  // À l'arrivée dans la section : les étiquettes tombent une à une sur le portant
  useScrollScene(
    sectionRef,
    () => {
      gsap
        .timeline({ scrollTrigger: { trigger: '.rack', start: 'top 80%' } })
        .from('.lines > *', { y: 20, opacity: 0, duration: 0.7, stagger: 0.1, ease: 'power3.out', clearProps: 'all' })
        .from('.htag__card', { y: -40, rotate: -8, opacity: 0, duration: 0.9, stagger: 0.06, ease: 'back.out(1.8)', clearProps: 'all' }, 0.2)
    },
    [lang],
  )

  // Quand on change de collection, les nouvelles étiquettes se balancent en arrivant
  useChangeAnimation(() => {
    const rack = rackRef.current
    if (!rack) return
    gsap.fromTo(
      rack.querySelectorAll('.htag__card'),
      { rotate: 10, y: -18, opacity: 0 },
      { rotate: 0, y: 0, opacity: 1, duration: 1, stagger: 0.05, ease: 'elastic.out(1, 0.45)', clearProps: 'all' },
    )
  }, [line])

  return (
    <section className="section skills" id="competences" ref={sectionRef}>
      <div className="container">
        <SectionHead copy={c.skills} />

        <div className="lines" role="tablist" aria-label={c.skills.meta}>
          {LINES.map((side) => (
            <button
              key={side}
              type="button"
              role="tab"
              aria-selected={line === side}
              aria-controls="rack-list"
              className={`line ${line === side ? 'is-active' : ''}`}
              onClick={() => setLine(side)}
            >
              <span className="line__name">{c.skills.labels[side]}</span>
              <span className="line__count mono">
                {String(count(side)).padStart(2, '0')} {c.skills.pieces}
              </span>
            </button>
          ))}
        </div>

        <div className="rack">
          <ul className="rack__list" id="rack-list" role="tabpanel" ref={rackRef} aria-label={c.skills.labels[line]}>
            {items.map((s, i) => (
              <li key={s.name} className="htag" style={{ ['--i' as string]: i }}>
                <span className="htag__string" aria-hidden="true" />
                <div className="htag__card">
                  <span className="htag__hole" aria-hidden="true" />
                  <span className="htag__ref mono">N° {String(i + 1).padStart(2, '0')}</span>
                  <h3 className="htag__name">{s.name}</h3>
                  <span className="htag__rule" aria-hidden="true" />
                  <p className="htag__note">{s.note}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}
