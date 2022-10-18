/** @jsx jsx */
import { jsx, Text } from "theme-ui"
import { graphql } from "gatsby"
import { Box, Flex, Badge } from "theme-ui"

export default function PostTemplate({ data, children }) {
  const {
    frontmatter: { title, date },
  } = data.mdx

  return (
    <>
      <Flex sx={{ marginBottom: "30px" }}>
        <Box
          sx={{ fontFamily: "headline", flex: "1 1 auto", fontSize: [1, 2, 2] }}
        >
          {date}
        </Box>
        <Box sx={{ fontFamily: "headline", fontSize: [1, 2, 2] }}>
          Author • Adam Saegebarth
        </Box>
      </Flex>
      <Text
        as="h1"
        sx={{ fontFamily: "body", fontWeight: 900, fontStyle: "normal" }}
      >
        {title}
      </Text>
      <Flex sx={{ marginTop: "10px", marginBottom: "20px" }}>
        {data.mdx.frontmatter.tags.map(tag => {
          return (
            <Badge mr={1} variant="listSection">
              {tag}
            </Badge>
          )
        })}
      </Flex>
      {children}
    </>
  )
}

export const query = graphql`
  query ($id: String!) {
    mdx(id: { eq: $id }) {
      id
      frontmatter {
        date(formatString: "MMMM DD, YYYY")
        title
        tags
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
