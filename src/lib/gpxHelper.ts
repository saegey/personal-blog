type Coordinate = [number, number, number]
type ProcessedCoordinate = {
  x: number
  y: string
}

export const dateDiff = (dateFrom: Date, dateTo: Date) => {
  let seconds = -1
  if (dateFrom !== undefined && dateTo !== undefined) {
    var dif = dateFrom.getTime() - dateTo.getTime()
    seconds = Math.abs(dif / 1000)
  }

  return {
    seconds: seconds,
    minutes: seconds / 60,
    hours: seconds / 3600,
    days: seconds / (3600 * 24),
  }
}

export const downsampleElevation = (
  coordinates: Coordinate[],
  rate: number
) => {
  const downsampled: ProcessedCoordinate[] = []
  coordinates.forEach((item, index) => {
    if (index % rate === 0 || index === 0) {
      downsampled.push({
        x: index,
        y: Number(item[2]).toFixed(0),
      })
    }
  })

  return downsampled
}

export const calcNormalizedPower = (powers: number[]) => {
  const segmentSums = []
  const cleanPowers = powers.map(p => (p === null ? 0 : p))

  let index = 0
  do {
    segmentSums.push(
      cleanPowers.slice(index, index + 30).reduce((pv, cv) => pv + cv, 0)
    )
    index += 1
  } while (index <= powers.length - 30)

  const segmentTotal = segmentSums
    .map(s => s / 30)
    .map(s => Math.pow(s, 4))
    .reduce((pv, cv) => pv + cv, 0)

  const average = segmentTotal / segmentSums.length
  return Math.pow(average, 1 / 4)
}

export const calcPowerSlices = (powers: number[], length: number) => {
  const powerSums: number[] = []
  for (var i = 0; i < powers.length; i++) {
    powerSums.push(powers.slice(i, i + length).reduce((pv, cv) => pv + cv, 0))
  }
  powerSums.sort(function (a, b) {
    return a - b
  })
  return powerSums
}

export const calcBestPowers = (
  times: number[],
  powers: number[],
  removeZeros = false
): Record<number | string, number> => {
  const filteredVals = removeZeros ? powers.filter(val => val !== 0) : powers

  const sum = filteredVals
    .map(p => (p ? p : 0))
    .reduce((accumulator, value) => {
      return accumulator + value
    }, 0)
  const averagePower = Math.round(sum / filteredVals.length)

  const response: Record<number | string, number> = {}
  response['entire'] = averagePower

  times.forEach(time => {
    if (time > filteredVals.length) return
    response[time] = Math.round(
      calcPowerSlices(filteredVals, time).slice(-1)[0] / time
    )
  })
  return response
}

export const calcElevationGain = (coordinates: Coordinate[]) => {
  let elevation = 0
  coordinates.forEach((coord, index) => {
    if (index === coordinates.length - 1) return // stop 1 point early since comparison requires 2 points
    const elevationDifference = coordinates[index + 1][2] - coord[2]
    if (elevationDifference > 0) elevation += elevationDifference
  })
  return elevation
}

export const calcStoppage = (coordinates: Coordinate[], times: number[]) => {
  let seconds = 0

  times.forEach((time, index) => {
    if (index === coordinates.length - 1 || index === 0) return
    const output = dateDiff(new Date(time), new Date(times[index + 1]))
    if (output.seconds > 1) {
      seconds += output.seconds
    }
  })

  return seconds
}
