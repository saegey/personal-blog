/**
 * @jest-environment jsdom
 */
import renderer from 'react-test-renderer'
import { render, screen } from '@testing-library/react'
import { ThemeProvider } from 'theme-ui'

import RaceOverviewWrapper, { RaceOverview } from '../RaceOverview'

import { theme } from './__test-utils__'

describe('RaceOverview', () => {
  it('renders metric', () => {
    const json = renderer
      .create(
        <ThemeProvider theme={theme}>
          <RaceOverview
            data={{
              elevationGain: 12345,
              distance: 100,
              normalizedPower: 250.999999,
              heartAnalysis: { entire: 170 },
              tempAnalysis: { entire: 50 },
              powerAnalysis: { entire: 280 },
              cadenceAnalysis: { entire: 75 },
              elapsedTime: { seconds: 3600 },
              stoppedTime: 600,
              timeInRed: 320,
            }}
            selectedFields={[
              'Normalized Power',
              'Elevation Gain',
              'Avg Heart Rate',
              'Distance',
              'Elapsed Time',
              'Avg Temperature',
              'Avg Speed',
              'Avg Power',
              'Avg Cadence',
              'Time in Red',
            ]}
            theme={{ unitOfMeasure: 'metric' }}
          />
        </ThemeProvider>
      )
      .toJSON()
    expect(json).toMatchSnapshot()
  })

  it('renders imperial', () => {
    const json = renderer
      .create(
        <ThemeProvider theme={theme}>
          <RaceOverview
            data={{
              elevationGain: 12345,
              distance: 100,
              normalizedPower: 250.999999,
              heartAnalysis: { entire: 170 },
              tempAnalysis: { entire: 50 },
              powerAnalysis: { entire: 280 },
              cadenceAnalysis: { entire: 75 },
              elapsedTime: { seconds: 3600 },
              stoppedTime: 600,
              timeInRed: 320,
            }}
            selectedFields={[
              'Normalized Power',
              'Elevation Gain',
              'Avg Heart Rate',
              'Distance',
              'Elapsed Time',
              'Avg Temperature',
              'Avg Speed',
              'Avg Power',
              'Avg Cadence',
              'Time in Red',
            ]}
            theme={{ unitOfMeasure: 'imperial' }}
          />
        </ThemeProvider>
      )
      .toJSON()
    expect(json).toMatchSnapshot()
  })

  it('injects context intoo component', async () => {
    const json = renderer
      .create(
        <RaceOverviewWrapper
          data={{
            elevationGain: 12345,
            distance: 100,
            normalizedPower: 250.999999,
            heartAnalysis: { entire: 170 },
            tempAnalysis: { entire: 50 },
            powerAnalysis: { entire: 280 },
            cadenceAnalysis: { entire: 75 },
            elapsedTime: { seconds: 3600 },
            stoppedTime: 600,
            timeInRed: 320,
          }}
          selectedFields={[
            'Normalized Power',
            'Elevation Gain',
            'Avg Heart Rate',
            'Distance',
            'Elapsed Time',
            'Avg Temperature',
            'Avg Speed',
            'Avg Power',
            'Avg Cadence',
            'Time in Red',
          ]}
        />
      )
      .toJSON()
    expect(json).toMatchSnapshot()
  })
})
