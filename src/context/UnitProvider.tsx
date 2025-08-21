import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useCallback,
  useState,
  type ReactNode,
} from 'react'

type UnitSystem = 'imperial' | 'metric'

const IMPERIAL_COUNTRIES = new Set(['US', 'LR', 'MM'])

const deriveUnits = (system: UnitSystem): UnitState => {
  return system === 'imperial'
    ? { unitOfMeasure: 'imperial', distanceUnit: 'miles', elevationUnit: 'feet' }
    : { unitOfMeasure: 'metric', distanceUnit: 'km', elevationUnit: 'meters' }
}

const getBrowserDefaultUnitSystem = (): UnitSystem => {
  try {
    if (typeof navigator !== 'undefined') {
      const langs = (navigator as any).languages as string[] | undefined
      const primary = (langs && langs[0]) || (navigator as any).language || ''
      // Try to extract region (e.g., en-US, fr-CA)
      const match = /-([A-Za-z]{2})/.exec(primary)
      const region = match ? match[1].toUpperCase() : ''
      if (IMPERIAL_COUNTRIES.has(region)) return 'imperial'
    }
  } catch {}
  // Fallback to metric for global default if detection fails
  return 'metric'
}

type UnitContextShape = {
  unitOfMeasure: UnitSystem
  distanceUnit: 'miles' | 'km'
  elevationUnit: 'feet' | 'meters'
  toggleUnit: () => void
}

type UnitState = Omit<UnitContextShape, 'toggleUnit'>

const defaultState: UnitContextShape = {
  unitOfMeasure: 'imperial',
  distanceUnit: 'miles',
  elevationUnit: 'feet',
  toggleUnit: () => {},
}

const unitContext = createContext<UnitContextShape>(defaultState)

type ProviderProps = { children?: ReactNode }

const UnitProvider = ({ children }: ProviderProps) => {
  const [state, setState] = useState<UnitState>(deriveUnits('imperial'))

  const setUnitsBySystem = useCallback((system: UnitSystem) => {
    setState(deriveUnits(system))
  }, [])

  const toggleUnit = useCallback(() => {
    const next: UnitSystem = state.unitOfMeasure === 'imperial' ? 'metric' : 'imperial'
    try {
      localStorage.setItem('unitOfMeasure', next)
    } catch {}
    setUnitsBySystem(next)
  }, [state.unitOfMeasure, setUnitsBySystem])

  useEffect(() => {
    try {
      const stored = localStorage.getItem('unitOfMeasure') as UnitSystem | null
      if (stored === 'imperial' || stored === 'metric') {
        setUnitsBySystem(stored)
        return
      }
    } catch {}
    setUnitsBySystem(getBrowserDefaultUnitSystem())
  }, [setUnitsBySystem])

  const value = useMemo(
    () => ({ ...state, toggleUnit }),
    [state, toggleUnit]
  )

  return <unitContext.Provider value={value}>{children}</unitContext.Provider>
}

const useUnits = () => {
  const { unitOfMeasure, distanceUnit, elevationUnit, toggleUnit } =
    useContext(unitContext)
  return { unitOfMeasure, distanceUnit, elevationUnit, toggleUnit }
}

export default UnitProvider

export { useUnits }
