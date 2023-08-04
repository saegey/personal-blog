/**
 * @jest-environment jsdom
 */
import renderer from 'react-test-renderer'

import GradeGradient from '../GradeGradient'

describe('GradGradient', () => {
  it('renders', () => {
    const json = renderer
      .create(
        <GradeGradient data={[{ distance: 5, color: 'red' }]} xMax={20} />
      )
      .toJSON()
    expect(json).toMatchSnapshot()
  })
})
