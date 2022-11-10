import { Text, Flex, Box } from 'theme-ui'

import ThemeContext from '../context/ThemeContext'
import RaceResultItemSmall from './RaceResultItemSmall'

interface Props {
  data: [
    {
      name: string
      time: string
      place: string
      speedMetric: number
      speed: number
      timeBehind: number
      isMe: boolean
    }
  ]
}

interface WrapperProps extends Props {
  theme: {
    unitOfMeasure: string
  }
}

const RaceResultsList = ({ data, theme }: WrapperProps) => {
  return (
    <>
      {data.map((item, index) => {
        if (item === undefined) return ''

        return (
          <Box key={index}>
            <RaceResultItemSmall item={item} theme={theme} key={index} />
            <Flex
              sx={{
                height: ['35px', '35px', '35px'],
                display: ['none', 'flex', 'flex'],
                fontFamily: 'body',
                letterSpacing: '.3px',
              }}
            >
              <Box sx={{ width: '5%' }}>
                <Text variant="resultsItem">
                  <strong>{item.place}</strong>
                </Text>
              </Box>
              <Box sx={{ width: '40%' }}>
                {item.isMe ? (
                  <Text variant="highlightedItem">{item.name}</Text>
                ) : (
                  <Text variant="resultsItem">{item.name}</Text>
                )}
              </Box>
              <Box sx={{ width: '20%' }}>
                <Text variant="resultsItem">{item.time}</Text>
              </Box>
              <Box sx={{ width: '20%' }}>
                <Text variant="resultsItem">
                  {theme.unitOfMeasure === 'metric'
                    ? item.speedMetric
                    : item.speed}
                </Text>
              </Box>
              <Box sx={{ width: '15%', textAlign: 'right' }}>
                <Text variant="resultsItem">{item.timeBehind}</Text>
              </Box>
            </Flex>
          </Box>
        )
      })}
    </>
  )
}

const RaceResultWrapper = ({ data }: Props) => {
  return (
    <ThemeContext.Consumer>
      {theme => {
        return <RaceResultsList data={data} theme={theme} />
      }}
    </ThemeContext.Consumer>
  )
}

export default RaceResultWrapper
