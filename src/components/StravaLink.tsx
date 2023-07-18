import { Box, Link, Flex } from 'theme-ui'
import { ReactElement } from 'react'

import StravaIcon from './StravaIcon'

const StravaLink = ({ stravaUrl }: { children: ReactElement }) => {
  return (
    <>
      <Flex>
        <Box sx={{ marginLeft: 'auto' }}></Box>
        <Box sx={{ width: '20px', marginRight: '5px', lineHeight: '10px' }}>
          <StravaIcon color="black" />
        </Box>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <Link
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
          </Link>
        </Box>
        <Box sx={{ marginLeft: 'auto' }}></Box>
      </Flex>
    </>
  )
}

export default StravaLink
