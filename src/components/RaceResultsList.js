/** @jsxImportSource theme-ui */
import React from 'react'
import { Text, Flex, Box } from 'theme-ui'

import ThemeContext from '../context/ThemeContext'
import RaceResultItemSmall from './RaceResultItemSmall'

const RaceResultsList = ({ data, theme }) => {
  return (
    <>
      {data.map((item, index) => {
        if (item === undefined) return ''

        return (
          <>
            <RaceResultItemSmall item={item} theme={theme} />
            <Flex
              sx={{
                height: ['35px', '35px', '35px'],
                display: ['none', 'flex', 'flex'],
                fontFamily: 'body',
                letterSpacing: '.3px',
              }}
            >
              <Box sx={{ width: '5%' }}>
                <Text variant='resultsItem'>
                  <strong>{item.place}</strong>
                </Text>
              </Box>
              <Box sx={{ width: '40%' }}>
                {item.isMe ? (
                  <Text variant='highlightedItem'>{item.name}</Text>
                ) : (
                  <Text variant='resultsItem'>{item.name}</Text>
                )}
              </Box>
              <Box sx={{ width: '20%' }}>
                <Text variant='resultsItem'>{item.time}</Text>
              </Box>
              <Box sx={{ width: '20%' }}>
                <Text variant='resultsItem'>
                  {theme.unitOfMeasure === 'metric'
                    ? item.speedMetric
                    : item.speed}
                </Text>
              </Box>
              <Box sx={{ width: '15%', textAlign: 'right' }}>
                <Text variant='resultsItem'>{item.timeBehind}</Text>
              </Box>
            </Flex>
          </>
        )
      })}
    </>
  )
}

const RaceResultWrapper = ({ data }) => {
  return (
    <ThemeContext.Consumer>
      {theme => {
        return <RaceResultsList data={data} theme={theme} />
      }}
    </ThemeContext.Consumer>
  )
}

export default RaceResultWrapper
