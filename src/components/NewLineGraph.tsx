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

const NewLineGraph = ({ data, downsampleRate, context, setMarker, elevationToAdd = 0 }) => {
  const themeContext = useThemeUI()
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

  const xMax = Number(downSampledData[downSampledData.length - 1].distance)
  // const yMax = Math.floor(Number(downSampledData[downSampledData.length - 1].y))
  // console.log('xMax', yMax, elevationToAdd)
  // const timeMax = Math.floor(
  //   Number(downSampledData[downSampledData.length - 1].x)
  // )

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
          <defs>
            <linearGradient id="splitColor" x1="0" y1="0" x2="1" y2="0">
              {downSampledData.map((d, i) => {
                const grade = d.grade * 100
                if (grade > 0 && grade < 4) {
                  // console.log(d.distance / xMax)
                  return (
                    <stop
                      offset={d.distance / xMax}
                      stopColor="green"
                      stopOpacity={1}
                    />
                  )
                }
                if (grade >= 4 && grade < 7) {
                  return (
                    <stop
                      offset={d.distance / xMax}
                      stopColor="orange"
                      stopOpacity={1}
                    />
                  )
                }
                if (grade <= 0) {
                  return (
                    <stop
                      offset={d.distance / xMax}
                      stopColor="#D3D3D3"
                      stopOpacity={1}
                    />
                  )
                }
                if (grade >= 7) {
                  return (
                    <stop
                      offset={d.distance / xMax}
                      stopColor="red"
                      stopOpacity={1}
                    />
                  )
                }
              })}
            </linearGradient>
          </defs>
          <XAxis
            dataKey="distance"
            // allowDecimals={false}
            tickCount={7}
            type={'number'}
            domain={[0, xMax]}
          />
          {/* <YAxis /> */}
          {/* <YAxis type="number" domain={[0, yMax + 1000]} /> */}
          <YAxis type="number" domain={[0, `dataMax + ${elevationToAdd}`]} />
          <Area
            type="basisOpen"
            dataKey="y"
            stroke="url(#splitColor)"
            strokeWidth={3}
            fill="gray"
            fillOpacity={0.1}
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
