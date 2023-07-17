import { Text, Link, Box } from 'theme-ui'
import { useStaticQuery, graphql } from 'gatsby'

const Footer = () => {
  const data = useStaticQuery(graphql`
    query HeaderQuery {
      site {
        siteMetadata {
          title
          social {
            twitter
            instagram
            github
            strava
          }
        }
      }
    }
  `)

  const { instagram, github, twitter, strava } = data.site.siteMetadata.social
  const title = data.site.siteMetadata.title

  return (
    <footer
      sx={{
        // display: 'flex',
        // flexWrap: 'wrap',
        // flexShrink: 0,
        alignItems: 'center',
        variant: 'styles.footer',
        fontFamily: 'body',
        padding: '20px',
        backgroundColor: 'muted',
      }}
    >
      <Box
        sx={{
          display: 'grid',
          marginBottom: '10px',
        }}
      >
        <Text
          as="div"
          sx={{
            fontWeight: '700',
            fontSize: '2',
            marginBottom: '10px',
            letterSpacing: '1px',
            textTransform: 'uppercase',
          }}
        >
          {title}
        </Text>

        <Box>
          <Link
            href={`http://instagram.com/${instagram}`}
            sx={{
              textDecoration: 'underline',
              textUnderlineOffset: '2.5px',
              fontWeight: '300',
              paddingRight: 3,
            }}
          >
            Instagram
          </Link>
          <Link
            href={`http://github.com/${github}`}
            sx={{
              textDecoration: 'underline',
              textUnderlineOffset: '2.5px',
              paddingRight: 3,
              fontWeight: '300',
            }}
          >
            Github
          </Link>
          <Link
            href={`http://twitter.com/${twitter}`}
            sx={{
              textDecoration: 'underline',
              textUnderlineOffset: '2.5px',
              paddingRight: 3,
              fontWeight: '300',
            }}
          >
            Twitter
          </Link>
          <Link
            href={`https://www.strava.com/athletes/${strava}`}
            sx={{
              textDecoration: 'underline',
              textUnderlineOffset: '2.5px',
              paddingRight: 3,
              fontWeight: '300',
            }}
          >
            Strava
          </Link>
        </Box>
      </Box>
      <div sx={{ mx: 'auto' }} />
      <div
        sx={{
          p: 0,
          fontFamily: 'body',
          fontWeight: '300',
          // position: "absolute",
          bottom: 0,
          marginTop: 'auto',
          marginBottom: '10px',
        }}
      >
        © {new Date().getFullYear()}
      </div>
    </footer>
  )
}

export default Footer
