/** @jsx jsx */
import { jsx, Container } from "theme-ui"
import { graphql } from "gatsby"
import { getImage } from "gatsby-plugin-image"

import Seo from "../components/seo"
import PostCard from "../components/postCard"

const BlogIndex = ({ data, location }) => {
  // const siteTitle = data.site.siteMetadata?.title || `Title`
  const posts = data.allMdx.nodes

  return (
    <Container sx={{ padding: "0px" }} bg="muted">
      <ol sx={{ p: 0, marginTop: "0px" }}>
        {posts.map(post => {
          const image = getImage(post.frontmatter.headerImage)
          const title = post.frontmatter.title || post.fields.slug

          return <PostCard post={post} title={title} image={image} />
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
    site {
      siteMetadata {
        author {
          name
          summary
        }
        description
      }
    }
    allMdx(
      sort: { fields: [frontmatter___date], order: DESC }
      filter: { frontmatter: { type: { eq: "Race Journal" } } }
    ) {
      nodes {
        fields {
          slug
        }
        excerpt(pruneLength: 250)
        frontmatter {
          title
          type
          date(formatString: "MMMM DD, YYYY")
          tags
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
