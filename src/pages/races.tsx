import type { PageProps } from 'gatsby'
import { graphql } from 'gatsby'
import { Container, Box, Flex } from 'theme-ui'
import { IGatsbyImageData } from 'gatsby-plugin-image'

import Seo from '../components/seo'
import { useSiteMetadata } from '../hooks/use-site-metadata'
import FeaturedPost from '../components/home/FeaturedPost'

const PostList: React.FC<PageProps<DataProps>> = ({ data }) => {
  const posts = data.allMdx.nodes

  return (
    <Container sx={{ paddingTop: '0', margin: '0 0' }}>
      <Box sx={{ marginBottom: [5] }}>
        <Flex sx={{ gap: 3, flexDirection: 'column' }}>
          {posts.map((post, idx: number) => {
            const { title, teaser, subType, publishedDate, headerImage } =
              post.frontmatter
            return (
              <>
                <FeaturedPost
                  key={idx}
                  headerImage={headerImage}
                  title={title}
                  slug={`/${post.fields.slug}`}
                  teaser={teaser}
                  subType={subType ?? ''}
                  updatedAt={
                    publishedDate ? new Date(publishedDate) : new Date(0)
                  }
                />
              </>
            )
          })}
        </Flex>
      </Box>
    </Container>
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
