/**
 * @jest-environment jsdom
 */
import renderer from 'react-test-renderer'
import { render, screen, fireEvent } from '@testing-library/react'
import { ThemeProvider } from 'theme-ui'

import { MatchesBurned } from '../MatchesBurned'
import { theme } from './__test-utils__'

describe('Matches Burned', () => {
  it('renders', () => {
    const json = renderer
      .create(
        <ThemeProvider theme={theme}>
          <MatchesBurned
            data={[
              {
                averagePower: 200,
                totalJoules: 1000,
                totalTime: 60,
                vals: [0, 2, 3],
                startTime: '3443434',
              },
            ]}
          />
        </ThemeProvider>
      )
      .toJSON()
    expect(json).toMatchSnapshot()
  })

  it('opens a modal if view all is clicked', () => {
    render(
      <ThemeProvider theme={theme}>
        <MatchesBurned
          data={[
            {
              averagePower: 200,
              totalJoules: 1000,
              totalTime: 60,
              vals: [0, 2, 3],
              startTime: '3443434',
            },
          ]}
        />
      </ThemeProvider>
    )

    const viewAll = screen.getByRole('button')
    fireEvent.click(viewAll)
    expect(screen.queryAllByTestId('matchesModal').length).toEqual(1)
  })
})
