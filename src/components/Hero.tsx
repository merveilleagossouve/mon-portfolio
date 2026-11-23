import { useEffect, useRef } from 'react'
import { ArrowDown, ArrowUpRight, MapPin } from 'lucide-react'
import { gsap, ScrollTrigger } from '../lib/gsap'
import { site } from '../data/content'
import { useI18n } from '../i18n/LanguageContext'
import { prefersReducedMotion } from '../lib/env'
import { usePointer } from '../hooks/useMotion'
import Magnetic from './Magnetic'

export default function Hero() {
  const { c } = useI18n()
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const section = sectionRef.current
    if (!section) return
    const q = gsap.utils.selector(section)

    // Le menu passe en sombre tant que l'accueil est à l'écran
    const dark = ScrollTrigger.create({
      trigger: section,
      start: 'top 80px',
      end: 'bottom 80px',
      onToggle: (self) => document.body.classList.toggle('hero-dark', self.isActive),
    })
    document.body.classList.toggle('hero-dark', window.scrollY < 10)

    if (prefersReducedMotion()) {
      section.classList.add('is-static')
      return () => {
        dark.kill()
        document.body.classList.remove('hero-dark')
      }
    }

    const ctx = gsap.context(() => {
      // 1. Ouverture : le rayon descend, l'horizon s'éclaire, le texte arrive
      gsap
        .timeline({ delay: 0.2 })
        .from(q('.beam'), { scaleY: 0, transformOrigin: '50% 0%', duration: 1.4, ease: 'power3.inOut' })
        .from(q('.horizon__rim'), { scaleX: 0, opacity: 0, duration: 1.4, ease: 'expo.out' }, 1.05)
        .from(q('.horizon__glow'), { opacity: 0, duration: 1.6, ease: 'power2.out' }, 1.1)
        .from(q('.opening__kicker'), { y: 16, opacity: 0, duration: 0.8, ease: 'power3.out' }, 1.2)
        .from(q('.opening__name > span > span'), { yPercent: 110, duration: 1.2, stagger: 0.12, ease: 'expo.out' }, 1.3)
        .from(q('.opening__lead, .opening__actions'), { y: 20, opacity: 0, stagger: 0.12, duration: 0.9, ease: 'power3.out' }, 1.7)
        .from(q('.hero__scroll'), { opacity: 0, duration: 0.8 }, 2.2)

      // 2. En descendant : le texte s'éloigne doucement, la lumière s'éteint
      gsap
        .timeline({ defaults: { ease: 'none' }, scrollTrigger: { trigger: section, start: 'top top', end: 'bottom top', scrub: 0.6 } })
        .to(q('.opening'), { yPercent: -18, opacity: 0 }, 0)
        .to(q('.beam, .horizon'), { opacity: 0.2 }, 0)
        .to(q('.hero__scroll'), { opacity: 0, duration: 0.3 }, 0)
    }, section)

    return () => {
      ctx.revert()
      dark.kill()
      document.body.classList.remove('hero-dark')
    }
  }, [])

  // Le rayon réagit doucement à la souris
  usePointer(sectionRef, (e, section) => {
    section.style.setProperty('--mx', (e.clientX / window.innerWidth - 0.5).toFixed(3))
    section.style.setProperty('--my', (e.clientY / window.innerHeight - 0.5).toFixed(3))
  })

  const [firstLine, secondLine] = c.site.title.split(' & ')

  return (
    <section className="hero is-dark" id="accueil" ref={sectionRef}>
      <div className="hero__stage">
        {/* Le décor : un rayon de lumière qui tombe sur l'horizon */}
        <div className="beam" aria-hidden="true" />
        <div className="horizon" aria-hidden="true">
          <span className="horizon__glow" />
          <span className="horizon__rim" />
        </div>
        <div className="opening">
          <p className="opening__kicker mono">
            <MapPin size={13} /> {c.site.country}
          </p>
          <h1 className="opening__name">
            <span>
              <span>{site.firstName}</span>
            </span>
            <span>
              <span className="t-gold">{site.lastName}</span>
            </span>
          </h1>
          <p className="opening__lead">
            {firstLine} <i>&amp;</i> {secondLine}.
            <br />
            {c.site.tagline}
          </p>
          <div className="opening__actions">
            <Magnetic>
              <a href="#projets" className="btn hero-btn hero-btn--gold">
                {c.ui.seeProjects} <ArrowUpRight size={18} />
              </a>
            </Magnetic>
            <Magnetic>
              <a href="#contact" className="btn hero-btn hero-btn--line">
                {c.ui.contactMe}
              </a>
            </Magnetic>
          </div>
        </div>

        <a href="#a-propos" className="hero__scroll mono" aria-label={c.ui.scrollDown}>
          <ArrowDown size={14} />
        </a>
      </div>
    </section>
  )
}
