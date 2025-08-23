export type BlogPostingSchemaArgs = {
  siteUrl: string
  siteTitle: string
  authorName: string
  title: string
  description: string
  pathname: string
  imageUrl?: string
  publishedIso?: string
  modifiedIso?: string
}

export function buildBlogPostingSchema({
  siteUrl,
  siteTitle,
  authorName,
  title,
  description,
  pathname,
  imageUrl,
  publishedIso,
  modifiedIso,
}: BlogPostingSchemaArgs) {
  const url = `${siteUrl}${pathname || ''}`
  return {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: title,
    image: imageUrl ? [imageUrl] : undefined,
    datePublished: publishedIso || undefined,
    dateModified: modifiedIso || undefined,
    author: [{ '@type': 'Person', name: authorName }],
    publisher: {
      '@type': 'Organization',
      name: siteTitle,
    },
    description,
    url,
    mainEntityOfPage: { '@type': 'WebPage', '@id': url },
  }
}
