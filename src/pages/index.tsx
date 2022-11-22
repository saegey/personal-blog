import type { PageProps } from 'gatsby'
import { graphql } from 'gatsby'
import { Container, Box } from 'theme-ui'
import { getImage, IGatsbyImageData } from 'gatsby-plugin-image'

import Seo from '../components/seo'
import PostCard from '../components/postCard'
import SafariStyle from '../components/SafariStyle'

const BlogIndex: React.FC<PageProps<DataProps>> = ({ data }) => {
  const posts = data.allMdx.nodes

  return (
    <>
      <SafariStyle />
      <Container sx={{ padding: '0px' }} bg="muted">
        <Box as="ol" sx={{ p: 0 }}>
          {posts.map((post, index: number) => {
            if (post === null || post.frontmatter?.headerImage === undefined) {
              return
            }
            const image = getImage(post.frontmatter.headerImage)
            const title = post?.frontmatter?.title

            return (
              <PostCard post={post} title={title} image={image} key={index} />
            )
          })}
        </Box>
      </Container>
    </>
  )
}

export default BlogIndex

type DataProps = {
  allMdx: {
    nodes: {
      fields: {
        slug: string
      }
      frontmatter: {
        headerImage: {
          childImageSharp: {
            gatsbyImageData: IGatsbyImageData
          }
        }
        title: string
        date: string
        location: string
        type: string
        tags: ReadonlyArray<string>
      }
    }[]
  }
}

/**
 * Head export to define metadata for the page
 *
 * See: https://www.gatsbyjs.com/docs/reference/built-in-components/gatsby-head/
 */
export const Head = () => <Seo title="All posts" />

export const pageQuery = graphql`
  query BlogIndex {
    allMdx(sort: {frontmatter: {date: DESC}}) {
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
              gatsbyImageData(placeholder: BLURRED, width: 300, height: 200)
            }
          }
        }
      }
    }
  }
`
