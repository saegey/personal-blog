/** @jsxImportSource theme-ui */

import * as React from "react"
import { Text, Card, Flex, Badge, Image, Box, Link } from "theme-ui"
import { Link as GatsbyLink } from "gatsby"
import { GatsbyImage } from "gatsby-plugin-image"

const PostCard = ({ post, title, image }) => {
  return (
    <Card
      sx={{
        padding: 0,
        borderRadius: 4,
        boxShadow:
          "0 8px 16px -4px rgba(0,0,0,.1), 0 0 8px -3px rgba(0,0,0,.1)",
        marginBottom: "20px",
        backgroundColor: "cardBackground",
      }}
    >
      <div
        sx={{
          display: "flex",
          flexWrap: "wrap",
        }}
      >
        <div
          sx={{
            flexGrow: 1,
            flexBasis: "sidebar",
          }}
        >
          <Link
            to={post.fields.slug}
            itemProp="url"
            sx={{ textDecoration: "none" }}
            as={GatsbyLink}
          >
            <Image
              layout="constrained"
              image={image}
              objectFit="cover"
              alt={`Alt text`}
              as={GatsbyImage}
              sx={{
                width: ["100%", "200px", "200px"],
                zIndex: "100",
                borderTopLeftRadius: 4,
                borderTopRightRadius: [4, 0, 0],
                borderBottomLeftRadius: [0, 4, 4],
              }}
            />
          </Link>
        </div>
        <main
          sx={{
            flexGrow: 99999,
            flexBasis: 0,
            minWidth: 320,
          }}
        >
          <Box sx={{ margin: "10px" }}>
            <Link
              to={post.fields.slug}
              itemProp="url"
              sx={{ textDecoration: "none" }}
              as={GatsbyLink}
            >
              <Box sx={{ marginBottom: "10px" }}>
                <Text
                  sx={{
                    fontSize: "16px",
                    fontFamily: "body",
                    textTransform: "uppercase",
                    fontWeight: "600",
                    letterSpacing: "1px",
                  }}
                >
                  {post.frontmatter.type}
                </Text>
              </Box>
              <Text
                as="h2"
                // variant="subHeadline"
                sx={{
                  fontSize: ["2", "3", "3"],
                  fontFamily: "serif",
                  fontWeight: "600",
                  color: "text",
                }}
              >
                {title}
              </Text>
            </Link>
            <Box sx={{ marginBottom: "20px" }}>
              <Text
                sx={{
                  fontSize: ["14px", "2", "16px"],
                  fontFamily: "body",
                  fontWeight: 400,
                  color: "primary",
                  letterSpacing: "0.3px",
                }}
              >
                {post.frontmatter.date}
              </Text>
            </Box>
            <Flex sx={{ display: ["none", "inherit", "inherit"] }}>
              {post.frontmatter.tags.map(tag => {
                return (
                  <Badge
                    mr={1}
                    sx={{
                      fontFamily: "body",
                      padding: "5px",
                      fontSize: ["0", "1", "1"],
                      color: "background",
                      textTransform: "uppercase",
                      marginRight: "5px",
                      fontWeight: "600",
                    }}
                  >
                    {tag}
                  </Badge>
                )
              })}
            </Flex>
          </Box>
        </main>
      </div>
    </Card>
  )
}

export default PostCard
