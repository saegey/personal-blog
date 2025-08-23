import * as React from 'react'
import Seo from '../components/seo'
import { useSiteMetadata } from '../hooks/use-site-metadata'

const NotFoundPage: React.FC = () => {
  return (
    <>
      <h1>404: Not Found</h1>
      <p>You just hit a route that doesn't exist... the sadness.</p>
    </>
  )
}

export const Head: React.FC = () => {
  const site = useSiteMetadata()
  const title = '404: Not Found'
  const description = 'The requested page could not be found.'
  const pathname = '/404'
  return (
    <>
      <Seo title={title} description={description} pathname={pathname} />
      <meta name="robots" content="noindex, follow" />
      <link
        rel="alternate"
        type="application/rss+xml"
        title={`${site.title} RSS`}
        href={`${site.siteUrl}/rss.xml`}
      />
    </>
  )
}

export default NotFoundPage
