import { Component } from 'react'
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
} from 'recharts'
import { Box, useThemeUI } from 'theme-ui'

import ThemeContext from '../context/ThemeContext'

const NewLineGraph = ({
  data,
  downsampleRate,
  coordinates,
  context,
  setMarker,
}) => {
  const themeContext = useThemeUI()
  const downSampledData = data
    .filter((d, i: number) => i % downsampleRate === 0)
    .map(d => {
      const grade = d.grade * 100
      // if (d.x === 240) {
      // console.log(d, grade >= 0.0, grade < 0.0)
      // }
      // console.log(grade)
      if (grade > 0.0 && grade < 4) {
        return {
          ...d,
          distance:
            context.unitOfMeasure === 'imperial'
              ? (d.distance * 0.00062137121212121).toFixed(1)
              : (d.distance / 1000).toFixed(1),
          y: context.unitOfMeasure === 'imperial' ? d.y * 3.28084 : Number(d.y),
          green:
            context.unitOfMeasure === 'imperial' ? d.y * 3.28084 : Number(d.y),
        }
      } else if (grade >= 4.0 && grade < 7.0) {
        return {
          ...d,
          distance:
            context.unitOfMeasure === 'imperial'
              ? (d.distance * 0.00062137121212121).toFixed(1)
              : (d.distance / 1000).toFixed(1),
          y: context.unitOfMeasure === 'imperial' ? d.y * 3.28084 : Number(d.y),
          orange:
            context.unitOfMeasure === 'imperial' ? d.y * 3.28084 : Number(d.y),
        }
      } else if (grade <= 0.0) {
        return {
          ...d,
          distance:
            context.unitOfMeasure === 'imperial'
              ? (d.distance * 0.00062137121212121).toFixed(1)
              : (d.distance / 1000).toFixed(1),
          y: context.unitOfMeasure === 'imperial' ? d.y * 3.28084 : Number(d.y),
          gray:
            context.unitOfMeasure === 'imperial' ? d.y * 3.28084 : Number(d.y),
        }
      } else if (grade >= 7.0) {
        return {
          ...d,
          distance:
            context.unitOfMeasure === 'imperial'
              ? (d.distance * 0.00062137121212121).toFixed(1)
              : (d.distance / 1000).toFixed(1),
          y: context.unitOfMeasure === 'imperial' ? d.y * 3.28084 : Number(d.y),
          red:
            context.unitOfMeasure === 'imperial' ? d.y * 3.28084 : Number(d.y),
        }
      }
    })

  // console.log(downSampledData)

  const xMax = Math.floor(
    Number(downSampledData[downSampledData.length - 1].distance)
  )

  return (
    <Box
      sx={{
        width: '100%',
        height: '300px',
        borderColor: 'mutedAccent',
        borderStyle: 'solid',
        borderWidth: '1px',
      }}
    >
      <ResponsiveContainer width={'100%'} height="100%">
        <AreaChart
          data={downSampledData}
          onMouseMove={e => {
            if (!e || !e.activePayload) {
              setMarker(null)
              return
            }
            // console.log(e)

            setMarker(e.activePayload[0].payload)
          }}
          margin={{ top: 20, right: 20, bottom: 20, left: 20 }}
        >
          <CartesianGrid stroke={themeContext.theme.colors?.muted} />
          <Tooltip content={<></>} />
           <Area
            // connectNulls
            dataKey="y"
            stroke={themeContext.theme.colors?.text}
            strokeWidth={2}
            fill={'gray'}
            fillOpacity={.1}
            dot={false}
          />
          <XAxis
            dataKey="distance"
            allowDecimals={false}
            tickCount={7}
            type={'number'}
            domain={[0, xMax]}
          />
          <YAxis allowDataOverflow />
          <Area
            dataKey="green"
            stroke={themeContext.theme.colors?.text}
            strokeWidth={2}
            fill={'green'}
            fillOpacity={1}
            dot={false}
          />
          <Area
            dataKey="orange"
            stroke={themeContext.theme.colors?.text}
            strokeWidth={2}
            fill={'orange'}
            fillOpacity={1}
            dot={false}
          />
          <Area
            dataKey="red"
            stroke={themeContext.theme.colors?.text}
            strokeWidth={2}
            fill={'red'}
            fillOpacity={1}
            dot={false}
          />
        </AreaChart>
      </ResponsiveContainer>
    </Box>
  )
}

const NewLineGraphWrapper = props => {
  return (
    <ThemeContext.Consumer>
      {context => <NewLineGraph context={context} {...props} />}
    </ThemeContext.Consumer>
  )
}

export default NewLineGraphWrapper
