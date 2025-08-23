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
import Seo from '../components/seo'
import { useSiteMetadata } from '../hooks/use-site-metadata'
import { getSrc } from 'gatsby-plugin-image'
import { buildBlogPostingSchema } from '../lib/seo'

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
      fields {
        slug
      }
      frontmatter {
        title
        description
        tags
        publishedDate(formatString: "MMMM DD, YYYY")
        publishedDateIso: publishedDate(formatString: "YYYY-MM-DD")
        modifiedDate(formatString: "MMMM DD, YYYY")
        modifiedDateIso: modifiedDate(formatString: "YYYY-MM-DD")
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

export const Head = ({ data }: { data: any }) => {
  const site = useSiteMetadata()
  const title = data?.mdx?.frontmatter?.title
  const description = data?.mdx?.frontmatter?.description || `Project: ${title}`
  const tags = data?.mdx?.frontmatter?.tags || []
  const headerImage = data?.mdx?.frontmatter?.images?.[0]
  const image = headerImage?.childImageSharp?.gatsbyImageData
  const width = headerImage?.childImageSharp?.gatsbyImageData?.width?.toString()
  const height =
    headerImage?.childImageSharp?.gatsbyImageData?.height?.toString()
  const pathname = data?.mdx?.fields?.slug || ''

  // Compute absolute image URL for JSON-LD
  let imageUrl: string | undefined
  if (image) {
    const src = getSrc(image)
    imageUrl = src
      ? src.startsWith('http')
        ? src
        : `${site.siteUrl}${src}`
      : undefined
  } else if (headerImage?.publicURL) {
    imageUrl = headerImage.publicURL.startsWith('http')
      ? headerImage.publicURL
      : `${site.siteUrl}${headerImage.publicURL}`
  }

  const publishedIso = data?.mdx?.frontmatter?.publishedDateIso
  const modifiedIso = data?.mdx?.frontmatter?.modifiedDateIso

  const schema = buildBlogPostingSchema({
    siteUrl: site.siteUrl,
    siteTitle: site.title,
    authorName: site.author?.name,
    title,
    description,
    pathname,
    imageUrl,
    publishedIso,
    modifiedIso,
  })
  return (
    <>
      <Seo
        title={title}
        description={description}
        image={image}
        width={width}
        height={height}
        pathname={pathname}
        tags={tags}
        modifiedDate={modifiedIso}
      />
      <script type="application/ld+json">{JSON.stringify(schema)}</script>
    </>
  )
}
