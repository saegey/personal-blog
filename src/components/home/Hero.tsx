import { Link } from 'gatsby'

const Hero: React.FC = () => (
  <section className="grid gap-10 border-b border-line pb-12 pt-2 sm:pb-16 lg:grid-cols-[minmax(0,1fr)_18rem] lg:items-end">
    <div>
      <p className="eyebrow mb-5 text-brand">Artist · engineer · selector</p>
      <h1 className="max-w-4xl font-serif text-5xl leading-[0.95] tracking-[-0.035em] sm:text-6xl lg:text-8xl">
        Sound, images, and things in motion.
      </h1>
    </div>
    <div className="border-l-2 border-brand pl-5">
      <p className="text-lg leading-relaxed text-ink sm:text-xl">
        Adam Saegebarth is a Seattle-based creative technologist making things
        at the intersection of code, culture, and community.
      </p>
      <Link to="/about" className="editorial-link mt-5 inline-block font-condensed text-sm font-medium uppercase tracking-label">
        More about Adam
      </Link>
    </div>
  </section>
)

export default Hero
