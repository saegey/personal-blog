/** @jsxImportSource theme-ui */
import * as React from 'react'
import { Box, Card, Grid, Text } from 'theme-ui'
import { Link as GatsbyLink } from 'gatsby'
import { getImage, ImageDataLike } from 'gatsby-plugin-image'
// import CustomImage from '../CustomImage'

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
  // headerImage,
  title,
  slug,
  teaser,
  subType,
  updatedAt,
}) => {
  // const img = headerImage ? getImage(headerImage) : null

  return (
    <Card
      as={GatsbyLink}
      to={`/${slug.replace(/^\/+/, '')}`}
      aria-label={`Open: ${title}`}
      sx={{
        textDecoration: 'none',
        color: 'inherit',
        paddingY: [2, 3],
        borderRadius: 'lg',
        transition: 'transform 120ms ease, box-shadow 120ms ease',
        boxShadow: 'card',
        '&:hover, &:focus': {
          transform: 'translateY(-2px)',
          boxShadow: 'elevated',
        },
        '&:focus': {
          outline: 'none',
        },
      }}
    >
      <Grid
        gap={[3, 4]}
        // columns={[1, img ? 'minmax(260px, 36%) 1fr' : '1fr']}
        columns={[1, '1fr']}
        sx={{ alignItems: 'stretch' }}
      >
        {/* Media
        {img && (
          <Box
            sx={{
              position: 'relative',
              borderRadius: 'md',
              overflow: 'hidden',
              aspectRatio: ['16 / 9', '4 / 3'],
            }}
          >
            <CustomImage
              image={img}
              objectFit="cover"
              alt=""
              variant="homePageImage"
              theme={{ borderRadius: 'md' }}
            />
          </Box>
        )} */}

        {/* Content */}
        <Box sx={{ minWidth: 0, display: 'flex', flexDirection: 'column' }}>
          <Text
            as="p"
            sx={{
              textTransform: 'uppercase',
              letterSpacing: '0.08em',
              fontSize: 0,
              color: 'textMuted',
              mb: 1,
              fontFamily: 'body',
            }}
          >
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
            <Text
              as="time"
              dateTime={new Date(updatedAt).toISOString()}
              sx={{ fontSize: 0, color: 'textMuted', letterSpacing: '.03em' }}
            >
              {formatDate(updatedAt)}
            </Text>
          </Box>
        </Box>
      </Grid>
    </Card>
  )
}

export default FeaturedPost
