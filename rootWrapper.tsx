import React from "react"

import Layout from "./src/components/layout"
import { ThemeProvider } from "./src/context/ThemeContext"

type Props = {
	element: JSX.Element,
}
const rootWrapper = ({ element }: Props) => {
  return (
    <ThemeProvider>
      <Layout>{element}</Layout>
    </ThemeProvider>
  )
}

export default rootWrapper
