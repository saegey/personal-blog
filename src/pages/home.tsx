import { graphql, Link, type PageProps } from 'gatsby'
import { ImageDataLike } from 'gatsby-plugin-image'

import Seo from '../components/seo'
import FeaturedPost from '../components/home/FeaturedPost'
import Hero from '../components/home/Hero'
import { useSiteMetadata } from '../hooks/use-site-metadata'

type PostProps = {
  frontmatter: {
    headerImage: ImageDataLike | undefined
    title: string
    teaser: string
    type: string
    subType: string
    publishedDate: Date
  }
  fields: {
    slug: string
  }
}

type DataProps = {
  allMdx: {
    nodes: Array<PostProps>
  }
  allFile: {
    nodes: Array<{ fields: { data: Gallery } }>
  }
}

type Gallery = {
  slug: string
  title: string
  theme: string
  date: string
  location: string
  cover: string
  photos: Array<unknown>
}

import React, { useState } from 'react'

const HomePage: React.FC<PageProps<DataProps>> = ({ data }) => {
  const posts = data?.allMdx?.nodes ?? []
  const latestGallery = (data?.allFile?.nodes ?? [])
    .map(node => node.fields.data)
    .filter(Boolean)
    .sort((a, b) => b.date.localeCompare(a.date))[0]
  const [visibleCount, setVisibleCount] = useState(6)

  const handleLoadMore = () => {
    setVisibleCount(prev => Math.min(prev + 3, posts.length))
  }

  return (
    <>
      <Hero />

      {latestGallery && <section className="py-12 sm:py-16">
        <div className="mb-6 flex items-end justify-between gap-6">
          <div>
            <p className="eyebrow">Latest photographs</p>
            <h2 className="mt-2 font-serif text-4xl tracking-[-0.03em] sm:text-5xl">{latestGallery.title}</h2>
          </div>
          <Link to="/gallery" className="editorial-link hidden font-condensed text-sm font-medium uppercase tracking-label sm:block">All galleries</Link>
        </div>
        <Link to={`/gallery/${latestGallery.slug}/`} className="group grid gap-5 sm:grid-cols-[minmax(0,1fr)_15rem] sm:items-end">
          <figure className="overflow-hidden bg-neutral-100"><img src={latestGallery.cover} alt="" className="aspect-[3/2] w-full object-cover transition duration-700 group-hover:scale-[1.02]" /></figure>
          <div className="border-t border-line pt-4 sm:mb-3"><p className="font-condensed text-sm uppercase tracking-label text-muted">{new Date(`${latestGallery.date}T12:00:00`).toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}</p><p className="mt-2 text-lg leading-relaxed text-muted">{latestGallery.location} · {latestGallery.photos.length} photographs</p><span className="editorial-link mt-5 inline-block font-condensed text-sm font-medium uppercase tracking-label">View session</span></div>
        </Link>
        <Link to="/gallery" className="editorial-link mt-5 inline-block font-condensed text-sm font-medium uppercase tracking-label sm:hidden">All galleries</Link>
      </section>}

      <section className="border-t border-line py-12 sm:py-16">
        <div className="mb-8">
          <p className="eyebrow">Notebook</p>
          <h2 className="mt-2 font-serif text-4xl tracking-[-0.03em]">Recent entries</h2>
        </div>
        <div>
          {posts.length === 0 ? <p className="text-muted">No entries published yet.</p> : posts.slice(0, visibleCount).map((node, index) => (
            <FeaturedPost key={node.fields.slug} headerImage={node.frontmatter.headerImage} title={node.frontmatter.title} slug={node.fields.slug} teaser={node.frontmatter.teaser} subType={node.frontmatter.subType} updatedAt={node.frontmatter.publishedDate} featured={index === 0} />
          ))}
        </div>
        {visibleCount < posts.length && (
          <button type="button" onClick={handleLoadMore} className="mt-8 border border-ink px-5 py-3 font-condensed text-sm font-medium uppercase tracking-label transition-colors hover:border-brand hover:bg-brand hover:text-white">
            Load more entries
          </button>
        )}
      </section>
    </>
  )
}

export const Head: React.FC<PageProps<DataProps>> = () => {
  const site = useSiteMetadata()
  const title = site.title
  const description = site.description
  const pathname = '/'

  // Build WebSite & Organization JSON-LD
  const websiteJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    url: site.siteUrl,
    name: site.title,
    description: site.description,
  }
  const orgJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: site.title,
    url: site.siteUrl,
    sameAs: site.social?.twitter
      ? [`https://twitter.com/${site.social.twitter}`]
      : undefined,
  }

  return (
    <>
      <Seo
        title={title}
        description={description}
        pathname={pathname}
      />
      <link
        rel="alternate"
        type="application/rss+xml"
        title={`${site.title} RSS`}
        href={`${site.siteUrl}/rss.xml`}
      />
      <script type="application/ld+json">
        {JSON.stringify(websiteJsonLd)}
      </script>
      <script type="application/ld+json">{JSON.stringify(orgJsonLd)}</script>
    </>
  )
}

export default HomePage

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }
    allMdx(sort: { frontmatter: { date: DESC } }) {
      nodes {
        id
        fields {
          slug
        }
        frontmatter {
          subType
          title
          tags
          type
          teaser
          headerImage {
            childImageSharp {
              gatsbyImageData(
                placeholder: BLURRED
                width: 800
                quality: 70
                layout: CONSTRAINED
              )
            }
          }
          publishedDate
        }
      }
    }
    allFile(filter: {sourceInstanceName: {eq: "galleries"}}) {
      nodes { fields { data } }
    }
  }
`
