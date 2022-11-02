import { Box } from "theme-ui"
import {BoxSvgType} from '../common/types'

const SvgBox = Box as any as (props: BoxSvgType) => JSX.Element

const FullScreenIcon = () => {
  return (
    <SvgBox
      as="svg"
      viewBox="60 0 580 580"
      sx={{
        ".icon-solid": {
          fill: "white",
        },
      }}
    >
      <g className="icon-solid">
        <path d="m414.87 239.87 40.129-40.125v27.754h35v-87.5h-87.5v35h27.754l-40.125 40.129z"></path>
        <path d="m297.5 385h-27.754l40.125-40.129-24.742-24.742-40.129 40.125v-27.754h-35v87.5h87.5z"></path>
      </g>
    </SvgBox>
  )
}

export default FullScreenIcon
