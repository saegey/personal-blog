/** @jsxImportSource theme-ui */

import * as React from "react"
import { Close, Link, Button } from "theme-ui"
import { Link as GatsbyLink } from "gatsby"

const MenuLink = ({ location, title, setMenuOpen }) => {
  return (
    <li>
      <Link
        to={location}
        variant="menu"
        sx={{ textDecoration: "none" }}
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
  if (true) {
    return (
      <>
        <div
          sx={{
            backgroundColor: "rgba(0, 0, 0, 0.7)",
            position: "fixed",
            opacity: "1",
            visibility: menuOpen ? "visible" : "hidden",
            height: "100%",
            width: "100%",
            zIndex: 10000,
            overflow: "hidden",
            // transition: "all 2s fade",
          }}
        ></div>
        <div
          sx={{
            backgroundColor: "menuBackground",
            position: "fixed",
            opacity: "1",
            visibility: "visible",
            height: "100vh",
            width: "100%",
            zIndex: 10000,
            maxWidth: ["", "350px", "350px"],
            left: menuOpen ? "0px" : "-400px",
            transition: "all .4s ease",
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
              <Close ml="auto" mr={-2} sx={{ color: "headerForeground" }} />
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
      </>
    )
  }
}

export default Menu
