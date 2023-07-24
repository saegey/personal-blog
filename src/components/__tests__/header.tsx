/**
 * @jest-environment jsdom
 */
import renderer from 'react-test-renderer'
import { render, fireEvent, screen } from '@testing-library/react'

import { ThemeUIProvider, useColorMode } from 'theme-ui'

import Header from '../header'
import ColorModeSelector from '../ColorModeSelector'

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
        <ThemeUIProvider theme={theme}>
          <Header setMenuOpen={jest.fn()} />
        </ThemeUIProvider>
      )
      .toJSON()
    expect(json).toMatchSnapshot()
  })

  it('clicks a button to open a menu', async () => {
    const openMenu = jest.fn()
    render(
      <ThemeUIProvider theme={theme}>
        <Header setMenuOpen={openMenu} />
      </ThemeUIProvider>
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
          <ThemeUIProvider theme={theme}>
            <ColorModeSelector />
          </ThemeUIProvider>
        )
        const themeButton = await screen.queryByTitle('Light Mode')
        fireEvent.click(themeButton)
        expect(mockColorMode).toBeCalledWith('light')
      })

      afterEach(() => {
        // jest.unmock('theme-ui')
        // jest.restoreAllMocks()
        useColorMode.mockImplementation(jest.fn())
      })
    })

    describe('light mode to dark', () => {
      beforeEach(() => {
        useColorMode.mockImplementation(() => ['light', mockDarkMode])
      })

      it('clicks a button to open a change color scheme', async () => {
        render(
          <ThemeUIProvider theme={theme}>
            <ColorModeSelector />
          </ThemeUIProvider>
        )
        const themeButton = await screen.queryByTitle('Dark Mode')
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
