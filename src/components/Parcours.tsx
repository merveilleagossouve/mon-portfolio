import { useRef } from 'react'
import { Briefcase, Code2, GraduationCap, MapPinned, Sparkles } from 'lucide-react'
import { gsap } from '../lib/gsap'
import { stages, type Content, type Lane } from '../data/content'
import { useI18n } from '../i18n/LanguageContext'
import { useScrollScene } from '../hooks/useMotion'
import SectionHead from './SectionHead'

const ICON = { commun: GraduationCap, territoire: MapPinned, code: Code2 }

type ParcoursItem = Content['parcours']['items'][number]

function Station({ item }: { item: ParcoursItem }) {
  const Icon = item.years === '2026' ? Sparkles : ICON[item.lane]
  return (
    <article className={`station station--${item.lane}`}>
      <span className="station__dot" aria-hidden="true" />
      <div className="station__card">
        <p className="station__years mono">
          <Icon size={14} /> {item.years}
        </p>
        <h3>{item.title}</h3>
        <p className="station__place mono">{item.place}</p>
        {item.text && <p className="station__text">{item.text}</p>}
      </div>
    </article>
  )
}

export default function Parcours() {
  const { c } = useI18n()
  const parcours = c.parcours.items
  const ref = useRef<HTMLDivElement>(null)
  const byLane = (lane: Lane) => parcours.filter((p) => p.lane === lane)
  const [start, end] = [byLane('commun')[0], byLane('commun')[1]]

  // Les chemins se dessinent pendant qu'on descend
  useScrollScene(ref, (el) => {
    const tl = gsap.timeline({
      scrollTrigger: { trigger: el, start: 'top 70%', end: 'bottom 75%', scrub: 0.6 },
      defaults: { ease: 'none' },
    })
    gsap.utils.toArray<HTMLElement>('.metro__seg', el).forEach((seg) => {
      const at = Number(seg.dataset.step ?? 0)
      if (seg instanceof SVGPathElement) {
        tl.fromTo(seg, { strokeDashoffset: 1 }, { strokeDashoffset: 0, duration: 1 }, at)
      } else {
        tl.fromTo(seg, { scaleY: 0 }, { scaleY: 1, duration: 1 }, at)
      }
    })
    gsap.utils.toArray<HTMLElement>('.station, .stages', el).forEach((s) => {
      gsap.from(s, {
        opacity: 0,
        y: 40,
        duration: 0.9,
        ease: 'expo.out',
        scrollTrigger: { trigger: s, start: 'top 85%' },
      })
    })
  })

  return (
    <section className="section parcours" id="parcours">
      <div className="container">
        <SectionHead copy={c.parcours} />

        <div className="metro" ref={ref}>
          {start && (
            <div className="metro__row metro__row--center">
              <Station item={start} />
              <span className="metro__seg metro__line metro__line--center" data-step="0" />
            </div>
          )}

          <svg className="metro__curve" viewBox="0 0 1040 90" preserveAspectRatio="none" aria-hidden="true">
            <path data-step="1" className="metro__seg metro__path--terr" d="M520 0 C520 55, 260 35, 260 90" pathLength={1} />
            <path data-step="1" className="metro__seg metro__path--code" d="M520 0 C520 55, 780 35, 780 90" pathLength={1} />
          </svg>

          <div className="metro__row metro__row--lanes">
            <span className="metro__seg metro__line metro__line--terr" data-step="2" />
            <span className="metro__seg metro__line metro__line--code" data-step="2" />
            {byLane('territoire').map((p) => (
              <Station key={p.title} item={p} />
            ))}
            {byLane('code').map((p) => (
              <Station key={p.title} item={p} />
            ))}
          </div>

          <div className="metro__row metro__row--stages">
            <span className="metro__line metro__line--terr is-static" />
            <span className="metro__line metro__line--code is-static" />
            <div className="stages">
              <p className="stages__head mono">
                <Briefcase size={14} /> {c.parcours.stages}
              </p>
              <ul>
                {stages.map((s) => (
                  <li key={s.company} className="stage">
                    <span className="stage__logo">
                      <img src={s.logo} alt={`Logo ${s.full ?? s.company}`} loading="lazy" />
                    </span>
                    <span className="stage__name">{s.company}</span>
                    {s.full && <span className="stage__full">{s.full}</span>}
                    <span className="stage__role mono">{c.parcours.roleStage}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <svg className="metro__curve" viewBox="0 0 1040 90" preserveAspectRatio="none" aria-hidden="true">
            <path data-step="3" className="metro__seg metro__path--terr" d="M260 0 C260 55, 520 35, 520 90" pathLength={1} />
            <path data-step="3" className="metro__seg metro__path--code" d="M780 0 C780 55, 520 35, 520 90" pathLength={1} />
          </svg>

          {end && (
            <div className="metro__row metro__row--center metro__row--end">
              <Station item={end} />
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
