import { Box, Flex, Text } from 'theme-ui'

import FullScreenIcon from './FullScreenIcon'
type Props = {
  children: JSX.Element
  title: string
  openModal: (arg: boolean) => void
}
const ExpandableCard = ({ children, title, openModal }: Props) => {
  return (
    <>
      <Flex sx={{ maxWidth: '768px', marginRight: 'auto', marginLeft: 'auto' }}>
        <Box sx={{ marginBottom: ['10px', '0px', '0px'] }}>
          <Text as="h2" variant="resultsHeading">
            {title}
          </Text>
        </Box>
        <Box sx={{ marginLeft: 'auto' }}>
          <Box
            sx={{
              width: '40px',
              right: '0',
              top: '0',
              zIndex: 0,
            }}
            onClick={() => {
              openModal(true)
            }}
          >
            <FullScreenIcon color="primary" />
          </Box>
        </Box>
      </Flex>
      {children}
    </>
  )
}

export default ExpandableCard
