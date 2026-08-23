import type { ReactNode } from 'react'
import { graphql } from 'gatsby'
import { MDXProvider } from '@mdx-js/react'
import { StaticImage, getSrc, IGatsbyImageData } from 'gatsby-plugin-image'

import Table from '../components/common/Table'
import CustomImage from '../components/CustomImage'
import Carousel from '../components/Carousel'
import { LandscapeImage } from '../components/posts'
import BenchBarChartThemeUI from '../components/BenchmarkBarChart'
import { BenchmarkTable } from '../components/BenchmarkTable'
import TwoPhotoWide from '../components/TwoPhotoWide'
import Seo from '../components/seo'
import { useSiteMetadata } from '../hooks/use-site-metadata'
import { buildBlogPostingSchema } from '../lib/seo'

type ProjectTemplateProps = {
  data: {
    mdx: {
      frontmatter: {
        title: string
        teaser?: string
        subType?: string
        publishedDate: string
        images: { publicURL?: string; childImageSharp: { gatsbyImageData: IGatsbyImageData } }[]
      }
      body: string
    }
  }
  children: ReactNode
}

const Card = ({ children }: { children?: ReactNode }) => <section className="my-10 border-y border-line py-7 sm:px-6">{children}</section>
const Box = ({ children }: { children?: ReactNode }) => <div>{children}</div>
const Flex = ({ children }: { children?: ReactNode }) => <div className="flex flex-wrap gap-4">{children}</div>
const Text = ({ children }: { children?: ReactNode }) => <span>{children}</span>

const components = {
  Box,
  Card,
  Flex,
  Text,
  StaticImage,
  CustomImage,
  Carousel,
  LandscapeImage,
  TwoPhotoWide,
  BenchBarChartThemeUI,
  BenchmarkTable,
  Table,
  table: (props: any) => <Table {...props} />,
  pre: (props: any) => <pre className="overflow-x-auto border-y border-line py-5 font-mono text-sm leading-relaxed" {...props} />,
}

const ProjectTemplate = ({ data, children }: ProjectTemplateProps) => {
  const { frontmatter } = data.mdx
  return (
    <>
      <header className="max-w-4xl border-b border-line pb-10 sm:pb-14">
        <p className="eyebrow text-ink">Project{frontmatter.subType ? ` · ${frontmatter.subType}` : ''}</p>
        <h1 className="mt-3 font-serif text-5xl leading-[0.95] tracking-[-0.045em] sm:text-7xl">{frontmatter.title}</h1>
        <p className="mt-6 font-condensed text-sm font-medium uppercase tracking-label text-muted">{frontmatter.publishedDate}</p>
        {frontmatter.teaser && <p className="mt-5 max-w-3xl text-xl leading-relaxed text-ink sm:text-2xl">{frontmatter.teaser}</p>}
      </header>
      <article className="project-story mx-auto max-w-3xl py-10 sm:py-14">
        <MDXProvider components={components}>{children}</MDXProvider>
      </article>
    </>
  )
}

export const pageQuery = graphql`
  query ProjectBySlug($slug: String!) {
    mdx(fields: { slug: { eq: $slug } }) {
      fields { slug }
      frontmatter {
        title
        teaser
        subType
        description
        tags
        publishedDate(formatString: "MMMM DD, YYYY")
        publishedDateIso: publishedDate(formatString: "YYYY-MM-DD")
        modifiedDateIso: modifiedDate(formatString: "YYYY-MM-DD")
        images {
          publicURL
          childImageSharp { gatsbyImageData(placeholder: BLURRED, width: 1100, quality: 80, layout: CONSTRAINED) }
        }
      }
      body
    }
  }
`

export default ProjectTemplate

export const Head = ({ data }: { data: any }) => {
  const site = useSiteMetadata()
  const frontmatter = data?.mdx?.frontmatter ?? {}
  const image = frontmatter.images?.[0]?.childImageSharp?.gatsbyImageData
  const src = image ? getSrc(image) : frontmatter.images?.[0]?.publicURL
  const pathname = data?.mdx?.fields?.slug || ''
  const description = frontmatter.description || `Project: ${frontmatter.title}`
  const schema = buildBlogPostingSchema({
    siteUrl: site.siteUrl,
    siteTitle: site.title,
    authorName: site.author?.name,
    title: frontmatter.title,
    description,
    pathname,
    imageUrl: src ? (src.startsWith('http') ? src : `${site.siteUrl}${src}`) : undefined,
    publishedIso: frontmatter.publishedDateIso,
    modifiedIso: frontmatter.modifiedDateIso,
  })

  return <><Seo title={frontmatter.title} description={description} image={image} pathname={pathname} tags={frontmatter.tags} modifiedDate={frontmatter.modifiedDateIso} /><script type="application/ld+json">{JSON.stringify(schema)}</script></>
}
