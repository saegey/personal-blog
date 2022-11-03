/**
 * SEO component that queries for data with
 *  Gatsby's useStaticQuery React hook
 *
 * See: https://www.gatsbyjs.com/docs/use-static-query/
 */

import PropTypes from 'prop-types'
import { useStaticQuery, graphql } from 'gatsby'

type Props = {
  description?: string
  title: string
  children?: JSX.Element
}

type Site = {
  site: {
    siteMetadata: {
      title: string
      description: string
      social: {
        twitter: string
      }
    }
  }
}

const Seo = ({ description, title, children }: Props) => {
  const { site }: Site = useStaticQuery(
    graphql`
      query {
        site {
          siteMetadata {
            title
            description
            social {
              twitter
            }
          }
        }
      }
    `
  )

  const metaDescription = description || site.siteMetadata.description
  const defaultTitle = site.siteMetadata?.title

  return (
    <>
      <title>{defaultTitle ? `${title} | ${defaultTitle}` : title}</title>
      <meta name="description" content={metaDescription} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={metaDescription} />
      <meta property="og:type" content="website" />
      <meta name="twitter:card" content="summary" />
      <meta
        name="twitter:creator"
        content={site.siteMetadata?.social?.twitter || ''}
      />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={metaDescription} />
      {children}
    </>
  )
}

Seo.defaultProps = {
  description: '',
}

Seo.propTypes = {
  description: PropTypes.string,
  title: PropTypes.string.isRequired,
  children: PropTypes.node,
}

export default Seo
