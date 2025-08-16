import type { PageProps } from 'gatsby'
import { graphql } from 'gatsby'
import { Container, Box, Flex, Divider } from 'theme-ui'
import { IGatsbyImageData } from 'gatsby-plugin-image'

import Seo from '../components/seo'
import FeaturedPost from '../components/home/FeaturedPost'

const PostList: React.FC<PageProps<DataProps>> = ({ data }) => {
  const posts = data.allMdx.nodes

  return (
    <Container sx={{ paddingTop: '0'}}>
      <Box sx={{ marginBottom: [5] }}>
        <Flex sx={{ gap: 3, flexDirection: 'column' }}>
          {posts.map((post, idx: number) => {
            const { title, teaser, subType, publishedDate, headerImage } =
              post.frontmatter
            return (
              <>
                <FeaturedPost
                  key={idx}
                  headerImage={headerImage}
                  title={title}
                  slug={`/${post.fields.slug}`}
                  teaser={teaser}
                  subType={subType ?? ''}
                  updatedAt={
                    publishedDate ? new Date(publishedDate) : new Date(0)
                  }
                />
                {idx < posts.length - 1 && <Divider color="primaryMuted" />}
              </>
            )
          })}
        </Flex>
      </Box>
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
        teaser: string
        subType?: string
        publishedDate?: string
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
export const Head = () => (
  <Seo title="List of all posts" description={''} pathname={''} />
)

export const pageQuery = graphql`
  query postPageQuery {
    allMdx(
      sort: { frontmatter: { date: DESC } }
      filter: {
        frontmatter: { isActive: { ne: false }, type: { eq: "Project" } }
      }
    ) {
      nodes {
        fields {
          slug
        }
        # excerpt(pruneLength: 250)
        frontmatter {
          title
          type
          subType
          location
          publishedDate
          date(formatString: "MMM DD, YYYY")
          tags
          teaser
          headerImage {
            childImageSharp {
              gatsbyImageData(placeholder: BLURRED)
            }
          }
        }
      }
    }
  }
`
