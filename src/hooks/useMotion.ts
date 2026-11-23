import { useEffect, useRef, type DependencyList, type RefObject } from 'react'
import { gsap } from '../lib/gsap'
import { hasFinePointer, prefersReducedMotion } from '../lib/env'

/**
 * Les animations GSAP d'une section, nettoyées toutes seules.
 * Les sélecteurs ('.titre', '.carte'…) ne cherchent que dans l'élément `ref`.
 * Rien ne bouge si le visiteur a coupé les animations sur son appareil.
 */
export function useScrollScene<T extends HTMLElement>(
  ref: RefObject<T | null>,
  setup: (el: T) => void,
  deps: DependencyList = [],
) {
  useEffect(() => {
    const el = ref.current
    if (!el || prefersReducedMotion()) return
    const ctx = gsap.context(() => setup(el), el)
    return () => ctx.revert()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps)
}

/** Une animation jouée à chaque changement (de touche, d'onglet…), mais pas au premier affichage. */
export function useChangeAnimation(play: () => void, deps: DependencyList) {
  const first = useRef(true)
  useEffect(() => {
    if (first.current) {
      first.current = false
      return
    }
    if (!prefersReducedMotion()) play()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps)
}

/**
 * Suit la souris au-dessus d'un élément (ordinateur seulement, et jamais si les animations sont coupées).
 * `onLeave` est appelé quand la souris sort de l'élément.
 */
export function usePointer<T extends HTMLElement>(
  ref: RefObject<T | null>,
  onMove: (e: PointerEvent, el: T) => void,
  onLeave?: (el: T) => void,
  deps: DependencyList = [],
) {
  useEffect(() => {
    const el = ref.current
    if (!el || !hasFinePointer() || prefersReducedMotion()) return
    const move = (e: PointerEvent) => onMove(e, el)
    const leave = () => onLeave?.(el)
    el.addEventListener('pointermove', move)
    el.addEventListener('pointerleave', leave)
    return () => {
      el.removeEventListener('pointermove', move)
      el.removeEventListener('pointerleave', leave)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps)
}
