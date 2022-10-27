/** @jsxImportSource theme-ui */

import React from "react"

import ThemeContext from "../context/ThemeContext"
import { default as PowerCurveGraph } from "../components/graph"

const PowerCurveContext = ({ data }) => {
  return (
    <ThemeContext.Consumer>
      {theme => {
        return <PowerCurveGraph data={data} unit={theme} />
      }}
    </ThemeContext.Consumer>
  )
}

export default PowerCurveContext
