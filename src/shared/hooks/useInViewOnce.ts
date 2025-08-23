import * as React from 'react'

export function useInViewOnce<T extends Element>(
  options: IntersectionObserverInit = {}
) {
  const ref = React.useRef<T | null>(null)
  const [inView, setInView] = React.useState(false)
  const optsRef = React.useRef(options) // fijar opciones al primer render

  React.useEffect(() => {
    const node = ref.current
    if (!node || inView) return

    const io = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) {
        setInView(true)
        io.disconnect()
      }
    }, optsRef.current)

    io.observe(node)
    return () => io.disconnect()
  }, [inView])

  return { ref, inView } as const
}
