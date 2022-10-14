/** @jsx jsx */
import { jsx, Container, Text, Card, Flex, Badge, Image, Box } from "theme-ui"
import { Link as GatsbyLink, graphql } from "gatsby"
import { GatsbyImage, getImage } from "gatsby-plugin-image"
import { Link } from "theme-ui"

import Seo from "../components/seo"

const BlogIndex = ({ data, location }) => {
  // const siteTitle = data.site.siteMetadata?.title || `Title`
  const posts = data.allMdx.nodes

  if (posts.length === 0) {
    return (
      <div sx={{ p: 0 }}>
        <p>
          No blog posts found. Add markdown posts to "content/blog" (or the
          directory you specified for the "gatsby-source-filesystem" plugin in
          gatsby-config.js).
        </p>
      </div>
    )
  }
  console.log(posts)
  return (
    <Container sx={{ padding: "0px" }} bg="muted">
      <ol sx={{ p: 0 }}>
        {posts.map(post => {
          const image = getImage(post.frontmatter.headerImage)
          const title = post.frontmatter.title || post.fields.slug

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
                    sx={{ width: "200px" }}
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
                    <Badge mr={1} variant="listSection">
                      Gravel
                    </Badge>
                  </Flex>
                </Box>
              </Flex>
            </Card>
          )
        })}
      </ol>
    </Container>
  )
}

export default BlogIndex

/**
 * Head export to define metadata for the page
 *
 * See: https://www.gatsbyjs.com/docs/reference/built-in-components/gatsby-head/
 */
export const Head = () => <Seo title="All posts" />

export const pageQuery = graphql`
  query SITE_INDEX_QUERY {
    allMdx(sort: { fields: [frontmatter___date], order: DESC }) {
      nodes {
        fields {
          slug
        }
        excerpt(pruneLength: 250)
        frontmatter {
          title
          date(formatString: "YYYY MMMM DD")
          headerImage {
            childImageSharp {
              gatsbyImageData(placeholder: BLURRED, formats: [AUTO, WEBP, AVIF])
            }
          }
        }
      }
    }
  }
`
