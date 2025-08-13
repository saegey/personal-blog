import Helmet from 'react-helmet'
import {
  Box,
  Flex,
  NavLink,
  Text,
} from 'theme-ui'
import Footer from './layout/Footer'
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
          <Box sx={{ maxWidth: 1100, marginLeft: '20px' }}>
            <Flex sx={{ flexDirection: 'column' }}>
              <Box>
                <Text as="h1">Adam Saegebarth</Text>
              </Box>
              <Flex as="nav">
                <NavLink href="/home" as={MyLink} p={2}>
                  Home
                </NavLink>
                <NavLink href="/about" as={MyLink} p={2}>
                  About
                </NavLink>
                <NavLink href="/posts" as={MyLink} p={2}>
                  Posts
                </NavLink>
                <NavLink href="/projects" as={MyLink} p={2}>
                  Projects
                </NavLink>
              </Flex>
            </Flex>
          </Box>
          <Box
            as="main"
            sx={{
              flexGrow: 1,
            }}
          >
            {children}
            <BackToTop />
          </Box>
          <Footer />
        </>
      </UnitProvider>
    </ViewportProvider>
    // </ThemeUIProvider>
  )
}

export default Layout
