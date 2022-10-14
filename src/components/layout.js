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

const Layout = ({ location, title, children }) => {
  // const canonicalUrl = data.site.siteMetadata.siteURL + location.pathname
  console.log(location.pathname)
  const [menuOpen, setMenuOpen] = useState(false)
  const [colorMode, setColorMode] = useColorMode()

  return (
    <div
      sx={{
        // overflowY: menuOpen ? "hidden" : "visible",
        position: menuOpen ? "fixed" : "relative",
      }}
    >
      {menuOpen && (
        <div
          sx={{
            backgroundColor: "menuBackground",
            position: "absolute",
            opacity: "0.95",
            visibility: "visible",
            height: "100vh",
            width: "100%",
            zIndex: 10000,
          }}
        >
          <div
            sx={{
              display: "flex",
              paddingRight: "10px",
              paddingTop: "10px",
              justifyContent: "right",
              variant: "styles.header",
            }}
          >
            <Button
              onClick={() => {
                setMenuOpen(false)
              }}
              sx={{ backgroundColor: "transparent" }}
            >
              <Close ml="auto" mr={-2} sx={{ color: "text" }} />
            </Button>
          </div>
          <div
            sx={{
              display: "flex",
              alignItems: "center",
              height: "100vh",
            }}
          >
            <ul
              sx={{
                listStyleType: "none",
                paddingLeft: "45px",
                transition: "all .2s ease-in-out",
                top: 0,
                left: 0,
                ".active": {
                  color: "headerForeground",
                },
              }}
            >
              <li>
                <Link
                  to="/about"
                  variant="menu"
                  activeClassName="active"
                  as={GatsbyLink}
                  onClick={() => setMenuOpen(false)}
                >
                  About
                </Link>
              </li>
              <li>
                <Link
                  to="/"
                  activeClassName="active"
                  onClick={() => {
                    console.log("closed menu")
                    setMenuOpen(false)
                  }}
                  as={GatsbyLink}
                  variant="menu"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  to="/race-recaps"
                  onClick={() => {
                    console.log("closed menu")
                    setMenuOpen(false)
                  }}
                  activeClassName="active"
                  as={GatsbyLink}
                  variant="menu"
                >
                  Race Recaps
                </Link>
              </li>
            </ul>
          </div>
        </div>
      )}

      <header
        sx={{
          display: "grid",
          gridGap: 3,
          gridTemplateColumns: "repeat(3, 1fr)",
          px: "10px",
          py: "10px",
          alignItems: "center",
          variant: "styles.header",
          position: "sticky",
          background: "headerColor",
          top: 0,
          // zIndex: -100,
          // zIndex: 100,
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
            console.log("open menu")
            setMenuOpen(true)
          }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="36"
            height="36"
            // fill="rgb(255, 116, 139)"
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
              width: "180px",
            }}
          >
            <Logo border={false} width={175} />
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
        <Container p={["10px", "20px", "32px"]} bg="muted">
          {children}
        </Container>
      </main>
      <footer>
        <Container p={4} bg="muted">
          <Text sx={{ fontFamily: "body", fontSize: "1" }}>
            © {new Date().getFullYear()}, Built with // {` `}
          </Text>
          <Link
            href="https://www.gatsbyjs.com"
            sx={{
              textDecoration: "none",
              color: "text",
              fontWeight: 700,
              fontFamily: "body",
              fontSize: "1",
            }}
          >
            Gatsby
          </Link>{" "}
        </Container>
      </footer>
    </div>
  )
}

export default Layout
