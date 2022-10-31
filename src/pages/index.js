/** @jsx jsx */
import * as React from 'react'
import { graphql } from 'gatsby'
import { jsx, Container } from 'theme-ui'
import { getImage } from 'gatsby-plugin-image'

import Seo from '../components/seo'
import PostCard from '../components/postCard'
import SafariStyle from '../components/SafariStyle'

const BlogIndex = ({ data, location }) => {
  const posts = data.allMdx.nodes

  return (
    <>
      <SafariStyle />
      <Container sx={{ padding: '0px' }} bg="muted">
        <ol sx={{ p: 0 }}>
          {posts.map((post, index) => {
            const image = getImage(post.frontmatter.headerImage)
            const title = post.frontmatter.title || post.fields.slug

            return <PostCard post={post} title={title} image={image} key={index} />
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
          type
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
