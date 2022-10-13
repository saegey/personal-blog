/** @jsx jsx */
import { jsx, Container, Text } from "theme-ui"
import { Link, graphql } from "gatsby"

import Seo from "../components/seo"

const BlogIndex = ({ data, location }) => {
  // const siteTitle = data.site.siteMetadata?.title || `Title`
  const posts = data.allMdx.nodes

  if (posts.length === 0) {
    return (
      <div sx={{ p: 0 }}>
        <p>
          No blog posts found. Add markdown posts to "content/blog" (or the
          directory you specified for the "gatsby-source-filesystem" plugin in
          gatsby-config.js).
        </p>
      </div>
    )
  }

  return (
    <Container p={4} bg="muted">
      <ol sx={{ p: 0 }}>
        {posts.map(post => {
          const title = post.frontmatter.title || post.fields.slug

          return (
            <li key={post.frontmatter.slug}>
              <article
                className="post-list-item"
                itemScope
                itemType="http://schema.org/Article"
              >
                <Link
                  to={post.fields.slug}
                  itemProp="url"
                  sx={{ textDecoration: "none" }}
                >
                  <Text variant="subHeadline" as="h2">
                    {title}
                  </Text>
                </Link>

                <small
                  sx={{
                    fontFamily: "body",
                  }}
                >
                  {post.frontmatter.date}
                </small>
              </article>
            </li>
          )
        })}
      </ol>
    </Container>
  )
}

export default BlogIndex

/**
 * Head export to define metadata for the page
 *
 * See: https://www.gatsbyjs.com/docs/reference/built-in-components/gatsby-head/
 */
export const Head = () => <Seo title="All posts" />

export const pageQuery = graphql`
  query SITE_INDEX_QUERY {
    allMdx(sort: { fields: [frontmatter___date], order: DESC }) {
      nodes {
        fields {
          slug
        }
        excerpt(pruneLength: 250)
        frontmatter {
          title
          date(formatString: "YYYY MMMM Do")
        }
      }
    }
  }
`
