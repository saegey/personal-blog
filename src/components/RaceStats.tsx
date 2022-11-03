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
    <>
      <Grid
        gap={2}
        columns={[2, 2, 3]}
        sx={{
          backgroundColor: ['', 'blockquoteBg', 'blockquoteBg'],
          paddingY: ['0px', '20px', '20px'],
          paddingX: ['0px', '20px', '20px'],
          marginBottom: '20px',
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
                    fontSize: ['3', '4', '4'],
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
    </>
  )
}

export default RaceStats
