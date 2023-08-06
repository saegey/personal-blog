/**
 * @jest-environment jsdom
 */
import renderer from 'react-test-renderer'
import * as Gatsby from 'gatsby'

import Footer from '../Footer'


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
          <Footer />
      )
      .toJSON()
    expect(json).toMatchSnapshot()
  })
})