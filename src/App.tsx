import Navbar from './components/Navbar'
import Hero from './components/Hero'
import About from './components/About'
import Parcours from './components/Parcours'
import Skills from './components/Skills'
import Projects from './components/Projects'
import Services from './components/Services'
import HorsEcran from './components/HorsEcran'
import Contact from './components/Contact'
import Footer from './components/Footer'
import Backdrop from './components/Backdrop'
import WhatsAppFloat from './components/WhatsAppFloat'
import { useI18n } from './i18n/LanguageContext'
import { useSmoothScroll } from './hooks/useSmoothScroll'

export default function App() {
  const { c } = useI18n()
  useSmoothScroll()

  return (
    <>
      <a className="skip-link" href="#a-propos">
        {c.ui.skip}
      </a>
      <Backdrop />
      <div className="grain" aria-hidden="true" />
      <Navbar />
      <main>
        <Hero />
        <About />
        <Parcours />
        <Skills />
        <Projects />
        <Services />
        <HorsEcran />
        <Contact />
      </main>
      <Footer />
      <WhatsAppFloat />
    </>
  )
}
