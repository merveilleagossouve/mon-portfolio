import { useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import { ArrowLeft, ArrowRight, ArrowUpRight, Eye, FolderOpen, Maximize2, Users, X } from 'lucide-react'
import { gsap } from '../lib/gsap'
import { type Project } from '../data/content'
import { useI18n } from '../i18n/LanguageContext'
import { usePointer } from '../hooks/useMotion'
import SectionHead from './SectionHead'
import { FoodStoreMock, VigiBatMock } from './ProjectMocks'

/** La capture en grand, par-dessus le site. Un clic ou la touche Échap la referme. */
function Lightbox({ src, alt, onClose }: { src: string; alt: string; onClose: () => void }) {
  const { c } = useI18n()
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && onClose()
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [onClose])
  return createPortal(
    <div className="lightbox" role="dialog" aria-modal="true" aria-label={alt} onClick={onClose}>
      <img src={src} alt={alt} />
      <button type="button" className="lightbox__close" aria-label={c.projects.close} autoFocus>
        <X size={20} />
      </button>
    </div>,
    document.body,
  )
}

/** L'aperçu au verso : la vraie capture si elle existe, sinon une maquette. */
function Preview({ project, interactive }: { project: Project; interactive: boolean }) {
  const { c } = useI18n()
  const [zoom, setZoom] = useState(false)
  const alt = `${c.projects.previewAlt}${project.name}`
  return (
    <div className={`pshot ${project.image ? 'pshot--img' : ''}`}>
      <div className="pshot__chrome">
        <span className="pshot__dots" aria-hidden="true">
          <i />
          <i />
          <i />
        </span>
        <span className="pshot__url">{project.name}</span>
        {!project.image && <span className="pshot__tag">{c.projects.mockTag}</span>}
        {project.link && (
          <a
            className="pshot__visit"
            href={project.link}
            target="_blank"
            rel="noreferrer"
            tabIndex={interactive ? 0 : -1}
          >
            {c.projects.visit} <ArrowUpRight size={12} />
          </a>
        )}
      </div>
      <div className="pshot__screen">
        {project.image ? (
          <button type="button" className="pshot__zoom" onClick={() => setZoom(true)} tabIndex={interactive ? 0 : -1}>
            {/* largeur et hauteur : la place de l'image est réservée avant même qu'elle se charge */}
            <img src={project.image} alt={alt} width={1360} height={640} loading="lazy" />
            <span className="pshot__zoom-hint" aria-hidden="true">
              <Maximize2 size={12} /> {c.projects.enlarge}
            </span>
          </button>
        ) : project.mock === 'foodstore' ? (
          <FoodStoreMock />
        ) : project.mock === 'vigibat' ? (
          <VigiBatMock />
        ) : null}
      </div>
      {zoom && project.image && <Lightbox src={project.image} alt={alt} onClose={() => setZoom(false)} />}
    </div>
  )
}

