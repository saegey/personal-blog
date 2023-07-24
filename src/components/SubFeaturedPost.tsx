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

const SubFeaturedPost = ({
  title,
  headerImage,
  slug,
  type = 'Race Journal',
  teaser = '',
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
    <Flex
      sx={{
        flexWrap: 'wrap',
        gap: ['10px', '10px', '20px'],
      }}
    >
      <Box
        sx={{
          flexGrow: 1,
          flexBasis: 'sidebar',
          width: '30%',
          alignContent: 'center',
          alignItems: 'center',
          marginTop: 'auto',
          marginBottom: 'auto'
        }}
      >
        {headerImageComp}
      </Box>
      <Box
        sx={{
          flexGrow: 99999,
          flexBasis: 0,
          minWidth: [345, 345, 420],
          // bg: 'backgroundEm',
        }}
      >
        <Flex
          sx={{
            flexDirection: 'column',
            // alignItems: 'center',
            justifyContent: 'center',
            // paddingX: ['20px' '20px', '20px'],
            paddingY: ['20px', 0, 0],
            height: '100%',
          }}
        >
          <Box sx={{}}>
            <Text
              as="p"
              variant="postType"
              sx={{ textAlign: 'left', paddingBottom: '10px' }}
            >
              {subType ? subType : type}
            </Text>
            <Link
              to={`${slug}`}
              as={GatsbyLink}
              sx={{
                fontFamily: 'body',
                textDecoration: 'none',
              }}
            >
              <Text
                as="h1"
                variant="postTitle"
                sx={{
                  fontSize: ['20px', '24px', '24px'],
                  textAlign: 'left',
                  color: 'text',
                }}
              >
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
                color: 'text',
              }}
            >
              {teaser}
            </Text>
          </Box>
        </Flex>
      </Box>
    </Flex>
  )
}

export default SubFeaturedPost
