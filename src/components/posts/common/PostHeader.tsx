import { GatsbyImage, getImage, IGatsbyImageData } from 'gatsby-plugin-image'

interface PostHeaderProps {
  headerImage: {
    childImageSharp: {
      gatsbyImageData: IGatsbyImageData
    }
  }
  type: string
  subType?: string
  title: string
  date: string
  location: string
  teaser?: string
  headerImageCaption?: string
}

const PostHeader = ({
  headerImage,
  type,
  subType,
  title,
  date,
  location,
  teaser,
  headerImageCaption,
}: PostHeaderProps) => {
  const imageData = getImage(headerImage)
  const label = subType || (type === 'Race Journal' ? 'Archive entry' : type)

  return (
    <header className="mx-auto max-w-3xl border-b border-line pb-12 sm:pb-16">
      <div>
        <p className="eyebrow text-ink">Archive · {label}</p>
        <h1 className="mt-3 font-heading text-4xl leading-[0.98] tracking-[-0.02em] sm:text-6xl">
          {title}
        </h1>
        <p className="mt-4 font-condensed text-sm font-medium uppercase tracking-label text-muted">
          {date} <span aria-hidden="true">·</span> {location}
        </p>
        {teaser && <p className="mt-5 text-xl leading-relaxed text-ink sm:text-2xl">{teaser}</p>}
      </div>

      {imageData && (
        <figure className="mt-10">
          <GatsbyImage image={imageData} alt={`${title} header image`} className="aspect-[16/9] overflow-hidden bg-neutral-200 [&_img]:object-cover" />
          {headerImageCaption && <figcaption className="mt-3 max-w-2xl font-condensed text-sm leading-relaxed text-muted">{headerImageCaption}</figcaption>}
        </figure>
      )}
    </header>
  )
}

export default PostHeader
