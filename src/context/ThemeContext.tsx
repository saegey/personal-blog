import { createContext, Component } from 'react'

const defaultState = {
  unitOfMeasure: 'imperial',
  toggleUnit: () => {},
}

const ThemeContext = createContext(defaultState)

class ThemeProvider extends Component {
  state = {
    unitOfMeasure: 'imperial',
  }

  toggleUnit = () => {
    console.log('unit toggle')
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
