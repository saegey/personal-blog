import * as React from 'react'
import type { PageProps } from "gatsby"
import { graphql } from 'gatsby'
import { Container, Box } from 'theme-ui'
import { getImage, ImageDataLike } from 'gatsby-plugin-image'

import Seo from '../components/seo'
import PostCard from '../components/postCard'
import SafariStyle from '../components/SafariStyle'

type DataProps = {
  site: {
    siteMetadata: {
      title: string
    }
  },
  allMdx: {
    nodes: [{
      frontmatter: {
        title: string,
        headerImage: ImageDataLike | null,
      },
      fields: {
        slug: string
      }
    }]
  }
}


const BlogIndex = ({ data }: PageProps<DataProps>) => {
  const posts = data.allMdx.nodes

  return (
    <>
      <SafariStyle />
      <Container sx={{ padding: '0px' }} bg="muted">
        <Box as="ol" sx={{ p: 0 }}>
          {posts.map((post, index) => {
            const image = getImage(post.frontmatter.headerImage)
            const title = post.frontmatter.title || post.fields.slug

            return <PostCard post={post} title={title} image={image} key={index} />
          })}
        </Box>
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
          location
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
