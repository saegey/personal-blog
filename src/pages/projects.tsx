import { Container } from 'theme-ui'
import { graphql } from 'gatsby'
import { getImage, IGatsbyImageData } from 'gatsby-plugin-image'
import type { PageProps } from 'gatsby'

import Seo from '../components/seo'
import PostCard from '../components/postCard'
import SafariStyle from '../components/SafariStyle'

const ProjectsIndex: React.FC<PageProps<DataProps>> = ({ data }) => {
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
    <>
      <SafariStyle />
      <Container sx={{ padding: '0px' }} bg="muted">
        <ol sx={{ p: 0 }}>
          {posts.map(post => {
            const image = getImage(post.frontmatter.headerImage)
            const title = post.frontmatter.title || post.fields.slug

            return <PostCard post={post} title={title} image={image} />
          })}
        </ol>
      </Container>
    </>
  )
}

export default ProjectsIndex

type DataProps = {
  allMdx: {
    nodes: {
      fields: {
        slug: string
      }
      frontmatter: {
        headerImage: {
          childImageSharp: {
            gatsbyImageData: IGatsbyImageData
          }
        }
        title: string
        date: string
        location: string
        type: string
        tags: ReadonlyArray<string>
      }
    }[]
  }
}

/**
 * Head export to define metadata for the page
 *
 * See: https://www.gatsbyjs.com/docs/reference/built-in-components/gatsby-head/
 */
export const Head = () => <Seo title="Projects" />

export const pageQuery = graphql`
  query SITE_INDEX_QUERY {
    allMdx(
      sort: { frontmatter: { date: DESC } }
      filter: { frontmatter: { type: { eq: "projects" } } }
    ) {
      nodes {
        fields {
          slug
        }
        excerpt(pruneLength: 250)
        frontmatter {
          title
          date(formatString: "YYYY MMMM DD")
          tags
          headerImage {
            childImageSharp {
              gatsbyImageData(placeholder: BLURRED, formats: [AUTO, WEBP, AVIF])
            }
          }
        }
      }
    }
  }
`
