import { graphql } from 'gatsby'
import { Container, Text, Link, Flex, Box, Image, Button } from 'theme-ui'
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
  const { title, type, teaser, headerImage, subType } = featuredPost.frontmatter
  return (
    <Container sx={{ paddingY: '10px' }}>
      <Box sx={{ marginX: '20px' }}>
        <FeaturedPost
          headerImage={headerImage}
          title={title}
          type={type}
          slug={featuredPost.fields.slug}
          teaser={teaser}
          subType={subType}
        />
      </Box>
      <Flex
        sx={{
          marginX: '20px',
          marginY: '20px',
          gap: '20px',
          flexDirection: 'column',
        }}
      >
        <Text
          as="h2"
          sx={{
            fontFamily: 'body',
            fontSize: ['22px', '24px', '28px'],
            // borderTopColor: 'backgroundEmDarker',
            // borderTopStyle: 'solid',
            // borderTopWidth: '1px',
            borderBottomColor: 'backgroundEmDarker',
            borderBottomStyle: 'solid',
            borderBottomWidth: '1px',
            paddingY: '10px',
          }}
        >
          Recent Posts
        </Text>
        <SubFeaturedPost
          title={data.allMdx.edges[1].node.frontmatter.title}
          headerImage={data.allMdx.edges[1].node.frontmatter.headerImage}
          slug={data.allMdx.edges[1].node.fields.slug}
          teaser={data.allMdx.edges[1].node.frontmatter.teaser}
          subType={data.allMdx.edges[1].node.frontmatter.subType}
        />
        <SubFeaturedPost
          title={data.allMdx.edges[2].node.frontmatter.title}
          headerImage={data.allMdx.edges[2].node.frontmatter.headerImage}
          slug={data.allMdx.edges[2].node.fields.slug}
          teaser={data.allMdx.edges[2].node.frontmatter.teaser}
          subType={data.allMdx.edges[2].node.frontmatter.subType}
        />
        <SubFeaturedPost
          title={data.allMdx.edges[3].node.frontmatter.title}
          headerImage={data.allMdx.edges[3].node.frontmatter.headerImage}
          slug={data.allMdx.edges[3].node.fields.slug}
          teaser={data.allMdx.edges[3].node.frontmatter.teaser}
          subType={data.allMdx.edges[3].node.frontmatter.subType}
        />
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
          <Button sx={{ padding: '15px' }}>View Older Posts</Button>
        </Link>
      </Flex>
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
          }
        }
      }
    }
  }
`
