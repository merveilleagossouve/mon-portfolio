import { useEffect } from 'react'
import Lenis from 'lenis'
import { gsap, ScrollTrigger } from '../lib/gsap'
import { prefersReducedMotion } from '../lib/env'

/**
 * Défilement fluide (Lenis) + animations au défilement (GSAP) :
 * - [data-reveal] : apparition douce
 */
export function useSmoothScroll() {
  useEffect(() => {
    const reduced = prefersReducedMotion()
    let lenis: Lenis | null = null
    let tick: ((time: number) => void) | null = null

    if (!reduced) {
      lenis = new Lenis({ lerp: 0.1, wheelMultiplier: 1 })
      lenis.on('scroll', ScrollTrigger.update)
      tick = (time: number) => lenis?.raf(time * 1000)
      gsap.ticker.add(tick)
      gsap.ticker.lagSmoothing(0)
    }

    // Liens internes (#section) : défilement fluide avec la hauteur du menu
    const onClick = (e: MouseEvent) => {
      const a = (e.target as Element | null)?.closest?.('a[href^="#"]') as HTMLAnchorElement | null
      if (!a) return
      const id = a.getAttribute('href')
      if (!id || id === '#') return
      const target = document.querySelector(id)
      if (!target) return
      e.preventDefault()
      if (lenis) lenis.scrollTo(target as HTMLElement, { offset: 0, duration: 1.4 })
      else target.scrollIntoView()
      history.replaceState(null, '', id)
    }
    document.addEventListener('click', onClick)

    const ctx = gsap.context(() => {
      if (reduced) return

      gsap.utils.toArray<HTMLElement>('[data-reveal]').forEach((el) => {
        gsap.fromTo(
          el,
          { y: 60, opacity: 0, clipPath: 'inset(0 0 100% 0)' },
          {
            y: 0,
            opacity: 1,
            clipPath: 'inset(0 0 -20% 0)',
            duration: 1.2,
            ease: 'expo.out',
            scrollTrigger: { trigger: el, start: 'top 88%' },
          },
        )
      })
    })

    // Recalcule les positions quand les polices et les images ont fini de charger
    const refresh = () => ScrollTrigger.refresh()
    document.fonts?.ready.then(refresh)
    window.addEventListener('load', refresh)

    return () => {
      ctx.revert()
      document.removeEventListener('click', onClick)
      window.removeEventListener('load', refresh)
      if (tick) gsap.ticker.remove(tick)
      lenis?.destroy()
    }
  }, [])
}
