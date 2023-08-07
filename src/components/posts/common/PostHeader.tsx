import { Flex, Box, Text } from 'theme-ui'
import CustomImage from '../../CustomImage'
import { getImage, IGatsbyImageData } from 'gatsby-plugin-image'

interface PostHeaderProps {
  headerImage: {
    childImageSharp: {
      gatsbyImageData: IGatsbyImageData
    }
  }
  type: String
  title: String
  date: String
  location: String
  teaser?: String | undefined
  headerImageCaption?: String | undefined
}

const PostHeader = ({
  headerImage,
  type,
  title,
  date,
  location,
  teaser,
  headerImageCaption,
}: PostHeaderProps) => {
  return (
    <Flex
      sx={{
        marginTop: '10px',
        flexDirection: ['column', 'row', 'row'],
        justifyContent: 'space-between',
      }}
    >
      <Box
        sx={{
          width: ['100%', '65%', '65%'],
        }}
      >
        <CustomImage
          image={getImage(headerImage)}
          objectFit="fill"
          alt={`Photo`}
          variant="homePageImage"
          theme={{ height: '100%' }}
        />
      </Box>
      <Flex
        sx={{
          width: ['calc(100% - 40px)', '35%', '35%'],
          marginX: ['20px', '0', '0'],
          bg: ['', 'muted', 'muted'],
          paddingY: ['10px', '20px', '20px'],
          paddingX: [0, '20px', '20px'],
          gap: '10px',
          flexDirection: 'column',
          justifyContent: 'center',
          position: 'relative',
          borderBottomColor: 'muted',
          borderBottomWidth: ['1px', 0, 0],
          borderBottomStyle: 'solid',
        }}
      >
        <Text variant="postType" sx={{ marginTop: 'auto' }}>
          {type}
        </Text>
        <Text as="h1" variant="postTitle" sx={{ color: 'text' }}>
          {title}
        </Text>
        <Text sx={{ fontSize: '14px', fontWeight: '300' }}>
          {date} — {location}
        </Text>
        <Text
          as="p"
          sx={{
            color: 'text',
            fontWeight: '500',
            fontSize: '16px',
            lineHeight: '22px',
          }}
        >
          {teaser}
        </Text>
        <Text
          sx={{
            color: 'text',
            marginTop: 'auto',
            fontSize: '12px',
            lineHeight: '15px',
            fontWeight: '500',
            order: [-1, 0, 0],
            marginBottom: ['10px', '0', '0'],
          }}
        >
          {headerImageCaption}
        </Text>
      </Flex>
    </Flex>
  )
}

export default PostHeader
