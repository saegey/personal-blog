/**
 * @jest-environment jsdom
 */

// import React from 'react'
import renderer from 'react-test-renderer'
// import { render } from '@testing-library/react'

import { ThemeProvider } from 'theme-ui'

import LineGraph from '../LineGraph'

import { theme } from './__test-utils__'

global.ResizeObserver = jest.fn().mockImplementation(() => ({
  observe: jest.fn(),
  unobserve: jest.fn(),
  disconnect: jest.fn(),
}))

describe('LineGraph', () => {
  it('renders', () => {
    const json = renderer
      .create(
        <ThemeProvider theme={theme}>
          <LineGraph
            data={[
              {
                id: 'testdata',
                data: [
                  { x: 1, y: 10 },
                  { x: 2, y: 5 },
                  { x: 3, y: 15 },
                ],
              },
            ]}
            yScaleMin={0}
            yScaleMax={20}
            areaBaselineValue={0}
            axisBottomTickValues={[0, 1, 2, 3]}
            axisLeftTickValues={[0, 5, 10, 15, 20]}
            enableArea={false}
            unit={'watts'}
            lineWidth={2}
          />
        </ThemeProvider>
      )
      .toJSON()
    expect(json).toMatchSnapshot()
  })
})
