import { createContext, Component } from 'react'

const defaultState = {
  unitOfMeasure: 'imperial',
  toggleUnit: () => {},
}

const ThemeContext = createContext(defaultState)

const supportsDarkMode = () =>
  window.matchMedia('(prefers-color-scheme: dark)').matches === true

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
    } else if (supportsDarkMode()) {
      this.setState({ unitOfMeasure: 'imperial' })
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
