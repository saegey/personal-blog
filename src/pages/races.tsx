import type { PageProps } from 'gatsby'
import { graphql } from 'gatsby'
import { IGatsbyImageData } from 'gatsby-plugin-image'

import Seo from '../components/seo'
import { useSiteMetadata } from '../hooks/use-site-metadata'
import FeaturedPost from '../components/home/FeaturedPost'

const PostList: React.FC<PageProps<DataProps>> = ({ data }) => {
  const posts = data.allMdx.nodes

  return (
    <>
      <header className="border-b border-line pb-10 sm:pb-14">
        <p className="eyebrow text-brand">Archive</p>
        <h1 className="mt-3 font-heading text-5xl leading-none tracking-[-0.04em] sm:text-7xl">Race journals and field data.</h1>
        <p className="mt-6 max-w-2xl text-xl leading-relaxed text-muted">A record of rides, races, training blocks, and the analysis behind them.</p>
      </header>
      <section className="py-10 sm:py-16">
        {posts.map((post, idx: number) => {
            const { title, teaser, subType, publishedDate, headerImage } =
              post.frontmatter
            return (
              <FeaturedPost key={idx} headerImage={headerImage} title={title} slug={`/${post.fields.slug}`} teaser={teaser} subType={subType ?? ''} updatedAt={publishedDate ? new Date(publishedDate) : new Date(0)} showTopRule={idx !== 0} />
            )
          })}
      </section>
    </>
  )
}

export default PostList

type DataProps = {
  allMdx: {
    nodes: {
      fields: {
        slug: string
      }
      frontmatter: {
        headerImage: {
          childImageSharp: {
            gatsbyImageData: IGatsbyImageData
          }
        }
        teaser: string
        subType?: string
        publishedDate?: string
        title: string
        date: string
        location: string
        type: string
        tags: ReadonlyArray<string>
      }
    }[]
  }
}

/**
 * Head export to define metadata for the page
 *
 * See: https://www.gatsbyjs.com/docs/reference/built-in-components/gatsby-head/
 */
export const Head = ({ data }: PageProps<DataProps>) => {
  const site = useSiteMetadata()
  const title = 'Race Journal'
  const description =
    'All race reports and ride journals with analysis, gear, and stories.'
  const pathname = '/races'
  const items = data.allMdx.nodes || []

  const itemList = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    itemListElement: items.map((n, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      url: `${site.siteUrl}/${n.fields.slug}`,
      name: n.frontmatter.title,
    })),
  }

  const breadcrumbs = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: site.siteUrl },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'Race Journal',
        item: `${site.siteUrl}${pathname}`,
      },
    ],
  }

  return (
    <>
      <Seo title={title} description={description} pathname={pathname} />
      <link
        rel="alternate"
        type="application/rss+xml"
        title={`${site.title} RSS`}
        href={`${site.siteUrl}/rss.xml`}
      />
      <script type="application/ld+json">{JSON.stringify(itemList)}</script>
      <script type="application/ld+json">{JSON.stringify(breadcrumbs)}</script>
    </>
  )
}

export const pageQuery = graphql`
  query postPageQuery {
    allMdx(
      sort: { frontmatter: { publishedDate: DESC } }
      filter: {
        frontmatter: { isActive: { ne: false }, type: { ne: "Project" } }
      }
    ) {
      nodes {
        fields {
          slug
        }
        # excerpt(pruneLength: 250)
        frontmatter {
          title
          type
          subType
          location
          publishedDate
          date(formatString: "MMM DD, YYYY")
          tags
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
`