function ProjectCard({ project }: { project: Project }) {
  const { c } = useI18n()
  const [flipped, setFlipped] = useState(false)
  const tiltRef = useRef<HTMLDivElement>(null)
  const previewLabel = project.previewLabel ?? c.projects.preview

  // La carte penche vers la souris, et son reflet la suit
  usePointer(
    tiltRef,
    (e, el) => {
      const r = el.getBoundingClientRect()
      const px = (e.clientX - r.left) / r.width
      const py = (e.clientY - r.top) / r.height
      el.style.setProperty('--rx', `${(0.5 - py) * 10}deg`)
      el.style.setProperty('--ry', `${(px - 0.5) * 12}deg`)
      el.style.setProperty('--gx', `${px * 100}%`)
      el.style.setProperty('--gy', `${py * 100}%`)
    },
    (el) => {
      el.style.setProperty('--rx', '0deg')
      el.style.setProperty('--ry', '0deg')
    },
  )

  return (
    <div className="pcard-tilt" ref={tiltRef}>
      <article className={`pcard ${flipped ? 'is-flipped' : ''}`} aria-label={project.name}>
        {/* Recto : le projet expliqué (le problème, puis la solution) */}
        <div className="pcard__face pcard__face--terr" aria-hidden={flipped}>
          <header className="pcard__top mono">
            <span className="pcard__side">
              <FolderOpen size={14} /> {project.kind}
            </span>
          </header>
          <h3 className="pcard__name">{project.name}</h3>
          <div className="pcard__badges">
            {project.status && <span className="badge badge--live">{project.status}</span>}
            {project.team && (
              <span className="badge">
                <Users size={13} /> {c.projects.team}
              </span>
            )}
          </div>
          {project.role && project.team && <p className="pcard__role mono">{c.projects.myRole} {project.role}</p>}
          <div className="pcard__block">
            <p className="pcard__label mono">{c.projects.problem}</p>
            <p className="pcard__text">{project.problem}</p>
          </div>
          <div className="pcard__block">
            <p className="pcard__label pcard__label--code mono">{c.projects.solution}</p>
            <p className="pcard__text">{project.solution}</p>
          </div>
          <ul className="pcard__stack">
            {project.stack.map((s) => (
              <li key={s}>{s}</li>
            ))}
          </ul>
          <button
            className="pcard__flip"
            onClick={() => setFlipped(true)}
            tabIndex={flipped ? -1 : 0}
          >
            {previewLabel} <ArrowRight size={16} />
          </button>
        </div>

        {/* Verso : l'aperçu du projet */}
        <div className="pcard__face pcard__face--code" aria-hidden={!flipped}>
          <header className="pcard__top mono">
            <span className="pcard__side">
              <Eye size={14} /> {previewLabel}
            </span>
          </header>
          <h3 className="pcard__name">{project.name}</h3>
          <Preview project={project} interactive={flipped} />
          <div className="pcard__actions">
            <button
              className="pcard__flip"
              onClick={() => setFlipped(false)}
              tabIndex={flipped ? 0 : -1}
            >
              <ArrowLeft size={16} /> {c.projects.back}
            </button>
          </div>
        </div>
        <span className="pcard__glare" aria-hidden="true" />
      </article>
    </div>
  )
}

export default function Projects() {
  const { c } = useI18n()
  const sectionRef = useRef<HTMLElement>(null)
  const trackRef = useRef<HTMLDivElement>(null)
  const list = c.projects.items.filter((p) => p.visible)

  useEffect(() => {
    const section = sectionRef.current
    const track = trackRef.current
    if (!section || !track) return

    const mm = gsap.matchMedia()
    mm.add('(min-width: 900px) and (prefers-reduced-motion: no-preference)', () => {
      const distance = () => Math.max(0, track.scrollWidth - window.innerWidth + 48)
      const tween = gsap.to(track, {
        x: () => -distance(),
        ease: 'none',
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: () => `+=${distance()}`,
          pin: true,
          scrub: 0.8,
          invalidateOnRefresh: true,
          onUpdate: (self) => section.style.setProperty('--progress', String(self.progress)),
        },
      })
      return () => tween.kill()
    })
    return () => mm.revert()
  }, [])

  return (
    <section className="projects" id="projets" ref={sectionRef}>
      <div className="projects__track" ref={trackRef}>
        <div className="projects__intro">
          <SectionHead copy={c.projects} />
          <p>{c.projects.intro}</p>
          <p className="projects__hint mono">
            <span className="dot dot--terr" /> {c.projects.hintTerrain} <ArrowRight size={14} /> <span className="dot dot--code" /> {c.projects.hintCode}
          </p>
        </div>

        {list.map((p) => (
          <ProjectCard key={p.name} project={p} />
        ))}

        <a className="projects__next" href="#contact">
          <strong>
            {c.projects.nextA}
            <br />
            <em>{c.projects.nextB}</em>
          </strong>
          <span className="projects__next-cta">
            {c.projects.nextCta} <ArrowUpRight size={18} />
          </span>
        </a>
      </div>
      <div className="projects__progress" aria-hidden="true">
        <span />
      </div>
    </section>
  )
}
