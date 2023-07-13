import { useSiteMetadata } from '../hooks/use-site-metadata'

const Seo = ({ title, description, pathname, children, image }) => {
  const {
    title: defaultTitle,
    description: defaultDescription,
    siteUrl,
    twitterUsername,
  } = useSiteMetadata()

  const seo = {
    title: title || defaultTitle,
    description: description || defaultDescription,
    image: `${siteUrl}${image}`,
    url: `${siteUrl}${pathname || ``}`,
    twitterUsername,
  }

  const twitterImageTag = image ? (
    <meta
      name="twitter:image"
      content={`${seo.url}${image.childImageSharp.fixed.src}`}
    />
  ) : (
    ''
  )

  const imageTag = image ? (
    <meta
      name="image"
      content={`${seo.url}${image.childImageSharp.fixed.src}`}
    />
  ) : (
    ''
  )

  // og:image
  const facebookImageTag = image ? (
    <meta
      name="og:image"
      content={`${seo.url}${image.childImageSharp.fixed.src}`}
    />
  ) : (
    ''
  )

  return (
    <>
      <title>{seo.title}</title>
      <meta name="description" content={seo.description} />
      {imageTag}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={seo.title} />
      <meta name="twitter:url" content={seo.url} />
      <meta name="twitter:description" content={seo.description} />
      {twitterImageTag}
      <meta name="twitter:creator" content={seo.twitterUsername} />
      <link
        rel="icon"
        href="data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><text y='0.9em' font-size='90'>👤</text></svg>"
      />
      {facebookImageTag}
      <meta name="og:title" content={seo.title} />
      <meta name="og:description" content={seo.description} />
      {children}
    </>
  )
}

export default Seo
