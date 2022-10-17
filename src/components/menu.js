/** @jsxImportSource theme-ui */

import * as React from "react"
import { jsx, Text, Close, Link, Button, Box } from "theme-ui"
import { Link as GatsbyLink } from "gatsby"

const MenuLink = ({ location, title, setMenuOpen }) => {
  return (
    <li>
      <Link
        to={location}
        variant="menu"
        activeClassName="active"
        as={GatsbyLink}
        onClick={() => setMenuOpen(false)}
      >
        {title}
      </Link>
    </li>
  )
}

const Menu = ({ menuOpen, setMenuOpen }) => {
  if (menuOpen) {
    return (
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
            <MenuLink location="/" title="Home" setMenuOpen={setMenuOpen} />
            <MenuLink
              location="/about"
              title="About"
              setMenuOpen={setMenuOpen}
            />
            <MenuLink
              location="/race-recaps"
              title="Race Recaps"
              setMenuOpen={setMenuOpen}
            />
            <MenuLink
              location="/projects"
              title="Projects"
              setMenuOpen={setMenuOpen}
            />
          </ul>
        </div>
      </div>
    )
  }
}

export default Menu
