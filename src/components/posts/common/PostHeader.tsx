import { Flex, Box, Text } from 'theme-ui'
import CustomImage from '../../CustomImage'
import { getImage, IGatsbyImageData } from 'gatsby-plugin-image'

interface PostHeaderProps {
  headerImage: {
    childImageSharp: {
      gatsbyImageData: IGatsbyImageData
    }
  }
  type: string
  title: string
  date: string
  location: string
  teaser?: string
  headerImageCaption?: string
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
  const imageData = getImage(headerImage)

  return (
    <Flex
      sx={{
        flexDirection: ['column', 'row'],
        justifyContent: 'space-between',
        gap: 3,
      }}
    >
      <Box sx={{ width: ['100%', '65%'] }}>
        {imageData && (
          <CustomImage
            image={imageData}
            objectFit="cover"
            alt={`${title} header image`}
            theme={{
              width: '100%',
              height: ['200px', '400px', '400px'],
              borderRadius: 'lg',
            }}
          />
        )}
      </Box>
      <Flex
        sx={{
          width: ['100%', '35%'],
          bg: ['transparent', 'primaryMuted'],
          py: [2, 3],
          px: [0, 3],
          gap: 2,
          flexDirection: 'column',
          justifyContent: 'center',
          position: 'relative',
          borderBottom: ['1px solid', '0'],
          borderColor: 'muted',
          borderRadius: ['none', 'card'],
        }}
      >
        <Text variant="postType" sx={{ mt: 'auto' }}>
          {type}
        </Text>
        <Text as="h1" variant="postTitle" sx={{ color: 'text' }}>
          {title}
        </Text>
        <Text variant="postSubtitle" sx={{ color: 'textMuted' }}>
          {date} — {location}
        </Text>
        {teaser && (
          <Text as="p" variant="postSubtitle" sx={{ color: 'text', fontWeight: 500 }}>
            {teaser}
          </Text>
        )}
        {headerImageCaption && (
          <Text
            variant="caption"
            sx={{
              color: 'text',
              mt: 'auto',
              order: [-1, 0],
              mb: [2, 0],
            }}
          >
            {headerImageCaption}
          </Text>
        )}
      </Flex>
    </Flex>
  )
}

export default PostHeader
