import { graphql, Link, type PageProps } from 'gatsby'

import Seo from '../components/seo'

type Gallery = { slug: string; title: string; theme: string; date: string; location: string; cover: string; photos: Array<unknown> }
type Data = { allFile: { nodes: Array<{ fields: { data: Gallery } }> } }

const GalleryPage = ({ data }: PageProps<Data>) => {
  const galleries = data.allFile.nodes.map(node => node.fields.data).filter(Boolean).sort((a, b) => b.date.localeCompare(a.date))
  return <>
    <header className="border-b border-line pb-10 sm:pb-14">
      <p className="eyebrow">Image archive</p>
      <h1 className="mt-3 font-heading text-5xl leading-none tracking-[-0.04em] sm:text-7xl">Photographs from the road and elsewhere.</h1>
      <p className="mt-6 max-w-xl text-xl leading-relaxed text-muted">An evolving selection of studies, places, gatherings, and the incidental details that stay with me.</p>
    </header>
    <section className="py-10 sm:py-16">
      {galleries.length ? <div className="grid gap-8 sm:grid-cols-2 sm:gap-12">
        {galleries.map((gallery, index) => <Link key={gallery.slug} to={`/gallery/${gallery.slug}/`} className={`group block ${index % 2 ? 'sm:mt-20' : ''}`}>
          <figure className="overflow-hidden bg-neutral-100"><img src={gallery.cover} alt="" className="aspect-[3/2] w-full object-cover transition duration-700 group-hover:scale-[1.02]" /></figure>
          <div className="mt-4 border-t border-line pt-3"><p className="eyebrow">{gallery.theme}</p><h2 className="mt-2 font-heading text-3xl font-medium">{gallery.title}</h2><p className="mt-2 font-condensed text-sm uppercase tracking-label text-muted">{gallery.location} · {gallery.photos.length} photographs</p></div>
        </Link>)}
      </div> : <p className="py-12 text-xl text-muted">The archive is taking shape.</p>}
    </section>
  </>
}

export default GalleryPage
export const Head = () => <Seo title="Gallery" description="A selection of photographs by Adam Saegebarth." pathname="/gallery" />
export const query = graphql`
  query GalleryIndex { allFile(filter: {sourceInstanceName: {eq: "galleries"}}) { nodes { fields { data } } } }
`
