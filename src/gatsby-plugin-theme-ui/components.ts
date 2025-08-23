/**
 * Shadowed components for gatsby-plugin-theme-ui
 * This maps MDX <pre> and <code> elements to Theme UI's Prism component.
 */
import Prism from '@theme-ui/prism'

export default {
  // MDX wraps code in <pre><code>...</code></pre>.
  // We don't want two wrappers, so make <pre> a passthrough.
  pre: ({ children }: { children: React.ReactNode }) => children,

  // Replace <code> with Theme UI's Prism component.
  code: Prism,
}
