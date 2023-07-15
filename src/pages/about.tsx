import { Box, Flex, Container } from 'theme-ui'
import { graphql } from 'gatsby'
import { StaticImage } from 'gatsby-plugin-image'

import SafariStyle from '../components/SafariStyle'
import Seo from '../components/seo'

const AboutIndex = () => {
  return (
    <Container p={['20px', '20px', '32px']} sx={{ maxWidth: 768 }}>
      <SafariStyle />
      <Box>
        <Flex sx={{ width: '100%' }}>
          <Box sx={{ marginX: 'auto' }}>
            <StaticImage
              layout="constrained"
              formats={['auto', 'webp', 'avif']}
              src="../images/profile-noise.png"
              objectFit="cover"
              quality={95}
              alt="Profile picture"
              sx={{
                borderRadius: '20px',
                height: ['200px', '300px', '300px'],
                width: ['200px', '300px', '300px'],
              }}
            />
          </Box>
        </Flex>
        <p
          sx={{
            fontFamily: 'serif',
            lineHeight: '1.6',
            fontSize: ['16px', '2', '2'],
            letterSpacing: '.4px',
          }}
        >
          Hi, I'm Adam. I'm a product designer, software engineer, and creative
          living in the Pacific Northwest. I like to ride and race my bike on
          gravel, road and dirt.
        </p>
        <p
          sx={{
            fontFamily: 'serif',
            lineHeight: '1.6',
            fontSize: ['16px', '2', '2'],
            letterSpacing: '.4px',
          }}
        >
          I built this website to provide a detailed analysis of my rides and
          races for myself and others so we can learn from our previous
          experiences. If you like this site, you can fork it on Github or wait
          till the platform is built where you can post your own race journals.
        </p>
      </Box>
    </Container>
  )
}

export default AboutIndex

/**
 * Head export to define metadata for the page
 *
 * See: https://www.gatsbyjs.com/docs/reference/built-in-components/gatsby-head/
 */
export const Head = () => (
  <Seo title="About Saegey" image="/profile-noise.png" />
)

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }
  }
`
