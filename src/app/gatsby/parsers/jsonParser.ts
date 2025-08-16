// Handles parsing and node field creation for JSON files
import { parseBikeSignupJSON } from '../../../lib/bikesignupjson'
import { formatJson as formatRaceResultJson } from '../../../lib/myraceresult'

export function handleJsonNode({
  node,
  createNodeField,
  loadNodeContent,
}: {
  node: any;
  createNodeField: (args: { name: string; node: any; value: any }) => void;
  loadNodeContent: (node: any) => Promise<string>;
}) {
  return loadNodeContent(node).then((content: string) => {
    if (!node.internal?.description) return;
    const type = node.internal.description
      .split(' ')[1]
      .split('/')
      .slice(-2, -1)[0];

    if (type === 'bikesignupjson') {
      createNodeField({
        name: `data`,
        node,
        value: parseBikeSignupJSON(JSON.parse(content)),
      });
    }
    if (type === 'myraceresult') {
      createNodeField({
        name: `data`,
        node,
        value: formatRaceResultJson(JSON.parse(content)),
      });
    }
  });
}
