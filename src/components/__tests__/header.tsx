/**
 * @jest-environment jsdom
 */
import renderer from 'react-test-renderer'
import { render, fireEvent, screen } from '@testing-library/react'

import { ThemeProvider, useColorMode } from 'theme-ui'

import Header from '../header'

import { theme } from './__test-utils__'
import { JsxEmit } from 'typescript'
const mockColorMode = jest.fn()
const mockDarkMode = jest.fn()

jest.mock('theme-ui', () => {
  const original = jest.requireActual('theme-ui') // Step 2.
  return {
    ...original,
    useColorMode: jest.fn(),
  }
})

// jest.mock('theme-ui')

describe('Header', () => {
  beforeEach(() => {
    useColorMode.mockImplementation(() => ['default', mockColorMode])
  })

  it('renders', () => {
    const json = renderer
      .create(
        <ThemeProvider theme={theme}>
          <Header setMenuOpen={jest.fn()} />
        </ThemeProvider>
      )
      .toJSON()
    expect(json).toMatchSnapshot()
  })

  it('clicks a button to open a menu', async () => {
    const openMenu = jest.fn()
    render(
      <ThemeProvider theme={theme}>
        <Header setMenuOpen={openMenu} />
      </ThemeProvider>
    )
    const menuButton = await screen.queryByTitle('Toggle Menu')
    fireEvent.click(menuButton)
    expect(openMenu).toBeCalledWith(true)
  })

  describe('color scheme', () => {
    describe('dark mode to light', () => {
      beforeEach(() => {
        useColorMode.mockImplementation(() => ['dark', mockColorMode])
      })

      it('clicks a button to open a change color scheme', async () => {
        render(
          <ThemeProvider theme={theme}>
            <Header setMenuOpen={jest.fn()} />
          </ThemeProvider>
        )
        const themeButton = await screen.queryByTitle('Toggle Theme')
        fireEvent.click(themeButton)
        expect(mockColorMode).toBeCalledWith('default')
      })

      afterEach(() => {
        // jest.unmock('theme-ui')
        // jest.restoreAllMocks()
        useColorMode.mockImplementation(jest.fn())
      })
    })

    describe('light mode to dark', () => {
      beforeEach(() => {
        useColorMode.mockImplementation(() => ['default', mockDarkMode])
      })

      it('clicks a button to open a change color scheme', async () => {
        render(
          <ThemeProvider theme={theme}>
            <Header setMenuOpen={jest.fn()} />
          </ThemeProvider>
        )
        const themeButton = await screen.queryByTitle('Toggle Theme')
        fireEvent.click(themeButton)
        expect(mockDarkMode).toBeCalledWith('dark')
      })

      afterEach(() => {
        // jest.unmock('theme-ui')
        // jest.restoreAllMocks()
        useColorMode.mockImplementation(jest.fn())
      })
    })
  })
})
