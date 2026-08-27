import { graphql, type PageProps } from 'gatsby'

import GalleryViewer, { type GalleryPhoto } from '../components/gallery/GalleryViewer'
import Seo from '../components/seo'

type Gallery = { slug: string; title: string; theme: string; date: string; location: string; description?: string; cover: string; photos: GalleryPhoto[] }
type Data = { file: { fields: { data: Gallery } } }

const GalleryTemplate = ({ data }: PageProps<Data>) => {
  const gallery = data.file.fields.data
  const date = new Date(`${gallery.date}T12:00:00`).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })
  return <>
    <header className="mx-auto max-w-3xl border-b border-line pb-10 sm:pb-14">
      <p className="eyebrow">{gallery.theme}</p>
      <h1 className="mt-3 font-heading text-5xl leading-none tracking-[-0.04em] sm:text-7xl">{gallery.title}</h1>
      <div className="mt-6 flex flex-wrap gap-x-5 gap-y-1 font-condensed text-sm uppercase tracking-label text-muted"><span>{date}</span><span>{gallery.location}</span><span>{gallery.photos.length} photographs</span></div>
      {gallery.description && <p className="mt-6 max-w-xl text-xl leading-relaxed text-muted">{gallery.description}</p>}
    </header>
    <div className="py-10 sm:py-16"><GalleryViewer photos={gallery.photos} /></div>
  </>
}

export default GalleryTemplate
export const Head = ({ data }: PageProps<Data>) => {
  const gallery = data.file.fields.data
  return <Seo title={gallery.title} description={`${gallery.theme} photographs from ${gallery.location}.`} pathname={`/gallery/${gallery.slug}/`} />
}
export const query = graphql`
  query GalleryById($id: String!) { file(id: {eq: $id}) { fields { data } } }
`
