/**
 * @jest-environment jsdom
 */
import renderer from 'react-test-renderer'

import PostTemplate from '../post'

jest.mock('@mdx-js/react', () => {
  return {
    MDXProvider: ({ children }: { children: JSX.Element }) => {
      return <div>{children}</div>
    },
  }
})

describe('PostTemplate', () => {
  it('renders', () => {
    const templateProps = {
      mdx: {
        frontmatter: {
          title: 'this is a title',
          date: '2022-01-01',
          location: 'Seattle Washington',
          type: 'gravel racee',
          teaser: 'this is a teaser',
          publishedDate: '2022-01-01',
          headerCaption: 'this is a header caption',
          headerImage: {
            childImageSharp: {
              gatsbyImageData: {
                width: 200,
                height: 420,
              },
            },
          },
        },
      },
    }

    const json = renderer
      .create(<PostTemplate data={templateProps}></PostTemplate>)
      .toJSON()
    expect(json).toMatchSnapshot()
  })
})
