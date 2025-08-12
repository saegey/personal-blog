import { Box, Flex, Heading, Text, Button } from 'theme-ui'

const Hero: React.FC = () => (
  <Box
    as="section"
    sx={{
      py: [5, 6],
      px: [3, 4],
      bg: 'background',
      borderBottom: '1px solid',
      borderColor: 'muted',
    }}
  >
    <Box sx={{ maxWidth: 1100, mx: 'auto' }}>
      <Heading
        as="h1"
        sx={{ fontSize: [5, 6], lineHeight: 1.1, mb: 3 }}
        variant="headline"
      >
        Senior software engineer, vinyl DJ, and endurance data nerd.
      </Heading>
      <Text
        as="p"
        sx={{ fontSize: [2, 3], color: 'text', maxWidth: 800, mb: 4 }}
      >
        I’m Adam Saegebarth—Seattle‑based builder who ships end‑to‑end products,
        curates 100%‑vinyl global mixes, and turns training data into stories.
        Recent work spans React Native + Rails for a parenting app, a vinyl
        playlist optimizer using embeddings and genetic algorithms, and
        data‑driven race analysis.
      </Text>
      <Flex sx={{ gap: 3, flexWrap: 'wrap' }}>
        <Button as="a" href="/contact" sx={{ fontWeight: 700 }} variant="primary">
          Hire me
        </Button>
        <Button as="a" variant="secondary" href="/dj" sx={{ fontWeight: 700 }}>
          Listen to Public Vinyl Radio
        </Button>
      </Flex>
    </Box>
  </Box>
)

export default Hero
