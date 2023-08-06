import { Box } from 'theme-ui'

import { BoxSvgType } from '../common/types'

const SvgBox = Box as any as (props: BoxSvgType) => JSX.Element

const BackToTop = () => {
  return (
    <Box
      sx={{
        // outline: '1px solid red',
        position: 'absolute',
        top: '100vh',
        right: '2rem',
        bottom: '0em',
        width: '3em',
        pointerEvents: 'none',
      }}
    >
      <a
        href="#"
        sx={{
          position: 'sticky',
          pointerEvents: 'all',
          top: 'calc(100vh - 4rem)',
          display: 'inline-block',
          ':hover': {
            transform: 'scale(1.1)',
          },
          background: 'text',
          borderRadius: '50%',
          padding: '9px',
        }}
      >
        <SvgBox
          as="svg"
          id="icon"
          width="25px"
          height="25px"
          viewBox="0 0 32 32"
          sx={{
            '.sto': {
              fill: 'background',
            },
            display: 'block',
            margin: 'auto',
          }}
        >
          <title>up-to-top</title>
          <g className="sto">
            <polygon points="16,14 6,24 7.4,25.4 16,16.8 24.6,25.4 26,24 " />
            <rect x="4" y="8" width="24" height="2" />
          </g>
        </SvgBox>
      </a>
    </Box>
  )
}

export default BackToTop
