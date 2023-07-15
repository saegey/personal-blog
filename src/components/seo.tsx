import { useSiteMetadata } from '../hooks/use-site-metadata'

const Seo = ({
  title,
  description,
  pathname,
  children,
  image,
  author,
  publishedDate,
  twitterUsername,
  width,
  height,
}) => {
  const {
    title: defaultTitle,
    description: defaultDescription,
    siteUrl,
    social: defaultSocial,
    author: defaultAuthor,
  } = useSiteMetadata()

  // TODO: Refactor based on the link below
  // https://www.wpeform.io/blog/add-open-graph-site-url-to-gatsbyjs/

  const seo = {
    title: title || defaultTitle,
    description: description || defaultDescription,
    url: `${siteUrl}${pathname || ``}`,
    author: author || defaultAuthor,
    twitterUsername: twitterUsername || defaultSocial.twitter,
    publishedDate,
  }

  const twitterImageTag = image ? (
    <meta
      property="twitter:image"
      name="twitter:image"
      content={`${seo.url}${image}`}
    />
  ) : (
    ''
  )

  const imageTag = image ? (
    <meta property="image" name="image" content={`${seo.url}${image}`} />
  ) : (
    ''
  )

  // og:image
  const facebookImageTag = image ? (
    <>
      <meta
        property="og:image"
        name="og:image"
        content={`${seo.url}${image}`}
      />
      <meta property="og:image:width" name="og:image:width" content={width} />
      <meta
        property="og:image:height"
        name="og:image:height"
        content={height}
      />
    </>
  ) : (
    ''
  )

  const publishedTimeTag = publishedDate ? (
    <meta
      property="article:published_time"
      name="article:published_time"
      content={publishedDate}
    />
  ) : (
    ''
  )

  return (
    <>
      <title>{seo.title}</title>
      <meta
        name="description"
        property="og:description"
        content={seo.description}
      />
      {imageTag}
      <meta
        property="twitter:card"
        name="twitter:card"
        content="summary_large_image"
      />
      <meta property="twitter:title" name="twitter:title" content={seo.title} />
      <meta property="twitter:url" name="twitter:url" content={seo.url} />
      <meta property="og:url" name="og:url" content={seo.url} />
      <meta
        property="twitter:description"
        name="twitter:description"
        content={seo.description}
      />
      {twitterImageTag}
      <meta
        property="twitter:creator"
        name="twitter:creator"
        content={`@${seo.twitterUsername}`}
      />
      <meta
        property="twitter:site"
        name="twitter:site"
        content={`@${seo.twitterUsername}`}
      />
      <link
        rel="icon"
        href="data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><text y='0.9em' font-size='90'>👤</text></svg>"
      />
      {facebookImageTag}
      <meta property="og:title" name="og:title" content={seo.title} />
      <meta
        property="og:description"
        name="og:description"
        content={seo.description}
      />
      <meta property="og:type" name="og:type" content="article" />
      <meta name="author" content={seo.author.name} />
      {publishedTimeTag}
      {children}
    </>
  )
}

export default Seo
