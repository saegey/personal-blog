import type { GatsbyNode } from 'gatsby'
import { createFilePath } from 'gatsby-source-filesystem'
import { slugify } from '../../lib/util'
import { handleJsonNode } from './parsers/jsonParser'
import { handleTextNode } from './parsers/textParser'
import { handleGpxNode } from './parsers/gpxParser'

type NodeType = {
  internal: {
    type: string
    description: string
    mediaType?: string
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

  if (node.internal.mediaType === 'application/json') {
    await handleJsonNode({ node, createNodeField, loadNodeContent });
  }

  if (node.internal.mediaType === 'text/plain') {
    await handleTextNode({ node, createNodeField, loadNodeContent });
  }

  if (
    node.internal.mediaType === 'application/octet-stream' ||
    node.internal.mediaType === 'application/gpx+xml'
  ) {
    await handleGpxNode({ node, createNodeField, loadNodeContent });
  }
}
