/** @jsx jsx */
import { jsx, Container, Text } from "theme-ui"
import { graphql } from "gatsby"
import { Box } from "theme-ui"

export default function PostPage({ data, children }) {
  const {
    body,
    frontmatter: { title, date },
  } = data.mdx

  return (
    <div>
      <Text variant="headline">{title}</Text>
      {children}
    </div>
  )
}
export const pageQuery = graphql`
  query POST_BY_SLUG($id: String) {
    mdx(id: { eq: $id }) {
      id
      frontmatter {
        date
        title
      }
    }
  }
`
