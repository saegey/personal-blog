import { Button, Box, Flex } from 'theme-ui'

type Props = {
  setMenuOpen: (arg: boolean) => void
}

const Header = ({ setMenuOpen }: Props) => {
  return (
    <header>
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
            background: 'none',
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
              fill: 'text',
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
          zIndex: 3,
          alignItems: 'center',
          background: 'headerColor',
          top: 0,
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
