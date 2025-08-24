/** @jsxImportSource theme-ui */
import * as React from 'react'
import { graphql, Link as GatsbyLink } from 'gatsby'
import { Box, Container, Card, Flex, Text, Link as TLink } from 'theme-ui'
import type { PageProps } from 'gatsby'
import { IGatsbyImageData } from 'gatsby-plugin-image'

import Seo from '../components/seo'
import { useSiteMetadata } from '../hooks/use-site-metadata'
import { pvrEpisodes } from '../data/pvrEpisodes'

type Node = {
  fields: { slug: string }
  frontmatter: {
    title: string
    teaser?: string
    type?: string
    subType?: string
    tags?: string[]
    headerImage?: { childImageSharp?: { gatsbyImageData: IGatsbyImageData } }
    featuredOnLinks?: boolean
  }
}

type Data = {
  allMdx: { nodes: Node[] }
}

// Helpers: extract YouTube video ID and build a thumbnail URL
const getYouTubeId = (url: string): string | null => {
  try {
    const u = new URL(url)
    const host = u.hostname.replace(/^www\./, '')
    if (host === 'youtu.be') {
      return u.pathname.split('/').filter(Boolean)[0] || null
    }
    if (
      host === 'youtube.com' ||
      host === 'm.youtube.com' ||
      host === 'youtube-nocookie.com'
    ) {
      // Standard watch URL
      const v = u.searchParams.get('v')
      if (v) return v
      // Shorts: /shorts/{id}
      const parts = u.pathname.split('/').filter(Boolean)
      if (parts[0] === 'shorts' && parts[1]) return parts[1]
      // Live or embed formats
      if (parts[0] === 'live' && parts[1]) return parts[1]
      if (parts[0] === 'embed' && parts[1]) return parts[1]
    }
    // Fallback regex
    const match = url.match(/[?&]v=([^&#]+)/)
    return match ? match[1] : null
  } catch {
    return null
  }
}

const getYouTubeThumb = (id: string) =>
  `https://img.youtube.com/vi/${id}/hqdefault.jpg`

const LinksPage: React.FC<PageProps<Data>> = ({ data }) => {
  const site = useSiteMetadata()
  const posts = (data.allMdx.nodes || []).filter(
    n => n.frontmatter?.featuredOnLinks,
  )

  return (
    <Box as="main" sx={{ bg: 'background', minHeight: '100vh' }}>
      <Container sx={{ px: 3, py: 4, maxWidth: 600 }}>
        {/* Profile / Hero */}
        <Flex sx={{ flexDirection: 'column', alignItems: 'center', mb: 3 }}>
          <Box
            sx={{
              width: 88,
              height: 88,
              borderRadius: '50%',
              mb: 2,
              border: t => `2px solid ${t.colors?.muted}`,
              overflow: 'hidden',
            }}
          >
            {/* eslint-disable-next-line jsx-a11y/alt-text */}
            <img
              src="/DSC_0851.jpeg"
              alt={`${site.title} profile`}
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            />
          </Box>
          <Text as="h1" sx={{ fontSize: 3, fontWeight: 800, mb: 1 }}>
            {site.title}
          </Text>
          <Text
            as="p"
            sx={{ fontSize: 1, color: 'textMuted', textAlign: 'center' }}
          >
            Engineer • Endurance Cyclist • Vinyl Selector
          </Text>
          <Text
            as="p"
            sx={{ fontSize: 1, color: 'textMuted', textAlign: 'center', mt: 2 }}
          >
            {' '}
            Building products, chasing miles, curating grooves
          </Text>
        </Flex>

        {/* PVR Episodes */}
        {pvrEpisodes.length > 0 && (
          <Box sx={{ mt: 3, mb: 3 }}>
            <Text as="h2" sx={{ fontSize: 2, fontWeight: 700, mb: 2 }}>
              Public Vinyl Radio
            </Text>
            <Flex
              as="ul"
              sx={{
                listStyle: 'none',
                p: 0,
                m: 0,
                flexDirection: 'column',
                gap: 2,
              }}
            >
              {pvrEpisodes.map(ep => {
                const id = getYouTubeId(ep.url)
                const thumb = id ? getYouTubeThumb(id) : null
                return (
                  <Card key={ep.url} as="li" sx={{ p: 0, overflow: 'hidden' }}>
                    <TLink
                      href={ep.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      sx={{ display: 'block' }}
                    >
                      <Flex sx={{ alignItems: 'center', p: 3, gap: 3 }}>
                        {thumb && (
                          <Box
                            sx={{
                              width: 96,
                              height: 54,
                              bg: 'muted',
                              borderRadius: 8,
                              overflow: 'hidden',
                              flex: '0 0 auto',
                            }}
                          >
                            {/* eslint-disable-next-line jsx-a11y/alt-text */}
                            <img
                              src={thumb}
                              alt={`${ep.title} thumbnail`}
                              style={{
                                width: '100%',
                                height: '100%',
                                objectFit: 'cover',
                              }}
                              loading="lazy"
                            />
                          </Box>
                        )}
                        <Box sx={{ minWidth: 0 }}>
                          <Text
                            as="p"
                            sx={{ fontWeight: 700, mb: 1, fontSize: 2 }}
                          >
                            {ep.title}
                          </Text>
                          {ep.date && (
                            <Text
                              as="p"
                              sx={{ color: 'textMuted', fontSize: 0 }}
                            >
                              {new Date(ep.date).toLocaleDateString()}
                            </Text>
                          )}
                        </Box>
                      </Flex>
                    </TLink>
                  </Card>
                )
              })}
            </Flex>
          </Box>
        )}

        {/* Primary actions */}
        <Flex sx={{ flexDirection: 'column', gap: 2, mb: 3 }}>
          <TLink
            href="/about"
            sx={{ variant: 'buttons.secondary', textAlign: 'center' }}
          >
            About
          </TLink>
          <TLink
            href="/blog"
            sx={{ variant: 'buttons.primary', textAlign: 'center' }}
          >
            Latest Posts
          </TLink>
        </Flex>

        {/* Featured posts */}
        {posts.length > 0 && (
          <Box sx={{ mt: 3 }}>
            <Text as="h2" sx={{ fontSize: 2, fontWeight: 700, mb: 2 }}>
              Featured
            </Text>
            <Flex
              as="ul"
              sx={{
                listStyle: 'none',
                p: 0,
                m: 0,
                flexDirection: 'column',
                gap: 2,
              }}
            >
              {posts.map(n => (
                <Card
                  key={n.fields.slug}
                  as="li"
                  sx={{ p: 0, overflow: 'hidden' }}
                >
                  <GatsbyLink
                    to={`/${n.fields.slug}`}
                    style={{ textDecoration: 'none', color: 'inherit' }}
                  >
                    <Flex sx={{ alignItems: 'center', p: 3, gap: 3 }}>
                      <Box
                        sx={{
                          width: 64,
                          height: 64,
                          bg: 'muted',
                          borderRadius: 8,
                          overflow: 'hidden',
                          flex: '0 0 auto',
                        }}
                      >
                        {/* simple thumb via plain <img> using gatsby output src if present */}
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        {n.frontmatter.headerImage?.childImageSharp
                          ?.gatsbyImageData?.images?.fallback?.src && (
                          <img
                            src={
                              n.frontmatter.headerImage.childImageSharp
                                .gatsbyImageData.images.fallback!.src
                            }
                            alt={n.frontmatter.title}
                            style={{
                              width: '100%',
                              height: '100%',
                              objectFit: 'cover',
                            }}
                          />
                        )}
                      </Box>
                      <Box sx={{ minWidth: 0 }}>
                        <Text
                          as="p"
                          sx={{ fontWeight: 700, mb: 1, fontSize: 2 }}
                        >
                          {n.frontmatter.title}
                        </Text>
                        {n.frontmatter.teaser && (
                          <Text
                            as="p"
                            sx={{
                              color: 'textMuted',
                              fontSize: 1,
                              whiteSpace: 'nowrap',
                              overflow: 'hidden',
                              textOverflow: 'ellipsis',
                            }}
                          >
                            {n.frontmatter.teaser}
                          </Text>
                        )}
                      </Box>
                    </Flex>
                  </GatsbyLink>
                </Card>
              ))}
            </Flex>
          </Box>
        )}

        {/* Social grid */}
        <Flex
          sx={{ gap: 2, mt: 4, flexWrap: 'wrap', justifyContent: 'center' }}
        >
          <TLink
            href={`https://linkedin.com/in/${site.social?.linkedin ?? 'saegey'}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            LinkedIn
          </TLink>
          <TLink
            href={`https://github.com/${site.social?.github ?? 'saegey'}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            GitHub
          </TLink>
          <TLink
            href={`https://instagram.com/${site.social?.instagram ?? 'saegey'}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            Instagram
          </TLink>
          <TLink
            href={`https://strava.com/athletes/${site.social?.strava ?? 'saegey'}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            Strava
          </TLink>
          <TLink
            href="https://youtube.com/@publicvinylradio"
            target="_blank"
            rel="noopener noreferrer"
          >
            YouTube
          </TLink>
        </Flex>
      </Container>
    </Box>
  )
}

export default LinksPage

export const Head: React.FC<PageProps<Data>> = ({ data }) => {
  const site = useSiteMetadata()
  const title = 'Links'
  const description =
    'Quick links: contact, featured posts, and Public Vinyl Radio episodes.'
  const pathname = '/links'

  const items = (data.allMdx.nodes || []).filter(
    n => n.frontmatter?.featuredOnLinks,
  )
  const itemList = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    itemListElement: items.map((n, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      url: `${site.siteUrl}/${n.fields.slug}`,
      name: n.frontmatter.title,
    })),
  }

  return (
    <>
      <Seo title={title} description={description} pathname={pathname} />
      <link
        rel="alternate"
        type="application/rss+xml"
        title={`${site.title} RSS`}
        href={`${site.siteUrl}/rss.xml`}
      />
      <script type="application/ld+json">{JSON.stringify(itemList)}</script>
    </>
  )
}

export const pageQuery = graphql`
  query LinksPageQuery {
    allMdx(
      sort: { frontmatter: { publishedDate: DESC } }
      filter: { frontmatter: { isActive: { ne: false } } }
      limit: 12
    ) {
      nodes {
        fields {
          slug
        }
        frontmatter {
          title
          teaser
          headerImage {
            childImageSharp {
              gatsbyImageData(
                placeholder: BLURRED
                width: 256
                height: 256
                layout: CONSTRAINED
              )
            }
          }
        }
      }
    }
  }
`
