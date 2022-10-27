/** @jsxImportSource theme-ui */

import React from "react"

import ThemeContext from "../context/ThemeContext"
import RaceStats from "../components/RaceStats.js"

const RaceOverview = ({ data, selectedFields = [] }) => {
  return (
    <ThemeContext.Consumer>
      {theme => {
        const {
          elevationGain,
          distance,
          heartAnalysis,
          elapsedTime,
          tempAnalysis,
          stoppedTime,
          powerAnalysis,
          cadenceAnalysis,
        } = data

        const items = [
          {
            title: "Elevation Gain",
            value:
              theme.unitOfMeasure === "metric"
                ? `${elevationGain.toFixed(0)} meters`
                : `${(elevationGain * 3.280839895).toLocaleString(undefined, {
                    minimumFractionDigits: 0,
                    maximumFractionDigits: 0,
                  })} ft`,
          },
          {
            title: "Avg Heart Rate",
            value: `${heartAnalysis.entire} bpm`,
          },
          {
            title: "Distance",
            value:
              theme.unitOfMeasure === "metric"
                ? `${distance.toFixed(2)} km`
                : `${(distance * 0.621371).toFixed()} miles`,
          },
          {
            title: "Elapsed Time",
            value: `${new Date(elapsedTime.seconds * 1000)
              .toISOString()
              .substr(11, 8)}`,
          },
          {
            title: "Avg Temperature",
            value:
              theme.unitOfMeasure === "metric"
                ? `${tempAnalysis.entire} °C`
                : `${tempAnalysis.entire * (9 / 5) + 32} °F`,
          },
          {
            title: "Avg Speed",
            value:
              theme.unitOfMeasure === "metric"
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
            title: "Avg Power",
            value: `${powerAnalysis.entire} watts`,
          },
          {
            title: "Time Stopped",
            value: new Date(stoppedTime * 1000).toISOString().substr(11, 8),
          },
          {
            title: "Avg Cadence",
            value: `${cadenceAnalysis.entire} rpm`,
          },
        ]

        return (
          <RaceStats
            items={items.filter(activity =>
              selectedFields.includes(activity.title)
            )}
          />
        )
      }}
    </ThemeContext.Consumer>
  )
}

export default RaceOverview
