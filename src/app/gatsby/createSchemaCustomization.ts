import type { GatsbyNode } from 'gatsby'

export const createSchemaCustomization: GatsbyNode['createSchemaCustomization'] =
  ({ actions }) => {
    const { createTypes } = actions

    createTypes(`
    type SiteSiteMetadata {
      author: Author
      siteUrl: String
      social: Social
    }

    type Author {
      name: String
      summary: String
    }

    type Social {
      twitter: String
      github: String
      strava: String
      instagram: String
    }

    type Mdx implements Node {
      frontmatter: Frontmatter!
      fields: Fields
      results: File @link(by: "name", from: "frontmatter.results.file")
      statsData: File @link(by: "name", from: "frontmatter.statsFile")
    }

    type Frontmatter {
      id: String!
      title: String!
      description: String
      date: Date! @dateformat
      publishedDate: Date @dateformat
      tags: [String!]
      location: String
      type: String!
      isActive: Boolean
      related: [String]
      subType: String
      statsFile: String
      currentFtp: Int
    }

    type Coordinate {
      x: String,
      y: String
    }

    type Fields {
      slug: String
    }

    """
    Expose custom fields on File nodes. The JSON type allows arbitrary structured data
    from our JSON parsers to be queried without inference issues.
    """
    type FileFields @infer {
      data: JSON
    }

    type File implements Node {
      fields: FileFields
    }
  `)
  }
