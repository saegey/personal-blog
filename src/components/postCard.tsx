import { Text, Card, Image, Link, Box, Flex } from 'theme-ui'
import { Link as GatsbyLink } from 'gatsby'
import { GatsbyImage } from 'gatsby-plugin-image'
import { PostCardProps } from '../common/types'
import { MyLinkProps, MyImageProps } from '../common/types'

const MyLink = Link as any as (props: MyLinkProps) => JSX.Element

const MyImage = Image as any as (props: MyImageProps) => JSX.Element

const PostCard = ({ post, title, image }: PostCardProps) => {
  return (
    <MyLink
      to={`/${post.fields?.slug}`}
      itemProp="url"
      sx={{ textDecoration: 'none' }}
      as={GatsbyLink}
    >
      <Card sx={{ background: 'muted'}}>
        <div
          sx={{
            display: 'flex',
            flexWrap: 'wrap',
          }}
        >
          <div
            sx={{
              flexGrow: 1,
              flexBasis: 'sidebar',
            }}
          >
            {image && (
              <MyImage
                layout="constrained"
                image={image}
                objectFit="cover"
                alt={`${title} Photo`}
                as={GatsbyImage}
                variant="postCardImage"
              />
            )}
          </div>
          <div
            sx={{
              flexGrow: 99999,
              flexBasis: 0,
              minWidth: 320,
            }}
          >
            <Box sx={{ height: '100%' }}>
              <Flex
                sx={{
                  flexDirection: 'column',
                  height: '100%',
                }}
              >
                <Box sx={{ flex: '1' }}>
                  <Box sx={{ marginTop: '20px', marginLeft: '20px' }}>
                    <Text variant="postCardType">{post.frontmatter?.type}</Text>
                  </Box>
                </Box>
                <Box sx={{ flex: '1' }}>
                  <Flex sx={{ height: '100%' }}>
                    <Box sx={{ marginX: '20px', marginY: 'auto' }}>
                      <Text as="h2" variant="postCardTitle">
                        {title}
                      </Text>
                      <Text variant="postCardSubtitle">
                        {post.frontmatter?.location}
                      </Text>
                    </Box>
                  </Flex>
                </Box>
                <Box sx={{ flex: '1', marginTop: 'auto' }}>
                  <Flex sx={{ height: '100%' }}>
                    <Box
                      sx={{
                        marginTop: 'auto',
                        marginBottom: '20px',
                        marginX: '20px',
                      }}
                    >
                      <Text variant="postCardBottom">
                        {post.frontmatter?.date}
                      </Text>
                    </Box>
                  </Flex>
                </Box>
              </Flex>
            </Box>
          </div>
        </div>
      </Card>
    </MyLink>
  )
}

export default PostCard
