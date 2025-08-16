import Helmet from 'react-helmet'
import { Box, Divider, Flex, NavLink, Text } from 'theme-ui'
import BackToTop from './layout/BackToTop'
import ViewportProvider from '../context/ViewportProvider'
import UnitProvider from '../context/UnitProvider'
import { Link } from 'gatsby'
import { MyLinkProps } from '../common/types'

type CardProps = {
  children: JSX.Element
}

const MyLink = Link as any as (props: MyLinkProps) => JSX.Element

const Layout = ({ children }: CardProps) => {
  return (
    <ViewportProvider>
      <UnitProvider>
        <>
          <Helmet htmlAttributes={{ lang: 'en-US' }}>
            <body />
          </Helmet>
          <Box sx={{ maxWidth: '1045px', marginX: [3, 5] }}>
            <Flex sx={{ flexDirection: 'column' }}>
              <Box marginTop={3}>
                <Text as="h1" sx={{ fontSize: [4, 5, 5] }}>
                  Adam Saegebarth
                </Text>
              </Box>
              <Flex as="nav">
                {[
                  { href: '/', label: 'Home' },
                  { href: '/about', label: 'About' },
                  { href: '/posts', label: 'Posts' },
                  { href: '/projects', label: 'Projects', paddingY: 2 },
                ].map(({ href, label, paddingY }) => (
                  <NavLink
                    key={href}
                    href={href}
                    as={MyLink}
                    paddingRight={3}
                    paddingTop={2}
                    {...(paddingY ? { paddingY } : {})}
                    sx={{
                      textDecoration: 'underline',
                      color: '#4c79f4ff',
                      '&:hover': {
                        color: '#3b5b9a',
                        textDecorationThickness: '2px',
                      },
                      fontWeight: '600',
                    }}
                  >
                    {label}
                  </NavLink>
                ))}
              </Flex>
            </Flex>
            <Divider
              sx={{ marginTop: 3, marginBottom: 0, color: 'primaryMuted' }}
            />
          </Box>

          <Box
            as="main"
            sx={{
              flexGrow: 1,
              maxWidth: '1045px',
              margin: [3, 5],
            }}
          >
            {children}
            <BackToTop />
          </Box>
        </>
      </UnitProvider>
    </ViewportProvider>
  )
}

export default Layout
