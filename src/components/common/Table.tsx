import { Box } from 'theme-ui'
import { ReactNode } from 'react'

type Props = {
  children: ReactNode
  caption?: string
}

// A Theme UI-styled table that takes 100% width and is horizontally scrollable on small screens.
const Table = ({ children, caption }: Props) => {
  return (
    <Box sx={{ width: '100%', overflowX: 'auto', my: 3, borderRadius: 'lg' }}>
      {caption && (
        <Box as="div" sx={{ mb: 2, color: 'textMuted', fontWeight: 600 }}>
          {caption}
        </Box>
      )}
      <Box
        as="table"
        sx={{
          width: '100%',
          borderCollapse: 'separate',
          borderSpacing: 0,
          border: '2px solid',
          borderColor: 'cardBorderColor',
          // Clip inner corners to match rounded outer container
          borderRadius: 'lg',
          overflow: 'hidden',
          display: 'table',
          'th, td': {
            textAlign: 'left',
            px: 3,
            py: 2,
            borderBottom: '2px solid',
            borderColor: 'cardBorderColor',
            fontSize: [1, 1, 2],
            color: 'text',
          },
          thead: {
            'th': {
              bg: 'primaryMuted',
              fontWeight: 700,
              color: 'text',
            },
          },
          // tbody: {
          //   // 'tr:nth-of-type(odd)': { bg: 'muted' },
          //   'tr:hover': { bg: 'primaryMuted' },
          // },
          'tr:last-of-type td': {
            borderBottom: 'none',
          },
        }}
      >
        {children}
      </Box>
    </Box>
  )
}

export default Table
