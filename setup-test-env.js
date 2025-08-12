// Polyfill for TextEncoder/TextDecoder in Node
// ...existing code...
global.ResizeObserver = jest.fn().mockImplementation(() => ({
  observe: jest.fn(),
  unobserve: jest.fn(),
  disconnect: jest.fn(),
}))

// Mock mapbox-gl for Jest
jest.mock('mapbox-gl', () => ({
  Map: function () { return {}; },
  NavigationControl: function () { return {}; },
  GeolocateControl: function () { return {}; },
  Marker: function () { return {}; },
  Popup: function () { return {}; },
  // Add any other Mapbox classes you use
}));
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

jest.mock('d3-scale', () => {
  return {
    scaleLog: () => {
      return {
        base: jest.fn(),
      }
    },
  }
})

jest.mock('mapbox-gl/dist/mapbox-gl.css', () => jest.fn())


global.ResizeObserver = jest.fn().mockImplementation(() => ({
  observe: jest.fn(),
  unobserve: jest.fn(),
  disconnect: jest.fn(),
}))