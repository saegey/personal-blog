import { graphql } from 'gatsby'
import { Box, Container, Text } from 'theme-ui'
import { MDXProvider } from '@mdx-js/react'

interface BlogTemplateProps {
  data: {
    mdx: {
      frontmatter: {
        title: string
        date: string
      }
      body: string
    }
  }
  children: React.ReactNode
}

const BlogTemplate = ({ data, children }: BlogTemplateProps) => {
  const { mdx } = data
  return (
    <Container sx={{ paddingTop: '0', maxWidth: '1045px', margin: '0 0' }}>
      <Box sx={{ marginLeft: [3, 5, 5] }}>
        <Text as="h1" sx={{ fontSize: 5, fontWeight: 700, mb: 3 }}>
          {mdx.frontmatter.title}
        </Text>
        <Text as="p" sx={{ color: 'muted', mb: 4 }}>
          {mdx.frontmatter.date}
        </Text>
        <div className="blog-content">
          <MDXProvider>{children}</MDXProvider>
        </div>
      </Box>
    </Container>
  )
}

export const pageQuery = graphql`
  query BlogBySlug($slug: String!) {
    mdx(fields: { slug: { eq: $slug } }) {
      frontmatter {
        title
        date(formatString: "MMMM DD, YYYY")
      }
      body
    }
  }
`

export default BlogTemplate
