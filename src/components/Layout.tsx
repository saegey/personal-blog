import Helmet from 'react-helmet'
import { useEffect, useRef, useState } from 'react'
import { Box, Flex, NavLink, Text } from 'theme-ui'
import { Link } from 'gatsby'

import BackToTop from './layout/BackToTop'
import ViewportProvider from '../context/ViewportProvider'
import UnitProvider from '../context/UnitProvider'
import { MyLinkProps } from '../common/types'
import UnitSelector from './layout/UnitSelector'

type CardProps = {
  children: JSX.Element
}

const MyLink = Link as any as (props: MyLinkProps) => JSX.Element

const Layout = ({ children }: CardProps) => {
  const [navVisible, setNavVisible] = useState(true)
  const lastYRef = useRef(0)
  const hideTimerRef = useRef<number | null>(null)
  const navRef = useRef<HTMLDivElement | null>(null)
  const [navHeight, setNavHeight] = useState(0)
  const [atTop, setAtTop] = useState(true)

  useEffect(() => {
    if (typeof window === 'undefined') return
    lastYRef.current = window.scrollY || 0

    const onScroll = () => {
      const y = window.scrollY || 0
      const last = lastYRef.current
      const scrollingUp = y < last

      // Track if we're at the top to toggle header title visibility
      const isAtTop = y <= 0
      // Avoid stale state by setting unconditionally (React will noop if unchanged)
      setAtTop(isAtTop)

      // Show nav at the top or when scrolling up
      if (isAtTop || scrollingUp) {
        setNavVisible(true)
      }

      // Manage auto-hide: don't hide while at the very top
      if (hideTimerRef.current) {
        window.clearTimeout(hideTimerRef.current)
        hideTimerRef.current = null
      }
      if (!isAtTop) {
        hideTimerRef.current = window.setTimeout(() => {
          setNavVisible(false)
        }, 2500)
      }

      lastYRef.current = y

      // Recalculate nav height if it changes (e.g., when title hides/shows)
      if (navRef.current) setNavHeight(navRef.current.offsetHeight)
    }

    const onResize = () => {
      if (navRef.current) setNavHeight(navRef.current.offsetHeight)
    }

    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onResize)
    // initial measure
    onResize()
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onResize)
      if (hideTimerRef.current) window.clearTimeout(hideTimerRef.current)
    }
  }, [])

  return (
    <ViewportProvider>
      <UnitProvider>
        <>
          <Helmet htmlAttributes={{ lang: 'en-US' }}>
            <body />
          </Helmet>
          {/* Fixed nav wrapper */}
          <Box
            ref={navRef as any}
            sx={{
              position: 'fixed',
              top: 0,
              left: 0,
              right: 0,
              zIndex: 100,
              bg: 'background',
              borderBottom: '2px solid',
              borderColor: 'primaryMuted',
              transition: 'transform .25s ease',
              transform: navVisible ? 'translateY(0)' : 'translateY(-100%)',
            }}
          >
            <Box sx={{ maxWidth: '1045px', marginX: [3, 5] }}>
              <Flex sx={{ flexDirection: 'column' }}>
                <Box
                  onTransitionEnd={() => {
                    if (navRef.current)
                      setNavHeight(navRef.current.offsetHeight)
                  }}
                  sx={{
                    overflow: 'hidden',
                    // Smoothly animate presence instead of toggling display
                    maxHeight: atTop ? 96 : 0, // large enough to fit the title
                    opacity: atTop ? 1 : 0,
                    transform: atTop ? 'translateY(0)' : 'translateY(-6px)',
                    transition:
                      'max-height .25s ease, opacity .2s ease, transform .25s ease',
                  }}
                >
                  <Text
                    as="h1"
                    sx={{
                      fontSize: [3, 4, '28px'],
                      mt: 3,
                      fontFamily: 'mono'
                    }}
                  >
                    Adam Saegebarth
                  </Text>
                </Box>
                <Flex as="nav">
                  {[
                    { href: '/', label: 'Home' },
                    { href: '/about', label: 'About' },
                    { href: '/races', label: 'Races' },
                    { href: '/projects', label: 'Projects', paddingY: 2 },
                  ].map(({ href, label, paddingY }) => (
                    <NavLink
                      key={href}
                      href={href}
                      as={MyLink}
                      paddingRight={3}
                      paddingTop={2}
                      {...(paddingY ? { paddingY } : {})}
                      sx={{ variant: 'links.nav' }}
                    >
                      {label}
                    </NavLink>
                  ))}
                  <Flex
                    sx={{
                      flexGrow: 1,
                      justifyContent: 'flex-end', // horizontal alignment
                      alignItems: 'center', // vertical alignment
                    }}
                  >
                    <Box sx={{ display: ['none', 'block'] }}>
                      <UnitSelector />
                    </Box>
                  </Flex>
                </Flex>
              </Flex>
            </Box>
          </Box>

          {/* Spacer to offset fixed nav height */}
          <Box sx={{ height: navHeight }} />

          <Box
            as="main"
            sx={{
              flexGrow: 1,
              maxWidth: '1045px',
              margin: [3, 5],
            }}
          >
            {children}
            <BackToTop />
          </Box>
        </>
      </UnitProvider>
    </ViewportProvider>
  )
}

export default Layout
