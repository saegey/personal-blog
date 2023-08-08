import { Flex, Box, Text } from 'theme-ui'
import { StaticImage } from 'gatsby-plugin-image'
import moment from 'moment'

import { useViewport } from '../../../context/ViewportProvider'

interface PostAuthorProps {
  publishedDate: string
}
const PostAuthor = ({ publishedDate }: PostAuthorProps) => {
  const { width } = useViewport()
  return (
    <Box
      sx={{
        position: width < 960 ? 'relative' : 'absolute',
        left: 0,
        top: 0,
        maxWidth: '690px',
        marginX: width > 831 && width < 960 ? 'auto' : null,
        width: width < 960 ? '100%' : '150px',
        height: '100%',
        marginBottom: ['20px', '60px', '60px'],
      }}
    >
      <Flex
        sx={{
          flexDirection: ['row', 'row', 'column'],
          alignItems: 'flex-start',
          gap: '20px',
        }}
      >
        <StaticImage
          layout="constrained"
          formats={['auto', 'webp', 'avif']}
          src="../../../images/author.jpg"
          // objectFit="fill"
          transformOptions={{ grayscale: true }}
          quality={95}
          alt="Profile picture"
          sx={{
            borderRadius: ['50%', '50%', '50%'],
            height: ['50px', '100px', '100px'],
            width: ['50px', '100px', '100px'],
            marginBottom: [0, '12px', '12px'],
            minWidth: ['50px', '50px', '100px'],
          }}
        />
        <Flex sx={{ flexDirection: 'column' }}>
          <Text
            as="span"
            sx={{
              fontSize: '13px',
              fontWeight: '700',
              lineHeight: '18px',
              textTransform: 'uppercase',
            }}
          >
            by Adam Saegebarth
          </Text>
          <Text
            as="span"
            sx={{ fontSize: '13px', fontWeight: '700', lineHeight: '18px' }}
          >
            {moment(publishedDate).format('MM.DD.YY')}
          </Text>
        </Flex>
      </Flex>
    </Box>
  )
}

export default PostAuthor
