import { Text, Link, Flex, Box } from 'theme-ui'
import { Link as GatsbyLink } from 'gatsby'
import { getImage, ImageDataLike } from 'gatsby-plugin-image'
import moment from 'moment'

import CustomImage from '../CustomImage'

type FeaturePostProps = {
  headerImage: ImageDataLike | undefined
  title: string
  slug: string
  teaser: string
  subType: string
  updatedAt: Date
}

const FeaturedPost = ({
  headerImage,
  title,
  slug,
  teaser,
  subType,
  updatedAt,
}: FeaturePostProps) => {
  const headerImageComp = headerImage ? (
    <Link to={`${slug}`} as={GatsbyLink}>
      <CustomImage
        image={getImage(headerImage)}
        objectFit="cover"
        alt={`Photo`}
        variant="homePageImage"
        theme={{ borderRadius: '5px' }}
      />
    </Link>
  ) : (
    ''
  )

  return (
    <Flex sx={{ flexWrap: 'wrap' }}>
      <Box
        sx={{
          flexGrow: 1,
          flexBasis: 'sidebar',
          width: [
            '100%',
            'calc(100% - 335px - 20px)',
            'calc(100% - 335px - 20px)',
          ],
        }}
      >
        {headerImageComp}
      </Box>
      <Box
        sx={{
          flexGrow: 99999,
          flexBasis: 0,
          minWidth: 320,
        }}
      >
        <Flex
          sx={{
            flexDirection: 'column',
            paddingTop: ['10px', 0, 0],
            paddingX: [0, '20px', '20px'],
            height: '100%',
            gap: ['10px', '20px', '20px'],
          }}
        >
          <Text as="p" variant="postType" sx={{ textAlign: 'left' }}>
            {subType}
          </Text>
          <Link to={`${slug}`} as={GatsbyLink} sx={{ textDecoration: 'none' }}>
            <Text
              as="h1"
              variant="postTitle"
              sx={{ textAlign: 'left', color: 'text' }}
            >
              {title}
            </Text>
          </Link>
          <Text
            as="p"
            variant="postSubtitle"
            sx={{
              marginBottom: '0px',
              color: 'text',
            }}
          >
            {teaser}
          </Text>
          <Box sx={{ margin: 'auto 0 0' }}>
            <Text
              as="p"
              sx={{
                fontSize: '11px',
                textTransform: 'uppercase',
                fontWeight: '600',
                color: 'primary',
                letterSpacing: '.05em',
                lineHeight: '130%',
              }}
            >
              By Adam Saegebarth<br></br>
              {moment(updatedAt).startOf('day').fromNow()}
            </Text>
          </Box>
        </Flex>
      </Box>
    </Flex>
  )
}

export default FeaturedPost
