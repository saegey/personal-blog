import * as React from "react"
import { Text, Card, Flex, Badge, Image, Box, Link } from "theme-ui"
import { Link as GatsbyLink } from "gatsby"
import { GatsbyImage } from "gatsby-plugin-image"

const PostCard = ({ post, title, image }) => {
  return (
    <Card
      sx={{
        // maxWidth: 256,
        padding: 0,
        borderRadius: 4,
        boxShadow:
          "0 8px 16px -4px rgba(0,0,0,.1), 0 0 8px -3px rgba(0,0,0,.1)",
        marginBottom: "20px",
        backgroundColor: "cardBackground",
      }}
    >
      <Flex>
        <Link
          to={post.fields.slug}
          itemProp="url"
          sx={{ textDecoration: "none" }}
          as={GatsbyLink}
        >
          <Image
            image={image}
            alt={`Alt text`}
            as={GatsbyImage}
            sx={{
              width: "200px",
              zIndex: "100",
              borderTopLeftRadius: 4,
              borderBottomLeftRadius: 4,
            }}
          />
        </Link>
        <Box sx={{ margin: "10px" }}>
          <Link
            to={post.fields.slug}
            itemProp="url"
            sx={{ textDecoration: "none" }}
            as={GatsbyLink}
          >
            <Text as="h2" variant="subHeadline">
              {title}
            </Text>
          </Link>
          <Box sx={{ marginBottom: "20px" }}>
            <Text
              sx={{
                fontSize: "1",
                fontFamily: "body",
              }}
            >
              {post.frontmatter.date}
            </Text>
          </Box>
          <Flex>
            {post.frontmatter.tags.map(tag => {
              return (
                <Badge mr={1} variant="listSection">
                  {tag}
                </Badge>
              )
            })}
          </Flex>
        </Box>
      </Flex>
    </Card>
  )
}

export default PostCard
