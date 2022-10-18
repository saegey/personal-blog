/** @jsx jsx */
import { jsx, Text } from "theme-ui"
import { graphql } from "gatsby"
import { Box, Flex, Badge } from "theme-ui"

export default function PostTemplate({ data, children }) {
  const {
    frontmatter: { title, date },
  } = data.mdx
  // console.log(data)

  return (
    <>
      <Flex sx={{ marginBottom: "30px" }}>
        <Box sx={{ fontFamily: "headline", flex: "1 1 auto", fontSize: 2 }}>
          {date}
        </Box>
        <Box sx={{ fontFamily: "headline", fontSize: 2 }}>
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
          gpx
        }
      }
    }
  }
`
