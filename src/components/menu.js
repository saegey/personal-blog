/** @jsxImportSource theme-ui */

import * as React from "react"
import { Close, Link, Button, Label, Radio, Box, Text } from "theme-ui"
import { Link as GatsbyLink } from "gatsby"
import ThemeContext from "../context/ThemeContext"

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

const Menu = ({ menuOpen, setMenuOpen, setUnitOfMeasure, unitOfMeasure }) => {
  return (
    <ThemeContext.Consumer>
      {(unitOfMeasure, toggleUnit) => (
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
              left: menuOpen ? "0px" : "-600px",
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
            <Box
              sx={{
                marginTop: "40px",
                marginLeft: "45px",
                fontFamily: "body",
              }}
            >
              <Label sx={{ marginBottom: "5px" }}>
                <Radio
                  name="unitOfMeasure"
                  value="imperial"
                  checked={
                    unitOfMeasure.unitOfMeasure === "imperial" ? true : false
                  }
                  onClick={unitOfMeasure.toggleUnit}
                />
                <Text sx={{ marginY: "auto" }}>Imperial</Text>
              </Label>
              <Label sx={{ marginBottom: "5px" }}>
                <Radio
                  name="unitOfMeasure"
                  value="metric"
                  onClick={unitOfMeasure.toggleUnit}
                  checked={
                    unitOfMeasure.unitOfMeasure === "metric" ? true : false
                  }
                />
                <Text sx={{ marginY: "auto" }}>Metric</Text>
              </Label>
            </Box>
          </div>
        </>
      )}
    </ThemeContext.Consumer>
  )
}

export default Menu
