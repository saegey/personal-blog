import path from 'path'
import { createFilePath } from 'gatsby-source-filesystem'
import type { GatsbyNode } from 'gatsby'
import length from '@turf/length'
import { gpx } from '@tmcw/togeojson'
import { DOMParser } from '@xmldom/xmldom'

import { parse } from '../lib/raceResults'
import { parseTSV } from '../lib/webscorer'
import { parseOmniTSV } from '../lib/omniGo'
import { parseSegmentsFromXml } from '../lib/wkoHelper'

import {
  calcBestPowers,
  calcElevationGain,
  calcNormalizedPower,
  calcStoppage,
  dateDiff,
  downsampleElevation,
  calcMatchesBurned,
  calcPowerZones,
  calcPowerZoneBuckets,
} from '../lib/gpxHelper'

const defaultTimeWindows = [5, 10, 15, 30, 60, 120, 300, 600]
const slugify = (str: string) => {
  return str
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)+/g, '')
}

type MdxData = {
  data?: {
    allMdx: {
      nodes: {
        id: string
        fields: {
          slug: string
        }
        internal: {
          contentFilePath: string
        }
      }[]
    }
  }
  errors?: any
}

type Point = {
  x: number
  y: number
}

type Geometry = {
  type: string
  coordinates: [[number, number, number]]
}

export const createPages: GatsbyNode['createPages'] = async ({
  graphql,
  actions,
  reporter,
}) => {
  const { createPage } = actions

  const result: MdxData = await graphql(`
    {
      allMdx {
        nodes {
          id
          fields {
            slug
          }
          frontmatter {
            type
          }
          internal {
            contentFilePath
          }
        }
      }
    }
  `)

  if (result.errors) {
    reporter.panic(`Error loading posts`, result.errors)
    throw result.errors
  }

  if (!result.data) {
    reporter.panic(`No Data`, result.errors)
    throw 'No data found'
  }

  const postTemplate = path.resolve('./src/templates/post.tsx')
  const createPostPromise = result.data?.allMdx.nodes.map(post => {
    createPage({
      path: `${post.fields.slug}`,
      component: `${postTemplate}?__contentFilePath=${post.internal.contentFilePath}`,
      context: {
        slug: post.fields.slug,
        id: post.id,
        // anything else you want to pass to your context
      },
    })
  })

  await Promise.all([createPostPromise])
}

// Workaround
type NodeType = {
  internal: {
    type: string
    description: string
  }
  frontmatter: {
    type: string
  }
}

export const onCreateNode: GatsbyNode['onCreateNode'] = async ({
  node,
  actions,
  getNode,
  loadNodeContent,
}) => {
  const { createNodeField } = actions
  const nodeValue = node as any as NodeType

  if (nodeValue.internal.type === 'Mdx') {
    const slug: string = createFilePath({ node, getNode })

    createNodeField({
      name: `slug`,
      node,
      value: `${slugify(nodeValue.frontmatter.type)}${slug}`,
    })
  }

  if (node.internal.mediaType === 'text/plain') {
    const content = await loadNodeContent(node)
    if (!node.internal?.description) {
      return
    }
    const type = node.internal.description
      .split(' ')[1]
      .split('/')
      .slice(-2, -1)[0]

    if (type === 'raceresults') {
      createNodeField({
        name: `data`,
        node,
        value: parse(content),
      })
    }

    if (type === 'webscorer') {
      createNodeField({
        name: `data`,
        node,
        value: parseTSV(content),
      })
    }

    if (type === 'omnigo') {
      createNodeField({
        name: `data`,
        node,
        value: parseOmniTSV(content),
      })
    }
  }
  // console.log(JSON.stringify(node))
  if (node.internal.mediaType === 'application/octet-stream') {
    const content = await loadNodeContent(node)
    const xmlDoc = new DOMParser().parseFromString(content)
    const segments = parseSegmentsFromXml(xmlDoc)
    console.log(segments)
    createNodeField({
      name: `segments`,
      node,
      value: segments,
    })
  }

  if (node.internal.mediaType === 'application/gpx+xml') {
    const content = await loadNodeContent(node)
    const gpxData = new DOMParser().parseFromString(content)
    const data = gpx(gpxData)

    createNodeField({
      name: `distance`,
      node,
      value: length(data),
    })

    if (data.type && data.type === 'FeatureCollection') {
      if (data.features) {
        // const { createNode } = boundActionCreators
        data.features.forEach(feature => {
          if (
            feature.type &&
            feature.type === 'Feature' &&
            feature.properties &&
            feature.properties.name
          ) {
            const { powers, heart, times, atemps, cads } =
              feature.properties.coordinateProperties
            const { coordinates } = feature.geometry as Geometry
            const powerAnalysis =
              powers !== undefined
                ? calcBestPowers(
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
                : null
            const points: Point[] = []

            if (powers !== undefined) {
              Object.keys(powerAnalysis as {}).forEach(key => {
                if (key === 'entire') return
                points.push({
                  x: Number(key),
                  y: powerAnalysis ? powerAnalysis[key] : 0,
                })
              })
            }

            createNodeField({
              name: `powerCurve`,
              node,
              value: points,
            })

            if (feature.properties.desc) {
              const ftp = JSON.parse(feature.properties.desc).ftp
              const zones = calcPowerZones(ftp)
              createNodeField({
                name: `currentFtp`,
                node,
                value: ftp,
              })
              createNodeField({
                name: `powerZones`,
                node,
                value: zones,
              })

              createNodeField({
                name: `powerZoneBuckets`,
                node,
                value: calcPowerZoneBuckets({ zones, powers }),
              })
            }

            createNodeField({
              name: `powerAnalysis`,
              node,
              value:
                powers !== undefined
                  ? calcBestPowers(defaultTimeWindows, powers)
                  : null,
            })

            createNodeField({
              name: `normalizedPower`,
              node,
              value: powers !== undefined ? calcNormalizedPower(powers) : null,
            })

            createNodeField({
              name: `matchesBurned`,
              node,
              value:
                powers !== undefined ? calcMatchesBurned(powers, times) : null,
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
              value:
                cads !== undefined
                  ? calcBestPowers(defaultTimeWindows, cads, true)
                  : null,
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
              name: `times`,
              node,
              value: times,
            })

            createNodeField({
              name: `elapsedTime`,
              node,
              value: dateDiff(new Date(times[0]), new Date(times.at(-1))),
            })

            createNodeField({
              name: `elevationData`,
              node,
              value: downsampleElevation(coordinates, 20),
            })

            createNodeField({
              name: `powerData`,
              node,
              value: powers,
            })

            createNodeField({
              name: `heartRateData`,
              node,
              value: heart,
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
    }

    type Mdx implements Node {
      frontmatter: Frontmatter!
      fields: Fields
      gpxData: File @link(by: "name", from: "frontmatter.gpxFile")
      results: File @link(by: "name", from: "frontmatter.results.file")
      segments: File @link(by: "name", from: "frontmatter.trainingPeaks")
    }

    type Frontmatter {
      title: String!
      description: String
      date: Date! @dateformat
      tags: [String!]
      location: String
      type: String!
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
