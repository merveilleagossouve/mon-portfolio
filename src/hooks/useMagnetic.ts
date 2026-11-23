import { useRef } from 'react'
import { usePointer } from './useMotion'

/** L'élément est « aimanté » par la souris quand elle s'approche. */
export function useMagnetic<T extends HTMLElement>(strength = 0.35) {
  const ref = useRef<T>(null)
  usePointer(
    ref,
    (e, el) => {
      const r = el.getBoundingClientRect()
      const x = e.clientX - (r.left + r.width / 2)
      const y = e.clientY - (r.top + r.height / 2)
      el.style.transform = `translate(${x * strength}px, ${y * strength}px)`
    },
    (el) => {
      el.style.transform = ''
    },
    [strength],
  )
  return ref
}
