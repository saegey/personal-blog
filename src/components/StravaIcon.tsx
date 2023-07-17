import { Box } from 'theme-ui'
import { BoxSvgType } from '../common/types'

const SvgBox = Box as any as (props: BoxSvgType) => JSX.Element

const StravaIcon = ({ color = 'white' }) => {
  return (
    <SvgBox
      as="svg"
      viewBox="0 0 24 24"
      sx={{
        '.icon-solid': {
          fill: color,
        },
      }}
    >
      <g className="icon-solid">
        <path d="M15.387 17.944l-2.089-4.116h-3.065L15.387 24l5.15-10.172h-3.066m-7.008-5.599l2.836 5.598h4.172L10.463 0l-7 13.828h4.169" />
      </g>
    </SvgBox>
  )
}

export default StravaIcon
