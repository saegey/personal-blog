/** @jsx jsx */
import { jsx, Text } from "theme-ui"
import { graphql } from "gatsby"
import { Flex, Box, Divider } from "theme-ui"
import { MDXProvider } from "@mdx-js/react"

import Seo from "../components/seo"
import SafariStyle from "../components/SafariStyle"
import RaceStats from "../components/RaceStats"
import PortraitImage from "../components/PortraitImage"
import RaceResults from "../components/RaceResults.js"
import RaceOverview from "../components/RaceOverview.js"
import LandscapeImage from "../components/LandscapeImage.js"
import ElevationGraph from "../components/ElevationGraph.js"
import { default as PowerCurveGraph } from "../components/graph"
import { default as PowerCurveContextGraph } from "../components/PowerCurveContext"

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
}

export default function PostTemplate({ data, children }) {
  const {
    frontmatter: { title, date, type, location },
  } = data.mdx

  // const { name } = data.site.siteMetadata.author

  return (
    <>
      <SafariStyle />
      <Flex sx={{ marginBottom: "20px" }}>
        <Text
          sx={{
            marginX: "auto",
            fontFamily: "body",
            fontWeight: "600",
            letterSpacing: "1px",
            fontSize: "16px",
            textTransform: "uppercase",
            color: "#adb5bdff",
          }}
        >
          {type}
        </Text>
      </Flex>
      <Flex>
        <Text
          as="h1"
          sx={{
            fontFamily: "serif",
            fontWeight: 700,
            fontStyle: "normal",
            fontSize: ["4", "5", "5"],
            marginBottom: ["5px", "5px", "5px"],
            letterSpacing: [".6px", "1px", "1px"],
            marginX: "auto",
            textAlign: "center",
          }}
        >
          {title}
        </Text>
      </Flex>
      <Flex>
        <Text
          sx={{
            marginX: "auto",
            fontFamily: "body",
            fontWeight: "400",
            letterSpacing: "1px",
            fontSize: "16px",
            textTransform: "uppercase",
            color: "primary",
            marginBottom: "40px",
          }}
        >
          {date} — {location}
        </Text>
      </Flex>
      <MDXProvider components={shortcodes}>{children}</MDXProvider>
    </>
  )
}

export const Head = ({ location, params, data, pageContext }) => (
  <Seo title={data.mdx.frontmatter.title} />
)

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
