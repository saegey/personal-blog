/**
 * @jest-environment jsdom
 */
import renderer from 'react-test-renderer'
import { fireEvent, render, screen } from '@testing-library/react'
import { ThemeProvider } from 'theme-ui'

import Modal from '../Modal'

import { theme } from './__test-utils__'

describe('Modal', () => {
  it('renders', () => {
    const json = renderer
      .create(
        <Modal modalOpen={jest.fn()} headerText={'hello world'}>
          <h1>tst</h1>
        </Modal>
      )
      .toJSON()
    expect(json).toMatchSnapshot()
  })

  it('clicking close button close runs function', async () => {
    const modalClose = jest.fn()
    render(
      <Modal modalOpen={modalClose} headerText={'hello world'}>
        <h1>tst</h1>
      </Modal>
    )
    const closeButton = await screen.findByTitle('Close')
    fireEvent.click(closeButton)
    expect(modalClose).toBeCalledTimes(1)
  })

  it('clicking outside modal runs close function', async () => {
    const modalClose = jest.fn()
    render(
      <Modal modalOpen={modalClose} headerText={'hello world'}>
        <h1>tst</h1>
      </Modal>
    )
    // screen.debug()
    const modalBackground = await screen.findByTitle('modalBackgroundContainer')
    fireEvent.click(modalBackground)
    expect(modalClose).toBeCalledTimes(1)
  })
})
