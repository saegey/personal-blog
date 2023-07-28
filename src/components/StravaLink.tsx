import { Box, Link, Flex } from 'theme-ui'
import { ReactElement } from 'react'

import StravaIcon from './StravaIcon'

const StravaLink = ({ stravaUrl }: { children: ReactElement }) => {
  return (
    <>
      <Flex>
        <Box sx={{ marginLeft: 'auto' }}></Box>
        <Box sx={{ width: '20px', marginRight: '5px', lineHeight: '10px' }}>
          <StravaIcon color="text" />
        </Box>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <a
            href={stravaUrl}
            sx={{
              textDecoration: 'none',
              fontFamily: 'body',
              // textTransform: 'uppercase',
              fontSize: '15px',
              fontWeight: '600',
              letterSpacing: '.2px',
            }}
          >
            View Activity on Strava
          </a>
        </Box>
        <Box sx={{ marginLeft: 'auto' }}></Box>
      </Flex>
    </>
  )
}

export default StravaLink
