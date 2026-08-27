import * as React from 'react'
import { Link as GatsbyLink } from 'gatsby'
import { ImageDataLike } from 'gatsby-plugin-image'

type FeaturePostProps = {
  headerImage?: ImageDataLike
  title: string
  slug: string
  teaser: string
  subType: string
  updatedAt: Date | string
  featured?: boolean
  showTopRule?: boolean
}

const formatDate = (date: Date | string) =>
  new Intl.DateTimeFormat(undefined, {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  }).format(typeof date === 'string' ? new Date(date) : date)

const FeaturedPost: React.FC<FeaturePostProps> = ({ title, slug, teaser, subType, updatedAt, featured = false, showTopRule = true }) => (
  <article className={`group ${showTopRule ? 'border-t border-line' : ''} ${featured ? 'py-8 sm:py-10' : 'py-7 sm:py-8'}`}>
    <div className="max-w-4xl">
      <p className="font-condensed text-sm font-medium uppercase tracking-label text-muted">{subType || 'Writing'} <span aria-hidden="true" className="mx-2 text-line">/</span> <time dateTime={new Date(updatedAt).toISOString()}>{formatDate(updatedAt)}</time></p>
      <h2 className={`mt-3 font-heading leading-[1.06] tracking-[-0.025em] ${featured ? 'text-3xl sm:text-4xl' : 'text-3xl sm:text-4xl'}`}>
        <GatsbyLink to={`/${slug.replace(/^\/+/, '')}`} className="transition-colors group-hover:text-muted">
          {title}
        </GatsbyLink>
      </h2>
      {teaser && <p className="mt-3 max-w-2xl text-lg leading-relaxed text-muted">{teaser}</p>}
      <GatsbyLink to={`/${slug.replace(/^\/+/, '')}`} className="mt-4 inline-block font-condensed text-sm font-medium uppercase tracking-label text-ink transition-transform group-hover:translate-x-1">
        Read entry <span aria-hidden="true">→</span>
      </GatsbyLink>
    </div>
  </article>
)

export default FeaturedPost
