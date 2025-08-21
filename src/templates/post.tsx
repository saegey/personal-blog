import { Text, Link, Container, Box } from 'theme-ui'
import { graphql, PageProps } from 'gatsby'
import { MDXProvider } from '@mdx-js/react'
import { IGatsbyImageData } from 'gatsby-plugin-image'
import 'mapbox-gl/dist/mapbox-gl.css'

import Seo from '../components/seo'
import { useSiteMetadata } from '../hooks/use-site-metadata'

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

const shortcodes = {
  PortraitImage,
  RaceResults,
  RaceOverview,
  RaceOverviewWrapper,
  LandscapeImage,
  PowerCurveGraph,
  PowerCurveGraphStatsWrapper,
  Link,
  Text,
  MatchesBurned,
  PowerBreakdown,
  VideoPlayer,
  Carousel,
  Map,
  StravaLink,
  VisualOverview,
  VisualOverviewNew,
  Box,
  TwoPhotoWide,
}

const PostTemplate: React.FC<PageProps<DataProps>> = ({ data, children }) => {
  const {
    title,
    date,
    location,
    type,
    headerImage,
    teaser,
    headerImageCaption,
  } = data.mdx.frontmatter

  return (
    <>
      <PostHeader
        headerImage={headerImage}
        type={type}
        title={title}
        date={date}
        location={location}
        teaser={teaser}
        headerImageCaption={headerImageCaption}
      />
      <Container variant="layouts.post">
        <MDXProvider components={shortcodes}>{children}</MDXProvider>
      </Container>
    </>
  )
}

export default PostTemplate

export const Head: React.FC<PageProps<DataProps>> = ({ data }) => {
  const siteMetadata = useSiteMetadata()
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: data.mdx.frontmatter.title,
    image: [
      `${siteMetadata.siteUrl}${data.mdx.frontmatter.headerImage?.childImageSharp?.gatsbyImageData?.images?.fallback?.src}`,
    ],
    datePublished: data.mdx.frontmatter.publishedDate,
    author: [
      {
        '@type': 'Person',
        name: siteMetadata.author.name,
        sameAs: `https://twitter.com/${siteMetadata.social.twitter}`,
      },
    ],
    description: data.mdx.frontmatter.description,
  }

  // 2️⃣ Stringify the schema object (adding the "null, 2" gives you readable json)
  const schemaAsString = JSON.stringify(schema, null, 2)

  return (
    <>
      <Seo
        title={data.mdx.frontmatter.title}
        description={data.mdx.frontmatter.description}
        image={
          data.mdx.frontmatter.headerImage?.childImageSharp?.gatsbyImageData
        }
        width={data.mdx.frontmatter.headerImage?.childImageSharp?.gatsbyImageData?.width?.toString()}
        height={data.mdx.frontmatter.headerImage?.childImageSharp?.gatsbyImageData?.height?.toString()}
        publishedDate={data.mdx.frontmatter.publishedDate}
        pathname={''}
      />
      <script type="application/ld+json">{schemaAsString}</script>
    </>
  )
}

type DataProps = {
  mdx: {
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
      location: string
      type: string
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
      frontmatter {
        publishedDate(formatString: "YYYY-MM-DD")
        date(formatString: "MMM DD, YYYY")
        location
        title
        teaser
        tags
        type
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
