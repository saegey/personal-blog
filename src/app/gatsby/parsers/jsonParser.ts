// Handles parsing and node field creation for JSON files
import { parseBikeSignupJSON } from '../../../lib/bikesignupjson'
import { formatJson as formatRaceResultJson } from '../../../lib/myraceresult'

export function handleJsonNode({
  node,
  createNodeField,
  loadNodeContent,
}: {
  node: any
  createNodeField: (args: { name: string; node: any; value: any }) => void
  loadNodeContent: (node: any) => Promise<string>
}) {
  return loadNodeContent(node).then((content: string) => {
    // Determine type using multiple hints: sourceInstanceName, path, or internal.description
    const inferType = (): string | undefined => {
      try {
        const source =
          node?.sourceInstanceName ||
          node?.parent?.sourceInstanceName ||
          node?.parent?.internal?.owner
        const relDir =
          node?.relativeDirectory || node?.parent?.relativeDirectory || ''
        const desc = node?.internal?.description || ''
        if (
          source === 'stats' ||
          /\bstats\b/.test(relDir) ||
          /stats\//.test(desc)
        )
          return 'stats'
        // if (source === 'results' || /\bresults\b/.test(relDir)) return 'myraceresult'
        // Fallback to prior description parsing
        if (desc) {
          const t = desc.split(' ')[1]?.split('/')?.slice(-2, -1)[0]
          return t
        }
      } catch {}
      return undefined
    }

    const type = inferType()
    console.log(`Handling JSON node ${node.id} of type ${type}`)

    if (node.sourceInstanceName === 'galleries') {
      try {
        createNodeField({ name: `data`, node, value: JSON.parse(content) })
      } catch {
        // Ignore incomplete gallery manifests while they are being written.
      }
      return
    }

    if (type === 'bikesignupjson') {
      try {
        const parsed: any = JSON.parse(content)
        createNodeField({
          name: `data`,
          node,
          value: parseBikeSignupJSON(parsed as any),
        })
      } catch {
        // ignore invalid JSON
      }
      return
    }

    if (type === 'myraceresult') {
      try {
        const parsed: any = JSON.parse(content)
        createNodeField({
          name: `data`,
          node,
          value: formatRaceResultJson(parsed),
        })
      } catch {
        // ignore invalid JSON
      }
      return
    }

    if (type === 'stats') {
      try {
        const parsed: any = JSON.parse(content)
        createNodeField({
          name: `data`,
          node,
          value: parsed,
        })
      } catch {
        // ignore invalid JSON
      }
      return
    }

    // If type couldn't be determined, do nothing
  })
}
