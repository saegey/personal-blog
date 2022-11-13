import { Text, Flex, Box, Button, Close } from 'theme-ui'

type ModalProps = {
  children: JSX.Element
  modalOpen: (arg: boolean) => void
	headerText: string
}

const Modal = ({ children, modalOpen, headerText }: ModalProps) => {
  return (
    <Box
      variant="styles.faded"
      onClick={() => {
        modalOpen(false)
      }}
    >
      <Box
        sx={{
          backgroundColor: 'background',
          margin: ['0% auto', '5% auto', '5% auto'],
          padding: '0px',
          width: '100%',
          maxWidth: '706px',
          overflowY: 'scroll',
        }}
        onClick={event => {
          event.stopPropagation()
        }}
      >
        <Flex
          sx={{
            position: 'sticky',
            top: '0px',
            backgroundColor: 'background',
          }}
        >
          <Box sx={{ p: '20px' }}>
            <Text
              as="h2"
              variant='resultsHeading'
            >
              {headerText}
            </Text>
          </Box>
          <Box sx={{ marginLeft: 'auto', p: '20px' }}>
            <Button
              onClick={() => {
                modalOpen(false)
              }}
              sx={{ backgroundColor: 'transparent', p: 0 }}
            >
              <Close
                ml="auto"
                mr={-2}
                sx={{ color: 'text', cursor: 'pointer' }}
              />
            </Button>
          </Box>
        </Flex>
        <Box sx={{ paddingX: '20px' }}>{children}</Box>
      </Box>
    </Box>
  )
}

export default Modal
