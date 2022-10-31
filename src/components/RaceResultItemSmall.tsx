/** @jsxImportSource theme-ui */

import React from 'react';
import { Text, Flex, Box } from 'theme-ui';

interface Props {
  item: {
    isMe: boolean
    place: string
    name: number
    speedMetric: number
    speed: number
    time: string
    timeBehind: number
  }
  theme: {
    unitOfMeasure: string
  }
}

function RaceResultItemSmall({ item, theme }: Props): React.ReactNode {
  return (
    <Box
      sx={{
        marginBottom: '10px',
      }}
    >
      <Flex sx={{ display: ['flex', 'none', 'none'] }}>
        <Box sx={{ width: '10%' }}>
          <Text variant="resultsItem">{item.place}</Text>
        </Box>
        <Box>
          {item.isMe === true
            ? (
              <Text variant="highlightedItem">{item.name}</Text>
            )
            : (
              <Text variant="resultsItem">{item.name}</Text>
            )}
        </Box>
        <Box sx={{ marginLeft: 'auto' }}>
          <Text variant="resultsItem">{item.time}</Text>
        </Box>
      </Flex>
      <Flex sx={{ display: ['flex', 'none', 'none'] }}>
        <Box sx={{ width: '10%' }} />
        <Box sx={{ color: 'primary' }}>
          <Text variant="resultsItem">
            {theme.unitOfMeasure === 'metric' ? item.speedMetric.toFixed(2) : item.speed.toFixed(2)}
          </Text>
        </Box>
        <Box sx={{ marginLeft: 'auto', color: 'primary' }}>
          <Text variant="resultsItem">{item.timeBehind.toFixed()}</Text>
        </Box>
      </Flex>
    </Box>
  );
}

export default RaceResultItemSmall;
