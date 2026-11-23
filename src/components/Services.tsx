import { useRef, useState } from 'react'
import {
  ArrowUpRight,
  ClipboardList,
  PenTool,
  RefreshCw,
  Wrench,
  Globe,
  LayoutDashboard,
  LandPlot,
  Map,
  Monitor,
  MousePointerClick,
  ShoppingBag,
  Smartphone,
  type LucideIcon,
} from 'lucide-react'
import { gsap } from '../lib/gsap'
import { type Content } from '../data/content'
import { useI18n } from '../i18n/LanguageContext'
import { useChangeAnimation, useScrollScene } from '../hooks/useMotion'

type Service = Content['services']['items'][number]

/** Les icônes restent les mêmes dans les deux langues, dans le même ordre. */
const ICONS: LucideIcon[] = [
  Globe,
  Monitor,
  MousePointerClick,
  ShoppingBag,
  LayoutDashboard,
  PenTool,
  RefreshCw,
  Wrench,
  Map,
  ClipboardList,
  LandPlot,
]

function Detail({ s }: { s: Service }) {
  const { c } = useI18n()
  return (
    <>
      <p className="svc-detail__top mono">{c.services.labels[s.side]}</p>
      <h3 className="svc-detail__title">{s.title}</h3>
      <p className="svc-detail__text">{s.text}</p>
      <ul className="svc-detail__gets">
        {s.gets.map((g) => (
          <li key={g}>{g}</li>
        ))}
      </ul>
    </>
  )
}

export default function Services() {
  const { lang, c } = useI18n()
  const services = c.services.items
  const [active, setActive] = useState(0)
  const sectionRef = useRef<HTMLElement>(null)
  const panelRef = useRef<HTMLDivElement>(null)

  // Entrée : les touches tombent une à une et s'enfoncent en se posant
  useScrollScene(sectionRef, () => {
    gsap
      .timeline({ scrollTrigger: { trigger: '.keys', start: 'top 75%' } })
      .from('.key', { y: -70, opacity: 0, duration: 0.7, stagger: 0.09, ease: 'back.out(1.6)', clearProps: 'transform,opacity' })
      .from('.svc-detail, .svc-note', { y: 20, opacity: 0, duration: 0.8, stagger: 0.1, ease: 'power3.out' }, 0.3)
    gsap.from('.svc-title > *', {
      yPercent: 60,
      opacity: 0,
      duration: 1.1,
      stagger: 0.12,
      ease: 'expo.out',
      scrollTrigger: { trigger: '.svc-title', start: 'top 80%' },
    })
    gsap.from('.svc-glow', {
      scaleX: 0,
      duration: 1.4,
      ease: 'expo.out',
      scrollTrigger: { trigger: '.svc-title', start: 'top 80%' },
    })
  })

  // Le panneau change en douceur quand on appuie sur une autre touche
  useChangeAnimation(() => {
    if (!panelRef.current) return
    gsap.fromTo(panelRef.current.children, { y: 12, opacity: 0 }, { y: 0, opacity: 1, duration: 0.45, stagger: 0.05, ease: 'power2.out' })
  }, [active, lang])

  return (
    <section className="section services is-dark" id="services" ref={sectionRef}>
      <div className="container">
        <p className="section-head__meta mono">{c.services.meta}</p>

        <div className="services__grid">
          <div className="services__side">
            <h2 className="svc-title">
              <span className="svc-title__script">{c.services.scriptTitle}</span>
              <span className="svc-title__main">{c.services.mainTitle}</span>
            </h2>
            <span className="svc-glow" aria-hidden="true" />
            <p className="svc-intro">
              {c.services.introBefore}
              <em>{c.services.introWord}</em>
              {c.services.introAfter}
            </p>

            <div className="svc-detail" ref={panelRef} aria-live="polite">
              <Detail s={services[active]} />
            </div>

            <a href="#contact" className="svc-cta">
              {c.services.cta} <ArrowUpRight size={17} />
            </a>
          </div>

          <div className="keys">
            <ul className="keys__tilt">
              {services.map((s, i) => {
                const Icon = ICONS[i]
                return (
                  <li key={s.title} className="keys__row" style={{ ['--i' as string]: i }}>
                    <button
                      type="button"
                      className={`key ${i === active ? 'is-active' : ''}`}
                      aria-pressed={i === active}
                      onClick={() => setActive(i)}
                      onPointerEnter={(e) => e.pointerType === 'mouse' && setActive(i)}
                      onFocus={() => setActive(i)}
                    >
                      <span className="key__icon">
                        <Icon size={24} strokeWidth={2.1} />
                      </span>
                      <span className="key__label">{s.title}</span>
                      <span className="key__side mono">{c.services.keys[s.side]}</span>
                    </button>
                    {/* Sur téléphone, le détail s'ouvre juste sous la touche */}
                    {i === active && (
                      <div className="key__more">
                        <Detail s={s} />
                      </div>
                    )}
                  </li>
                )
              })}
            </ul>
            <p className="svc-note">
              <Smartphone size={16} /> {c.services.note}
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
