import ThemeContext from "../context/ThemeContext"
import { default as PowerCurveGraph } from "./PowerCurveGraph"
import  {GraphProps } from "../common/types"

const PowerCurveContext = ({ data }: GraphProps) => {
  return (
    <ThemeContext.Consumer>
      {theme => {
        return <PowerCurveGraph data={data} unit={theme} />
      }}
    </ThemeContext.Consumer>
  )
}

export default PowerCurveContext
