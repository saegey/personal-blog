/** @jsx jsx */
import { graphql } from "gatsby"
import { jsx, Container } from "theme-ui"
import { getImage } from "gatsby-plugin-image"

import Bio from "../components/bio"
import Seo from "../components/seo"
import PostCard from "../components/postCard"

const BlogIndex = ({ data, location }) => {
  const posts = data.allMdx.nodes

  if (posts.length === 0) {
    return (
      <div>
        <Bio />
        <p>
          No blog posts found. Add markdown posts to "content/blog" (or the
          directory you specified for the "gatsby-source-filesystem" plugin in
          gatsby-config.js).
        </p>
      </div>
    )
  }

  return (
    <Container sx={{ padding: "0px" }} bg="muted">
      <ol sx={{ p: 0 }}>
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
  query {
    site {
      siteMetadata {
        title
      }
    }
    allMdx(sort: { fields: [frontmatter___date], order: DESC }) {
      nodes {
        fields {
          slug
        }
        excerpt(pruneLength: 250)
        frontmatter {
          title
          date(formatString: "YYYY MMMM DD")
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
