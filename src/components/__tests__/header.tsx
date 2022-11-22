/**
 * @jest-environment jsdom
 */

// import React from 'react'
import renderer from 'react-test-renderer'
// import { render } from '@testing-library/react'

import { ThemeProvider } from 'theme-ui'

import Header from '../header'

import { theme } from './__test-utils__'

describe('Header', () => {
  it('renders', () => {
    const json = renderer.create(
        <ThemeProvider theme={theme}>
          <Header setMenuOpen={jest.fn()}/>
        </ThemeProvider>
      ).toJSON()
    expect(json).toMatchSnapshot()
  })
})
