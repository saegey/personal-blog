import { ImageDataLike, getSrc } from 'gatsby-plugin-image'

import { useSiteMetadata } from '../hooks/use-site-metadata'

type SeoPayload = {
  title: string
  description: string
  pathname: string
  children?: JSX.Element
  image?: ImageDataLike | string
  author?: {
    name: string
  }
  publishedDate?: string
  modifiedDate?: string
  twitterUsername?: string
  width?: string
  height?: string
  type?: 'article' | 'website'
  imageAlt?: string
  locale?: string
  tags?: string[]
}
const Seo = ({
  title,
  description,
  pathname,
  children,
  image,
  author,
  publishedDate,
  modifiedDate,
  twitterUsername,
  width,
  height,
  locale,
  imageAlt,
  tags = [],
}: SeoPayload) => {
  const {
    title: defaultTitle,
    description: defaultDescription,
    siteUrl,
    social: defaultSocial,
    author: defaultAuthor,
  } = useSiteMetadata()

  // TODO: Refactor based on the link below
  // https://www.wpeform.io/blog/add-open-graph-site-url-to-gatsbyjs/

  // Build canonical URL safely (avoid double slashes)
  const base = (siteUrl || '').replace(/\/+$/, '')
  const path = pathname
    ? pathname.startsWith('/')
      ? pathname
      : `/${pathname}`
    : ''

  const seo = {
    title: title || defaultTitle,
    description: description || defaultDescription,
    url: `${base}${path}`,
    author: author || defaultAuthor,
    twitterUsername: twitterUsername || defaultSocial.twitter,
    publishedDate,
  }

  // Build absolute image URL if provided
  let imageUrl: string | undefined
  if (typeof image === 'string') {
    imageUrl = image.startsWith('http') ? image : `${siteUrl}${image}`
  } else if (image) {
    const src = getSrc(image as ImageDataLike)
    if (src) imageUrl = src.startsWith('http') ? src : `${siteUrl}${src}`
  }
  // Fallback to a site-wide default image if none supplied
  if (!imageUrl) {
    const fallbackPath = '/public/DSC_0851.jpeg'
    imageUrl = `${base}${fallbackPath}`
  }

  const imageWidth = width || undefined
  const imageHeight = height || undefined
  const ogLocale = locale || 'en_US'

  const publishedTimeTag = publishedDate ? (
    <meta
      property="article:published_time"
      name="article:published_time"
      content={publishedDate}
    />
  ) : (
    ''
  )

  const modifiedTimeTag = modifiedDate ? (
    <>
      <meta
        property="article:modified_time"
        name="article:modified_time"
        content={modifiedDate}
      />
      <meta property="og:updated_time" content={modifiedDate} />
    </>
  ) : (
    ''
  )

  return (
    <>
      <title>{seo.title}</title>
      {/* Canonical */}
      <link rel="canonical" href={seo.url} />
      <meta
        name="description"
        property="og:description"
        content={seo.description}
      />
  <meta property="og:locale" content={ogLocale} />
      {/* Open Graph */}
      <meta property="og:title" name="og:title" content={seo.title} />
      <meta property="og:url" name="og:url" content={seo.url} />
      <meta property="og:site_name" name="og:site_name" content={defaultTitle} />
      <meta property="og:type" name="og:type" content={publishedDate ? 'article' : 'website'} />
      {imageUrl && (
        <>
          <meta property="og:image" name="og:image" content={imageUrl} />
          {imageWidth && (
            <meta property="og:image:width" name="og:image:width" content={imageWidth} />
          )}
          {imageHeight && (
            <meta property="og:image:height" name="og:image:height" content={imageHeight} />
          )}
          {(imageAlt || defaultTitle) && (
            <meta property="og:image:alt" name="og:image:alt" content={imageAlt || `${defaultTitle} cover image`} />
          )}
        </>
      )}
      {/* Twitter */}
      <meta name="twitter:card" content={imageUrl ? 'summary_large_image' : 'summary'} />
      <meta name="twitter:title" content={seo.title} />
      <meta name="twitter:description" content={seo.description} />
      <meta name="twitter:url" content={seo.url} />
      <meta name="twitter:creator" content={`@${seo.twitterUsername}`} />
      <meta name="twitter:site" content={`@${seo.twitterUsername}`} />
    {imageUrl && <meta name="twitter:image" content={imageUrl} />}
  {(imageAlt || defaultTitle) && <meta name="twitter:image:alt" content={imageAlt || `${defaultTitle} cover image`} />}
      {/* Article tags */}
      {publishedDate &&
        Array.isArray(tags) &&
        tags.map((t, i) => (
          <meta key={`article:tag:${i}`} property="article:tag" content={t} />
        ))}
      <link
        rel="icon"
        href="data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><text y='0.9em' font-size='90'>👤</text></svg>"
      />
      <meta name="author" content={seo.author.name} />
      {publishedTimeTag}
  {modifiedTimeTag}
      {children}
    </>
  )
}

export default Seo
