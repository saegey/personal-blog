import { Button, Box, useColorMode } from 'theme-ui'
// import * as themeui from 'theme-ui'

import Logo from './logo'
import { BoxSvgType } from '../common/types'

type Props = {
  setMenuOpen: (arg: boolean) => void
}
const SvgBox = Box as any as (props: BoxSvgType) => JSX.Element

const Header = ({ setMenuOpen }: Props) => {
  const [colorMode, setColorMode] = useColorMode()

  return (
    <header
      sx={{
        position: 'sticky',
        background: 'headerColor',
        top: '-16px',
        zIndex: 1,
        '::before': {
          content: '""',
          display: 'block',
          height: '16px',
          position: 'sticky',
          boxShadow: '0px 2px 5px rgba(0, 0, 0, 0.2)',
          top: '32px',
        },
        '::after': {
          background: 'headerColor',
          content: '""',
          height: '16px',
          top: 0,
          position: 'sticky',
          zIndex: 2,
          display: 'block',
        },
      }}
    >
      <Box
        sx={{
          display: 'grid',
          gridGap: 3,
          gridTemplateColumns: 'repeat(3, 1fr)',
          mx: '10px',
          zIndex: 3,
          alignItems: 'center',
          background: 'headerColor',
          marginTop: '-16px',
          top: 0,
          position: 'sticky',
          height: '48px',
        }}
      >
        <Button
          title="Toggle Menu"
          sx={{
            appearance: 'none',
            width: 32,
            height: 32,
            m: 0,
            p: 1,
            color: 'inherit',
            bg: 'transparent',
            border: 0,
            ':focus': {
              outline: '2px solid',
            },
            ':hover': {
              color: 'primary',
            },
          }}
          onClick={() => {
            setMenuOpen(true)
          }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="36"
            height="36"
            viewBox="0 0 36 36"
            sx={{
              display: 'block',
              margin: 0,
              fill: 'headerForeground',
            }}
          >
            <path d="M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z" />
          </svg>
        </Button>
        <div
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <div
            sx={{
              width: ['100px', '110px', '130px'],
            }}
          >
            <Logo border={false} />
          </div>
        </div>
        <div
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'flex-end',
          }}
        >
          <Button
            title="Toggle Theme"
            onClick={() => {
              setColorMode(colorMode === 'default' ? 'dark' : 'default')
            }}
            sx={{
              cursor: 'pointer',
              backgroundColor: 'transparent',
              p: '0',
              '.logo-solid': {
                fill: 'headerForeground',
              },
            }}
          >
            {colorMode === 'default' ? (
              <SvgBox as="svg" viewBox="0 0 512 512" height="24" width="24">
                <g className="logo-solid">
                  <path d="M195 125c0-26.3 5.3-51.3 14.9-74.1C118.7 73 51 155.1 51 253c0 114.8 93.2 208 208 208 97.9 0 180-67.7 202.1-158.9-22.8 9.6-47.9 14.9-74.1 14.9-106 0-192-86-192-192z"></path>
                </g>
              </SvgBox>
            ) : (
              <SvgBox as="svg" viewBox="0 0 24 24" height="28" width="28">
                <g className="logo-solid">
                  <path d="M6.76 4.84l-1.8-1.79-1.41 1.41 1.79 1.79 1.42-1.41zM4 10.5H1v2h3v-2zm9-9.95h-2V3.5h2V.55zm7.45 3.91l-1.41-1.41-1.79 1.79 1.41 1.41 1.79-1.79zm-3.21 13.7l1.79 1.8 1.41-1.41-1.8-1.79-1.4 1.4zM20 10.5v2h3v-2h-3zm-8-5c-3.31 0-6 2.69-6 6s2.69 6 6 6 6-2.69 6-6-2.69-6-6-6zm-1 16.95h2V19.5h-2v2.95zm-7.45-3.91l1.41 1.41 1.79-1.8-1.41-1.41-1.79 1.8z"></path>
                </g>
              </SvgBox>
            )}
          </Button>
        </div>
      </Box>
    </header>
  )
}

export default Header
