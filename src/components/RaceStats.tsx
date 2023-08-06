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
      columns={[2, 2, 3]}
      sx={{
        borderRadius: '4px',
        gap: ['30px', '5px 100px', '30px']
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
                  fontSize: ['12px', '14px', '14px'],
                  color: 'accent',
                }}
              >
                {item.title}
              </Text>
              <Text
                as="p"
                sx={{
                  fontFamily: 'body',
                  fontSize: ['20px', '30px', '34px'],
                  fontWeight: ['600', '600', '600'],
                  lineHeight: ['30px', '50px', '60px'],
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
