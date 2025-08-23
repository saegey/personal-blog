import { graphql } from 'gatsby'
import { Box, Container, Text, Flex } from 'theme-ui'
import { MDXProvider, useMDXComponents } from '@mdx-js/react'
import Table from '../components/common/Table'
import { IGatsbyImageData, StaticImage } from 'gatsby-plugin-image'
import CustomImage from '../components/CustomImage'
import Carousel from '../components/Carousel'
import { LandscapeImage } from '../components/posts'
import BenchBarChartThemeUI from '../components/BenchmarkBarChart'
import TwoPhotoWide from '../components/TwoPhotoWide'
import Prism from '@theme-ui/prism'
import { useThemedStylesWithMdx } from '@theme-ui/mdx'

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

const components = {
  pre: (props: any) => <div {...props} />,
  // Cast Prism to align with MDXComponents typing for code blocks
  code: Prism as any,
} as any

const ProjectTemplate = ({ data, children }: ProjectTemplateProps) => {
  const { mdx } = data
  const componentsWithStyles = useThemedStylesWithMdx(
    useMDXComponents(components as any) as any,
  )

  return (
    <Container
      sx={{
        paddingTop: '0',
        maxWidth: '992px',
        margin: '0 0',
        '&.article>p+p': {
          paddingTop: '40px',
        },
      }}
      className="article"
      as="article"
    >
      <Box>
        <Text as="h1" sx={{ fontSize: [4, 5], fontWeight: 700, mb: 3 }}>
          {mdx.frontmatter.title}
        </Text>
        <Text as="p" sx={{ color: 'primary', mb: 4 }}>
          {mdx.frontmatter.publishedDate}
        </Text>
        <div className="blog-content">
          <MDXProvider
            components={{
              BenchBarChartThemeUI,
              StaticImage,
              Box,
              Flex,
              Text,
              CustomImage,
              Carousel,
              LandscapeImage,
              TwoPhotoWide,
              Table,
              table: (props: any) => <Table {...props} />,
              ...componentsWithStyles,
            }}
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
          childImageSharp {
            gatsbyImageData(
              placeholder: BLURRED
              width: 1100
              quality: 80
              layout: CONSTRAINED
            )
          }
        }
      }
      body
    }
  }
`

export default ProjectTemplate
