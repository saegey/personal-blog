/**
 * @jest-environment jsdom
 */
import renderer from 'react-test-renderer'

import { Button } from 'theme-ui'
import { render, screen, cleanup, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

// import { ThemeProvider } from 'theme-ui'

import ThemeContext from '../ThemeContext'

import { theme } from './__test-utils__'

afterEach(cleanup)

describe('ThemeContext', () => {
  it('renders', () => {
    const json = renderer
      .create(
        <ThemeContext.Consumer>
          {theme => <h1>{theme.unitOfMeasure}</h1>}
        </ThemeContext.Consumer>
      )
      .toJSON()
    expect(json).toMatchSnapshot()
  })

  it('changes unit of it is toggled', async () => {
    render(
      <ThemeContext.Consumer>
        {theme => {
          return (
            <div>
              <Button title="Test Button" onClick={theme.toggleUnit} />
              <h1>{theme.unitOfMeasure}</h1>
            </div>
          )
        }}
      </ThemeContext.Consumer>
    )

			userEvent.click(screen.getByTitle('Test Button'))
    const blah = await screen.findByText('metric')
		expect(blah).toEqual('')



    // expect(json).toMatchSnapshot()
  })
})
