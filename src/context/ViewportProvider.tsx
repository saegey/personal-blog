import { useState, createContext, useEffect, useContext, type ReactNode } from 'react'

type ViewportContextType = {
  width: number
  height: number
}

const viewportContext = createContext<ViewportContextType>({
  width: 0,
  height: 0,
})

const ViewportProvider = ({ children }: { children: ReactNode }) => {
  const isBrowser = typeof window !== 'undefined'
  if (!isBrowser) return null
  const [width, setWidth] = useState(window.innerWidth)
  const [height, setHeight] = useState(window.innerHeight)

  const handleWindowResize = () => {
    setWidth(window.innerWidth)
    setHeight(window.innerHeight)
  }

  useEffect(() => {
    window.addEventListener('resize', handleWindowResize)
    return () => window.removeEventListener('resize', handleWindowResize)
  }, [])

  return (
    <viewportContext.Provider value={{ width, height }}>
      {children}
    </viewportContext.Provider>
  )
}

const useViewport = () => {
  const { width, height } = useContext(viewportContext)
  return { width, height }
}

export { useViewport }

export default ViewportProvider
