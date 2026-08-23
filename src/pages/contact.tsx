import React, { useMemo, useState } from 'react'

import Seo from '../components/seo'
import { useSiteMetadata } from '../hooks/use-site-metadata'

const MAX_MSG = 1200
const inputClassName = 'mt-2 w-full border border-line bg-transparent px-3 py-3 text-lg outline-none transition-colors placeholder:text-muted focus:border-ink'

const ContactPage: React.FC = () => {
  const [form, setForm] = useState({ name: '', email: '', message: '', honey: '' })
  const [status, setStatus] = useState<'idle' | 'success' | 'error' | 'loading'>('idle')
  const [touched, setTouched] = useState<Record<string, boolean>>({})

  const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = event.target
    setForm(previous => ({ ...previous, [name]: value }))
  }

  const handleBlur = (event: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setTouched(previous => ({ ...previous, [event.target.name]: true }))
  }

  const emailValid = useMemo(() => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email), [form.email])
  const msgCount = form.message.length
  const msgOver = msgCount > MAX_MSG
  const canSubmit = emailValid && Boolean(form.name) && Boolean(form.message) && !msgOver && status !== 'loading'

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault()
    if (form.honey || !canSubmit) return

    setStatus('loading')
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: form.name, email: form.email, message: form.message }),
      })
      if (!response.ok) throw new Error('Contact request failed')
      setStatus('success')
      setForm({ name: '', email: '', message: '', honey: '' })
      setTouched({})
    } catch {
      setStatus('error')
    }
  }

  return (
    <>
      <header className="max-w-3xl border-b border-line pb-10 sm:pb-14">
        <p className="eyebrow text-ink">Contact</p>
        <h1 className="mt-3 font-serif text-5xl leading-[0.95] tracking-[-0.045em] sm:text-7xl">Start a conversation.</h1>
        <p className="mt-6 max-w-2xl text-xl leading-relaxed text-muted">Open to thoughtful collaborations, shared experiments, and ideas where different practices can combine into something new.</p>
      </header>

      <section className="grid gap-12 py-12 sm:py-16 lg:grid-cols-[minmax(0,1fr)_18rem]">
        <div>
          {status === 'error' && <p role="alert" className="mb-6 border-l-2 border-ink pl-4 text-lg">Something went wrong. Please try again.</p>}
          {status === 'success' ? (
            <div className="border-y border-line py-8">
              <h2 className="font-serif text-4xl tracking-[-0.03em]">Thank you.</h2>
              <p className="mt-3 max-w-xl text-xl leading-relaxed text-muted">Your message is on its way. I’ll get back to you when I can.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} aria-labelledby="contact-form-title" noValidate>
              <h2 id="contact-form-title" className="sr-only">Contact form</h2>
              <div className="absolute h-0 w-0 overflow-hidden opacity-0" aria-hidden="true">
                <label htmlFor="honey">Leave this empty</label>
                <input id="honey" name="honey" value={form.honey} onChange={handleChange} tabIndex={-1} autoComplete="off" />
              </div>
              <div className="border-t border-line py-5">
                <label htmlFor="name" className="font-condensed text-sm font-medium uppercase tracking-label">Name</label>
                <input id="name" name="name" value={form.name} onChange={handleChange} onBlur={handleBlur} required className={inputClassName} aria-invalid={touched.name && !form.name ? 'true' : undefined} />
                {touched.name && !form.name && <p className="mt-2 font-condensed text-sm text-muted">Please enter your name.</p>}
              </div>
              <div className="border-t border-line py-5">
                <label htmlFor="email" className="font-condensed text-sm font-medium uppercase tracking-label">Email</label>
                <input id="email" name="email" type="email" value={form.email} onChange={handleChange} onBlur={handleBlur} required className={inputClassName} aria-invalid={touched.email && !emailValid ? 'true' : undefined} />
                {touched.email && !emailValid && <p className="mt-2 font-condensed text-sm text-muted">Please enter a valid email address.</p>}
              </div>
              <div className="border-y border-line py-5">
                <label htmlFor="message" className="font-condensed text-sm font-medium uppercase tracking-label">Message</label>
                <textarea id="message" name="message" value={form.message} onChange={handleChange} onBlur={handleBlur} required rows={8} className={inputClassName} aria-invalid={touched.message && (!form.message || msgOver) ? 'true' : undefined} />
                <div className="mt-2 flex justify-between font-condensed text-sm text-muted">
                  <span>{touched.message && !form.message ? 'Please include a message.' : ''}</span>
                  <span>{msgCount}/{MAX_MSG}</span>
                </div>
              </div>
              <button type="submit" disabled={!canSubmit} className="mt-7 border border-ink px-5 py-3 font-condensed text-sm font-medium uppercase tracking-label transition-colors enabled:hover:bg-ink enabled:hover:text-white disabled:cursor-not-allowed disabled:opacity-40">
                {status === 'loading' ? 'Sending…' : 'Send message'}
              </button>
            </form>
          )}
        </div>

        <aside className="border-t border-line pt-5 lg:border-t-0 lg:border-l lg:pl-8 lg:pt-0">
          <p className="eyebrow text-ink">Elsewhere</p>
          <ul className="mt-4 space-y-3 text-lg">
            <li><a className="editorial-link" href="https://instagram.com/saegey" target="_blank" rel="noreferrer">Instagram ↗</a></li>
            <li><a className="editorial-link" href="https://github.com/saegey" target="_blank" rel="noreferrer">GitHub ↗</a></li>
            <li><a className="editorial-link" href="https://linkedin.com/in/saegey" target="_blank" rel="noreferrer">LinkedIn ↗</a></li>
            <li><a className="editorial-link" href="https://publicvinylradio.com" target="_blank" rel="noreferrer">Public Vinyl Radio ↗</a></li>
          </ul>
          <p className="mt-10 text-lg leading-relaxed text-muted">Seattle, Washington. Please include a little context and any useful links.</p>
        </aside>
      </section>
    </>
  )
}

export const Head = () => {
  const site = useSiteMetadata()
  const title = 'Contact'
  const description = 'Open to thoughtful collaborations, shared experiments, and ideas where different practices combine.'
  const pathname = '/contact'
  const contactPageJsonLd = { '@context': 'https://schema.org', '@type': 'ContactPage', name: title, url: `${site.siteUrl}${pathname}`, description }

  return (
    <>
      <Seo title={title} description={description} pathname={pathname} />
      <script type="application/ld+json">{JSON.stringify(contactPageJsonLd)}</script>
    </>
  )
}

export default ContactPage
