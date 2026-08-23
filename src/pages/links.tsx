import * as React from 'react'
import { graphql, Link as GatsbyLink, type PageProps } from 'gatsby'
import { IGatsbyImageData, getSrc } from 'gatsby-plugin-image'

import Seo from '../components/seo'
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

const Card = ({ children }: { children: React.ReactNode }) => <li className="border-y border-line transition-colors hover:bg-neutral-100">{children}</li>
const Thumb = ({ src, alt }: { src: string; alt: string }) => <img src={src} alt={alt} className="h-14 w-20 shrink-0 object-cover sm:h-16 sm:w-24" loading="lazy" />

const LinksPage: React.FC<PageProps<Data>> = ({ data }) => {
  const site = useSiteMetadata()
  const posts = data.allMdx.nodes.filter(node => node.frontmatter.featuredOnLinks)

  return (
    <main className="mx-auto max-w-xl py-12 sm:py-16">
      <header className="border-y border-line py-8 text-center">
        <img src="/DSC_0851.jpeg" alt={`${site.title} profile`} className="mx-auto h-20 w-20 rounded-full object-cover grayscale" />
        <h1 className="mt-4 font-serif text-4xl font-medium">{site.title}</h1>
        <p className="mt-3 font-condensed text-sm uppercase tracking-label text-muted">Artist · Product designer · Creative technologist</p>
      </header>

      {pvrEpisodes.length > 0 && <section className="mt-10">
        <h2 className="font-serif text-2xl font-medium">Public Vinyl Radio</h2>
        <ul className="mt-4 grid gap-3">
          {pvrEpisodes.map(episode => {
            const id = getYouTubeId(episode.url)
            return <Card key={episode.url}><a href={episode.url} target="_blank" rel="noreferrer" className="flex items-center gap-4 px-3 py-3">
              {id && <Thumb src={`https://img.youtube.com/vi/${id}/hqdefault.jpg`} alt={`${episode.title} thumbnail`} />}
              <span><strong className="font-serif text-lg font-medium">{episode.title}</strong>{episode.date && <span className="mt-1 block font-condensed text-xs uppercase tracking-label text-muted">{new Date(episode.date).toLocaleDateString()}</span>}</span>
            </a></Card>
          })}
        </ul>
      </section>}

      {posts.length > 0 && <section className="mt-10">
        <h2 className="font-serif text-2xl font-medium">Selected notes</h2>
        <ul className="mt-4 grid gap-3">
          {posts.map(post => {
            const image = post.frontmatter.headerImage?.childImageSharp?.gatsbyImageData
            return <Card key={post.fields.slug}><GatsbyLink to={`/${post.fields.slug}`} className="flex items-center gap-4 px-3 py-3">
              <Thumb src={image ? getSrc(image) ?? '/DSC_0851.jpeg' : '/DSC_0851.jpeg'} alt={post.frontmatter.title} />
              <span className="min-w-0"><strong className="font-serif text-lg font-medium">{post.frontmatter.title}</strong>{post.frontmatter.teaser && <span className="mt-1 block truncate font-serif text-sm text-muted">{post.frontmatter.teaser}</span>}</span>
            </GatsbyLink></Card>
          })}
        </ul>
      </section>}

      <nav className="mt-10 grid gap-2 sm:grid-cols-2">
        <GatsbyLink to="/about" className="border border-line px-4 py-3 text-center font-condensed text-sm font-semibold uppercase tracking-label hover:border-ink">About</GatsbyLink>
        <GatsbyLink to="/work" className="bg-ink px-4 py-3 text-center font-condensed text-sm font-semibold uppercase tracking-label text-white hover:bg-neutral-800">Work</GatsbyLink>
      </nav>
      <nav className="mt-8 flex flex-wrap justify-center gap-x-5 gap-y-2 font-condensed text-sm uppercase tracking-label text-muted">
        <a href={`https://linkedin.com/in/${site.social?.linkedin ?? 'saegey'}`} target="_blank" rel="noreferrer">LinkedIn</a>
        <a href={`https://github.com/${site.social?.github ?? 'saegey'}`} target="_blank" rel="noreferrer">GitHub</a>
        <a href={`https://instagram.com/${site.social?.instagram ?? 'saegey'}`} target="_blank" rel="noreferrer">Instagram</a>
        <a href="https://youtube.com/@publicvinylradio" target="_blank" rel="noreferrer">YouTube</a>
      </nav>
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
