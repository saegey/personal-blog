import { Text, Flex, Box } from 'theme-ui'

import RaceResultItemSmall from './RaceResultItemSmall'
import { useUnits } from '../../../context/UnitProvider'

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
  showSpeed: boolean
}

const RaceResultsList = ({ data, showSpeed }: Props) => {
  const units = useUnits()

  return (
    <>
      {data.map((item, index) => {
        if (item === undefined) return ''

        return (
          <Box key={index}>
            <RaceResultItemSmall item={item} theme={units} key={index} />
            <Flex
              sx={{
                height: ['25px', '25px', '25px'],
                display: ['none', 'flex', 'flex'],
                fontFamily: 'body',
              }}
            >
              <Box sx={{ width: '5%' }}>
                <Text variant="resultsItem">
                  <strong>{item.place}</strong>
                </Text>
              </Box>
              <Box sx={{ width: showSpeed ? '30%' : '50%' }}>
                {item.isMe ? (
                  <Text variant="highlightedItem">{item.name}</Text>
                ) : (
                  <Text variant="resultsItem">{item.name}</Text>
                )}
              </Box>
              <Box sx={{ width: '30%', textAlign: 'right' }}>
                <Text variant="resultsItem">{item.time}</Text>
              </Box>
              {showSpeed && (
                <Box sx={{ width: '20%', textAlign: 'right' }}>
                  <Text variant="resultsItem">
                    {units.unitOfMeasure === 'metric'
                      ? item.speedMetric
                      : item.speed}
                  </Text>
                </Box>
              )}

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

export default RaceResultsList
