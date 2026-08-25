import { Link } from 'gatsby'
import { useLocation } from '@reach/router'
import { useState, type ReactNode } from 'react'

import BackToTop from './layout/BackToTop'
import ThemeControl from './layout/ThemeControl'
import ViewportProvider from '../context/ViewportProvider'
import UnitProvider from '../context/UnitProvider'

type LayoutProps = {
  children: ReactNode
}

const navigation = [
  { href: '/', label: 'Index' },
  { href: '/gallery', label: 'Gallery' },
  { href: '/work', label: 'Work' },
  { href: '/about', label: 'About' },
  { href: '/races', label: 'Archive' },
]

const Layout = ({ children }: LayoutProps) => {
  const location = useLocation()
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const isActive = (href: string) => href === '/'
    ? location.pathname === '/'
    : location.pathname.startsWith(href)

  return (
    <ViewportProvider>
      <UnitProvider>
        <div id="top" className="min-h-screen bg-paper text-ink">
          <header className="border-b border-line bg-paper/95 backdrop-blur-sm">
            <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-5 sm:px-8 md:py-4">
              <Link to="/" className="w-fit" aria-label="Saegey home">
                <img src="/logo_saegey.svg" alt="Saegey" className="h-10 w-auto sm:h-11" />
              </Link>
              <button type="button" className="border border-line px-3 py-2 font-condensed text-sm font-medium uppercase tracking-label md:hidden" onClick={() => setIsMenuOpen(open => !open)} aria-expanded={isMenuOpen} aria-controls="mobile-navigation">
                {isMenuOpen ? 'Close' : 'Menu'}
              </button>
              <nav aria-label="Primary navigation" className="hidden flex-wrap gap-x-5 gap-y-2 md:flex">
                {navigation.map(item => {
                  return (
                    <Link
                      key={item.href}
                      to={item.href}
                      className={`font-condensed text-sm font-medium uppercase tracking-label transition-colors ${isActive(item.href) ? 'text-brand' : 'text-ink hover:text-brand'}`}
                    >
                      {item.label}
                    </Link>
                  )
                })}
              </nav>
            </div>
            {isMenuOpen && <nav id="mobile-navigation" aria-label="Mobile navigation" className="border-t border-line md:hidden">
              <div className="mx-auto grid max-w-6xl px-5 py-2 sm:px-8">
                {navigation.map(item => <Link key={item.href} to={item.href} onClick={() => setIsMenuOpen(false)} className={`border-b border-line py-4 font-condensed text-base font-medium uppercase tracking-label last:border-b-0 ${isActive(item.href) ? 'text-brand' : 'text-ink'}`}>
                  {item.label}
                </Link>)}
              </div>
            </nav>}
          </header>

          <main className="mx-auto w-full max-w-6xl px-5 py-10 sm:px-8 sm:py-14">
            {children}
            <BackToTop />
          </main>

          <footer className="border-t border-line">
            <div className="mx-auto flex max-w-6xl flex-col gap-3 px-5 py-6 font-condensed text-xs uppercase tracking-label text-muted sm:flex-row sm:items-center sm:justify-between sm:px-8">
              <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:gap-5"><img src="/logo_saegey.svg" alt="Saegey" className="h-6 w-auto shrink-0 self-start sm:self-auto" /><span>Seattle, Washington</span></div>
              <ThemeControl />
            </div>
          </footer>
        </div>
      </UnitProvider>
    </ViewportProvider>
  )
}

export default Layout
