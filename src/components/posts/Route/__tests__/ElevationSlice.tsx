/**
 * @jest-environment jsdom
 */
import renderer from 'react-test-renderer'

import ElevationSlice from '../ElevationSlice'

describe('ElevationSlice', () => {
  it('renders', () => {
    const json = renderer.create(<ElevationSlice />).toJSON()
    expect(json).toMatchSnapshot()
  })

  it('renders values', () => {
    const json = renderer
      .create(
        <ElevationSlice
          marker={{ grade: 0.04, distance: 100, y: 50.4, x: 1200 }}
        />
      )
      .toJSON()
    expect(json).toMatchSnapshot()
  })
})
