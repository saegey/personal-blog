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
import FeaturedPost from '../components/home/FeaturedPost'
import SubFeaturedPost from '../components/home/SubFeaturedPost'
import Hero from '../components/home/Hero'

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
        <Divider sx={{ marginTop: '20px' }} />
        <Hero />
        <Divider sx={{ marginBottom: '20px' }} />
        <FeaturedPost
          headerImage={headerImage}
          title={title}
          slug={featuredPost.fields.slug}
          teaser={teaser}
          subType={subType}
          updatedAt={publishedDate}
        />
        <Divider sx={{ marginTop: '20px' }} />
      </Box>
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
