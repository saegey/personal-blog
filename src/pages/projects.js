/** @jsx jsx */
import * as React from "react"
import { jsx, Container } from "theme-ui"
import { graphql } from "gatsby"
import { getImage } from "gatsby-plugin-image"

import Seo from "../components/seo"
import PostCard from "../components/postCard"
import SafariStyle from "../components/SafariStyle"

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
  return (
    <>
      <SafariStyle />
      <Container sx={{ padding: "0px" }} bg="muted">
        <ol sx={{ p: 0 }}>
          {posts.map(post => {
            const image = getImage(post.frontmatter.headerImage)
            const title = post.frontmatter.title || post.fields.slug

            return <PostCard post={post} title={title} image={image} />
          })}
        </ol>
      </Container>
    </>
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
    allMdx(
      sort: { fields: [frontmatter___date], order: DESC }
      filter: { frontmatter: { type: { eq: "projects" } } }
    ) {
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
