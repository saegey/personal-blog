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
    <Grid
      gap={2}
      columns={[2, 3, 3]}
      sx={{
        borderRadius: '4px',
      }}
    >
      {items.map((item, index) => {
        return (
          <Box key={index}>
            <>
              <Text
                sx={{
                  fontWeight: '600',
                  textTransform: 'uppercase',
                  fontSize: '12px',
                  color: 'accent',
                }}
              >
                {item.title}
              </Text>
              <Text
                as="p"
                sx={{
                  fontFamily: 'body',
                  fontSize: ['20px', '20px', '22px'],
                  fontWeight: '600',
                  lineHeight: '30px',
                }}
              >
                {item.value}
              </Text>
            </>
          </Box>
        )
      })}
    </Grid>
  )
}

export default RaceStats
