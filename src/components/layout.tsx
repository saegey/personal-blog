/** @jsxImportSource theme-ui */

import React, { useState } from "react"
import { Container } from "theme-ui"
import Helmet from "react-helmet"

import Menu from "./menu"
import Header from "./header"
import Footer from "./footer"

const Layout = ({ children }) => {
  const [menuOpen, setMenuOpen] = useState(false)
  const className = menuOpen ? "noScroll" : ""

  return (
    <>
      <Helmet>
        <body className={className} />
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
