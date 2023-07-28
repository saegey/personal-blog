import { createContext, Component } from 'react'

const defaultState = {
  unitOfMeasure: 'imperial',
  toggleUnit: () => {},
}

const ThemeContext = createContext(defaultState)

// const supportsDarkMode = () =>
//   window.matchMedia('(prefers-color-scheme: dark)').matches === true

class ThemeProvider extends Component {
  state = {
    unitOfMeasure: 'imperial',
  }

  toggleUnit = () => {
    let unitOfMeasure
    if (this.state.unitOfMeasure === 'imperial') {
      unitOfMeasure = 'metric'
    } else {
      unitOfMeasure = 'imperial'
    }
    localStorage.setItem('unitOfMeasure', unitOfMeasure)
    this.setState({ unitOfMeasure })
  }

  componentDidMount() {
    const unit = localStorage.getItem('unitOfMeasure')
    if (unit) {
      this.setState({ unitOfMeasure: unit })
    } else {
      this.setState({ unitOfMeasure: 'imperial' })
    }
  }

  render() {
    const { children } = this.props
    const { unitOfMeasure, distanceUnit } = this.state
    return (
      <ThemeContext.Provider
        value={{
          unitOfMeasure,
          distanceUnit: unitOfMeasure === 'imperial' ? 'mi' : 'km',
          elevationUnit: unitOfMeasure === 'imperial' ? 'ft' : 'm',
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
