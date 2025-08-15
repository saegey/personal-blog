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
      gpxData: File @link(by: "name", from: "frontmatter.gpxFile")
      results: File @link(by: "name", from: "frontmatter.results.file")
      segments: File @link(by: "name", from: "frontmatter.trainingPeaks")
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
    }

    type Coordinate {
      x: String,
      y: String
    }

    type Fields {
      slug: String
    }

  `)
  }
