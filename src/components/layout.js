import * as React from "react"
import { Link } from "gatsby"
import { slide as Menu } from "react-burger-menu"

import Logo from "../components/logo"

const Layout = ({ location, title, children }) => {
  var styles = {
    bmBurgerButton: {
      position: "fixed",
      width: "36px",
      height: "30px",
      left: "36px",
      top: "36px",
    },
    bmBurgerBars: {
      background: "#373a47",
    },
    bmBurgerBarsHover: {
      background: "#a90000",
    },
    bmCrossButton: {
      height: "24px",
      width: "24px",
    },
    bmCross: {
      background: "#bdc3c7",
    },
    bmMenuWrap: {
      position: "fixed",
      height: "100%",
    },
    bmMenu: {
      background: "#e1e1e1",
      padding: "2.5em 1.5em 0",
      fontSize: "1.15em",
    },
    bmMorphShape: {
      fill: "#373a47",
    },
    bmItemList: {
      color: "#b8b7ad",
      padding: "0.8em",
      display: "flex",
      flexFlow: "column",
    },
    bmItem: {
      display: "inline-block",
    },
    bmOverlay: {
      background: "rgba(0, 0, 0, 0.0)",
    },
  }

  const rootPath = `${__PATH_PREFIX__}/`
  const isRootPath = location.pathname === rootPath
  let header

  if (isRootPath) {
    header = (
      <div>
        <Link to="/">
          <Logo />
        </Link>
      </div>
    )
  } else {
    header = (
      <Link className="header-link-home" to="/">
        <Logo border={false} />
      </Link>
    )
  }

  return (
    <div data-is-root-path={isRootPath}>
      <Menu styles={styles}>
        <a id="home" className="bmItemList" href="/">
          Home
        </a>
        <a id="about" className="bmItemList" href="/about">
          About
        </a>
      </Menu>
      <header className="global-header">{header}</header>
      <main>{children}</main>
      <footer className="global-wrapper">
        © {new Date().getFullYear()}, Built with
        {` `}
        <a href="https://www.gatsbyjs.com">Gatsby</a>
      </footer>
    </div>
  )
}

export default Layout
