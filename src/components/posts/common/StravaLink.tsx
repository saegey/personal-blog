import { Box, Flex } from 'theme-ui'

import StravaIcon from '../../icons/StravaIcon'

interface StravaLinkProps {
  stravaUrl: string
}

const StravaLink = ({ stravaUrl }: StravaLinkProps) => {
  return (
    <>
      <Flex sx={{ marginY: '20px' }}>
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
              color: 'text',
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
