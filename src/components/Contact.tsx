import { useEffect, useRef, useState, type FormEvent } from 'react'
import {
  AlertCircle,
  ArrowUpRight,
  BatteryFull,
  Check,
  CheckCircle2,
  Clock,
  Copy,
  Lightbulb,
  Loader2,
  Mail,
  MapPin,
  PenTool,
  Phone,
  Rocket,
  Send,
  Signal,
  Wifi,
} from 'lucide-react'
import { gsap, ScrollTrigger } from '../lib/gsap'
import { site } from '../data/content'
import { useI18n } from '../i18n/LanguageContext'
import { links } from '../lib/links'
import { usePointer, useScrollScene } from '../hooks/useMotion'
import Magnetic from './Magnetic'

/** Icônes des étapes, dans le même ordre dans les deux langues. */
const STEP_ICONS = [Lightbulb, MapPin, PenTool, Rocket]

type Status = 'idle' | 'loading' | 'success' | 'error' | 'mailto'

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
const EMPTY = { name: '', email: '', subject: '', message: '', botcheck: '' }

/** L'icône d'une étape du téléphone. */
function StepIcon({ i }: { i: number }) {
  const Icon = STEP_ICONS[i]
  return <Icon size={12} />
}

type FieldProps = {
  label: string
  value: string
  onChange: (value: string) => void
  type?: 'text' | 'email'
  autoComplete?: string
  required?: boolean
  multiline?: boolean
}

/** Un champ du formulaire : l'étiquette flotte au-dessus quand on écrit. */
function Field({ label, value, onChange, type = 'text', autoComplete, required, multiline }: FieldProps) {
  return (
    <label className="field">
      {multiline ? (
        <textarea rows={5} value={value} onChange={(e) => onChange(e.target.value)} placeholder=" " required={required} />
      ) : (
        <input
          type={type}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder=" "
          autoComplete={autoComplete}
          required={required}
        />
      )}
      <span>{label}</span>
    </label>
  )
}

