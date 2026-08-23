import { graphql, PageProps } from 'gatsby'
import { MDXProvider } from '@mdx-js/react'
import type { AnchorHTMLAttributes, ReactNode } from 'react'
import Table from '../components/common/Table'
import { IGatsbyImageData } from 'gatsby-plugin-image'
import 'mapbox-gl/dist/mapbox-gl.css'

import Seo from '../components/seo'
import { useSiteMetadata } from '../hooks/use-site-metadata'
import Map from '../components/posts/CustomMap'
import { getSrc } from 'gatsby-plugin-image'
import { buildBlogPostingSchema } from '../lib/seo'

import {
  PowerBreakdown,
  PostHeader,
  PortraitImage,
  LandscapeImage,
  VisualOverviewWrapperNew as VisualOverviewNew,
  RaceResults,
  MatchesBurned,
  StravaLink,
  Carousel,
  VideoPlayer,
  PowerCurveGraph,
  PowerCurveGraphStatsWrapper,
  RaceOverview,
  RaceOverviewWrapper,
  VisualOverviewWrapper as VisualOverview,
} from '../components/posts'
import TwoPhotoWide from '../components/TwoPhotoWide'

const MdxText = ({ children }: { children?: ReactNode }) => <p>{children}</p>
const MdxLink = ({ children, href, ...props }: AnchorHTMLAttributes<HTMLAnchorElement>) => (
  <a href={href} {...props}>{children}</a>
)
const MdxBox = ({ children }: { children?: ReactNode }) => <div className="my-8">{children}</div>

const shortcodes = {
  PortraitImage,
  RaceResults,
  RaceOverview,
  RaceOverviewWrapper,
  LandscapeImage,
  PowerCurveGraph,
  PowerCurveGraphStatsWrapper,
  Link: MdxLink,
  Text: MdxText,
  MatchesBurned,
  PowerBreakdown,
  VideoPlayer,
  Carousel,
  Map,
  StravaLink,
  VisualOverview,
  VisualOverviewNew,
  Box: MdxBox,
  TwoPhotoWide,
  // Map native table to our themed Table
  table: (props: any) => <Table {...props} />,
}

const PostTemplate: React.FC<PageProps<DataProps>> = ({ data, children }) => {
  const {
    title,
    date,
    location,
    type,
    subType,
    headerImage,
    teaser,
    headerImageCaption,
  } = data.mdx.frontmatter

  return (
    <>
      <PostHeader
        headerImage={headerImage}
        type={type}
        subType={subType}
        title={title}
        date={date}
        location={location}
        teaser={teaser}
        headerImageCaption={headerImageCaption}
      />
      <article className="race-story mx-auto max-w-3xl py-10 sm:py-14">
        <MDXProvider components={shortcodes}>{children}</MDXProvider>
      </article>
    </>
  )
}

export default PostTemplate

export const Head: React.FC<PageProps<DataProps>> = ({ data }) => {
  const site = useSiteMetadata()
  const title = data.mdx.frontmatter.title
  const description = data.mdx.frontmatter.description
  const tags = data.mdx.frontmatter.tags || []
  const headerImage = data.mdx.frontmatter.headerImage
  const image = headerImage?.childImageSharp?.gatsbyImageData
  const width = image?.width?.toString()
  const height = image?.height?.toString()
  const pathname = data.mdx.fields?.slug || ''
  const publishedIso = data.mdx.frontmatter.publishedDate
  const modifiedIso = data.mdx.frontmatter.modifiedDateIso

  // Absolute image URL for JSON‑LD
  let imageUrl: string | undefined
  if (image) {
    const src = getSrc(image)
    imageUrl = src ? (src.startsWith('http') ? src : `${site.siteUrl}${src}`) : undefined
  }

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
        publishedDate={publishedIso}
        modifiedDate={modifiedIso}
        pathname={pathname}
        tags={tags as string[]}
      />
      <script type="application/ld+json">{JSON.stringify(schema)}</script>
    </>
  )
}

type DataProps = {
  mdx: {
    fields?: {
      slug: string
    }
    frontmatter: {
      images: {
        childImageSharp: {
          gatsbyImageData: IGatsbyImageData
        }
      }[]
      headerImage: {
        childImageSharp: {
          gatsbyImageData: IGatsbyImageData
        }
      }
      title: string
      date: string
      publishedDate: string
      modifiedDateIso?: string
      location: string
      type: string
      subType?: string
      tags: ReadonlyArray<string>
      description: string
      teaser?: string
      headerImageCaption?: string
      stravaUrl?: string
      currentFtp?: number
    }
    statsData?: {
      id: string
      fields?: {
        data: any
      }
    }
  }
}

export const query = graphql`
  query Post($id: String!) {
    mdx: mdx(id: { eq: $id }) {
      id
      fields { slug }
      frontmatter {
        publishedDate(formatString: "YYYY-MM-DD")
        modifiedDateIso: modifiedDate(formatString: "YYYY-MM-DD")
        date(formatString: "MMM DD, YYYY")
        location
        title
        teaser
        tags
        type
        subType
        currentFtp
        images {
          childImageSharp {
            gatsbyImageData(
              placeholder: BLURRED
              width: 1100
              quality: 80
              layout: CONSTRAINED
            )
          }
        }
        headerImage {
          childImageSharp {
            gatsbyImageData(
              placeholder: BLURRED
              width: 1400
              quality: 80
              layout: CONSTRAINED
            )
          }
        }
        headerImageCaption
        description
        stravaUrl
      }
      statsData {
        id
        fields {
          data
        }
      }
      results {
        id
        fields {
          data
        }
      }
    }
  }
`
