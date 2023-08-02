import { Box, Flex, Text } from 'theme-ui'

import FullScreenIcon from './FullScreenIcon'
type Props = {
  children: JSX.Element
  title: string
  openModal: (arg: boolean) => void
  expandableOnMobile: boolean
}
const ExpandableCard = ({
  children,
  title,
  openModal,
  expandableOnMobile = true,
}: Props) => {
  return (
    <Box
      as="figure"
      sx={{
        maxWidth: '690px',
        background: 'muted',
        borderRadius: '5px',
        margin: '60px auto',
        padding: '30px',
      }}
    >
      <Flex sx={{ flexDirection: 'row' }}>
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
              display: expandableOnMobile
                ? 'inherit'
                : ['none', 'inherit', 'inherit'],
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
    </Box>
  )
}

export default ExpandableCard
