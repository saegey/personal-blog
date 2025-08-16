/** @jsxImportSource theme-ui */
import * as React from 'react'
import { Link as GatsbyLink } from 'gatsby'
import {
  Box,
  Grid,
  Flex,
  Card,
  Heading,
  Text,
  Link as TLink,
  Button,
  Container,
} from 'theme-ui'

const Section: React.FC<
  React.PropsWithChildren<{ id?: string; heading: string; kicker?: string }>
> = ({ id, heading, kicker, children }) => (
  <Box
    as="section"
    id={id}
    sx={{
      py: [4, 5],
      borderTop: t => `1px solid ${t.colors?.primaryMuted}`,
    }}
  >
    <Text
      as="p"
      sx={{
        textTransform: 'uppercase',
        letterSpacing: '0.08em',
        fontSize: 0,
        color: 'primary',
        mb: 2,
        fontFamily: 'body',
      }}
    >
      {kicker}
    </Text>
    <Heading as="h2" sx={{ fontSize: [4, 5], mb: 3, fontFamily: 'body' }}>
      {heading}
    </Heading>
    <Box sx={{ lineHeight: 1.3 }}>{children}</Box>
  </Box>
)

const Stat: React.FC<{ label: string; value: string }> = ({ label, value }) => (
  <Card>
    <Text
      sx={{
        fontSize: 0,
        color: 'textMuted',
        textTransform: 'uppercase',
        letterSpacing: '0.06em',
        fontFamily: 'body',
      }}
    >
      {label}
    </Text>
    <Heading as="p" sx={{ mt: 2, fontSize: [3, 4], fontFamily: 'body' }}>
      {value}
    </Heading>
  </Card>
)

const SocialLink: React.FC<{ href: string; label: string }> = ({
  href,
  label,
}) => (
  <TLink
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    sx={{ display: 'inline-block', mr: 3, mb: 2 }}
  >
    {label} ↗
  </TLink>
)

