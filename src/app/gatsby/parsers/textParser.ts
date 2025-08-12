// Handles parsing and node field creation for text/plain files
import { parse } from '../../../lib/raceResults'
import { parseTSV } from '../../../lib/webscorer'
import { parseOmniTSV } from '../../../lib/omniGo'
import { parseTurboreg } from '../../../lib/turboreg'
import { parseBikeSignup } from '../../../lib/bikesignup'

export function handleTextNode({
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

    if (type === 'raceresults') {
      createNodeField({
        name: `data`,
        node,
        value: parse(content),
      });
    }
    if (type === 'webscorer') {
      createNodeField({
        name: `data`,
        node,
        value: parseTSV(content),
      });
    }
    if (type === 'omnigo') {
      createNodeField({
        name: `data`,
        node,
        value: parseOmniTSV(content),
      });
    }
    if (type === 'turboreg') {
      createNodeField({
        name: `data`,
        node,
        value: parseTurboreg(content),
      });
    }
    if (type === 'bikesignup') {
      createNodeField({
        name: `data`,
        node,
        value: parseBikeSignup(content),
      });
    }
  });
}
