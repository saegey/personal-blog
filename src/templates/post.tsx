import { Text, Flex, Box, Divider, Link } from 'theme-ui'
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
import { default as PowerCurveGraph } from '../components/PowerCurveGraph'
import { default as PowerCurveContextGraph } from '../components/PowerCurveContext'
import PowerGraph from '../components/PowerGraph'

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
  PowerCurveContextGraph,
  PowerGraph,
  Link,
  Text,
  MatchesBurned,
}

const PostTemplate: React.FC<PageProps<DataProps>> = ({ data, children }) => {
  const { title, date, location, type } = data.mdx.frontmatter

  return (
    <>
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
    </>
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
  query Post($id: String!) {
    mdx(id: { eq: $id }) {
      id
      frontmatter {
        date(formatString: "MMM DD, YYYY")
        location
        title
        tags
        type
        images {
          childImageSharp {
            gatsbyImageData(placeholder: BLURRED, formats: [AUTO, WEBP, AVIF])
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
          normalizedPower
          elevationGain
          stoppedTime
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
