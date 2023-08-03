import { Close, Box, Flex } from 'theme-ui'

import UnitSelector from './UnitSelector'
import NavigationItems from './NavigationItems'
import ColorModeSelector from './ColorModeSelector'
import Logo from './logo'
import { useUnits } from '../context/UnitProvider'

type Props = {
  menuOpen: boolean
  setMenuOpen: (arg: boolean) => void
}

const Menu = ({ menuOpen, setMenuOpen }: Props) => {
  const units = useUnits()
  return (
    <>
      <div
        sx={{
          backgroundColor: 'rgba(0, 0, 0, 0.7)',
          position: 'fixed',
          opacity: '1',
          visibility: menuOpen ? 'visible' : 'hidden',
          height: '100%',
          width: '100%',
          zIndex: 10000,
          overflowY: 'scroll',
        }}
      ></div>
      <div
        sx={{
          backgroundColor: 'muted',
          position: 'fixed',
          opacity: '1',
          visibility: 'visible',
          height: '100vh',
          width: '100%',
          display: 'flex',
          flexFlow: 'column',
          zIndex: 10000,
          maxWidth: ['', '350px', '350px'],
          left: menuOpen ? '0px' : '-600px',
          transition: 'all .4s ease',
        }}
      >
        <Flex sx={{ paddingTop: '30px', paddingX: '20px' }}>
          <Box sx={{ marginLeft: '10px' }}>
            <Logo />
          </Box>
          <div
            sx={{
              // display: 'flex',
              marginLeft: 'auto',
              paddingRight: '10px',
              justifyContent: 'right',
              variant: 'styles.header',
            }}
          >
            <Close
              ml="auto"
              mr={-2}
              sx={{
                color: 'headerForeground',
                ':hover': {
                  background: 'mutedAccent',
                },
              }}
              onClick={() => {
                setMenuOpen(false)
              }}
            />
          </div>
        </Flex>
        <NavigationItems setMenuOpen={setMenuOpen} />
        <UnitSelector unitOfMeasure={units} />
        <ColorModeSelector />
      </div>
    </>
  )
}

export default Menu
