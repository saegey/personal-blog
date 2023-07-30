import ThemeContext from '../context/ThemeContext'
import RaceStats from './RaceStats'
import { Text, Box } from 'theme-ui'

type Props = {
  data: {
    elevationGain: number
    distance: number
    normalizedPower: number
    heartAnalysis: {
      entire: number
    }
    tempAnalysis: {
      entire: number
    }
    powerAnalysis: {
      entire: number
    }
    cadenceAnalysis: {
      entire: number
    }
    elapsedTime: {
      seconds: number
    }
    stoppedTime: number
    timeInRed: number
  }
  selectedFields: string[]
}

const RaceOverview: React.FC<Props> = ({ data, selectedFields = [] }) => {
  return (
    <ThemeContext.Consumer>
      {theme => {
        const {
          normalizedPower,
          elevationGain,
          distance,
          heartAnalysis,
          elapsedTime,
          tempAnalysis,
          stoppedTime,
          powerAnalysis,
          cadenceAnalysis,
          timeInRed,
        } = data

        const items = [
          {
            title: 'Normalized Power',
            value: `${normalizedPower ? normalizedPower.toFixed() : ''} watts`,
          },
          {
            title: 'Elevation Gain',
            value:
              theme.unitOfMeasure === 'metric'
                ? `${elevationGain.toFixed(0)} meters`
                : `${(elevationGain * 3.280839895).toLocaleString(undefined, {
                    minimumFractionDigits: 0,
                    maximumFractionDigits: 0,
                  })} ft`,
          },
          {
            title: 'Avg Heart Rate',
            value: `${heartAnalysis.entire} bpm`,
          },
          {
            title: 'Distance',
            value:
              theme.unitOfMeasure === 'metric'
                ? `${distance.toFixed(2)} km`
                : `${(distance * 0.621371).toFixed()} miles`,
          },
          {
            title: 'Elapsed Time',
            value: `${new Date(elapsedTime.seconds * 1000)
              .toISOString()
              .substr(11, 8)}`,
          },
          {
            title: 'Moving Time',
            value: `${new Date((elapsedTime.seconds - stoppedTime) * 1000)
              .toISOString()
              .substr(11, 8)}`,
          },
          {
            title: 'Avg Temperature',
            value:
              theme.unitOfMeasure === 'metric'
                ? `${tempAnalysis.entire.toFixed()} °C`
                : `${(tempAnalysis.entire * (9 / 5) + 32).toFixed()} °F`,
          },
          {
            title: 'Avg Speed',
            value:
              theme.unitOfMeasure === 'metric'
                ? `${(
                    ((distance * 1000) / (elapsedTime.seconds - stoppedTime)) *
                    3.6
                  ).toFixed(2)} km/h`
                : `${(
                    (distance / (elapsedTime.seconds - stoppedTime)) *
                    2236.9362920544
                  ).toFixed(2)} mph`,
          },
          {
            title: 'Avg Power',
            value: powerAnalysis ? `${powerAnalysis.entire} watts` : 'N/A',
          },
          {
            title: 'Time Stopped',
            value: new Date(stoppedTime * 1000).toISOString().substr(11, 8),
          },
          {
            title: 'Avg Cadence',
            value: cadenceAnalysis ? `${cadenceAnalysis.entire} rpm` : 'N/A',
          },
          {
            title: 'Time in Red',
            value: `${new Date(timeInRed * 1000).toISOString().substr(11, 8)}`,
          },
        ]

        return (
          <Box
            sx={{
              maxWidth: '690px',
              marginLeft: 'auto',
              marginRight: 'auto',
              background: 'muted',
              padding: '20px',
              borderRadius: '5px',
            }}
          >
            <Box sx={{ marginBottom: '10px' }}>
              <Text as="h2" variant="resultsHeading">
                Key Metrics
              </Text>
            </Box>
            <RaceStats
              items={items.filter(activity =>
                selectedFields.includes(activity.title)
              )}
            />
          </Box>
        )
      }}
    </ThemeContext.Consumer>
  )
}

export default RaceOverview
