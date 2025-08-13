import type { PageProps } from 'gatsby'
import { graphql, Link as GatsbyLink } from 'gatsby'
import { Container, Box, Text, Flex, Grid, Link } from 'theme-ui'
import { getImage, IGatsbyImageData } from 'gatsby-plugin-image'
import moment from 'moment'

import Seo from '../components/seo'
import CustomImage from '../components/CustomImage'

const PostList: React.FC<PageProps<DataProps>> = ({ data }) => {
  const posts = data.allMdx.nodes

  return (
    <Container p={['20px', '20px', '32px']} sx={{ maxWidth: '1090px' }}>
      <Grid columns={[1, 2, 3]} sx={{ rowGap: '60px', columnGap: '20px' }}>
        {posts.map((post, index: number) => {
          const { title, headerImage, subType, publishedDate } =
            post.frontmatter
          const { slug } = post.fields

          return (
            <Box key={`post-${index}`}>
              <Link href={`/${slug}`} as={GatsbyLink}>
                {headerImage ? (
                  <CustomImage
                    layout="constrained"
                    image={getImage(headerImage)}
                    alt={`${title} Photo`}
                    theme={{
                      borderRadius: '5px',
                      height: ['300px', '280px', '260px'],
                    }}
                  />
                ) : (
                  <Box
                    sx={{
                      height: ['300px', '280px', '260px'],
                      borderRadius: '5px',
                      backgroundColor: 'primaryMuted',
                    }}
                  ></Box>
                )}
              </Link>
              <Box>
                <Flex
                  sx={{
                    flexDirection: 'column',
                    gap: '20px',
                  }}
                >
                  <Box>
                    <Text as="h2">
                      <Link
                        href={`/${slug}`}
                        as={GatsbyLink}
                        sx={{
                          fontSize: '16px',
                          lineHeight: '20px',
                          fontWeight: 700,
                        }}
                      >
                        {title}
                      </Link>
                      {subType && (
                        <>
                          <Text
                            as="span"
                            sx={{
                              fontSize: '16px',
                              lineHeight: '20px',
                              fontWeight: 700,
                              color: 'primary',
                            }}
                          >
                            {' '}
                            •{' '}
                          </Text>
                          <Text
                            as="span"
                            sx={{
                              fontSize: '16px',
                              lineHeight: '20px',
                              fontWeight: 700,
                              color: 'primary',
                            }}
                          >
                            {subType}
                          </Text>
                        </>
                      )}
                    </Text>
                  </Box>
                  <Box>
                    <Text
                      as="p"
                      sx={{
                        fontWeight: 500,
                        fontSize: '12px',
                        lineHeight: '14px',
                        letterSpacing: '.1em',
                        textTransform: 'uppercase',
                      }}
                    >
                      By Adam Saegebarth •&nbsp;
                      {moment(publishedDate).startOf('day').fromNow()}
                    </Text>
                  </Box>
                </Flex>
              </Box>
            </Box>
          )
        })}
      </Grid>
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
        frontmatter: { isActive: { ne: false }, type: { ne: "projects" } }
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
