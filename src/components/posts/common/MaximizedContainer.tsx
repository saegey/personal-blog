import { Box, Flex, Text, Close } from 'theme-ui'

type MaxProps = {
  children: JSX.Element
  openModal: (arg: boolean) => void
  title: string
}
const MaximizedContainer = ({ children, openModal, title }: MaxProps) => {
  return (
    <Box variant="styles.faded">
      <Box
        sx={{
          backgroundColor: 'background',
          margin: '5%',
          padding: '20px',
          width: '100%',
          // maxWidth: '706px',
          overflowY: 'scroll',
        }}
      >
        <Flex>
          <Box>
            <Text as="h2" variant="resultsHeading">
              {title}
            </Text>
          </Box>
          <Box sx={{ marginLeft: 'auto', marginRight: '10px' }}>
            <Close
              onClick={() => {
                openModal(false)
              }}
              ml="auto"
              mr={-2}
              sx={{ color: 'text', cursor: 'pointer' }}
            />
          </Box>
        </Flex>
        {children}
      </Box>
    </Box>
  )
}

export default MaximizedContainer
