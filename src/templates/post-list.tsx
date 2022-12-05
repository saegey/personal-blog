import type { PageProps } from 'gatsby'
import { graphql } from 'gatsby'
import { Link as GatsbyLink } from 'gatsby'
import { Container, Box, Link, Flex } from 'theme-ui'
import { getImage, IGatsbyImageData } from 'gatsby-plugin-image'

import Seo from '../components/seo'
import PostCard from '../components/postCard'
import SafariStyle from '../components/SafariStyle'

type PageContext = {
  currentPage: number
  numPages: number
  urlPrefix: string
}

const PostList: React.FC<PageProps<DataProps, PageContext>> = ({
  data,
  pageContext,
}) => {
  const posts = data.allMdx.nodes
  console.log(pageContext)
  const { currentPage, numPages, urlPrefix } = pageContext
  const isFirst = currentPage === 1
  const isLast = currentPage === numPages
  const prevPage =
    currentPage - 1 === 1
      ? `${urlPrefix}`
      : `${urlPrefix === '/' ? '' : urlPrefix}/${(currentPage - 1).toString()}`

  const nextPage = `${urlPrefix === '/' ? '' : urlPrefix}/${(
    currentPage + 1
  ).toString()}`

  return (
    <Container p={['20px', '20px', '32px']} sx={{ maxWidth: 768 }}>
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
          <Flex>
            <Box sx={{ marginX: 'auto' }}>
              {!isFirst && (
                <Link
                  to={`${prevPage}`}
                  rel="prev"
                  as={GatsbyLink}
                  sx={{ fontFamily: 'body', paddingRight: '10px' }}
                >
                  ← Previous
                </Link>
              )}
              {!isLast && (
                <Link
                  to={`${nextPage}`}
                  rel="next"
                  as={GatsbyLink}
                  sx={{ fontFamily: 'body' }}
                >
                  Next →
                </Link>
              )}
            </Box>
          </Flex>
        </Box>
      </Container>
    </Container>
  )
}

export default PostList

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
  query postPageQuery($skip: Int!, $limit: Int!) {
    allMdx(sort: { frontmatter: { date: DESC } }, limit: $limit, skip: $skip) {
      nodes {
        fields {
          slug
        }
        # excerpt(pruneLength: 250)
        frontmatter {
          title
          type
          location
          date(formatString: "MMM DD, YYYY")
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
