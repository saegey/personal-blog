import { graphql } from 'gatsby'
import { Container, Text, Link, Flex, Box, Image } from 'theme-ui'
import { Link as GatsbyLink } from 'gatsby'
import { GatsbyImage, getImage } from 'gatsby-plugin-image'

const MyImage = Image as any as (props: MyImageProps) => JSX.Element

// import Layout from '../components/layout'
import Seo from '../components/seo'
// import LandscapeImage from '../components/LandscapeImage'
// import { slugify } from '../lib/util'

const HomePage = ({ data, pageContext }) => {
  const siteTitle = data.site.siteMetadata.title
  // cont
  const featuredPost = data?.allMdx?.edges[0].node

  return (
    <Container sx={{ paddingY: '10px' }}>
      <Flex sx={{ flexWrap: 'wrap' }}>
        <Box sx={{ flexGrow: 1, flexBasis: 'sidebar' }}>
          {/* <LandscapeImage
						layout="constrained"
            image={featuredPost.frontmatter.headerImage}
            maximize={false}
            roundedEdges={false}
						objectFit="cover"
          /> */}
          <MyImage
            // layout="constrained"
            image={getImage(featuredPost.frontmatter.headerImage)}
            objectFit="cover"
            alt={`Photo`}
            as={GatsbyImage}
            variant="homePageImage"
          />
        </Box>
        <Box
          sx={{
            flexGrow: 99999,
            flexBasis: 0,
            minWidth: 320,
            bg: 'backgroundEm',
          }}
        >
          <Flex
            sx={{
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '20px',
              height: '100%',
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
        </Box>
      </Flex>
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
