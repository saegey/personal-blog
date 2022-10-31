/** @jsxImportSource theme-ui */

import * as React from "react"
import { Link as GatsbyLink } from "gatsby"
import { Close, Link, Button } from "theme-ui"

const MenuLink = ({ title, location, setMenuOpen }) => {
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

const NavigationItems = ({ setMenuOpen }) => {
  return (
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
        <MenuLink location="/about" title="About" setMenuOpen={setMenuOpen} />
        <MenuLink
          location="/race-journal"
          title="Race Journal"
          setMenuOpen={setMenuOpen}
        />
        <MenuLink
          location="/projects"
          title="Projects"
          setMenuOpen={setMenuOpen}
        />
      </ul>
    </div>
  )
}

export default NavigationItems
