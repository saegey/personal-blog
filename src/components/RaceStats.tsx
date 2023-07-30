import { Text, Box, Grid } from 'theme-ui'

interface Item {
  title: string
  value: string
}

type Props = {
  items: Item[]
}

const RaceStats = ({ items }: Props) => {
  return (
    <Box>
      <Grid
        gap={2}
        columns={[2, 2, 3]}
        sx={{
          borderRadius: '4px',
        }}
      >
        {items.map((item, index) => {
          return (
            <Box key={index}>
              <>
                <Text variant="raceStatHeading">{item.title}</Text>
                <Box
                  sx={{
                    fontFamily: 'body',
                    fontSize: ['18px', '16px', '20px'],
                    fontWeight: '600',
                  }}
                >
                  {item.value}
                </Box>
              </>
            </Box>
          )
        })}
      </Grid>
    </Box>
  )
}

export default RaceStats
