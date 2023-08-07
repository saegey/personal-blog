import { Box, Flex, Text } from 'theme-ui'

import Maximize from './Maximize'

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
    <Box as="figure" variant="boxes.figure">
      <Flex sx={{ flexDirection: 'row' }}>
        <Box sx={{ marginBottom: ['10px', '0px', '0px'] }}>
          <Text as="h2" variant="resultsHeading">
            {title}
          </Text>
        </Box>
        <Box sx={{ marginLeft: 'auto', height: '32px' }}>
          <Maximize onClick={openModal}/>
        </Box>
      </Flex>
      {children}
    </Box>
  )
}

export default ExpandableCard
