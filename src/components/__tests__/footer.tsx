/**
 * @jest-environment jsdom
 */
import renderer from 'react-test-renderer'
// import { render } from '@testing-library/react'
import { ThemeProvider } from 'theme-ui'
import * as Gatsby from 'gatsby'

import Footer from '../footer'

import { theme } from './__test-utils__'

const useStaticQuery = jest.spyOn(Gatsby, `useStaticQuery`)
const mockUseStaticQuery = {
  site: {
    siteMetadata: {
      title: `Gatsby Default Starter`,
      social: {
        instagram: 'instagramusername',
        twitter: 'twitterusername',
        github: 'githubusername',
        strava: 'stravausername'
      },
    },
  },
}

describe('Footer', () => {
  beforeEach(() => {
    useStaticQuery.mockImplementation(() => mockUseStaticQuery)
  })

  afterEach(() => {
    jest.restoreAllMocks()
  })

  it('renders', () => {
    const json = renderer
      .create(
        <ThemeProvider theme={theme}>
          <Footer />
        </ThemeProvider>
      )
      .toJSON()
    expect(json).toMatchSnapshot()
  })
})
