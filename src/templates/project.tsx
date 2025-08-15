import { graphql } from 'gatsby'
import { Box, Container, Text, Flex } from 'theme-ui'
import { MDXProvider } from '@mdx-js/react'
import { IGatsbyImageData, StaticImage } from 'gatsby-plugin-image'
import CustomImage from '../components/CustomImage'
import Carousel from '../components/Carousel'

interface ProjectTemplateProps {
  data: {
    mdx: {
      frontmatter: {
        title: string
        publishedDate: string
        images: {
          childImageSharp: {
            gatsbyImageData: IGatsbyImageData
          }
        }[]
      }
      body: string
    }
  }
  children: React.ReactNode
}

const ProjectTemplate = ({ data, children }: ProjectTemplateProps) => {
  const { mdx } = data
  console.log(data)

  return (
    <Container
      sx={{
        paddingTop: '0',
        maxWidth: '1045px',
        margin: '0 0',
        '&.article>p+p': {
          paddingTop: '40px',
        },
      }}
      className="article"
      as="article"
    >
      <Box sx={{ marginX: [3, 5, 5], marginTop: [4] }}>
        <Text as="h1" sx={{ fontSize: 5, fontWeight: 700, mb: 3 }}>
          {mdx.frontmatter.title}
        </Text>
        <Text as="p" sx={{ color: 'primary', mb: 4 }}>
          {mdx.frontmatter.publishedDate}
        </Text>
        <div className="blog-content">
          <MDXProvider
            components={{ StaticImage, Box, Flex, Text, CustomImage, Carousel }}
          >
            {children}
          </MDXProvider>
        </div>
      </Box>
    </Container>
  )
}

export const pageQuery = graphql`
  query ProjectBySlug($slug: String!) {
    mdx(fields: { slug: { eq: $slug } }) {
      frontmatter {
        title
        publishedDate(formatString: "MMMM DD, YYYY")
        images {
          publicURL
        }
      }
      body
    }
  }
`

export default ProjectTemplate