function LocalTime() {
  const { lang } = useI18n()
  const fmt = () =>
    new Intl.DateTimeFormat(lang === 'en' ? 'en-GB' : 'fr-FR', {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      timeZone: site.timeZone,
    }).format(new Date())
  const [time, setTime] = useState(fmt)
  useEffect(() => {
    setTime(fmt())
    const id = setInterval(() => setTime(fmt()), 1000)
    return () => clearInterval(id)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [lang])
  return <span>{time}</span>
}

export default function Contact() {
  const { c } = useI18n()
  const [status, setStatus] = useState<Status>('idle')
  const [errorMessage, setErrorMessage] = useState('')
  const [copied, setCopied] = useState(false)
  const [form, setForm] = useState(EMPTY)
  const sectionRef = useRef<HTMLElement>(null)
  const bigRef = useRef<HTMLParagraphElement>(null)
  const sceneRef = useRef<HTMLDivElement>(null)

  // Formulaire « direct » seulement quand la clé Web3Forms est configurée
  const direct = !site.web3formsKey.startsWith('VOTRE_CLE')

  // Le grand « Parlons-en » suit la souris
  usePointer(sectionRef, (e, section) => {
    const big = bigRef.current
    if (!big) return
    const r = section.getBoundingClientRect()
    const x = (e.clientX - r.left) / r.width - 0.5
    const y = (e.clientY - r.top) / r.height - 0.5
    big.style.transform = `translate(${x * 40}px, ${y * 24}px)`
  })

  // La scène : la lettre s'ouvre, la carte en sort, le téléphone construit « le prochain projet » en boucle
  useScrollScene(sceneRef, (scene) => {
    const mm = gsap.matchMedia()

    // 1. Arrivée : le téléphone monte en tournant, puis la carte en verre arrive devant
    mm.add('(min-width: 700px)', () => {
      gsap
        .timeline({ scrollTrigger: { trigger: scene, start: 'top 65%' } })
        .from('.phone__body', { y: 160, rotateY: -40, rotateZ: 8, opacity: 0, duration: 1.4, ease: 'expo.out' })
        .from('.gcard', { y: 140, rotateX: 55, rotateZ: -8, scale: 0.8, opacity: 0, duration: 1.4, ease: 'expo.out', clearProps: 'transform' }, 0.5)
        .from('.gcard__btn', { y: 14, opacity: 0, stagger: 0.08, duration: 0.5, ease: 'back.out(2)' }, 1.2)
    })
    mm.add('(max-width: 699px)', () => {
      gsap
        .timeline({ scrollTrigger: { trigger: scene, start: 'top 75%' } })
        .from('.gcard', { y: 60, opacity: 0, duration: 0.9, ease: 'expo.out' })
        .from('.gcard__btn', { y: 14, opacity: 0, stagger: 0.08, duration: 0.5, ease: 'back.out(2)' }, 0.5)
    })

    // 2. L'écran du téléphone : idée → terrain → maquette → en ligne, en boucle
    const steps = scene.querySelectorAll<HTMLElement>('.pp__step')
    const pct = scene.querySelector<HTMLElement>('.pp__pct')
    const counter = { v: 0 }
    const show = (n: number) =>
      steps.forEach((s, i) => {
        s.classList.toggle('is-done', i < n)
        s.classList.toggle('is-active', i === n)
      })
    const loop = gsap.timeline({ paused: true, repeat: -1, repeatDelay: 1.4 })
    loop
      .call(() => show(0))
      .set('.pm-g', { opacity: 0, y: 6 })
      .call(() => scene.querySelector('.pmock')?.classList.remove('is-live'))
      .set('.pp__fill', { scaleX: 0 })
      .set(counter, { v: 0 })
    for (let i = 0; i < 4; i++) {
      loop
        .call(() => show(i))
        .to(`.pm-g${i}`, { opacity: 1, y: 0, duration: 0.6, ease: 'back.out(2)' })
        .to('.pp__fill', { scaleX: (i + 1) / 4, duration: 1.1, ease: 'power2.inOut' }, '<')
        .to(
          counter,
          {
            v: (i + 1) * 25,
            duration: 1.1,
            ease: 'power2.inOut',
            onUpdate: () => {
              if (pct) pct.textContent = `${Math.round(counter.v)}%`
            },
          },
          '<',
        )
        .to({}, { duration: 0.5 })
    }
    loop.call(() => {
      show(4)
      scene.querySelector('.pmock')?.classList.add('is-live')
    })

    ScrollTrigger.create({
      trigger: scene,
      start: 'top 80%',
      end: 'bottom top',
      onEnter: () => loop.play(),
      onEnterBack: () => loop.play(),
      onLeave: () => loop.pause(),
      onLeaveBack: () => loop.pause(),
    })
  })

  // 3. Chaque plan bouge avec la souris à sa propre profondeur
  const layersOf = (scene: HTMLElement) => scene.querySelectorAll<HTMLElement>('.layer')
  usePointer(
    sceneRef,
    (e, scene) => {
      const r = scene.getBoundingClientRect()
      const x = (e.clientX - r.left) / r.width - 0.5
      const y = (e.clientY - r.top) / r.height - 0.5
      layersOf(scene).forEach((l) => {
        const d = Number(l.dataset.depth || 1)
        l.style.setProperty('--px', `${(x * 18 * d).toFixed(1)}px`)
        l.style.setProperty('--py', `${(y * 14 * d).toFixed(1)}px`)
        l.style.setProperty('--ry', `${(x * 10 * d).toFixed(2)}deg`)
        l.style.setProperty('--rx', `${(-y * 8 * d).toFixed(2)}deg`)
        l.style.setProperty('--gx', `${((x + 0.5) * 100).toFixed(1)}%`)
        l.style.setProperty('--gy', `${((y + 0.5) * 100).toFixed(1)}%`)
      })
    },
    (scene) =>
      layersOf(scene).forEach((l) =>
        ['--px', '--py', '--rx', '--ry'].forEach((k) => l.style.setProperty(k, k.startsWith('--p') ? '0px' : '0deg')),
      ),
  )

  const update = (field: keyof typeof form, value: string) => setForm((f) => ({ ...f, [field]: value }))

  async function copyEmail() {
    try {
      await navigator.clipboard.writeText(site.email)
      setCopied(true)
      setTimeout(() => setCopied(false), 1800)
    } catch {
      window.location.href = links.mail
    }
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setErrorMessage('')

    if (!form.name.trim() || !form.email.trim() || !form.message.trim()) {
      setStatus('error')
      setErrorMessage(c.contact.required)
      return
    }
    if (!EMAIL_REGEX.test(form.email)) {
      setStatus('error')
      setErrorMessage(c.contact.invalidEmail)
      return
    }
    if (form.botcheck) return

    if (!direct) {
      // Sans clé : on ouvre la messagerie du visiteur avec le message déjà rempli
      const subject = form.subject || c.contact.mailtoSubject
      const body = `${form.message}\n\n— ${form.name} (${form.email})`
      window.location.href = `${links.mail}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`
      setStatus('mailto')
      return
    }

    setStatus('loading')
    try {
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          access_key: site.web3formsKey,
          name: form.name,
          email: form.email,
          subject: form.subject || c.contact.web3formsSubject,
          message: form.message,
          botcheck: form.botcheck,
        }),
      })
      const data = (await response.json()) as { success?: boolean; message?: string }
      if (response.ok && data.success) {
        setStatus('success')
        setForm(EMPTY)
      } else {
        setStatus('error')
        setErrorMessage(data.message || c.contact.genericError)
      }
    } catch {
      setStatus('error')
      setErrorMessage(c.contact.networkError)
    }
  }

  return (
    <section className="section contact is-dark" id="contact" ref={sectionRef}>
      <div className="container">
        <p className="section-head__meta mono">{c.contact.meta}</p>
        <p className="contact__big" ref={bigRef} aria-hidden="true">
          {c.contact.bigA}<em>{c.contact.bigB}</em>
        </p>
        <h2 className="sr-only">{c.contact.srTitle}</h2>

        <div className="contact__grid">
          <div className="scene" ref={sceneRef}>
            <span className="scene__halo" aria-hidden="true" />

            {/* Le grand téléphone doré : « Le prochain projet » se construit tout seul */}
            <div className="phone layer" data-depth="1" aria-hidden="true">
              <div className="phone__body">
                <div className="phone__screen">
                  <div className="phone__status">
                    <span>9:41</span>
                    <span className="phone__notch" />
                    <span className="phone__icons">
                      <Signal size={10} /> <Wifi size={10} /> <BatteryFull size={12} />
                    </span>
                  </div>

                  <p className="pp__kicker">{c.contact.phoneKicker}</p>
                  <p className="pp__title">
                    {c.contact.phoneTitleA}<em>{c.contact.phoneTitleB}</em>
                  </p>

                  <div className="pmock">
                    <span className="pmock__bar">
                      <i />
                      <i />
                      <i />
                    </span>
                    <span className="pmock__nav pm-g pm-g0" />
                    <span className="pmock__map pm-g pm-g1">
                      <svg viewBox="0 0 100 50" preserveAspectRatio="none">
                        <path d="M0 30 C20 20 35 40 55 28 S85 18 100 26" />
                        <path d="M0 40 C25 32 40 48 60 38 S88 30 100 36" />
                        <path d="M30 0 L38 50" />
                      </svg>
                      <MapPin size={12} />
                    </span>
                    <span className="pmock__cards pm-g pm-g2">
                      <i />
                      <i />
                      <i />
                    </span>
                    <span className="pmock__live pm-g pm-g3">
                      <Check size={10} /> {c.contact.phoneLive}
                    </span>
                  </div>

                  <div className="pp__progress">
                    <span>{c.contact.progress}</span>
                    <b className="pp__pct">0%</b>
                  </div>
                  <span className="pp__track">
                    <span className="pp__fill" />
                  </span>

                  <ol className="pp__steps">
                    {c.contact.steps.map((s, i) => (
                      <li key={s.title} className="pp__step">
                        <span className="pp__icon">
                          <StepIcon i={i} />
                          <Check size={12} className="pp__check" />
                        </span>
                        <span>
                          <b>{s.title}</b>
                          <small>{s.text}</small>
                        </span>
                      </li>
                    ))}
                  </ol>

                  <a href="#contact-form" className="pp__cta" tabIndex={-1}>
                    {c.contact.phoneCta} <ArrowUpRight size={12} />
                  </a>
                </div>
              </div>
            </div>

            {/* La carte en verre */}
            <div className="cardwrap layer" data-depth="1.6">
                <div className="gcard">
                  <span className="gcard__glare" aria-hidden="true" />
                  <div className="gcard__head">
                    <span className="gcard__avatar" aria-hidden="true">
                      <span>
                        <i className="t-gold">{site.initials}</i>
                      </span>
                    </span>
                    <div>
                      <p className="gcard__name">
                        {site.firstName} {site.lastName}
                      </p>
                      <p className="gcard__status">
                        <span className="live-dot" /> {c.contact.available}
                      </p>
                    </div>
                  </div>

                  <ul className="gcard__rows">
                    <li>
                      <Mail size={15} />
                      <a href={links.mail}>{site.email}</a>
                      <button className="gcard__chip" onClick={copyEmail} aria-label={c.contact.copyAria}>
                        {copied ? <Check size={13} /> : <Copy size={13} />}
                        <span role="status">{copied ? c.contact.copied : c.contact.copy}</span>
                      </button>
                    </li>
                    {site.phone && (
                      <li>
                        <Phone size={15} />
                        <a href={links.tel}>{site.phone}</a>
                        <span className="gcard__chip">
                          <Clock size={13} /> <LocalTime />
                        </span>
                      </li>
                    )}
                  </ul>

                  <div className="gcard__actions">
                    <a className="gcard__btn gcard__btn--main" href={links.mail}>
                      {c.contact.write}
                    </a>
                    {site.phone && (
                      <a className="gcard__btn" href={links.tel}>
                        {c.contact.call}
                      </a>
                    )}
                    {site.whatsapp && (
                      <a className="gcard__btn" href={links.whatsapp} target="_blank" rel="noreferrer">
                        WhatsApp
                      </a>
                    )}
                  </div>
                </div>
            </div>
          </div>

          <form className="form" id="contact-form" onSubmit={handleSubmit} noValidate>
            <div className="form__row">
              <Field label={c.contact.name} value={form.name} onChange={(v) => update('name', v)} autoComplete="name" required />
              <Field
                label={c.contact.email}
                type="email"
                value={form.email}
                onChange={(v) => update('email', v)}
                autoComplete="email"
                required
              />
            </div>
            <Field label={c.contact.subject} value={form.subject} onChange={(v) => update('subject', v)} />
            <Field label={c.contact.message} value={form.message} onChange={(v) => update('message', v)} required multiline />

            <input
              className="form__honeypot"
              type="text"
              name="botcheck"
              tabIndex={-1}
              autoComplete="off"
              aria-hidden="true"
              value={form.botcheck}
              onChange={(e) => update('botcheck', e.target.value)}
            />

            {status === 'error' && errorMessage && (
              <p className="form__msg form__msg--error" role="alert">
                <AlertCircle size={18} /> {errorMessage}
              </p>
            )}
            {(status === 'success' || status === 'mailto') && (
              <p className="form__msg form__msg--ok" role="status">
                <CheckCircle2 size={18} /> {status === 'success' ? c.contact.success : c.contact.mailto}
              </p>
            )}

            <Magnetic strength={0.2}>
              <button className="btn btn--primary btn--wide" type="submit" disabled={status === 'loading'}>
                {status === 'loading' ? (
                  <>
                    <Loader2 size={18} className="spin" /> {c.contact.sending}
                  </>
                ) : (
                  <>
                    {c.contact.submit} <Send size={18} />
                  </>
                )}
              </button>
            </Magnetic>
            <p className="form__note mono">
              {c.contact.note} <ArrowUpRight size={13} />
            </p>
          </form>
        </div>
      </div>
    </section>
  )
}
