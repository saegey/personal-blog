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
    <header className="border-b border-line pb-10 sm:pb-14">
      <div className="max-w-4xl">
        <p className="eyebrow text-ink">Archive · {label}</p>
        <h1 className="mt-3 font-serif text-5xl leading-[0.95] tracking-[-0.045em] sm:text-7xl">
          {title}
        </h1>
        <p className="mt-6 font-condensed text-base font-medium uppercase tracking-label text-muted">
          {date} <span aria-hidden="true">·</span> {location}
        </p>
        {teaser && <p className="mt-5 max-w-3xl text-xl leading-relaxed text-ink sm:text-2xl">{teaser}</p>}
      </div>

      {imageData && (
        <figure className="mt-10 sm:mt-12">
          <GatsbyImage image={imageData} alt={`${title} header image`} className="aspect-[16/9] overflow-hidden bg-neutral-200 [&_img]:object-cover" />
          {headerImageCaption && <figcaption className="mt-3 max-w-2xl font-condensed text-sm leading-relaxed text-muted">{headerImageCaption}</figcaption>}
        </figure>
      )}
    </header>
  )
}

export default PostHeader
