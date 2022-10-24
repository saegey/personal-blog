const path = require(`path`)
const { createFilePath } = require(`gatsby-source-filesystem`)
const { report } = require("process")
const tj = require("@tmcw/togeojson")
const DOMParser = require("xmldom").DOMParser
const { parse } = require("./src/lib/raceResults")
const { parseTSV } = require("./src/lib/webscorer")
const { parseOmniTSV } = require("./src/lib/omniGo")

var length = require("@turf/length")

const {
  calcBestPowers,
  calcElevationGain,
  calcStoppage,
  dateDiff,
  downsampleElevation,
} = require("./src/lib/gpxDemo")

const defaultTimeWindows = [5, 10, 15, 30, 60, 120, 300, 600]

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
            return results
          } else {
            return null
          }
        },
      },
      results: {
        type: "File",
        resolve: async (source, args, context) => {
          if (source.frontmatter.results) {
            try {
              const results = await context.nodeModel.runQuery({
                query: {
                  filter: {
                    name: {
                      eq: source.frontmatter.results.file,
                    },
                  },
                },
                type: "File",
                firstOnly: true,
              })
              return results
            } catch (e) {
              console.log("error", e)
            }
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

  if (node.internal.mediaType === "text/plain") {
    const content = await loadNodeContent(node)
    const type = node.internal.description
      .split(" ")[1]
      .split("/")
      .slice(-2, -1)[0]

    if (type === "raceresults") {
      createNodeField({
        name: `data`,
        node,
        value: parse(content),
      })
    }

    if (type === "webscorer") {
      createNodeField({
        name: `data`,
        node,
        value: parseTSV(content),
      })
    }

    if (type === "omnigo") {
      createNodeField({
        name: `data`,
        node,
        value: parseOmniTSV(content),
      })
    }
  }

  if (node.internal.mediaType === "application/gpx+xml") {
    const content = await loadNodeContent(node)
    const gpxData = new DOMParser().parseFromString(content)
    const data = tj.gpx(gpxData)

    createNodeField({
      name: `distance`,
      node,
      value: length.default(data),
    })

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
            const { powers, heart, times, atemps, cads } =
              feature.properties.coordinateProperties
            const { coordinates } = feature.geometry
            const powerAnalysis = calcBestPowers(
              [
                1,
                2,
                3,
                4,
                5,
                6,
                7,
                8,
                9,
                10,
                11,
                12,
                13,
                14,
                15,
                20,
                25,
                30,
                35,
                40,
                45,
                50,
                55,
                60,
                70,
                80,
                90,
                100,
                110,
                120,
                180,
                240,
                300,
                360,
                420,
                480,
                540,
                600,
                660,
                720,
                780,
                840,
                900,
                960,
                1020,
                1080,
                1140,
                1200,
                1500,
                1800,
                2100,
                2400,
                2700,
                3000,
                3300,
                3600,
                4200,
                4800,
                5400,
                6000,
                6600,
                7200,
                7800,
                8400,
                9000,
                9600,
                10200,
                10800,
                12000,
                13200,
                14400,
                15600,
                16800,
                18000,
                19200,
                20400,
                21600,
                powers.length,
              ],
              powers
            )
            const points = []
            Object.keys(powerAnalysis).forEach(key => {
              if (key === "entire") return
              points.push({ x: key, y: powerAnalysis[key] })
            })

            createNodeField({
              name: `powerCurve`,
              node,
              value: points,
            })

            createNodeField({
              name: `powerAnalysis`,
              node,
              value: calcBestPowers(defaultTimeWindows, powers),
            })

            createNodeField({
              name: `tempAnalysis`,
              node,
              value: calcBestPowers(defaultTimeWindows, atemps),
            })

            createNodeField({
              name: `heartAnalysis`,
              node,
              value: calcBestPowers(defaultTimeWindows, heart),
            })

            createNodeField({
              name: `cadenceAnalysis`,
              node,
              value: calcBestPowers(defaultTimeWindows, cads),
            })

            createNodeField({
              name: `elevationGain`,
              node,
              value: calcElevationGain(coordinates),
            })

            createNodeField({
              name: `stoppedTime`,
              node,
              value: calcStoppage(coordinates, times),
            })

            createNodeField({
              name: `elapsedTime`,
              node,
              value: dateDiff(new Date(times[0]), new Date(times.at(-1))),
            })

            createNodeField({
              name: `elevationData`,
              node,
              value: downsampleElevation(coordinates, 60),
            })

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

    type Coordinate {
      x: String,
      y: String
    }

    type Fields {
      slug: String
    }

  `)
}
