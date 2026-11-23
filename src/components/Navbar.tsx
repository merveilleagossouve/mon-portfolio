import { useEffect, useState } from 'react'
import { site } from '../data/content'
import { useI18n } from '../i18n/LanguageContext'
import LanguageSwitch from './LanguageSwitch'

export default function Navbar() {
  const { c } = useI18n()
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  const links = [
    { href: '#a-propos', label: c.nav.about },
    { href: '#parcours', label: c.nav.parcours },
    { href: '#competences', label: c.nav.skills },
    { href: '#projets', label: c.nav.projects },
    { href: '#services', label: c.nav.services },
    { href: '#hors-ecran', label: c.nav.horsEcran },
    { href: '#contact', label: c.nav.contact },
  ]

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    document.documentElement.classList.toggle('menu-open', open)
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false)
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open])

  return (
    <header className={`nav ${scrolled ? 'is-scrolled' : ''} ${open ? 'is-open' : ''}`}>
      <div className="container nav__inner">
        <a href="#accueil" className="nav__logo" aria-label={c.ui.backHome}>
          <span className="monogram" aria-hidden="true">
            <span className="monogram__t">{site.initials[0]}</span>
            <span className="monogram__c">{site.initials[1]}</span>
          </span>
          <span className="nav__name">
            {site.firstName} <b>{site.lastName}</b>
          </span>
        </a>

        <nav className="nav__links" aria-label={c.ui.mainNav}>
          {links.map((l) => (
            <a key={l.href} href={l.href} onClick={() => setOpen(false)}>
              {l.label}
            </a>
          ))}
        </nav>

        <div className="nav__tools">
          <LanguageSwitch />
          <button
            className="nav__burger"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-label={open ? c.ui.closeMenu : c.ui.openMenu}
          >
            <span />
            <span />
          </button>
        </div>
      </div>
    </header>
  )
}
