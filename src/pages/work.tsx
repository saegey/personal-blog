import * as React from 'react'
import { Link } from 'gatsby'

import Seo from '../components/seo'

const selectedWork = [
  {
    number: '01',
    title: 'Public Vinyl Radio',
    discipline: 'Music · Curation · Video',
    text: 'A continuing practice in vinyl-only sets, global sounds, sequencing, and building shared space through music.',
    href: '/project/public-vinyl-radio/',
    link: 'Explore project',
  },
  {
    number: '02',
    title: 'Speaker building',
    discipline: 'Object · Audio · Electronics',
    text: 'An ongoing exploration of sound, materials, enclosure design, and the relationship between a listening object and the space around it.',
  },
  {
    number: '03',
    title: 'Living-room audio setup',
    discipline: 'System · Space · Listening',
    text: 'A considered home listening environment: equipment, placement, furniture, and the small choices that make listening feel intentional.',
  },
]

const WorkPage: React.FC = () => (
  <>
    <header className="grid gap-10 border-b border-line pb-12 sm:pb-16 lg:grid-cols-12 lg:items-end">
      <div className="lg:col-span-8">
        <p className="eyebrow text-ink">Selected work</p>
        <h1 className="mt-3 font-heading text-5xl leading-[0.95] tracking-[-0.045em] sm:text-7xl">Things in motion, made with care.</h1>
      </div>
      <p className="max-w-sm border-l-2 border-ink pl-5 text-xl leading-relaxed text-muted lg:col-span-4">
        Current projects across music, objects, systems, and visual practice.
      </p>
    </header>

    <section className="py-12 sm:py-16">
      {selectedWork.map(work => (
        <article key={work.number} className="grid gap-6 border-b border-line py-8 sm:grid-cols-[5rem_minmax(0,1fr)_minmax(0,22rem)] sm:gap-8 sm:py-12">
          <p className="font-condensed text-sm font-medium tracking-label text-muted">{work.number}</p>
          <div>
            <p className="eyebrow text-ink">{work.discipline}</p>
            <h2 className="mt-2 font-heading text-4xl leading-none tracking-[-0.03em] sm:text-5xl">{work.title}</h2>
          </div>
          <div className="sm:pt-6">
            <p className="text-lg leading-relaxed text-muted">{work.text}</p>
            {work.href ? (
              <Link to={work.href} className="editorial-link mt-5 inline-block font-condensed text-sm font-medium uppercase tracking-label">
                {work.link}
              </Link>
            ) : (
              <p className="mt-5 font-condensed text-sm font-medium uppercase tracking-label text-muted">In progress</p>
            )}
          </div>
        </article>
      ))}
    </section>

    <section className="border-b border-line py-12 sm:py-16">
      <p className="eyebrow text-ink">Archive</p>
      <div className="mt-3 flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
        <h2 className="max-w-2xl font-heading text-4xl leading-tight tracking-[-0.03em] sm:text-5xl">Earlier software, product, and creative experiments remain available here.</h2>
        <Link to="/blog" className="editorial-link shrink-0 font-condensed text-sm font-medium uppercase tracking-label">View project archive</Link>
      </div>
    </section>
  </>
)

export default WorkPage

export const Head = () => <Seo title="Work" description="Selected work by Adam Saegebarth: Public Vinyl Radio, speaker building, and a living-room audio system." pathname="/work" />