const AboutPage: React.FC = () => {
  return (
    <Container
      sx={{ paddingTop: '0'}}
    >
      <Box sx={{ marginTop: [3], marginBottom: [5] }}>
        {/* Hero */}
        <Box as="header" sx={{ mb: [4, 5], marginTop: [3, 5, 5] }}>
          <Text
            as="p"
            sx={{
              textTransform: 'uppercase',
              color: 'primary',
              letterSpacing: '0.08em',
              fontSize: 0,
              mb: 2,
              fontFamily: 'body',
            }}
          >
            About Me
          </Text>
          <Heading
            as="h1"
            sx={{ fontSize: [5, 6], lineHeight: 1.1, fontFamily: 'body' }}
          >
            I’m Adam Saegebarth — senior software engineer, endurance athlete,
            and vinyl DJ.
          </Heading>
          <Text
            as="p"
            sx={{
              mt: 3,
              fontSize: [2, 3],
              color: 'text',
              fontFamily: 'body',
              lineHeight: 1.3,
            }}
          >
            I build products end‑to‑end, document training and race data, and
            spin global sounds on 100% vinyl. I’ve spent years across startups
            and established teams in Seattle and Miami, pairing engineering
            craft with culture, community, and curiosity.
          </Text>

          <Grid gap={3} columns={[1, 3]} sx={{ mt: 4 }}>
            <Stat label="Home Base" value="Seattle, WA" />
            <Stat label="Day Job" value="Senior Full‑Stack Engineer" />
            <Stat label="Community" value="Rapha Cycling Club - Ride Leader" />
          </Grid>
        </Box>

        {/* Engineering */}
        <Section
          id="engineering"
          heading="Engineering Mastery"
          kicker="Software"
        >
          <Text as="p" sx={{ mb: 3 }}>
            I’m a full‑stack engineer comfortable across web, mobile, backend
            systems, and infrastructure. Recently I led development on a
            consumer parenting app using <strong>Expo/React Native</strong>, a{' '}
            <strong>Rails 7 API on Heroku</strong>, and integrations with{' '}
            <strong>Stream Chat</strong>, <strong>SendGrid</strong>, and{' '}
            <strong>Twilio</strong>. I thrive on turning ambiguous problems into
            shipped products: performance tuning, clean APIs, DX‑friendly
            tooling, and UI that respects real users.
          </Text>
          <Grid gap={3} columns={[1, 2, 3]}>
            <Card
              sx={{ padding: 3, borderRadius: 10 }}
              backgroundColor="primaryMuted"
            >
              <Heading as="h3" sx={{ fontSize: 2, mb: 2, fontFamily: 'body' }}>
                Full‑stack Delivery
              </Heading>
              <Text>
                React/Next.js, Expo/React Native, Rails/Node, Postgres, CI/CD.
              </Text>
            </Card>
            <Card
              sx={{ padding: 3, borderRadius: 10 }}
              backgroundColor="primaryMuted"
            >
              <Heading as="h3" sx={{ fontSize: 2, mb: 2, fontFamily: 'body' }}>
                Data & Infra
              </Heading>
              <Text>
                ETL pipelines, analytics, search, caching, containerized
                deploys.
              </Text>
            </Card>
            <Card
              sx={{ padding: 3, borderRadius: 10 }}
              backgroundColor="primaryMuted"
            >
              <Heading as="h3" sx={{ fontSize: 2, mb: 2, fontFamily: 'body' }}>
                Product Mindset
              </Heading>
              <Text>
                Rapid iteration, thoughtful UX, and teamwork over lone‑wolf
                heroics.
              </Text>
            </Card>
          </Grid>
        </Section>

        {/* Endurance */}
        <Section
          id="endurance"
          heading="Endurance Athlete & Data Storyteller"
          kicker="Sport"
        >
          <Text as="p" sx={{ mb: 3 }}>
            I took a sabbatical during the pandemic to train like a pro off‑road
            cyclist—diving into <strong>coaching theory</strong>,{' '}
            <strong>nutrition</strong>, and{' '}
            <strong>performance analytics</strong>. I bring that same endurance
            mindset to engineering: consistent volume, deliberate practice, and
            testing what the data actually says. I also serve as a{' '}
            <strong>Ride Leader with Rapha Cycling Club Seattle</strong>,
            helping riders grow skills and community.
          </Text>
          <Grid gap={3} columns={[1, 2]}>
            <Card
              sx={{ p: 3, borderRadius: 10 }}
              backgroundColor="primaryMuted"
            >
              <Heading as="h3" sx={{ fontSize: 2, mb: 2, fontFamily: 'body' }}>
                Training Meets Data
              </Heading>
              <Text>
                Structured plans, telemetry, charts, and narrative race reports.
              </Text>
            </Card>
            <Card
              sx={{ p: 3, borderRadius: 10 }}
              backgroundColor="primaryMuted"
            >
              <Heading as="h3" sx={{ fontSize: 2, mb: 2, fontFamily: 'body' }}>
                Community
              </Heading>
              <Text>
                Three years leading RCC Seattle rides—welcoming, safe, and fun.
              </Text>
            </Card>
          </Grid>
        </Section>

        {/* Music */}
        <Section
          id="music"
          heading="Public Vinyl Radio & Creative Tech"
          kicker="Music"
        >
          <Text as="p" sx={{ mb: 3 }}>
            I founded <strong>Public Vinyl Radio</strong>, a YouTube channel
            dedicated to <strong>100% vinyl DJ sets</strong>—cumbia, Afrobeat,
            Latin jazz, soul, and beyond. I produce and edit high‑quality
            audio/video and build tools that connect crates to code, like a{' '}
            <strong>vinyl playlist optimizer</strong> that uses Discogs,
            Spotify, Apple Music APIs and audio analysis to sequence sets
            intelligently.
          </Text>
          <Grid gap={3} columns={[1, 2, 3]}>
            <Card
              sx={{ padding: 3, borderRadius: 10 }}
              backgroundColor="primaryMuted"
            >
              <Heading as="h3" sx={{ fontSize: 2, mb: 2, fontFamily: 'body' }}>
                Curation
              </Heading>
              <Text>
                Global sounds, storytelling intros, and dance‑floor flow.
              </Text>
            </Card>
            <Card
              sx={{ padding: 3, borderRadius: 10 }}
              backgroundColor="primaryMuted"
            >
              <Heading as="h3" sx={{ fontSize: 2, mb: 2, fontFamily: 'body' }}>
                Production
              </Heading>
              <Text>
                Multi‑cam edits, clean audio capture, and tasteful grading.
              </Text>
            </Card>
            <Card
              sx={{ padding: 3, borderRadius: 10 }}
              backgroundColor="primaryMuted"
            >
              <Heading as="h3" sx={{ fontSize: 2, mb: 2, fontFamily: 'body' }}>
                Tooling
              </Heading>
              <Text>
                Semantic search, audio features, and smart ordering algorithms.
              </Text>
            </Card>
          </Grid>
        </Section>

        {/* Values */}
        <Section id="values" heading="What Drives Me" kicker="Principles">
          <Text as="p" sx={{ mb: 3 }}>
            Across code, sport, and music, I’m guided by curiosity,
            collaboration, and craft. I’m happiest where{' '}
            <strong>engineering meets creativity</strong> and where{' '}
            <strong>community impact</strong> matters.
          </Text>
          <Grid gap={3} columns={[1, 3]}>
            <Card
              sx={{ padding: 3, borderRadius: 10 }}
              backgroundColor="primaryMuted"
            >
              <Heading as="h3" sx={{ fontSize: 2, mb: 2, fontFamily: 'body' }}>
                Engineering Mastery
              </Heading>
              <Text>
                Ship reliable systems with clear code and measurable outcomes.
              </Text>
            </Card>
            <Card
              sx={{ padding: 3, borderRadius: 10 }}
              backgroundColor="primaryMuted"
            >
              <Heading as="h3" sx={{ fontSize: 2, mb: 2, fontFamily: 'body' }}>
                Endurance Mindset
              </Heading>
              <Text>Consistency, resilience, and honest feedback loops.</Text>
            </Card>
            <Card
              sx={{ padding: 3, borderRadius: 10 }}
              backgroundColor="primaryMuted"
            >
              <Heading as="h3" sx={{ fontSize: 2, mb: 2, fontFamily: 'body' }}>
                Creative Fusion
              </Heading>
              <Text>
                Blend analysis with taste to make useful, human‑centered work.
              </Text>
            </Card>
          </Grid>
        </Section>

        {/* CTA */}
        <Section id="connect" heading="Let's Connect" kicker="Collaboration">
          <Text as="p" sx={{ mb: 3 }}>
            Open to collaboration, advisory, and roles that value hands‑on
            engineering with creative range. If something here resonates, reach
            out—I'd love to talk.
          </Text>
          <Flex sx={{ alignItems: 'center', flexWrap: 'wrap', gap: 3, mb: 3 }}>
            <Button
              as="a"
              href="https://linkedin.com/in/saegey"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Text sx={{ color: 'primaryMuted', fontWeight: 500 }}>
                Connect on LinkedIn
              </Text>
            </Button>
            <Button as={GatsbyLink} to="/contact" variant="secondary">
              <Text sx={{ color: 'primaryMuted', fontWeight: 500 }}>
                Send a message
              </Text>
            </Button>
          </Flex>
          <Box sx={{ mt: 2 }}>
            <SocialLink
              href="https://github.com/saegey"
              label="GitHub @saegey"
            />
            <SocialLink
              href="https://instagram.com/saegey"
              label="Instagram @saegey"
            />
            <SocialLink
              href="https://strava.com/athletes/saegey"
              label="Strava @saegey"
            />
            <SocialLink
              href="https://youtube.com/@publicvinylradio"
              label="YouTube: Public Vinyl Radio"
            />
          </Box>
        </Section>
      </Box>
    </Container>
  )
}

export default AboutPage

// Optional: Gatsby Head for basic SEO
export const Head = () => (
  <>
    <title>About — Adam Saegebarth (Saegey)</title>
    <meta
      name="description"
      content="Senior software engineer, endurance athlete, and vinyl DJ. Engineering mastery, endurance mindset, and creative technical fusion."
    />
  </>
)
