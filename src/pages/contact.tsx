/** @jsxImportSource theme-ui */
import React, { useMemo, useState } from 'react'
import {
  Box,
  Button,
  Input,
  Label,
  Textarea,
  Text,
  Container,
  Grid,
  Flex,
  Card,
  Link as TLink,
} from 'theme-ui'

const MAX_MSG = 1200

const ContactPage: React.FC = () => {
  const [form, setForm] = useState({
    name: '',
    email: '',
    message: '',
    honey: '',
  })
  const [status, setStatus] = useState<
    'idle' | 'success' | 'error' | 'loading'
  >('idle')
  const [touched, setTouched] = useState<Record<string, boolean>>({})

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target
    setForm(prev => ({ ...prev, [name]: value }))
  }
  const handleBlur = (
    e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => setTouched(prev => ({ ...prev, [e.target.name]: true }))

  const emailValid = useMemo(
    () => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email),
    [form.email],
  )
  const msgCount = form.message.length
  const msgOver = msgCount > MAX_MSG

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (form.honey) return // bot trap: silently drop
    if (!emailValid || !form.name || !form.message || msgOver) return
    setStatus('loading')
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: form.name,
          email: form.email,
          message: form.message,
        }),
      })
      if (res.ok) {
        setStatus('success')
        setForm({ name: '', email: '', message: '', honey: '' })
        setTouched({})
      } else {
        setStatus('error')
      }
    } catch {
      setStatus('error')
    }
  }

  return (
    <Box as="main" sx={{ bg: 'background', minHeight: '70vh' }}>
      {/* Hero */}
      <Box
        sx={{
          py: [4, 5],
        }}
      >
        <Container sx={{ maxWidth: 1045, px: [3, 4], py: [4, 5] }}>
          <Text
            as="p"
            sx={{
              textTransform: 'uppercase',
              letterSpacing: '0.08em',
              fontSize: 0,
              color: 'primary',
              mb: 2,
            }}
          >
            Get in touch
          </Text>
          <Text
            as="h1"
            sx={{ fontSize: [5, 6], fontWeight: 800, lineHeight: 1.1, mb: 2 }}
          >
            Contact Me
          </Text>
          <Text as="p" sx={{ fontSize: [2, 3], color: 'text' }}>
            Collaborations, consulting, or just a good idea—my inbox is open. I
            typically reply within a couple days.
          </Text>
        </Container>
      </Box>

      {/* Content */}
      <Container sx={{ maxWidth: 1045, px: [3, 4], py: [4, 5] }}>
        {/* Status banner */}
        {status === 'error' && (
          <Card
            role="alert"
            sx={{
              mb: 3,
              p: 3,
              borderLeft: t => `4px solid ${t.colors?.danger || '#e63946'}`,
              bg: 'background',
            }}
          >
            <Text sx={{ color: 'danger' }}>
              Something went wrong. Please try again.
            </Text>
          </Card>
        )}

        {status === 'success' ? (
          <Card sx={{ p: [3, 4], textAlign: 'center' }}>
            <Text as="h2" sx={{ fontSize: [3, 4], fontWeight: 700, mb: 2 }}>
              Thanks! Your message is on its way.
            </Text>
            <Text sx={{ color: 'textMuted' }}>
              I’ll get back to you soon. In the meantime, feel free to connect
              on{' '}
              <TLink
                href="https://linkedin.com/in/saegey"
                target="_blank"
                rel="noopener noreferrer"
              >
                LinkedIn
              </TLink>
              ,{' '}
              <TLink
                href="https://github.com/saegey"
                target="_blank"
                rel="noopener noreferrer"
              >
                GitHub
              </TLink>
              , or{' '}
              <TLink
                href="https://instagram.com/saegey"
                target="_blank"
                rel="noopener noreferrer"
              >
                Instagram
              </TLink>
              .
            </Text>
          </Card>
        ) : (
          <Grid gap={[4, 5]} columns={[1, null, '2fr 1fr']}>
            {/* Form */}
            <Card
              as="form"
              onSubmit={handleSubmit}
              sx={{ paddingY: [3, 4] }}
              aria-labelledby="contactFormTitle"
            >
              {/* Honeypot (hidden) */}
              <Box
                sx={{
                  position: 'absolute',
                  opacity: 0,
                  height: 0,
                  width: 0,
                  overflow: 'hidden',
                }}
                aria-hidden
              >
                <Label htmlFor="honey">Leave this empty</Label>
                <Input
                  id="honey"
                  name="honey"
                  value={form.honey}
                  onChange={handleChange}
                  tabIndex={-1}
                />
              </Box>

              <Box sx={{ mb: 3 }}>
                <Label htmlFor="name">Name</Label>
                <Input
                  id="name"
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  required
                  aria-invalid={touched.name && !form.name ? 'true' : 'false'}
                  sx={{ mt: 2 }}
                />
                {touched.name && !form.name && (
                  <Text sx={{ color: 'danger', fontSize: 0, mt: 1 }}>
                    Please enter your name.
                  </Text>
                )}
              </Box>

              <Box sx={{ mb: 3 }}>
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  value={form.email}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  required
                  aria-invalid={touched.email && !emailValid ? 'true' : 'false'}
                  sx={{ mt: 2 }}
                />
                {touched.email && !emailValid && (
                  <Text sx={{ color: 'danger', fontSize: 0, mt: 1 }}>
                    Please enter a valid email address.
                  </Text>
                )}
              </Box>

              <Box sx={{ mb: 3 }}>
                <Label htmlFor="message">Message</Label>
                <Textarea
                  id="message"
                  name="message"
                  value={form.message}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  required
                  rows={7}
                  aria-invalid={
                    touched.message && (!form.message || msgOver)
                      ? 'true'
                      : 'false'
                  }
                  sx={{ mt: 2, resize: 'vertical' }}
                />
                <Flex sx={{ justifyContent: 'space-between', mt: 1 }}>
                  {touched.message && !form.message ? (
                    <Text sx={{ color: 'danger', fontSize: 0 }}>
                      Please include a message.
                    </Text>
                  ) : (
                    <span />
                  )}
                  <Text
                    sx={{
                      fontSize: 0,
                      color: msgOver ? 'danger' : 'textMuted',
                    }}
                  >
                    {msgCount}/{MAX_MSG}
                  </Text>
                </Flex>
              </Box>

              <Button
                type="submit"
                disabled={
                  status === 'loading' ||
                  !emailValid ||
                  !form.name ||
                  !form.message ||
                  msgOver
                }
                sx={{
                  width: ['100%', 'auto'],
                  cursor: status === 'loading' ? 'wait' : 'pointer',
                }}
              >
                <Text sx={{ color: 'primaryMuted', fontWeight: 500 }}>
                  {status === 'loading' ? 'Sending…' : 'Send Message'}
                </Text>
              </Button>
            </Card>

            {/* Sidebar */}
            <Card sx={{ paddingY: [3, 4] }}>
              <Text as="h3" sx={{ fontSize: [2, 3], fontWeight: 700, mb: 2 }}>
                Prefer DMs?
              </Text>
              <Text sx={{ color: 'textMuted', mb: 3 }}>
                I’m also reachable on these platforms. Quick pings are
                welcome—share a link or your idea.
              </Text>
              <Box
                as="ul"
                sx={{
                  listStyle: 'none',
                  pl: 0,
                  m: 0,
                }}
              >
                <Box as="li" sx={{ marginY: 1 }}>
                  <TLink
                    href="https://linkedin.com/in/saegey"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    LinkedIn @saegey ↗
                  </TLink>
                </Box>
                <Box as="li" sx={{ marginY: 1 }}>
                  <TLink
                    href="https://github.com/saegey"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    GitHub @saegey ↗
                  </TLink>
                </Box>
                <Box as="li" sx={{ marginY: 1 }}>
                  <TLink
                    href="https://instagram.com/saegey"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Instagram @saegey ↗
                  </TLink>
                </Box>
                <Box as="li" sx={{ marginY: 1 }}>
                  <TLink
                    href="https://strava.com/athletes/saegey"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Strava @saegey ↗
                  </TLink>
                </Box>
              </Box>

              <Box
                sx={{
                  mt: 4,
                  pt: 3,
                  borderTop: t => `1px solid ${t.colors?.muted}`,
                }}
              >
                <Text
                  as="h4"
                  sx={{
                    fontSize: 1,
                    textTransform: 'uppercase',
                    letterSpacing: '0.08em',
                    mb: 2,
                  }}
                >
                  Notes
                </Text>
                <Text sx={{ color: 'textMuted', fontSize: 1 }}>
                  For project inquiries, include timeline, scope, and any links.
                  I’m based in Seattle (PST).
                </Text>
              </Box>
            </Card>
          </Grid>
        )}
      </Container>
    </Box>
  )
}

export default ContactPage
