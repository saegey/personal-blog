/**
 * @jest-environment jsdom
 */
import renderer from 'react-test-renderer'

import LandscapeImage from '../LandscapeImage'

jest.mock('theme-ui', () => {
  return {
    Text: ({ children }: { children: JSX.Element }) => {
      return <p>{children}</p>
    },
    Box: ({ children }: { children: JSX.Element }) => {
      return <div>{children}</div>
    },
    Image: ({ children }: { children: JSX.Element }) => {
      return <img>{children}</img>
    },
    useColorMode: () => {
      return ['dark']
    },
    useThemeUI: () => {
      return {
        theme: {
          colors: {
            background: 'blue',
          },
        },
      }
    },
  }
})

describe('LandscapeImage', () => {
  it('renders', () => {
    const json = renderer
      .create(
        <LandscapeImage
          image={{
            layout: 'constrained',
            width: 100,
            height: 200,
            images: {
              fallback: {
                src: 'http://fsaf.com/1.jpg',
              },
              sources: [{ media: 'balf', type: 'fla', srcSet: 'blah' }],
              // altText: 'alt teext',
              // shouldLoad: true,
            },

            backgroundColor: 'black',
          }}
          caption="this is a caption"
          maximize={false}
        />
      )
      .toJSON()
    expect(json).toMatchSnapshot()
  })
})
