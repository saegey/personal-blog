import * as React from 'react'
import { Link } from 'gatsby'

import Seo from '../components/seo'

const practices = [
  {
    number: '01',
    title: 'Visual art',
    text: 'Printmaking, photography, digital design, sewing, embroidery, video, and visual experiments that move between the tactile and the screen.',
  },
  {
    number: '02',
    title: 'Objects & product',
    text: 'Speakers, 3D-printed pieces, electronics, clothing, and other functional objects made through research, iteration, and material play.',
  },
  {
    number: '03',
    title: 'Code & systems',
    text: 'Digital tools and product experiences built with the same attention to utility, form, and the people who will use them.',
  },
]

const AboutPage: React.FC = () => (
  <>
    <header className="grid gap-10 border-b border-line pb-12 sm:pb-16 lg:grid-cols-12 lg:items-end">
      <div className="lg:col-span-8">
        <p className="eyebrow text-ink">About</p>
        <h1 className="mt-3 font-heading text-5xl leading-[0.95] tracking-[-0.045em] sm:text-7xl">
          Artist, product designer, and creative technologist.
        </h1>
      </div>
      <p className="max-w-sm border-l-2 border-ink pl-5 text-xl leading-relaxed text-muted lg:col-span-4">
        Based in Seattle, I make visual work, objects, and digital experiences—often where those practices overlap.
      </p>
    </header>

    <section className="grid gap-10 py-12 sm:py-16 lg:grid-cols-12">
      <div className="lg:col-span-4">
        <p className="eyebrow text-ink">Practice</p>
      </div>
      <div className="max-w-3xl lg:col-span-8">
        <p className="font-serif text-3xl leading-tight tracking-[-0.025em] sm:text-4xl">
          I’m interested in work that has a point of view and a real place in the world: an image, a garment, a speaker, a printed object, a piece of software, or a room full of music.
        </p>
        <p className="mt-6 text-xl leading-relaxed text-muted">
          My process moves easily between handwork, physical prototyping, visual systems, and engineering. The medium changes; the impulse stays the same: make something considered, useful, and alive.
        </p>
      </div>
    </section>

    <section className="border-t border-line py-12 sm:py-16">
      <p className="eyebrow mb-8 text-ink">Areas of focus</p>
      <div className="grid border-t border-line md:grid-cols-3">
        {practices.map(practice => (
          <article key={practice.number} className="border-b border-line py-7 md:border-b-0 md:border-r md:px-7 md:first:pl-0 md:last:border-r-0 md:last:pr-0">
            <p className="font-condensed text-sm font-medium tracking-label text-muted">{practice.number}</p>
            <h2 className="mt-8 font-heading text-3xl tracking-[-0.025em]">{practice.title}</h2>
            <p className="mt-3 text-lg leading-relaxed text-muted">{practice.text}</p>
          </article>
        ))}
      </div>
    </section>

    <section className="grid gap-10 border-t border-line py-12 sm:py-16 lg:grid-cols-12">
      <div className="lg:col-span-4">
        <p className="eyebrow text-ink">Public Vinyl Radio</p>
      </div>
      <div className="max-w-3xl lg:col-span-8">
        <h2 className="font-heading text-4xl leading-tight tracking-[-0.03em] sm:text-5xl">Music as research, curation, and shared space.</h2>
        <p className="mt-5 text-xl leading-relaxed text-muted">
          Through Public Vinyl Radio, I curate and document 100% vinyl sets spanning global sounds, Latin jazz, soul, cumbia, Afrobeat, and beyond. It is a continuing practice in listening, sequencing, and building connection through music.
        </p>
        <a href="https://publicvinylradio.com" target="_blank" rel="noreferrer" className="editorial-link mt-6 inline-block font-condensed text-sm font-medium uppercase tracking-label">
          Visit Public Vinyl Radio ↗
        </a>
      </div>
    </section>

    <section className="grid gap-10 border-t border-line py-12 sm:py-16 lg:grid-cols-12">
      <div className="lg:col-span-4">
        <p className="eyebrow text-ink">An earlier chapter</p>
      </div>
      <div className="max-w-3xl lg:col-span-8">
        <h2 className="font-heading text-4xl leading-tight tracking-[-0.03em] sm:text-5xl">The long way through.</h2>
        <p className="mt-5 text-xl leading-relaxed text-muted">
          Competitive mountain-bike and gravel racing once shaped a major part of my life. These days I ride more casually, but that period of endurance training, racing, and close attention to data remains part of the story—and a practice I may return to.
        </p>
        <Link to="/races" className="editorial-link mt-6 inline-block font-condensed text-sm font-medium uppercase tracking-label">
          Explore the race archive
        </Link>
      </div>
    </section>

    <section className="border-t border-line py-12 sm:py-16">
      <p className="eyebrow text-ink">Collaboration</p>
      <h2 className="mt-3 max-w-4xl font-heading text-4xl leading-tight tracking-[-0.03em] sm:text-6xl">
        Interested in bringing distinct practices together.
      </h2>
      <p className="mt-6 max-w-2xl text-xl leading-relaxed text-muted">
        I’m not seeking a new role. I am open to thoughtful collaborations, creative partnerships, and projects where combining disciplines can produce something neither side would make alone.
      </p>
      <Link to="/contact" className="editorial-link mt-6 inline-block font-condensed text-sm font-medium uppercase tracking-label">
        Start a conversation
      </Link>
    </section>
  </>
)

export default AboutPage

export const Head = () => {
  const description = 'Artist, product designer, and creative technologist based in Seattle. Visual art, objects, digital experiences, and Public Vinyl Radio.'

  return <Seo title="About" description={description} pathname="/about" />
}
