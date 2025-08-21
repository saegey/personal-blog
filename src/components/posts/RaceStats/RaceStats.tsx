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

const RaceStats = ({ items }: Props) => {
  if (!items || items.length === 0) return null

  return (
    <Grid gap={2} columns={[2, 2, 3]} sx={gridSx}>
      {items.map(item => (
        <Box key={item.title}>
          <Text variant="text.statsLabel">{item.title}</Text>
          <Text as="p" variant="text.statsValue">
            {item.value}
          </Text>
        </Box>
      ))}
    </Grid>
  )
}

export default memo(RaceStats)
