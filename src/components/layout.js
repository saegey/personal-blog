/** @jsxImportSource theme-ui */

import React, { useState } from "react"
import { Link as GatsbyLink } from "gatsby"
import {
  Container,
  Button,
  Close,
  useColorMode,
  Text,
  Link,
  Box,
} from "theme-ui"

import Logo from "../components/logo"
import Menu from "./menu"

const Layout = ({ location, title, children }) => {
  const [menuOpen, setMenuOpen] = useState(false)
  const [colorMode, setColorMode] = useColorMode()

  return (
    <div
      sx={{
        overflowY: menuOpen ? "hidden" : "visible",
        // position: menuOpen ? "fixed" : "relative",
      }}
    >
      <Menu menuOpen={menuOpen} setMenuOpen={setMenuOpen} />

      <header
        sx={{
          display: "grid",
          gridGap: 3,
          gridTemplateColumns: "repeat(3, 1fr)",
          px: "10px",
          py: "10px",
          alignItems: "center",
          variant: "styles.header",
          // position: "sticky",
          background: "headerColor",
          top: 0,
          // zIndex: -100,
          zIndex: "101",
        }}
      >
        <Button
          title="Toggle Menu"
          sx={{
            appearance: "none",
            width: 32,
            height: 32,
            m: 0,
            p: 1,
            color: "inherit",
            bg: "transparent",
            border: 0,
            ":focus": {
              outline: "2px solid",
            },
            ":hover": {
              color: "primary",
            },
          }}
          onClick={() => {
            // console.log("open menu")
            setMenuOpen(true)
          }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="36"
            height="36"
            viewBox="0 0 36 36"
            sx={{
              display: "block",
              margin: 0,
              fill: "headerForeground",
            }}
          >
            <path d="M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z" />
          </svg>
        </Button>
        <div
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <div
            sx={{
              width: ["120px", "150px", "180px"],
            }}
          >
            <Logo border={false} />
          </div>
        </div>
        <div
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "flex-end",
          }}
        >
          <Button
            onClick={e => {
              setColorMode(colorMode === "default" ? "dark" : "default")
            }}
            viewBox="0 0 512 512"
            size="24"
            height="24"
            width="24"
            sx={{
              backgroundColor: "transparent",
              p: "0",
              ".logo-solid": {
                fill: "headerForeground",
              },
            }}
          >
            {colorMode === "default" ? (
              <Box
                as="svg"
                viewBox="0 0 512 512"
                size="24"
                height="24"
                width="24"
              >
                <g className="logo-solid">
                  <path d="M195 125c0-26.3 5.3-51.3 14.9-74.1C118.7 73 51 155.1 51 253c0 114.8 93.2 208 208 208 97.9 0 180-67.7 202.1-158.9-22.8 9.6-47.9 14.9-74.1 14.9-106 0-192-86-192-192z"></path>
                </g>
              </Box>
            ) : (
              <Box
                as="svg"
                viewBox="0 0 24 24"
                size="28"
                height="28"
                width="28"
              >
                <g className="logo-solid">
                  <path d="M6.76 4.84l-1.8-1.79-1.41 1.41 1.79 1.79 1.42-1.41zM4 10.5H1v2h3v-2zm9-9.95h-2V3.5h2V.55zm7.45 3.91l-1.41-1.41-1.79 1.79 1.41 1.41 1.79-1.79zm-3.21 13.7l1.79 1.8 1.41-1.41-1.8-1.79-1.4 1.4zM20 10.5v2h3v-2h-3zm-8-5c-3.31 0-6 2.69-6 6s2.69 6 6 6 6-2.69 6-6-2.69-6-6-6zm-1 16.95h2V19.5h-2v2.95zm-7.45-3.91l1.41 1.41 1.79-1.8-1.41-1.41-1.79 1.8z"></path>
                </g>
              </Box>
            )}
          </Button>
        </div>
      </header>
      <main>
        <Container p={["20px", "20px", "32px"]} bg="muted">
          {children}
        </Container>
      </main>
      <footer
        sx={{
          display: "flex",
          flexWrap: "wrap",
          alignItems: "center",
          p: 2,
          variant: "styles.footer",
          fontFamily: "body",
          marginY: "30px",
          marginX: "20px",
        }}
      >
        <Box
          sx={{
            display: "grid",
            marginBottom: "10px",
          }}
        >
          <Text as="div" sx={{ fontWeight: "900", fontSize: "2" }}>
            Saegey
          </Text>

          <Box>
            <Link
              href="http://instagram.com/saegey"
              sx={{ variant: "styles.navlink", paddingRight: 3 }}
            >
              Instagram
            </Link>
            <Link
              href="http://github.com/saegey"
              sx={{ variant: "styles.navlink", paddingRight: 3 }}
            >
              Github
            </Link>
            <Link
              href="http://twitter.com/saegey"
              sx={{ variant: "styles.navlink", paddingRight: 3 }}
            >
              Twitter
            </Link>
          </Box>
        </Box>
        <div sx={{ mx: "auto" }} />
        <div
          sx={{
            p: 2,
            fontFamily: "body",
            // position: "absolute",
            bottom: 0,
          }}
        >
          © {new Date().getFullYear()} Adam Saegebarth
        </div>
      </footer>
    </div>
  )
}

export default Layout
