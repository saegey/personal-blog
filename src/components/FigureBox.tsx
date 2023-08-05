import { Box } from 'theme-ui'

type FigureBoxProps = {
  children: JSX.Element
}

const FigureBox = ({ children }: FigureBoxProps) => (
  <Box
    sx={{
      maxWidth: [null, null, '690px'],
      background: 'muted',
      padding: '30px',
      borderRadius: '5px',
      margin: ['60px 0', '60px 0', '60px auto'],
    }}
    as="figure"
  >
    {children}
  </Box>
)

export default FigureBox
