/** @jsxImportSource theme-ui */

import React from 'react'
import { Text, Box, Grid } from 'theme-ui'
import PropTypes from 'prop-types'

const RaceStats = ({ items }) => {
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
                <Text variant='raceStatHeading'>{item.title}</Text>
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
RaceStats.propTypes = {
  items: PropTypes.array({
    title: PropTypes.string,
    value: PropTypes.string,
  }),
}

export default RaceStats
