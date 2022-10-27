import React from "react"

import Layout from "./src/components/layout"
import { ThemeProvider } from "./src/context/ThemeContext"

const rootWrapper = ({ element, props }) => {
  return (
    <ThemeProvider>
      <Layout {...props}>{element}</Layout>
    </ThemeProvider>
  )
}

export default rootWrapper
