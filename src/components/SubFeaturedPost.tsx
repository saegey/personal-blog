import { Text, Link, Flex, Box, Image } from 'theme-ui'
import { Link as GatsbyLink } from 'gatsby'
import { GatsbyImage, getImage, ImageDataLike } from 'gatsby-plugin-image'
import moment from 'moment'

import { MyImageProps, MyLinkProps } from '../common/types'
const MyImage = Image as any as (props: MyImageProps) => JSX.Element
const MyLink = Link as any as (props: MyLinkProps) => JSX.Element

type FeaturePostProps = {
  headerImage: ImageDataLike | undefined
  title: string
  type: string
  slug: string
  teaser: string
  subType: string
  updatedAt: Date
}

const SubFeaturedPost = ({
  title,
  headerImage,
  slug,
  type = 'Race Journal',
  teaser = '',
  subType,
  updatedAt,
}: FeaturePostProps) => {
  const headerImageComp = headerImage ? (
    <MyLink to={`${slug}`} as={GatsbyLink}>
      <MyImage
        image={getImage(headerImage)}
        objectFit="cover"
        alt={`Photo`}
        as={GatsbyImage}
        variant="homePageImage"
        sx={{ borderRadius: '5px' }}
      />
    </MyLink>
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
          width: '50%',
          alignContent: 'center',
          alignItems: 'center',
          marginTop: 'auto',
          marginBottom: 'auto',
        }}
      >
        {headerImageComp}
      </Box>
      <Box
        sx={{
          flexGrow: 99999,
          flexBasis: 0,
          minWidth: 300,
          // bg: 'backgroundEm',
        }}
      >
        <Flex
          sx={{
            flexDirection: 'column',
            // justifyContent: 'flex-start',
            gap: '10px',
            height: '100%',
          }}
        >
          <Text
            as="p"
            sx={{
              // marginX: 'auto',
              fontFamily: 'body',
              fontWeight: '700',
              letterSpacing: '.1em',
              fontSize: ['13px', '13px', '13px'],
              textTransform: 'uppercase',
              color: 'primary',
              lineHeight: '130%',
            }}
          >
            {subType ? subType : type}
          </Text>
          <MyLink
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
          </MyLink>
          <Text
            as="p"
            variant="postSubtitle"
            sx={{
              textAlign: 'left',
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

export default SubFeaturedPost
