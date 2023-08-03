import { useState, createContext, useEffect, useContext } from 'react'

const viewportContext = createContext({})

const ViewportProvider = ({ children }: { children: JSX.Element }) => {
  const isBrowser = typeof window !== 'undefined'
  if (!isBrowser) return
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
