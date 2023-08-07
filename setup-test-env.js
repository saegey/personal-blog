import { createSerializer } from '@emotion/jest'
import * as emotion from '@emotion/react'

expect.addSnapshotSerializer(createSerializer(emotion))

jest.mock('gatsby-plugin-image', () => {
  const React = require('react')
  const plugin = jest.requireActual('gatsby-plugin-image')
  const mockImage = ({ imgClassName, ...props }) =>
    React.createElement('img', {
      ...props,
      className: imgClassName,
    })
  const mockPlugin = {
    ...plugin,
    GatsbyImage: jest.fn().mockImplementation(mockImage),
    StaticImage: jest.fn().mockImplementation(mockImage),
  }
  return mockPlugin
})

// jest.mock('theme-ui', () => {
//   return {
//     Text: ({ children }) => {
//       return <p>{children}</p>
//     },
//     Box: ({ children }) => {
//       return <div>{children}</div>
//     },
//     Image: ({ children }) => {
//       return <img>{children}</img>
//     },
//     useColorMode: () => {
//       return ['dark']
//     },
//     useThemeUI: () => {
//       return {
//         theme: {
//           colors: {
//             background: 'blue',
//           },
//         },
//       }
//     },
//   }
// })
