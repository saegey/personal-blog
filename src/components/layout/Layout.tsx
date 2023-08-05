import { useState } from 'react'
import Helmet from 'react-helmet'

import Menu from './Menu'
import Header from './Header'
import Footer from './Footer'
import BackToTop from './BackToTop'
import ViewportProvider from '../../context/ViewportProvider'
import UnitProvider from '../../context/UnitProvider'

type CardProps = {
  children: JSX.Element
}

const Layout = ({ children }: CardProps) => {
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <ViewportProvider>
      <UnitProvider>
        <>
          <Helmet htmlAttributes={{ lang: 'en-US' }}>
            <body className={menuOpen ? 'noScroll' : ''} />
          </Helmet>
          <div
            sx={{
              overflowY: menuOpen ? 'hidden' : 'visible',
              minHeight: '100vh',
              display: 'flex',
              flexDirection: 'column',
              height: menuOpen ? '100%' : '',
            }}
          >
            <Menu menuOpen={menuOpen} setMenuOpen={setMenuOpen} />
            <Header setMenuOpen={setMenuOpen} />
            <main
              sx={{
                flexGrow: 1,
              }}
            >
              {children}
              <BackToTop />
            </main>
            <Footer />
          </div>
        </>
      </UnitProvider>
    </ViewportProvider>
  )
}

export default Layout
