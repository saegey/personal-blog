import { Text, Link, Box } from 'theme-ui'

const Footer = () => {
  return (
    <footer
      sx={{
        display: 'flex',
        flexWrap: 'wrap',
        alignItems: 'center',
        variant: 'styles.footer',
        fontFamily: 'body',
        marginTop: '30px',
        marginBottom: '0px',
        marginX: '20px',
        padding: '0px',
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
          }}
        >
          SAEGEY
        </Text>

        <Box>
          <Link
            href="http://instagram.com/saegey"
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
            href="http://github.com/saegey"
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
            href="http://twitter.com/saegey"
            sx={{
              textDecoration: 'underline',
              textUnderlineOffset: '2.5px',
              paddingRight: 3,
              fontWeight: '300',
            }}
          >
            Twitter
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
