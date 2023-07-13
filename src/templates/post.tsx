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
}

const PostTemplate: React.FC<PageProps<DataProps>> = ({ data, children }) => {
  const { title, date, location, type } = data.mdx.frontmatter

  return (
    <Container p={['20px', '20px', '32px']} sx={{ maxWidth: 768 }}>
      <SafariStyle />
      <Flex sx={{ marginBottom: '20px' }}>
        <Text variant="postType">{type}</Text>
      </Flex>
      <Flex>
        <Text as="h1" variant="postTitle">
          {title}
        </Text>
      </Flex>
      <Flex>
        <Text variant="postSubtitle">
          {date} — {location}
        </Text>
      </Flex>
      <MDXProvider components={shortcodes}>{children}</MDXProvider>
    </Container>
  )
}

export default PostTemplate

export const Head: React.FC<PageProps<DataProps>> = ({ data }) => (
  <Seo title={data.mdx.frontmatter.title} />
)

type DataProps = {
  mdx: {
    frontmatter: {
      images: {
        childImageSharp: {
          gatsbyImageData: IGatsbyImageData
        }
      }[]
      title: string
      date: string
      location: string
      type: string
      tags: ReadonlyArray<string>
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
