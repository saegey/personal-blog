import { render } from '@testing-library/react'
import NewLineGraph from '../NewLineGraph'
import { useViewport } from '../../../../context/ViewportProvider'
import { mocked } from 'jest-mock'

jest.mock('recharts', () => {
  const OriginalModule = jest.requireActual('recharts')
  return {
    ...OriginalModule,
    ResponsiveContainer: ({ children }: { children: JSX.Element }) => (
      <OriginalModule.ResponsiveContainer width={800} height={800}>
        {children}
      </OriginalModule.ResponsiveContainer>
    ),
  }
})

jest.mock('../../../../context/UnitProvider.tsx', () => {
  return {
    useUnits: () => {
      return { unitOfMeasure: 'imperial' }
    },
  }
})

jest.mock('../../../../context/ViewportProvider.tsx', () => {
  return {
    useViewport: jest.fn(),
  }
})

const mockedUseViewport = mocked(useViewport, true)

const data = {
  xMax: 500,
  downSampledData: [
    { x: 10, y: 200, distance: 1, color: 'red' },
    { x: 20, y: 220, distance: 2, color: 'yellow' },
    { x: 30, y: 240, distance: 3, color: 'blue' },
  ],
  elevationToAdd: 100,
  setMarker: jest.fn(),
  axisLeftTickValues: {
    imperial: [[0, 10, 20, 50]],
    metric: [[0, 10, 20, 50]],
  },
  axisXTickValues: {
    imperial: [[0, 10, 20, 50]],
    metric: [[0, 10, 20, 50]],
  },
  yMin: 0,
}

describe('NewLineGraph', () => {
  it('renders correctly', () => {
    mockedUseViewport.mockReturnValueOnce({ width: 800, height: 600 })
    const screen = render(
      <NewLineGraph
        downSampledData={data.downSampledData}
        xMax={data.xMax}
        axisLeftTickValues={data.axisLeftTickValues}
        axisXTickValues={data.axisXTickValues}
        yMin={data.yMin}
        elevationToAdd={data.elevationToAdd}
        setMarker={data.setMarker}
      />
    )
    expect(screen.container).toMatchSnapshot()
  })

  it('doesnt render axes if width is less than 640', () => {
    mockedUseViewport.mockReturnValueOnce({ width: 600, height: 400 })
    const screen = render(
      <NewLineGraph
        downSampledData={data.downSampledData}
        xMax={data.xMax}
        axisLeftTickValues={data.axisLeftTickValues}
        axisXTickValues={data.axisXTickValues}
        yMin={data.yMin}
        elevationToAdd={data.elevationToAdd}
        setMarker={data.setMarker}
      />
    )
    expect(screen.container).toMatchSnapshot()
  })
})
