import { useRef } from 'react'
import { gsap } from '../lib/gsap'
import { site } from '../data/content'
import { useI18n } from '../i18n/LanguageContext'
import { usePointer, useScrollScene } from '../hooks/useMotion'

/** Petites paillettes dorées qui flottent sur l'écran de la tablette. */
const DUST = Array.from({ length: 22 }, (_, i) => ({
  left: `${(i * 37) % 100}%`,
  top: `${(i * 53) % 100}%`,
  size: 2 + ((i * 7) % 4),
  delay: `${-((i * 1.3) % 9)}s`,
  dur: `${8 + ((i * 5) % 7)}s`,
}))

export default function About() {
  const { c } = useI18n()
  const sectionRef = useRef<HTMLElement>(null)
  const tiltRef = useRef<HTMLDivElement>(null)

  useScrollScene(sectionRef, () => {
    // La tablette arrive penchée (comme sur l'image) et se redresse en descendant
    gsap.fromTo(
      '.tablet',
      { rotateX: 24, rotateY: -16, rotateZ: -9, scale: 0.86, y: 60 },
      {
        rotateX: 6,
        rotateY: -5,
        rotateZ: -3,
        scale: 1,
        y: 0,
        ease: 'none',
        scrollTrigger: { trigger: '.tablet-stage', start: 'top 95%', end: 'center 55%', scrub: 1 },
      },
    )

    const tl = gsap.timeline({ scrollTrigger: { trigger: '.tablet-stage', start: 'top 55%' } })
    tl.from('.tablet__photo', { clipPath: 'inset(0% 100% 0% 0%)', duration: 1.4, ease: 'expo.out' })
      .from('.tablet__photo img', { scale: 1.3, duration: 2, ease: 'expo.out' }, 0)
      .from('.mag-title__line > span', { yPercent: 120, duration: 1.2, stagger: 0.14, ease: 'expo.out' }, 0.25)
      .from('.tablet__letter p', { y: 24, opacity: 0, duration: 0.9, stagger: 0.12, ease: 'power3.out' }, 0.7)
      .fromTo('.tablet__gloss', { xPercent: -160 }, { xPercent: 160, duration: 1.8, ease: 'power2.inOut' }, 0.4)
      .fromTo(
        '.mag-sign__text',
        { clipPath: 'inset(-30% 100% -30% 0%)' },
        { clipPath: 'inset(-30% 0% -30% 0%)', duration: 2.2, ease: 'power2.inOut' },
        1.1,
      )
      .from('.mag-sign__dash', { scaleX: 0, transformOrigin: 'left', duration: 0.8, ease: 'power3.out' }, 1)
  })

  // La tablette suit légèrement la souris, et le reflet se déplace
  usePointer(
    tiltRef,
    (e, el) => {
      const r = el.getBoundingClientRect()
      const x = (e.clientX - r.left) / r.width
      const y = (e.clientY - r.top) / r.height
      el.style.setProperty('--mx', `${((x - 0.5) * 7).toFixed(2)}deg`)
      el.style.setProperty('--my', `${((0.5 - y) * 5).toFixed(2)}deg`)
      el.style.setProperty('--gx', `${(x * 100).toFixed(1)}%`)
      el.style.setProperty('--gy', `${(y * 100).toFixed(1)}%`)
    },
    (el) => {
      el.style.setProperty('--mx', '0deg')
      el.style.setProperty('--my', '0deg')
    },
  )

  return (
    <section className="section about is-dark" id="a-propos" ref={sectionRef}>
      <div className="about__glow" aria-hidden="true" />
      <div className="container">
        <p className="section-head__meta mono">{c.about.meta}</p>

        <div className="tablet-stage">
          <div className="tablet-tilt" ref={tiltRef}>
            <div className="tablet">
              <div className="tablet__screen">
                <div className="tablet__photo">
                  {site.photo && <img src={site.photo} alt={c.about.portraitAlt} />}
                </div>

                <div className="tablet__copy">
                  <h2 className="mag-title">
                    <span className="mag-title__line">
                      <span>{site.firstName}</span>
                    </span>
                    <span className="mag-title__line mag-title__line--gold">
                      <span>{site.lastName}</span>
                    </span>
                    <span className="mag-title__line mag-title__line--small">
                      <span>{c.about.terrainCode}</span>
                    </span>
                  </h2>

                  <div className="tablet__letter">
                    {c.about.intro.map((p, i) => (
                      <p key={i}>{p}</p>
                    ))}
                  </div>

                  <p className="mag-sign" aria-label={c.about.signed}>
                    <span className="mag-sign__dash" aria-hidden="true" />
                    <span className="mag-sign__text" aria-hidden="true">
                      {site.firstName}
                    </span>
                  </p>
                </div>

                <div className="tablet__dust" aria-hidden="true">
                  {DUST.map((d, i) => (
                    <i
                      key={i}
                      style={{
                        left: d.left,
                        top: d.top,
                        width: d.size,
                        height: d.size,
                        animationDelay: d.delay,
                        animationDuration: d.dur,
                      }}
                    />
                  ))}
                </div>
                <span className="tablet__glare" aria-hidden="true" />
                <span className="tablet__gloss" aria-hidden="true" />
              </div>
              <span className="tablet__camera" aria-hidden="true" />
            </div>
            <span className="tablet__shadow" aria-hidden="true" />
          </div>
        </div>

      </div>
    </section>
  )
}
