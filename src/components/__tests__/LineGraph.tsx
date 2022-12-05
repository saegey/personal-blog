/**
 * @jest-environment jsdom
 */
import renderer from 'react-test-renderer'
import { render, fireEvent, screen } from '@testing-library/react'

import { ThemeProvider } from 'theme-ui'

import LineGraph from '../LineGraph'

import { theme } from './__test-utils__'

global.ResizeObserver = jest.fn().mockImplementation(() => ({
  observe: jest.fn(),
  unobserve: jest.fn(),
  disconnect: jest.fn(),
}))

describe('LineGraph', () => {
  test.skip('renders', () => {
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
            colors={['black']}
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

  // it('renders tooltip', async () => {
  //   render(
  //     <ThemeProvider theme={theme}>
  //       <LineGraph
  //         data={[
  //           {
  //             id: 'testdata',
  //             data: [
  //               { x: 1, y: 10 },
  //               { x: 2, y: 5 },
  //               { x: 3, y: 15 },
  //             ],
  //           },
  //         ]}
  //         yScaleMin={0}
  //         yScaleMax={20}
  //         areaBaselineValue={0}
  //         axisBottomTickValues={[0, 1, 2, 3]}
  //         axisLeftTickValues={[0, 5, 10, 15, 20]}
  //         enableArea={false}
  //         unit={'watts'}
  //         lineWidth={2}
  //       />
  //     </ThemeProvider>
  //   )
  // const blah = await screen.queryAllByRole('test')
  // console.log(blah)
  // screen.debug()
  // })
})
