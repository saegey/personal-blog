import { Text, Flex, Box, Divider, Link, Container } from 'theme-ui'
import { graphql, PageProps } from 'gatsby'
import { MDXProvider } from '@mdx-js/react'
import { IGatsbyImageData } from 'gatsby-plugin-image'

import Seo from '../components/seo'
import SafariStyle from '../components/SafariStyle'
import RaceStats from '../components/RaceStats'
import PortraitImage from '../components/PortraitImage'
import RaceResults from '../components/RaceResults'
import RaceOverview from '../components/RaceOverview'
import LandscapeImage from '../components/LandscapeImage'
import ElevationGraph from '../components/ElevationGraph'
import { MatchesBurned } from '../components/MatchesBurned'
import PowerBreakdown from '../components/PowerBreakdown'
import { default as PowerCurveGraph } from '../components/PowerCurveGraph'
import PowerGraph from '../components/PowerGraph'
import VideoPlayer from '../components/VideoPlayer'
import Carousel from '../components/Carousel'
import Caption from '../components/Caption'
import Map from '../components/Map'
import RelatedRaces from '../components/RelatedRaces'
import { useSiteMetadata } from '../hooks/use-site-metadata'
import StravaLink from '../components/StravaLink'
import VisualOverview from '../components/VisualOverview'
import NewLineGraph from '../components/NewLineGraph'

const shortcodes = {
  Box,
  Divider,
  RaceStats,
  PortraitImage,
  RaceResults,
  RaceOverview,
  LandscapeImage,
  ElevationGraph,
  PowerCurveGraph,
  PowerGraph,
  Link,
  Text,
  MatchesBurned,
  PowerBreakdown,
  VideoPlayer,
  Carousel,
  Caption,
  Map,
  RelatedRaces,
  StravaLink,
  VisualOverview,
  NewLineGraph,
}

const PostTemplate: React.FC<PageProps<DataProps>> = ({ data, children }) => {
  const { title, date, location, type } = data.mdx.frontmatter

  return (
    <Container p={['20px', '20px', '32px']} sx={{ maxWidth: 1200 }}>
      <SafariStyle />
      <Flex sx={{ marginBottom: '5px', width: '100%' }}>
        <Text variant="postType" sx={{ marginX: 'auto' }}>
          {type}
        </Text>
      </Flex>
      <Flex>
        <Text as="h1" variant="postTitle" sx={{ color: 'text' }}>
          {title}
        </Text>
      </Flex>
      <Flex>
        <Text variant="postSubtitle" sx={{ color: 'text' }}>
          {date} — {location}
        </Text>
      </Flex>
      <MDXProvider components={shortcodes}>{children}</MDXProvider>
    </Container>
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
            ?.images?.fallback?.src
        }
        width={
          data.mdx.frontmatter.headerImage?.childImageSharp?.gatsbyImageData
            ?.width
        }
        height={
          data.mdx.frontmatter.headerImage?.childImageSharp?.gatsbyImageData
            ?.height
        }
        publishedDate={data.mdx.frontmatter.publishedDate}
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
    }
  }
}

export const query = graphql`
  query Post($id: String!, $relatedPosts: [String]) {
    relatedP: allMdx(
      filter: { frontmatter: { title: { in: $relatedPosts } } }
    ) {
      edges {
        node {
          id
          fields {
            slug
          }
          frontmatter {
            date(formatString: "MMM DD, YYYY")
            title
            location
            headerImage {
              childImageSharp {
                gatsbyImageData(placeholder: BLURRED)
              }
            }
          }
          gpxData {
            id
            fields {
              normalizedPower
              timeInRed
              distance
              stoppedTime
              elapsedTime {
                days
                hours
                minutes
                seconds
              }
            }
          }
        }
      }
    }
    mdx: mdx(id: { eq: $id }) {
      id
      frontmatter {
        publishedDate(formatString: "YYYY-MM-DD")
        date(formatString: "MMM DD, YYYY")
        location
        title
        tags
        type
        images {
          childImageSharp {
            gatsbyImageData(placeholder: BLURRED, width: 2000)
          }
        }
        headerImage {
          childImageSharp {
            gatsbyImageData(layout: FIXED, width: 1200)
          }
        }
        description
        stravaUrl
      }
      segments {
        fields {
          segments {
            beginningTime
            segmentDistance
            segmentDuration
            segmentDurationStopped
          }
        }
      }
      results {
        id
        fields {
          data {
            place
            name
            time
          }
        }
      }
      gpxData {
        id
        fields {
          coordinates
          powerZoneBuckets
          powerZones {
            zone
            title
            powerLow
            powerHigh
          }
          currentFtp
          normalizedPower
          elevationGain
          stoppedTime
          timeInRed
          distance
          powerData
          heartRateData
          powerAnalysis {
            entire
          }
          cadenceAnalysis {
            entire
          }
          elapsedTime {
            days
            hours
            minutes
            seconds
          }
          elevationData {
            x
            y
            distance
            grade
          }
          heartAnalysis {
            entire
          }
          matchesBurned {
            averagePower
            index
            totalJoules
            startTime
            totalTime
            vals
          }
          powerCurve {
            x
            y
          }
          tempAnalysis {
            entire
          }
        }
      }
    }
  }
`
