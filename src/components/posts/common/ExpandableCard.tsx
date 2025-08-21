import { Box, Flex, Text } from 'theme-ui'

import Maximize from './Maximize'

type Props = {
  children: JSX.Element
  title: string
  openModal: (arg: boolean) => void
}
const ExpandableCard = ({ children, title, openModal }: Props) => {
  const handleClick: React.MouseEventHandler = e => {
    const target = e.target as HTMLElement
    // Ignore clicks that originate on interactive descendants
    // Note: don't include [role="button"] so we don't match the figure itself
    if (target && target.closest('button, a, input, textarea, select, [role="link"]')) {
      return
    }
    openModal(true)
  }

  const handleKeyDown: React.KeyboardEventHandler = e => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault()
      openModal(true)
    }
  }

  return (
    <Box
      as="figure"
      variant="boxes.figure"
      role="button"
      tabIndex={0}
      aria-label={`Expand ${title}`}
      sx={{ cursor: 'pointer' }}
      onClick={handleClick}
      onKeyDown={handleKeyDown}
    >
      <Flex sx={{ flexDirection: 'row' }}>
        <Box sx={{ marginBottom: ['10px', '0px', '0px'] }}>
          <Text as="h2" variant="resultsHeading">
            {title}
          </Text>
        </Box>
        <Box sx={{ marginLeft: 'auto', height: ['16px', '24px'] }}>
          <Maximize onClick={openModal} />
        </Box>
      </Flex>
      {children}
    </Box>
  )
}

export default ExpandableCard
