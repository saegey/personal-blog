import { graphql } from 'gatsby'
import {
  Container,
  Text,
  Link,
  Flex,
  Box,
  Divider,
  Button,
  Grid,
} from 'theme-ui'
import { Link as GatsbyLink, PageProps } from 'gatsby'
import { ImageDataLike } from 'gatsby-plugin-image'

import Seo from '../components/seo'
import FeaturedPost from '../components/FeaturedPost'
import SubFeaturedPost from '../components/SubFeaturedPost'

type PostProps = {
  node: {
    frontmatter: {
      headerImage: ImageDataLike | undefined
      title: string
      teaser: string
      type: string
      subType: string
      publishedDate: Date
    }
    fields: {
      slug: string
    }
  }
}

type DataProps = {
  allMdx: {
    edges: Array<PostProps>
  }
}

const HomePage: React.FC<PageProps<DataProps>> = ({ data }) => {
  const featuredPost = data?.allMdx?.edges[0].node
  const { title, type, teaser, headerImage, subType, publishedDate } =
    featuredPost.frontmatter
  return (
    <Container sx={{ paddingTop: '0', maxWidth: '1440px', margin: '0 auto' }}>
      <Box sx={{ marginX: '20px' }}>
        <Divider sx={{ marginBottom: '20px' }} />
        <FeaturedPost
          headerImage={headerImage}
          title={title}
          type={type}
          slug={featuredPost.fields.slug}
          teaser={teaser}
          subType={subType}
          updatedAt={publishedDate}
        />
        <Divider sx={{ marginTop: '20px' }} />
      </Box>
      <Grid gap={2} columns={[null, '2fr 1fr', '2fr 1fr']}>
        <Box>
          <Flex
            sx={{
              marginX: '20px',
              marginY: '20px',
              gap: ['20px', '40px', '40px'],
              flexDirection: 'column',
            }}
          >
            {[1, 2, 3].map(n => {
              const { title, headerImage, teaser, subType, publishedDate } =
                data.allMdx.edges[n].node.frontmatter
              return (
                <Box key={`subFeature-${n}`}>
                  <SubFeaturedPost
                    title={title}
                    headerImage={headerImage}
                    slug={data.allMdx.edges[n].node.fields.slug}
                    teaser={teaser}
                    subType={subType}
                    updatedAt={publishedDate}
                  />
                  <Divider
                    sx={{
                      display: ['inherit', 'none', 'none'],
                      marginTop: '10px',
                      marginBottom: 0,
                    }}
                  />
                </Box>
              )
            })}
          </Flex>
          <Flex sx={{ justifyContent: 'center' }}>
            <Link
              to={`/race-journal`}
              as={GatsbyLink}
              sx={{
                fontFamily: 'body',
                textDecoration: 'none',
                ':hover': { textDecoration: 'underline' },
              }}
            >
              <Button sx={{ padding: '10px' }}>View Older Posts</Button>
            </Link>
          </Flex>
        </Box>
        <Box>
          <Box
            sx={{
              padding: '20px',
              borderLeftStyle: 'solid',
              borderLeftWidth: '1px',
              borderLeftColor: 'muted',
              height: '100%',
            }}
          >
            <Text
              as="p"
              sx={{
                // marginX: 'auto',
                fontFamily: 'body',
                fontWeight: '700',
                letterSpacing: '.1em',
                fontSize: ['13px', '13px', '13px'],
                textTransform: 'uppercase',
                color: 'primary',
                lineHeight: '130%',
                marginBottom: '10px',
              }}
            >
              Race Results
            </Text>
            <Flex sx={{ flexDirection: 'column', gap: '10px' }}>
              {[0, 1, 2].map(index => {
                return (
                  <Flex
                    sx={{ flexDirection: 'column', gap: '10px' }}
                    key={`raceResult-${index}`}
                  >
                    <Text as="h3">
                      {data.allMdx.edges[index].node.frontmatter.title}
                    </Text>
                    <Flex sx={{ flexDirection: 'column', gap: '5px' }}>
                      {data.allMdx.edges[index].node.results.fields.data
                        .filter(
                          d =>
                            ['1', '2', '3'].includes(d.place) ||
                            d.name === 'Adam Saegebarth'
                        )
                        .map((d, i) => (
                          <Flex
                            sx={{
                              alignItems: 'center',
                              justifyContent: 'space-between',
                              gap: '5px',
                            }}
                            key={`raceResultItem-${i}`}
                          >
                            <Text as="p" sx={{ fontSize: '13px' }}>
                              <Text as="span">{d.place}.</Text> {d.name}
                            </Text>
                            <Text as="time" sx={{ fontSize: '13px' }}>
                              {d.time}
                            </Text>
                          </Flex>
                        ))}
                    </Flex>
                    <Link
                      as={GatsbyLink}
                      href={`${data.allMdx.edges[index].node.fields.slug}#results`}
                      sx={{
                        marginLeft: 'auto',
                        fontFamily: 'body',
                        fontWeight: '700',
                        letterSpacing: '.1em',
                        fontSize: ['13px', '13px', '13px'],
                        textTransform: 'uppercase',
                        color: 'primary',
                      }}
                    >
                      Full Results
                    </Link>
                  </Flex>
                )
              })}
            </Flex>
          </Box>
        </Box>
      </Grid>
    </Container>
  )
}

export const Head: React.FC<PageProps<DataProps>> = ({ data }) => {
  return (
    <Seo
      title="Home"
      description="Home page about races and detailed breakdown of how they went down"
      pathname="/"
      image={data.allMdx.edges[0].node.frontmatter.headerImage}
    />
  )
}

export default HomePage

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }
    allMdx(sort: { frontmatter: { date: DESC } }, limit: 4) {
      edges {
        node {
          id
          fields {
            slug
          }
          frontmatter {
            subType
            title
            tags
            type
            teaser
            headerImage {
              childImageSharp {
                gatsbyImageData(placeholder: BLURRED)
              }
            }
            publishedDate
          }
          results {
            id
            fields {
              data {
                place
                name
                time
              }
            }
          }
        }
      }
    }
  }
`
