import { FunctionComponent, useState } from "react"
import { Container } from "theme-ui"
import Helmet from "react-helmet"

import Menu from "./menu"
import Header from "./header"
import Footer from "./footer"

type CardProps = {
  children: JSX.Element
}


const Layout = ({ children }: CardProps) => {
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <>
      <Helmet>
        <body className={menuOpen ? "noScroll" : ""} />
      </Helmet>
      <div
        sx={{
          overflowY: menuOpen ? "hidden" : "visible",
          height: menuOpen ? "100%" : "",
        }}
      >
        <Menu menuOpen={menuOpen} setMenuOpen={setMenuOpen} />
        <Header setMenuOpen={setMenuOpen} />
        <main>
          <Container p={["20px", "20px", "32px"]} bg="muted">
            {children}
          </Container>
        </main>
        <Footer />
      </div>
    </>
  )
}

export default Layout
