import { Box, Flex, Container, Text } from 'theme-ui'
import { graphql } from 'gatsby'
import { StaticImage } from 'gatsby-plugin-image'

import Seo from '../components/seo'

const AboutIndex = () => {
  return (
    <Container p={['20px', '20px', '32px']} sx={{ maxWidth: 768 }}>
      <Text as="h1">About Me</Text>
      <Box>
        <Flex sx={{ justifyContent: 'center' }}>
          <Box
            sx={{
              marginX: 'auto',
              width: ['100%', '100%', '100%'],
              marginBottom: '20px',
            }}
          >
            <StaticImage
              layout="constrained"
              formats={['auto', 'webp', 'avif']}
              src="../images/A88F6F34-ADF4-4039-A6BF-586010755F0C_1_201_a.jpeg"
              objectFit="fill"
              quality={95}
              alt="Profile picture"
              sx={{
                // borderRadius: '20px',
                height: ['100%', 'auto', 'auto'],
                width: ['100%', '100%', '100%'],
              }}
            />
          </Box>
        </Flex>
        <Text
          as="p"
          sx={{
            fontFamily: 'body',
            lineHeight: '1.4',
            fontSize: ['16px', '2', '2'],
            // letterSpacing: '.4px',
          }}
        >
          Hi, I'm Adam. I'm a product designer, software engineer, and creative
          living in the Pacific Northwest. I like to ride and race my bike on
          gravel, road and dirt.
        </Text>
        <Text
          as="p"
          sx={{
            fontFamily: 'serif',
            lineHeight: '1.4',
            fontSize: ['16px', '2', '2'],
            marginTop: '20px',
            // letterSpacing: '.4px',
          }}
        >
          I built this website to provide a detailed analysis of my rides and
          races for myself and others so we can learn from our previous
          experiences. If you like this site, you can fork it on Github or wait
          till the platform is built where you can post your own race journals.
        </Text>
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
