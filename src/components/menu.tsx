import { Close } from "theme-ui"

import ThemeContext from "../context/ThemeContext"
import UnitSelector from "./UnitSelector"
import NavigationItems from "./NavigationItems"

type Props = {
  menuOpen: boolean,
  setMenuOpen: (arg: boolean) => void,
}

type ThemeContextProps = {
    unitOfMeasure: string,
    toggleUnit: () => void
}

const Menu = ({ menuOpen, setMenuOpen }: Props) => {
  return (
    <ThemeContext.Consumer>
      {(unitOfMeasure: ThemeContextProps) => (
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
              display: "flex",
              flexFlow: "column",
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
              <Close ml="auto" mr={-2} sx={{ color: "headerForeground" }} onClick={() => {
                setMenuOpen(false)
              }} />
            </div>
            <NavigationItems setMenuOpen={setMenuOpen} />
            <UnitSelector unitOfMeasure={unitOfMeasure} />
          </div>
        </>
      )}
    </ThemeContext.Consumer>
  )
}

export default Menu
