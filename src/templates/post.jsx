/** @jsx jsx */
import { jsx, Text, Flex, Box, Divider, Link } from 'theme-ui'
import { graphql } from 'gatsby'
import { MDXProvider } from '@mdx-js/react'
import PropTypes from 'prop-types'

import Seo from '../components/seo'
import SafariStyle from '../components/SafariStyle'
import RaceStats from '../components/RaceStats'
import PortraitImage from '../components/PortraitImage'
import RaceResults from '../components/RaceResults.js'
import RaceOverview from '../components/RaceOverview.js'
import LandscapeImage from '../components/LandscapeImage.js'
import ElevationGraph from '../components/ElevationGraph.js'
import { default as PowerCurveGraph } from '../components/graph'
import { default as PowerCurveContextGraph } from '../components/PowerCurveContext'

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
  Link,
  Text,
}

const PostTemplate = ({ data, children }) => {
  const {
    frontmatter: { title, date, type, location },
  } = data.mdx

  return (
    <>
      <SafariStyle />
      <Flex sx={{ marginBottom: '20px' }}>
        <Text variant='postType'>{type}</Text>
      </Flex>
      <Flex>
        <Text as='h1' variant='postTitle'>
          {title}
        </Text>
      </Flex>
      <Flex>
        <Text variant='postSubtitle'>
          {date} — {location}
        </Text>
      </Flex>
      <MDXProvider components={shortcodes}>{children}</MDXProvider>
    </>
  )
}

PostTemplate.propTypes = {
  data: PropTypes.shape({
    mdx: PropTypes.shape({
      frontmatter: PropTypes.shape({
        title: PropTypes.string,
        date: PropTypes.string,
        location: PropTypes.string,
        type: PropTypes.string,
      }),
    }),
  }),
  children: PropTypes.node,
}

export default PostTemplate

export const Head = ({ data }) => <Seo title={data.mdx.frontmatter.title} />
Head.propTypes = {
  data: PropTypes.shape({
    mdx: PropTypes.shape({
      frontmatter: PropTypes.shape({
        title: PropTypes.string,
        date: PropTypes.string,
        location: PropTypes.string,
        type: PropTypes.string,
      }),
    }),
  }),
}

export const query = graphql`
  query ($id: String!) {
    site {
      siteMetadata {
        author {
          name
          summary
        }
        description
      }
    }
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
          elevationGain
          stoppedTime
          distance
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
