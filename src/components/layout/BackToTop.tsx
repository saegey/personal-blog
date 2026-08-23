import { useEffect, useRef, useState } from 'react'

const BackToTop = () => {
  const [visible, setVisible] = useState(false)
  const hideTimerRef = useRef<number | null>(null)

  useEffect(() => {
    const onScroll = () => {
      if (window.scrollY <= 0) {
        setVisible(false)
        return
      }
      setVisible(true)
      if (hideTimerRef.current) window.clearTimeout(hideTimerRef.current)
      hideTimerRef.current = window.setTimeout(() => setVisible(false), 3000)
    }

    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => {
      window.removeEventListener('scroll', onScroll)
      if (hideTimerRef.current) window.clearTimeout(hideTimerRef.current)
    }
  }, [])

  return (
    <a
      href="#top"
      aria-label="Back to top"
      className={`fixed bottom-6 right-6 z-50 grid h-10 w-10 place-items-center border border-ink bg-paper font-condensed text-lg leading-none text-ink transition-all hover:bg-ink hover:text-white ${visible ? 'translate-y-0 opacity-100' : 'pointer-events-none translate-y-2 opacity-0'}`}
    >
      ↑
    </a>
  )
}

export default BackToTop
