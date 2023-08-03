import { createContext, Component, useContext } from 'react'

const defaultState = {
  unitOfMeasure: 'imperial',
  distanceUnit: 'miles',
  elevationUnit: 'feet',
  toggleUnit: () => {},
}

const unitContext = createContext(defaultState)

class UnitProvider extends Component {
  state = {
    unitOfMeasure: 'imperial',
    distanceUnit: 'miles',
    elevationUnit: 'feet',
  }

  toggleUnit = () => {
    let unitOfMeasure, elevationUnit, distanceUnit
    if (this.state.unitOfMeasure === 'imperial') {
      unitOfMeasure = 'metric'
      elevationUnit = 'meters'
      distanceUnit = 'km'
    } else {
      unitOfMeasure = 'imperial'
      elevationUnit = 'feet'
      distanceUnit = 'miles'
    }
    localStorage.setItem('unitOfMeasure', unitOfMeasure)
    this.setState({ unitOfMeasure, elevationUnit, distanceUnit })
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
    const { unitOfMeasure, distanceUnit, elevationUnit } = this.state
    return (
      <unitContext.Provider
        value={{
          unitOfMeasure,
          distanceUnit,
          elevationUnit,
          toggleUnit: this.toggleUnit,
        }}
      >
        {children}
      </unitContext.Provider>
    )
  }
}

const useUnits = () => {
  const { unitOfMeasure, distanceUnit, elevationUnit, toggleUnit } =
    useContext(unitContext)
  return { unitOfMeasure, distanceUnit, elevationUnit, toggleUnit }
}

export default UnitProvider

export { useUnits }
