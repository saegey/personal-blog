import { Box, Flex } from 'theme-ui'

import StravaIcon from '../../icons/StravaIcon'

interface StravaLinkProps {
  stravaUrl: string
}

const StravaLink = ({ stravaUrl }: StravaLinkProps) => {
  return (
    <Flex sx={{ my: 3, justifyContent: 'center' }}>
      <a
        href={stravaUrl}
        target="_blank"
        rel="noopener noreferrer"
        sx={{
          variant: 'buttons.secondary',
          display: 'inline-flex',
          alignItems: 'center',
          gap: 2,
          textDecoration: 'none',
        }}
        aria-label="View activity on Strava (opens in a new tab)"
      >
        <Box as="span" sx={{ display: 'inline-flex', alignItems: 'center' }}>
          <StravaIcon color="currentColor" />
        </Box>
        <Box as="span">View activity on Strava</Box>
      </a>
    </Flex>
  )
}

export default StravaLink
