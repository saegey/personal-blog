const path = require(`path`)
const { createFilePath } = require(`gatsby-source-filesystem`)
const { report } = require("process")
// const fs = require("fs")
const tj = require("@tmcw/togeojson")
const DOMParser = require("xmldom").DOMParser

const createMdxPages = async (graphql, createPage, reporter) => {
  const postTemplate = path.resolve("./src/templates/post.jsx")

  const result = await graphql(`
    {
      allMdx {
        nodes {
          id
          fields {
            slug
          }
          internal {
            contentFilePath
          }
        }
      }
    }
  `)

  if (result.errors) {
    reporter.panic(`Error loading posts`, JSON.stringify(result.errors))
    throw result.errors
  }

  const data = result.data.allMdx.nodes

  data.forEach(node => {
    createPage({
      path: node.fields.slug,
      component: `${postTemplate}?__contentFilePath=${node.internal.contentFilePath}`,
      context: {
        slug: node.fields.slug,
        id: node.id,
      },
    })
  })
}

exports.createResolvers = async ({ createResolvers }) => {
  //custom helper function to slugify a string
  const slugify = str => {
    return str
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)+/g, "")
  }
  createResolvers({
    Mdx: {
      gpxData: {
        type: "File",
        resolve: async (source, args, context) => {
          // console.log(source.frontmatter)
          if (source.frontmatter.gpxFile) {
            const results = await context.nodeModel.runQuery({
              query: {
                filter: {
                  name: {
                    eq: source.frontmatter.gpxFile,
                  },
                },
              },
              type: "File",
              firstOnly: true,
            })
            // console.log(results.fields.gpx)
            return results
          } else {
            return null
          }
        },
      },
    },
  })
}

exports.createPages = async ({ graphql, actions, reporter }) => {
  const { createPage, loadNodeContent } = actions
  // await createRemarkPages(graphql, createPage, reporter)
  await createMdxPages(graphql, createPage, reporter)
}

exports.onCreateNode = async ({ node, actions, getNode, loadNodeContent }) => {
  const { createNode, createParentChildLink, createNodeField } = actions

  if (node.internal.type === "Mdx") {
    const value = createFilePath({ node, getNode })

    createNodeField({
      name: `slug`,
      node,
      value,
    })
  }

  if (node.internal.mediaType === "application/gpx+xml") {
    // console.log("inside the loop", node.internal.type)
    const content = await loadNodeContent(node)
    const gpxData = new DOMParser().parseFromString(content)
    const data = tj.gpx(gpxData)
    if (data.type && data.type === "FeatureCollection") {
      if (data.features) {
        // const { createNode } = boundActionCreators
        data.features.forEach(feature => {
          if (
            feature.type &&
            feature.type === "Feature" &&
            feature.properties &&
            feature.properties.name
          ) {
            // const nodeId = createNodeId(`feature-${feature.properties.name}`)

            createNodeField({
              name: `gpx`,
              node,
              value: JSON.stringify(feature),
            })
          }
        })
      }
    }
  }
}

exports.createSchemaCustomization = ({ actions }) => {
  const { createTypes } = actions

  // Explicitly define the siteMetadata {} object
  // This way those will always be defined even if removed from gatsby-config.js

  // Also explicitly define the Markdown frontmatter
  // This way the "MarkdownRemark" queries will return `null` even when no
  // blog posts are stored inside "content/blog" instead of returning an error
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
    }

    type Mdx implements Node {
      frontmatter: Frontmatter
      fields: Fields
    }

    type Frontmatter {
      title: String
      description: String
      date: Date @dateformat
      tags: [String!]!
    }

    type Fields {
      slug: String
    }
  `)
}
