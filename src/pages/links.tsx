import * as React from 'react'
import { graphql, Link as GatsbyLink, type PageProps } from 'gatsby'
import { IGatsbyImageData, getSrc } from 'gatsby-plugin-image'

import Seo from '../components/seo'
import ThemeControl from '../components/layout/ThemeControl'
import { useSiteMetadata } from '../hooks/use-site-metadata'
import { pvrEpisodes } from '../data/pvrEpisodes'

type Node = {
  fields: { slug: string }
  frontmatter: {
    title: string
    teaser?: string
    headerImage?: { childImageSharp?: { gatsbyImageData: IGatsbyImageData } }
    featuredOnLinks?: boolean
  }
}
type Data = { allMdx: { nodes: Node[] } }

const getYouTubeId = (url: string) => {
  try {
    const parsed = new URL(url)
    const host = parsed.hostname.replace(/^www\./, '')
    if (host === 'youtu.be') return parsed.pathname.split('/').filter(Boolean)[0] ?? null
    if (host.includes('youtube')) {
      const parts = parsed.pathname.split('/').filter(Boolean)
      return parsed.searchParams.get('v') ?? parts[parts.length - 1] ?? null
    }
  } catch { /* malformed external URL */ }
  return null
}

const Card = ({ children }: { children: React.ReactNode }) => <li className="border-t border-line last:border-b">{children}</li>
const Thumb = ({ src, alt }: { src: string; alt: string }) => <img src={src} alt={alt} className="h-16 w-24 shrink-0 object-cover" loading="lazy" />

const LinksPage: React.FC<PageProps<Data>> = ({ data }) => {
  const site = useSiteMetadata()
  const posts = data.allMdx.nodes.filter(node => node.frontmatter.featuredOnLinks)

  return (
    <main className="min-h-screen bg-paper px-5 py-8 text-ink sm:px-8 sm:py-12">
      <div className="mx-auto max-w-xl">
      <header className="border-b border-line pb-8 text-center">
        <img src="/logo_saegey.svg" alt="Saegey" className="site-logo mx-auto h-11 w-auto" />
        <h1 className="mt-6 font-heading text-4xl font-medium tracking-[-0.03em]">Adam Saegebarth</h1>
        <p className="mt-3 font-condensed text-sm font-medium uppercase tracking-label text-muted">Artist · Product designer · Creative technologist</p>
        <p className="mx-auto mt-5 max-w-md text-lg leading-relaxed text-muted">Making images, objects, sound, and systems. Based in Seattle, Washington.</p>
      </header>

      <nav className="mt-8 grid gap-2" aria-label="Primary links">
        <GatsbyLink to="/gallery" className="flex items-center justify-between border border-ink px-4 py-4 font-condensed text-base font-semibold uppercase tracking-label">Gallery <span aria-hidden="true">↗</span></GatsbyLink>
        <GatsbyLink to="/work" className="flex items-center justify-between border border-ink px-4 py-4 font-condensed text-base font-semibold uppercase tracking-label">Selected work <span aria-hidden="true">↗</span></GatsbyLink>
        <GatsbyLink to="/about" className="flex items-center justify-between border border-line px-4 py-4 font-condensed text-base font-semibold uppercase tracking-label">About <span aria-hidden="true">↗</span></GatsbyLink>
      </nav>

      {pvrEpisodes.length > 0 && <section className="mt-10">
        <p className="eyebrow">Listen</p>
        <h2 className="mt-2 font-heading text-3xl font-medium">Public Vinyl Radio</h2>
        <ul className="mt-5">
          {pvrEpisodes.map(episode => {
            const id = getYouTubeId(episode.url)
            return <Card key={episode.url}><a href={episode.url} target="_blank" rel="noreferrer" className="flex items-center gap-4 py-3">
              {id && <Thumb src={`https://img.youtube.com/vi/${id}/hqdefault.jpg`} alt={`${episode.title} thumbnail`} />}
              <span><strong className="font-serif text-lg font-medium">{episode.title}</strong>{episode.date && <span className="mt-1 block font-condensed text-xs uppercase tracking-label text-muted">{new Date(episode.date).toLocaleDateString()}</span>}</span>
            </a></Card>
          })}
        </ul>
      </section>}

      {posts.length > 0 && <section className="mt-10">
        <p className="eyebrow">Notebook</p>
        <h2 className="mt-2 font-heading text-3xl font-medium">Selected notes</h2>
        <ul className="mt-5">
          {posts.map(post => {
            const image = post.frontmatter.headerImage?.childImageSharp?.gatsbyImageData
            return <Card key={post.fields.slug}><GatsbyLink to={`/${post.fields.slug}`} className="flex items-center gap-4 py-3">
              <Thumb src={image ? getSrc(image) ?? '/DSC_0851.jpeg' : '/DSC_0851.jpeg'} alt={post.frontmatter.title} />
              <span className="min-w-0"><strong className="font-serif text-lg font-medium">{post.frontmatter.title}</strong>{post.frontmatter.teaser && <span className="mt-1 block truncate font-serif text-sm text-muted">{post.frontmatter.teaser}</span>}</span>
            </GatsbyLink></Card>
          })}
        </ul>
      </section>}

      <nav className="mt-10 flex flex-wrap gap-x-5 gap-y-3 border-t border-line pt-6 font-condensed text-sm uppercase tracking-label text-muted">
        <a href={`https://linkedin.com/in/${site.social?.linkedin ?? 'saegey'}`} target="_blank" rel="noreferrer">LinkedIn</a>
        <a href={`https://github.com/${site.social?.github ?? 'saegey'}`} target="_blank" rel="noreferrer">GitHub</a>
        <a href={`https://instagram.com/${site.social?.instagram ?? 'saegey'}`} target="_blank" rel="noreferrer">Instagram</a>
        <a href="https://youtube.com/@publicvinylradio" target="_blank" rel="noreferrer">YouTube</a>
      </nav>
      <div className="mt-6"><ThemeControl /></div>
      </div>
    </main>
  )
}

export default LinksPage

export const Head: React.FC<PageProps<Data>> = ({ data }) => {
  const site = useSiteMetadata()
  const items = data.allMdx.nodes.filter(node => node.frontmatter.featuredOnLinks)
  const itemList = { '@context': 'https://schema.org', '@type': 'ItemList', itemListElement: items.map((node, index) => ({ '@type': 'ListItem', position: index + 1, url: `${site.siteUrl}/${node.fields.slug}`, name: node.frontmatter.title })) }
  return <><Seo title="Links" description="Quick links, selected work, and Public Vinyl Radio episodes." pathname="/links" /><script type="application/ld+json">{JSON.stringify(itemList)}</script></>
}

export const pageQuery = graphql`
  query LinksPageQuery {
    allMdx(sort: { frontmatter: { publishedDate: DESC } }, filter: { frontmatter: { isActive: { ne: false } } }, limit: 12) {
      nodes { fields { slug } frontmatter { title teaser featuredOnLinks headerImage { childImageSharp { gatsbyImageData(placeholder: BLURRED, width: 256, height: 256, layout: CONSTRAINED) } } } }
    }
  }
`
