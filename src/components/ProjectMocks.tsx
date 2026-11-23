import { Camera, Check, HardHat, MapPin, Search, Star, Utensils, Wallet } from 'lucide-react'
import { useI18n } from '../i18n/LanguageContext'

/**
 * Maquettes dessinées en code, affichées au verso des projets qui n'ont pas encore de capture.
 * Dès que tu as une vraie capture, ajoute `image` au projet dans content.ts : elle remplace la maquette.
 */

export function FoodStoreMock() {
  const { c } = useI18n()
  const mock = c.mocks.food

  return (
    <div className="mock mock--food">
      <div className="mf__bar">
        <b>
          <Utensils /> FoodStore
        </b>
        <span>
          <MapPin /> Porto-Novo
        </span>
      </div>
      <div className="mf__search">
        <Search /> {mock.search}
      </div>
      <div className="mf__map">
        <svg viewBox="0 0 200 90" preserveAspectRatio="none">
          <path d="M0 55 C40 40 80 70 120 50 S180 30 200 42" />
          <path d="M60 0 L70 90" />
          <path d="M150 0 C140 40 160 60 145 90" />
        </svg>
        <i className="mf__me" style={{ left: '46%', top: '58%' }} />
        <i style={{ left: '30%', top: '38%' }} />
        <i style={{ left: '66%', top: '30%' }} />
        <i style={{ left: '78%', top: '70%' }} />
      </div>
      <p className="mf__title">{mock.title}</p>
      <ul className="mf__list">
        {mock.restos.map((r) => (
          <li key={r.name}>
            <span className="mf__thumb" />
            <span className="mf__info">
              <b>{r.name}</b>
              <small>
                {r.dish} · {r.price} {mock.currency}
              </small>
            </span>
            <span className="mf__meta">
              <small>
                <Star /> {r.note}
              </small>
              <small>{r.dist}</small>
            </span>
          </li>
        ))}
      </ul>
    </div>
  )
}

export function VigiBatMock() {
  const { c } = useI18n()
  const mock = c.mocks.vigi

  return (
    <div className="mock mock--vigi">
      <div className="mv__bar">
        <b>
          <HardHat /> VigiBat
        </b>
        <span className="mv__avatar">MA</span>
      </div>
      <div className="mv__head">
        <small>{mock.site}</small>
        <b>{mock.place}</b>
        <div className="mv__progress">
          <span style={{ width: '64%' }} />
        </div>
        <small className="mv__pct">{mock.pct}</small>
      </div>
      <div className="mv__grid">
        <ul className="mv__steps">
          {mock.steps.map((s) => (
            <li key={s.label} className={`is-${s.state}`}>
              <i>{s.state === 'done' && <Check />}</i>
              {s.label}
            </li>
          ))}
        </ul>
        <div className="mv__side">
          <div className="mv__card">
            <small>
              <Wallet /> {mock.expenses}
            </small>
            <b>8,4 M F</b>
            <small>{mock.budget}</small>
          </div>
          <div className="mv__card">
            <small>
              <Camera /> {mock.photos}
            </small>
            <span className="mv__photos">
              <i />
              <i />
              <i />
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}
