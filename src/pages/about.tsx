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
              src="../images/profile-new.jpg"
              objectFit="cover"
              quality={95}
              alt="Profile picture"
              sx={{
                borderRadius: '1000px',
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
          Hi, I'm Adam. I'm a product designer, code tinkerer, and creative
          experimenter living the PNW life in Seattle.
        </p>

        <p
          sx={{
            fontFamily: 'serif',
            lineHeight: '1.6',
            fontSize: ['16px', '2', '2'],
            letterSpacing: '.4px',
          }}
        >
          Hexagon farm-to-table bicycle rights raclette, fam sus cred
          post-ironic. Austin bespoke af pop-up, photo booth meggings hoodie
          dreamcatcher cray hexagon wolf +1. Tote bag banh mi letterpress lo-fi
          tilde glossier mumblecore iceland cred pork belly normcore.
        </p>
        <p
          sx={{
            fontFamily: 'serif',
            lineHeight: '1.6',
            fontSize: ['16px', '2', '2'],
            letterSpacing: '.4px',
          }}
        >
          Chambray small batch stumptown yes plz poutine waistcoat la croix,
          roof party pop-up whatever art party everyday carry direct trade fit.
          Quinoa fanny pack hashtag hexagon seitan blog chambray lyft jianbing
          tote bag pok pok. Vibecession put a bird on it seitan jean shorts
          plaid biodiesel polaroid shaman selfies semiotics church-key fixie
          schlitz pitchfork tattooed.
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
export const Head = () => <Seo title="All posts" />

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }
  }
`
