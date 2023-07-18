import { graphql } from 'gatsby'
import { Container, Text, Link, Flex, Box } from 'theme-ui'
import { Link as GatsbyLink } from 'gatsby'

// import Layout from '../components/layout'
import Seo from '../components/seo'
import LandscapeImage from '../components/LandscapeImage'
// import { slugify } from '../lib/util'

const HomePage = ({ data, pageContext }) => {
  const siteTitle = data.site.siteMetadata.title
  // cont
  const featuredPost = data?.allMdx?.edges[0].node

  return (
    <Container sx={{ paddingY: '10px' }}>
      <>
        <Flex>
          <Box sx={{ width: '67%' }}>
            <LandscapeImage
              image={featuredPost.frontmatter.headerImage}
              maximize={false}
              roundedEdges={false}
            />
          </Box>
          <Flex
            sx={{
              bg: 'backgroundEm',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '20px',
            }}
          >
            <Box sx={{ flex: '1 1 auto' }}></Box>
            <Box sx={{}}>
              <Text
                as="p"
                variant="postType"
                sx={{ textAlign: 'left', paddingBottom: '10px' }}
              >
                {featuredPost.frontmatter.type}
              </Text>
              <Text as="h1" variant="postTitle" sx={{ textAlign: 'left' }}>
                {featuredPost.frontmatter.title}
              </Text>
              <Text
                as="p"
                variant="postSubtitle"
                sx={{ textAlign: 'left', paddingTop: '10px' }}
              >
                This is a race you can't miss. Luxury gravel and strong fields
                dominate the storyline.
              </Text>
            </Box>
            <Flex sx={{ flex: '1 1 auto', width: '100%' }}>
              <Box sx={{ marginLeft: 'auto', alignSelf: 'flex-end' }}>
                <Link
                  to={`${featuredPost.fields.slug}`}
                  as={GatsbyLink}
                  sx={{
                    fontFamily: 'body',
                    textDecoration: 'none',
                    ':hover': { textDecoration: 'underline' },
                  }}
                >
                  <Text>Read the full post</Text>
                </Link>
              </Box>
            </Flex>
          </Flex>
        </Flex>
        {/* {JSON.stringify(featuredPost)} */}
      </>
    </Container>
  )
}

export const Head = () => <Seo title="Home" />

export default HomePage

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }
    allMdx(sort: { frontmatter: { date: DESC } }, limit: 1) {
      edges {
        node {
          id
          fields {
            slug
          }
          frontmatter {
            title
            type
            headerImage {
              childImageSharp {
                gatsbyImageData(placeholder: BLURRED)
              }
            }
          }
        }
      }
    }
  }
`
