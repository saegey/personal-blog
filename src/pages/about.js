/** @jsx jsx */
import { jsx } from "theme-ui"
import { graphql } from "gatsby"

import Seo from "../components/seo"

const AboutIndex = ({ data, location }) => {
  return (
    <h1
      sx={{
        fontFamily: "body",
        fontSize: "6",
        fontWeight: "heavy",
        letterSpacing: "0",
      }}
    >
      About page placeholder
    </h1>
  )
}

export default AboutIndex

/**
 * Head export to define metadata for the page
 *
 * See: https://www.gatsbyjs.com/docs/reference/built-in-components/gatsby-head/
 */
export const Head = () => <Seo title="All posts" />

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }
  }
`
