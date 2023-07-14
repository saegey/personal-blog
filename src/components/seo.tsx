import { useSiteMetadata } from '../hooks/use-site-metadata'

const Seo = ({
  title,
  description,
  pathname,
  children,
  image,
  author,
  publishedDate,
}) => {
  const {
    title: defaultTitle,
    description: defaultDescription,
    siteUrl,
    twitterUsername,
    author: defaultAuthor,
  } = useSiteMetadata()

  const seo = {
    title: title || defaultTitle,
    description: description || defaultDescription,
    image: image?.childImageSharp?.gatsbyImageData?.images?.fallback?.src,
    width: image?.childImageSharp?.gatsbyImageData?.width,
    height: image?.childImageSharp?.gatsbyImageData?.height,
    url: `${siteUrl}${pathname || ``}`,
    author: author || defaultAuthor,
    twitterUsername,
    publishedDate,
  }

  console.log(image)

  const twitterImageTag = seo.image ? (
    <meta name="twitter:image" content={`${seo.url}${seo.image}`} />
  ) : (
    ''
  )

  const imageTag = image ? (
    <meta name="image" content={`${seo.url}${seo.image}`} />
  ) : (
    ''
  )

  // og:image
  const facebookImageTag = image ? (
    <>
      <meta name="og:image" content={`${seo.url}${seo.image}`} />
      <meta name="og:image:width" content={seo.width} />
      <meta name="og:image:height" content={seo.height} />
    </>
  ) : (
    ''
  )

  const publishedTimeTag = publishedDate ? (
    <meta property="article:published_time" content={publishedDate} />
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
        property="twitter:title"
        name="twitter:card"
        content="summary_large_image"
      />
      <meta property="twitter:title" name="twitter:title" content={seo.title} />
      <meta property="twitter:url" name="twitter:url" content={seo.url} />
      <meta
        property="twitter:description"
        name="twitter:description"
        content={seo.description}
      />
      {twitterImageTag}
      <meta
        property="twitter:creator"
        name="twitter:creator"
        content={seo.twitterUsername}
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
