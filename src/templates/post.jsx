/** @jsx jsx */
import { jsx, Text } from "theme-ui"
import { graphql } from "gatsby"
import { Box, Flex } from "theme-ui"

export default function PostTemplate({ data, children }) {
  const {
    frontmatter: { title, date },
  } = data.mdx
  // console.log(data)

  return (
    <>
      <Flex sx={{ marginBottom: "30px" }}>
        <Box sx={{ fontFamily: "headline", flex: "1 1 auto" }}>{date}</Box>
        <Box sx={{ fontFamily: "headline", fontSize: 1 }}>
          Author • Adam Saegebarth
        </Box>
      </Flex>
      <Text
        as="h1"
        sx={{ fontFamily: "body", fontWeight: 900, fontStyle: "normal" }}
      >
        {title}
      </Text>
      {children}
    </>
  )
}

export const query = graphql`
  query ($id: String) {
    mdx(id: { eq: $id }) {
      frontmatter {
        date(formatString: "MMMM DD, YYYY")
        title
      }
    }
  }
`
