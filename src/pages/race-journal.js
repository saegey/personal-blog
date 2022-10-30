/** @jsx jsx */
import * as React from "react"
import { jsx, Container } from "theme-ui"
import { graphql } from "gatsby"
import { getImage } from "gatsby-plugin-image"

import Seo from "../components/seo"
import PostCard from "../components/postCard"
import SafariStyle from "../components/SafariStyle"

const BlogIndex = ({ data, location }) => {
  const posts = data.allMdx.nodes

  return (
    <>
      <SafariStyle />
      <Container sx={{ padding: "0px" }}>
        <ol sx={{ p: 0, marginTop: "0px" }}>
          {posts.map(post => {
            return (
              <PostCard
                post={post}
                title={post.frontmatter.title || post.fields.slug}
                image={getImage(post.frontmatter.headerImage)}
              />
            )
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
export const Head = () => <Seo title="Race Journal Posts" />

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
          date(formatString: "MMM DD, YYYY")
          tags
          location
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
