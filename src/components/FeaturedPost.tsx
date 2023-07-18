import { Text, Link, Flex, Box, Image } from 'theme-ui'
import { Link as GatsbyLink } from 'gatsby'
import { GatsbyImage, getImage, ImageDataLike } from 'gatsby-plugin-image'

import { MyImageProps } from '../common/types'
const MyImage = Image as any as (props: MyImageProps) => JSX.Element

type FeaturePostProps = {
  headerImage: ImageDataLike | undefined
  title: string
  type: string
  slug: string
  teaser: string
  subType: string
}

const FeaturedPost = ({
  headerImage,
  title,
  type,
  slug,
  teaser,
  subType,
}: FeaturePostProps) => {
  const headerImageComp = headerImage ? (
    <Link to={`${slug}`} as={GatsbyLink}>
      <MyImage
        image={getImage(headerImage)}
        objectFit="cover"
        alt={`Photo`}
        as={GatsbyImage}
        variant="homePageImage"
      />
    </Link>
  ) : (
    ''
  )
  return (
    <Flex sx={{ flexWrap: 'wrap' }}>
      <Box sx={{ flexGrow: 1, flexBasis: 'sidebar', width: '65%' }}>
        {headerImageComp}
      </Box>
      <Box
        sx={{
          flexGrow: 99999,
          flexBasis: 0,
          minWidth: 320,
          bg: 'backgroundEm',
        }}
      >
        <Flex
          sx={{
            flexDirection: 'column',
            // alignItems: ['left', 'left', 'left'],
            justifyContent: 'center',
            padding: '20px',
            height: '100%',
          }}
        >
          <Box sx={{ flex: '1 1 auto' }}></Box>
          <Box sx={{}}>
            <Text
              as="p"
              variant="postType"
              sx={{ textAlign: 'left', paddingBottom: '10px' }}
            >
              {subType}
            </Text>
            <Link
              to={`${slug}`}
              as={GatsbyLink}
              sx={{ textDecoration: 'none' }}
            >
              <Text as="h1" variant="postTitle" sx={{ textAlign: 'left' }}>
                {title}
              </Text>
            </Link>
            <Text
              as="p"
              variant="postSubtitle"
              sx={{
                textAlign: 'left',
                paddingTop: '10px',
                marginBottom: '0px',
              }}
            >
              {teaser}
            </Text>
          </Box>
          <Flex sx={{ flex: '1 1 auto', width: '100%' }}>
            <Box sx={{ marginLeft: 'auto', alignSelf: 'flex-end' }}>
              <Link
                to={`${slug}`}
                as={GatsbyLink}
                sx={{
                  fontFamily: 'body',
                  textDecoration: 'none',
                  ':hover': { textDecoration: 'underline' },
                }}
              >
                <Text>Read the full post</Text>
              </Link>
            </Box>
          </Flex>
        </Flex>
      </Box>
    </Flex>
  )
}

export default FeaturedPost
