import { graphql } from 'gatsby'
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
    <main className="mx-auto max-w-3xl py-12 sm:py-16">
      <div>
        <h1 className="font-heading text-4xl font-medium tracking-tight sm:text-6xl">{mdx.frontmatter.title}</h1>
        <p className="mt-4 font-condensed text-sm uppercase tracking-label text-muted">{mdx.frontmatter.date}</p>
        <div className="blog-content">
          <MDXProvider>{children}</MDXProvider>
        </div>
      </div>
    </main>
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
