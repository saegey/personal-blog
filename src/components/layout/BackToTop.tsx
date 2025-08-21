import { Box } from 'theme-ui'
import { useEffect, useRef, useState } from 'react'

import { BoxSvgType } from '../../common/types'

const SvgBox = Box as any as (props: BoxSvgType) => JSX.Element

const BackToTop = () => {
  const [visible, setVisible] = useState(false)
  const hideTimerRef = useRef<number | null>(null)

  useEffect(() => {
    if (typeof window === 'undefined') return

    const handleScroll = () => {
      const y = window.scrollY || 0
      const isAtTop = y <= 0

      // Always hide at the very top
      if (isAtTop) {
        setVisible(false)
        if (hideTimerRef.current) {
          window.clearTimeout(hideTimerRef.current)
          hideTimerRef.current = null
        }
        return
      }

      // Show on any scroll when not at top
      setVisible(true)

      // Reset the auto-hide timer (3s of inactivity)
      if (hideTimerRef.current) {
        window.clearTimeout(hideTimerRef.current)
        hideTimerRef.current = null
      }
      hideTimerRef.current = window.setTimeout(() => {
        setVisible(false)
      }, 3000)
    }

    // Initialize based on current scroll position
    handleScroll()

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => {
      window.removeEventListener('scroll', handleScroll)
      if (hideTimerRef.current) window.clearTimeout(hideTimerRef.current)
    }
  }, [])

  return (
    <Box
      sx={{
        // outline: '1px solid red',
        position: 'absolute',
        top: '100vh',
        right: '2rem',
        bottom: '0em',
        width: '3em',
        pointerEvents: 'none',
      }}
    >
      <a
        href="#"
        sx={{
          position: 'sticky',
          pointerEvents: visible ? 'all' : 'none',
          top: 'calc(100vh - 4rem)',
          display: 'inline-block',
          opacity: visible ? 1 : 0,
          transform: visible ? 'translateY(0)' : 'translateY(8px)',
          transition: 'opacity .25s ease, transform .25s ease',
          ':hover': {
            transform: 'scale(1.1)',
          },
          background: 'text',
          borderRadius: '50%',
          padding: '9px',
          boxShadow: visible ? 'card' : 'none',
          outlineOffset: '2px',
          outline: 'none',
        }}
        aria-hidden={!visible}
        tabIndex={visible ? 0 : -1}
      >
        <SvgBox
          as="svg"
          id="icon"
          width="25px"
          height="25px"
          viewBox="0 0 32 32"
          sx={{
            '.sto': {
              fill: 'background',
            },
            display: 'block',
            margin: 'auto',
          }}
        >
          <title>up-to-top</title>
          <g className="sto">
            <polygon points="16,14 6,24 7.4,25.4 16,16.8 24.6,25.4 26,24 " />
            <rect x="4" y="8" width="24" height="2" />
          </g>
        </SvgBox>
      </a>
    </Box>
  )
}

export default BackToTop
