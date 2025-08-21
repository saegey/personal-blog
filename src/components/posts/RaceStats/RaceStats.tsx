import { memo } from 'react'
import { Text, Box, Grid, type ThemeUIStyleObject } from 'theme-ui'

interface Item {
  title: string
  value: string | number
}

type Props = {
  items: ReadonlyArray<Item>
}

const gridSx: ThemeUIStyleObject = {
  borderRadius: '4px',
}

const titleSx: ThemeUIStyleObject = {
  fontWeight: '600',
  textTransform: 'uppercase',
  fontSize: ['12px', '14px', '14px'],
  color: 'textMuted',
}

const valueSx: ThemeUIStyleObject = {
  fontFamily: 'body',
  fontSize: ['18px', '24px', '24px'],
  fontWeight: [600, 600, 600],
  marginTop: 1,
  marginBottom: [2, 3, 3],
}

const RaceStats = ({ items }: Props) => {
  if (!items || items.length === 0) return null

  return (
    <Grid gap={2} columns={[2, 2, 3]} sx={gridSx}>
      {items.map((item) => (
        <Box key={item.title}>
          <Text sx={titleSx}>{item.title}</Text>
          <Text as="p" sx={valueSx}>
            {item.value}
          </Text>
        </Box>
      ))}
    </Grid>
  )
}

export default memo(RaceStats)
