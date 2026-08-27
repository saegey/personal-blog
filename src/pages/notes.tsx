import { graphql, type PageProps } from 'gatsby'
import { IGatsbyImageData } from 'gatsby-plugin-image'

import FeaturedPost from '../components/home/FeaturedPost'
import Seo from '../components/seo'

type Entry = {
  fields: { slug: string }
  frontmatter: {
    title: string
    teaser: string
    subType?: string
    publishedDate?: string
    headerImage?: { childImageSharp?: { gatsbyImageData: IGatsbyImageData } }
  }
}
type Data = { allMdx: { nodes: Entry[] } }

const NotesPage = ({ data }: PageProps<Data>) => (
  <>
    <header className="border-b border-line pb-10 sm:pb-14">
      <p className="eyebrow">Notebook</p>
      <h1 className="mt-3 max-w-4xl font-heading text-5xl leading-none sm:text-7xl">Notes, projects, and creative experiments.</h1>
      <p className="mt-6 max-w-2xl text-xl leading-relaxed text-muted">Writing on tools, music, objects, and the processes behind them.</p>
    </header>
    <section className="py-10 sm:py-16">
      {data.allMdx.nodes.map((entry, index) => <FeaturedPost key={entry.fields.slug} title={entry.frontmatter.title} slug={entry.fields.slug} teaser={entry.frontmatter.teaser} subType={entry.frontmatter.subType ?? ''} updatedAt={entry.frontmatter.publishedDate ?? ''} featured={index === 0} />)}
    </section>
  </>
)

export default NotesPage

export const Head = () => <Seo title="Notes" description="Writing on tools, music, objects, and creative experiments by Adam Saegebarth." pathname="/notes" />

export const query = graphql`
  query NotesPage {
    allMdx(sort: { frontmatter: { date: DESC } }, filter: { frontmatter: { isActive: { ne: false }, type: { ne: "Race Journal" } } }) {
      nodes {
        fields { slug }
        frontmatter { title teaser subType publishedDate }
      }
    }
  }
`
