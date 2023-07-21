import { Button, Box, useColorMode, Flex } from 'theme-ui'

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
        // position: 'sticky',
        background: 'headerColor',
        // top: '-16px',
        // zIndex: 1,
        // '::before': {
        //   content: '""',
        //   display: 'block',
        //   height: '16px',
        //   position: 'sticky',
        //   boxShadow: '0px 2px 5px rgba(0, 0, 0, 0.2)',
        //   top: '32px',
        // },
        // '::after': {
        //   background: 'headerColor',
        //   content: '""',
        //   height: '16px',
        //   top: 0,
        //   position: 'sticky',
        //   zIndex: 2,
        //   display: 'block',
        // },
      }}
    >
      <Box
        sx={{
          // position: 'fixed',
          zIndex: 3,
          marginLeft: '20px',
          marginTop: '10px',
        }}
      >
        <Button
          title="Toggle Menu"
          sx={{
            appearance: 'none',
            bg: 'cardBackground',
            width: 32,
            height: 32,
            m: 0,
            p: 0,
            color: 'inherit',
            // bg: 'transparent',
            border: 0,
            // ':focus': {
            //   outline: '1px solid',
            // },
            ':hover': {
              color: 'primary',
            },
            // boxShadow: '0px 2px 5px rgba(0, 0, 0, 0.2)',
          }}
          onClick={() => {
            setMenuOpen(true)
          }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 100 80"
            sx={{
              display: 'block',
              margin: 0,
              fill: 'headerForeground',
            }}
          >
            <rect width="100" height="15"></rect>
            <rect y="30" width="100" height="15"></rect>
            <rect y="60" width="100" height="15"></rect>
          </svg>
        </Button>
      </Box>
      <Flex
        sx={{
          // position: 'sticky',
          // display: 'grid',
          // gridGap: 3,
          // gridTemplateColumns: 'repeat(3, 1fr)',
          // mx: '10px',
          zIndex: 3,
          alignItems: 'center',
          background: 'headerColor',
          // marginTop: '-16px',
          top: 0,
          // marginTop: '10px',
          // position: 'sticky',
          // height: '48px',
        }}
      >
        <Box sx={{ flexGrow: 1 }}></Box>
        <Box
          sx={{
            // display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <div
            sx={{
              width: ['100px', '110px', '130px'],
            }}
          >
            {/* <Logo border={false} /> */}
          </div>
        </Box>
        <Box sx={{ flexGrow: 1 }}></Box>
      </Flex>
    </header>
  )
}

export default Header
