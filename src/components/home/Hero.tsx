import { Box, Flex, Heading, Text, Button } from 'theme-ui'

const Hero: React.FC = () => (
  <Box
    as="section"
    sx={{
      py: [5, 6],
      bg: 'background',
    }}
  >
    <Box sx={{ maxWidth: 1100 }}>
      <Heading
        as="h1"
        sx={{ fontSize: [5, 6], lineHeight: 1.1, mb: 3 }}
        variant="headline"
      >
        Product designer, software engineer, vinyl selector, and endurance
        athlete.
      </Heading>
      <Text
        as="p"
        sx={{
          fontSize: [2, 3],
          color: 'text',
          maxWidth: 800,
          mb: 4,
          lineHeight: [1.5, 1.6],
        }}
      >
        I’m Adam Saegebarth—Seattle‑based builder who ships end‑to‑end products,
        curates 100%‑vinyl global mixes, and turns training data into stories.
        Recent work spans React Native + Rails for a parenting app, a vinyl
        playlist optimizer using embeddings and genetic algorithms, and
        data‑driven race analysis.
      </Text>
      <Flex sx={{ gap: 3, flexWrap: 'wrap' }}>
        <Button
          as="a"
          href="/contact"
          sx={{ fontWeight: 700 }}
          color="primaryText"
          backgroundColor="primary"
        >
          Hire me
        </Button>
        <Button
          as="a"
          variant="secondary"
          onClick={() => window.open('https://publicvinylradio.com', '_blank')}
          sx={{ fontWeight: 700 }}
          color="primaryText"
          backgroundColor="primary"
        >
          Listen to Public Vinyl Radio
        </Button>
      </Flex>
    </Box>
  </Box>
)

export default Hero
