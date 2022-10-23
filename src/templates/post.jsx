/** @jsx jsx */
import { jsx, Text } from "theme-ui"
import { graphql } from "gatsby"
import { Box, Flex, Badge } from "theme-ui"

export default function PostTemplate({ data, children }) {
  const {
    frontmatter: { title, date, type, location },
  } = data.mdx

  const { name } = data.site.siteMetadata.author

  return (
    <>
      {/* <Flex sx={{ marginBottom: "30px" }}>
        <Box
          sx={{ fontFamily: "serif", flex: "1 1 auto", fontSize: [1, 2, 2] }}
        >
          {date}
        </Box>
        <Box sx={{ fontFamily: "serif", fontSize: [1, 2, 2] }}>
          Author • {name}
        </Box>
      </Flex> */}
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
            marginBottom: ["20px", "20px", "20px"],
            letterSpacing: [".6px", "1px", "1px"],
            marginX: "auto",
          }}
        >
          {title}
        </Text>
      </Flex>
      <Flex>
        <Text
          sx={{
            marginX: "auto",
            marginX: "auto",
            fontFamily: "body",
            fontWeight: "400",
            letterSpacing: "1px",
            fontSize: "16px",
            textTransform: "uppercase",
            color: "#adb5bdff",
          }}
        >
          {date} — {location}
        </Text>
      </Flex>
      {/* <Flex
        sx={{
          marginTop: "10px",
          marginBottom: "20px",
          display: ["none", "inherit", "inherit"],
        }}
      >
        {data.mdx.frontmatter.tags.map(tag => {
          return (
            <Badge mr={1} variant="listSection">
              {tag}
            </Badge>
          )
        })}
      </Flex> */}
      {children}
    </>
  )
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
        date(formatString: "MMMM DD, YYYY")
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
          powerAnalysis
          cadenceAnalysis
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
          heartAnalysis
          powerCurve
          tempAnalysis
        }
      }
    }
  }
`
