import { Box } from 'theme-ui'

import FullScreenIcon from '../../icons/FullScreenIcon'

interface MaxProps {
  onClick: Function
}

const Maximize = ({onClick}: MaxProps) => (
  <Box
    as="button"
    data-testid={'matches-burned-fullscreen'}
    sx={{
      width: '32px',
      height: '32px',
      right: '0',
      top: '0',
      zIndex: 0,
      border: 'none',
      backgroundColor: 'mutedAccent',
      borderRadius: '5px',
      display: 'inline-flex',
      alignItems: 'center',
      ':hover': {
        backgroundColor: 'mutedAccentMore',
      },
    }}
    onClick={() => {
      onClick(true)
    }}
  >
    <FullScreenIcon color="white" />
  </Box>
)

export default Maximize
