import { Box } from 'theme-ui'

import FullScreenIcon from '../../icons/FullScreenIcon'

interface MaxProps {
  onClick: Function
}

const Maximize = ({ onClick }: MaxProps) => {
  return (
    <Box
      as="button"
      aria-label="Maximize"
      title="Maximize"
      data-testid={'matches-burned-fullscreen'}
      sx={{
        variant: 'buttons.ghost',
        width: '24px',
        height: '24px',
        p: 0,
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 'button',
        color: 'text',
      }}
      onClick={() => onClick(true)}
    >
      <FullScreenIcon />
    </Box>
  )
}

export default Maximize
