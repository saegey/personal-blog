import * as Gatsby from 'gatsby'

import { useSiteMetadata } from '../use-site-metadata'

const useStaticQuery = jest.spyOn(Gatsby, `useStaticQuery`)
const mockUseStaticQuery = {
  site: {
    siteMetadata: {
      title: `Gatsby Default Starter`,
    },
  },
}

describe('UseSiteMetadata', () => {
  beforeEach(() => {
    useStaticQuery.mockImplementation(() => mockUseStaticQuery)
  })

  it('renders correctly', () => {
    const tree = useSiteMetadata()
    expect(tree).toEqual({ title: 'Gatsby Default Starter' })
  })
})
