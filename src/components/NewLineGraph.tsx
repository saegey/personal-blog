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
  // render() {
  const themeContext = useThemeUI()
  // const { data, downsampleRate, coordinates, context } = this.props
  const downSampledData = data
    .filter((d, i: number) => i % downsampleRate === 0)
    .map(d => {
      return {
        ...d,
        distance:
          context.unitOfMeasure === 'imperial'
            ? (d.distance * 0.00062137121212121).toFixed(1)
            : (d.distance / 1000).toFixed(1),
        y: context.unitOfMeasure === 'imperial' ? d.y * 3.28084 : Number(d.y),
      }
    })

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
              console.log(e)
              setMarker(null)
              return
            }

            setMarker(e.activePayload[0].payload)
          }}
          margin={{ top: 20, right: 20, bottom: 20, left: 20 }}
        >
          <CartesianGrid stroke={themeContext.theme.colors?.muted} />
          <Tooltip content={<></>} />
          <XAxis
            dataKey="distance"
            allowDecimals={false}
            tickCount={7}
            type={'number'}
            domain={[0, xMax]}
          />
          <YAxis allowDataOverflow />
          <Area
            dataKey="y"
            stroke={themeContext.theme.colors?.text}
            strokeWidth={2}
            fill={themeContext.theme.colors?.text}
            fillOpacity={0.2}
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
