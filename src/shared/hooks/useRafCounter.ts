import * as React from 'react'

const DEFAULT_EASING = (t: number) => 1 - Math.pow(1 - t, 3) // easeOutCubic

type Options = {
  duration?: number
  start?: boolean
  easing?: (t: number) => number
}

export function useRafCounter(
  target: number,
  { duration = 700, start = false, easing = DEFAULT_EASING }: Options = {}
) {
  const [value, setValue] = React.useState(0)

  // Mantener easing estable sin re-disparar el efecto por identidad
  const easingRef = React.useRef<(t: number) => number>(easing)
  React.useEffect(() => {
    easingRef.current = easing || DEFAULT_EASING
  }, [easing])

  // Refs para controlar el ciclo de animación y tolerar StrictMode
  const rafRef = React.useRef<number | null>(null)
  const doneRef = React.useRef(false)
  const startTimeRef = React.useRef<number | null>(null)
  const fromRef = React.useRef(0)
  const valueRef = React.useRef(0)
  React.useEffect(() => {
    valueRef.current = value
  }, [value])

  React.useEffect(() => {
    // No iniciar hasta que nos lo pidan, o si ya terminó
    if (!start || doneRef.current) return
    // Evitar dobles inicios por renders/StrictMode si ya hay un RAF pendiente
    if (rafRef.current !== null) return

    // Respeta prefers-reduced-motion
    const mql = window.matchMedia?.('(prefers-reduced-motion: reduce)')
    if (mql?.matches) {
      setValue(target)
      doneRef.current = true
      return
    }

    fromRef.current = valueRef.current // por si se reanudara tras una limpieza
    startTimeRef.current = null

    const dur = Math.max(0, duration)
    const tick = (now: number) => {
      if (startTimeRef.current == null) startTimeRef.current = now
      const elapsed = now - startTimeRef.current
      const p = dur === 0 ? 1 : Math.min(1, elapsed / dur)
      const eased = easingRef.current(p)
      const next = Math.round(fromRef.current + (target - fromRef.current) * eased)
      setValue(next)

      if (p < 1) {
        rafRef.current = requestAnimationFrame(tick)
      } else {
        // Final exacto y marcar como completado
        rafRef.current = null
        doneRef.current = true
        setValue(target)
      }
    }

    rafRef.current = requestAnimationFrame(tick)

    return () => {
      if (rafRef.current !== null) {
        cancelAnimationFrame(rafRef.current)
        rafRef.current = null
      }
      // Importante: NO reiniciar doneRef aquí; así evitamos reinicios indeseados
    }
  }, [start, target, duration])

  return value
}
