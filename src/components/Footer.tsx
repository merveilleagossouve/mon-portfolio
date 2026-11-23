import { ArrowUpRight } from 'lucide-react'
import { site } from '../data/content'
import { useI18n } from '../i18n/LanguageContext'
import Magnetic from './Magnetic'
import Socials from './Socials'

/** Quelques courbes de niveau pour décorer le pied de page. */
const CONTOURS = Array.from({ length: 9 }, (_, k) => {
  const r = 40 + k * 34
  let d = ''
  for (let i = 0; i <= 72; i++) {
    const a = (i / 72) * Math.PI * 2
    const m = 1 + 0.08 * Math.sin(3 * a + k * 0.4) + 0.04 * Math.sin(5 * a - k * 0.3)
    d += `${i ? 'L' : 'M'}${(380 + Math.cos(a) * r * m * 1.2).toFixed(1)} ${(300 + Math.sin(a) * r * m).toFixed(1)}`
  }
  return d + 'Z'
})

export default function Footer() {
  const { c } = useI18n()

  return (
    <footer className="footer">
      <svg className="footer__contours" viewBox="0 0 760 600" aria-hidden="true">
        {CONTOURS.map((d, i) => (
          <path key={i} d={d} />
        ))}
      </svg>

      <div className="container footer__inner">
        <div className="footer__seal" aria-label={`${site.firstName} ${site.lastName}`}>
          <svg className="footer__ring" viewBox="0 0 200 200" aria-hidden="true">
            <defs>
              <path id="footer-ring" d="M100 100 m-78 0 a78 78 0 1 1 156 0 a78 78 0 1 1 -156 0" />
            </defs>
            <text>
              <textPath href="#footer-ring" textLength="486" lengthAdjust="spacing">
                {c.footer.ring}
              </textPath>
            </text>
          </svg>
          <span className="footer__initials" aria-hidden="true">
            {site.initials}
          </span>
        </div>

        <p className="footer__slogan">
          {c.footer.sloganA}
          <br />
          <em>{c.footer.sloganB}</em>
        </p>

        <Magnetic strength={0.25}>
          <a href="#contact" className="btn btn--primary footer__cta">
            {c.footer.cta} <ArrowUpRight size={18} />
          </a>
        </Magnetic>
        <p className="footer__note mono">
          <span className="live-dot" /> {c.footer.note}
        </p>

        <Socials className="footer__socials" />

        <p className="footer__copy mono">© {new Date().getFullYear()} {site.initials} · {c.footer.copy}</p>
      </div>
    </footer>
  )
}
