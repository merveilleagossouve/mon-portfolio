import type { ReactNode } from 'react'
import { useMagnetic } from '../hooks/useMagnetic'

/** Enveloppe qui rend son contenu « aimanté » par la souris. */
export default function Magnetic({ children, strength = 0.3 }: { children: ReactNode; strength?: number }) {
  const ref = useMagnetic<HTMLSpanElement>(strength)
  return (
    <span className="magnetic" ref={ref}>
      {children}
    </span>
  )
}
