import * as React from 'react'
import { Box, Card, Grid, Text } from 'theme-ui'
import { Link as GatsbyLink } from 'gatsby'
import { ImageDataLike } from 'gatsby-plugin-image'

type FeaturePostProps = {
  headerImage?: ImageDataLike
  title: string
  slug: string
  teaser: string
  subType: string
  updatedAt: Date | string
}

const formatDate = (d: Date | string) =>
  new Intl.DateTimeFormat(undefined, {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  }).format(typeof d === 'string' ? new Date(d) : d)

const clamp = (lines: number) => ({
  display: '-webkit-box',
  WebkitLineClamp: lines,
  WebkitBoxOrient: 'vertical' as const,
  overflow: 'hidden',
})

const FeaturedPost: React.FC<FeaturePostProps> = ({
  title,
  slug,
  teaser,
  subType,
  updatedAt,
}) => {
  return (
    <GatsbyLink
      to={`/${slug.replace(/^\/+/, '')}`}
      aria-label={`Open: ${title}`}
      style={{ textDecoration: 'none', color: 'inherit' }}
    >
      <Card sx={{ variant: 'cards.featured' }}>
      <Grid gap={[3, 4]} columns={[1, '1fr']} sx={{ alignItems: 'stretch' }}>
        {/* Content */}
        <Box sx={{ minWidth: 0, display: 'flex', flexDirection: 'column' }}>
          <Text as="p" variant="postSubType">
            {subType}
          </Text>

          <Text
            as="h3"
            variant="postTitle"
            sx={{
              textAlign: 'left',
              color: 'text',
              mb: 2,
              ...clamp(2),
            }}
          >
            {title}
          </Text>

          <Text
            as="p"
            variant="postSubtitle"
            sx={{
              color: 'text',
              mb: 3,
              ...clamp(3),
            }}
          >
            {teaser}
          </Text>

          <Box sx={{ mt: 'auto' }}>
            <Box
              as="time"
              {...({ dateTime: new Date(updatedAt).toISOString() } as any)}
              sx={{ fontSize: 0, color: 'textMuted', letterSpacing: '.03em' }}
            >
              {formatDate(updatedAt)}
            </Box>
          </Box>
        </Box>
      </Grid>
      </Card>
    </GatsbyLink>
  )
}

export default FeaturedPost
