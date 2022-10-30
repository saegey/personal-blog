import React from "react"

const defaultState = {
  dark: false,
  toggleDark: () => {},
}

const ThemeContext = React.createContext(defaultState)

// Getting dark mode information from OS!
// You need macOS Mojave + Safari Technology Preview Release 68 to test this currently.
const supportsDarkMode = () =>
  window.matchMedia("(prefers-color-scheme: dark)").matches === true

class ThemeProvider extends React.Component {
  state = {
    unitOfMeasure: "imperial",
  }

  toggleUnit = () => {
    // console.log("oh hey")
    let unitOfMeasure
    if (this.state.unitOfMeasure === "imperial") {
      unitOfMeasure = "metric"
    } else {
      unitOfMeasure = "imperial"
    }
    localStorage.setItem("unitOfMeasure", unitOfMeasure)
    this.setState({ unitOfMeasure })
  }

  componentDidMount() {
    // Getting dark mode value from localStorage!
    const unit = localStorage.getItem("unitOfMeasure")
    if (unit) {
      this.setState({ unitOfMeasure: unit })
    } else if (supportsDarkMode()) {
      this.setState({ unitOfMeasure: "imperial" })
    }
  }

  render() {
    const { children } = this.props
    const { unitOfMeasure } = this.state
    return (
      <ThemeContext.Provider
        value={{
          unitOfMeasure,
          toggleUnit: this.toggleUnit,
        }}
      >
        {children}
      </ThemeContext.Provider>
    )
  }
}

export default ThemeContext

export { ThemeProvider }
