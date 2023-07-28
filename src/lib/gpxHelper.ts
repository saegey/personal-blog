import length from '@turf/length'
import { lineString } from '@turf/helpers'

type Coordinate = [number, number, number]
type ProcessedCoordinate = {
  x: number
  y: string
  distance: number
  grade: number
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
  coordinates: Coordinate[]
  // rate: number
) => {
  const downsampled: ProcessedCoordinate[] = []
  let totalDistance = 0
  let distances: Array<number> = []
  let grade = 0

  coordinates.forEach((item, index) => {
    if (index !== coordinates.length - 1) {
      totalDistance += length(
        lineString([
          [coordinates[index][0], coordinates[index][1]],
          [coordinates[index + 1][0], coordinates[index + 1][1]],
        ]),
        { units: 'meters' }
      )
      distances.push(totalDistance)
    }

    if (index > 30) {
      grade =
        (item[2] - coordinates[index - 30][2]) /
        (totalDistance - distances[index - 30])
    }

    downsampled.push({
      x: index,
      y: Number(item[2]).toFixed(0),
      distance: totalDistance,
      grade: !Number.isNaN(grade) && isFinite(grade) ? grade : 0,
    })

    // if (index % rate === 0 || index === 0) {
  })

  return downsampled
}

type PowerZoneBucketProps = {
  zones: Array<{
    powerLow: number
    powerHigh: number
    zone: number
    title: string
  }>
  powers: number[]
}

export const calcPowerZoneBuckets = ({
  zones,
  powers,
}: PowerZoneBucketProps) => {
  const breakdownBuckets: number[] = new Array(zones.length).fill(0)
  powers.forEach(d => {
    for (var i = zones.length - 1; i >= 0; i--) {
      if (d >= zones[i].powerLow && d !== null) {
        breakdownBuckets[i] += 1
        break
      }
    }
  })
  return breakdownBuckets
}

export const calcPowerZones = (ftp: number) => {
  const zonesPercent = [
    { zone: 0, title: 'Not pedaling', powerLow: '0', powerHigh: '0' },
    { zone: 1, title: 'Active Recovery', powerLow: '1', powerHigh: '56' },
    { zone: 2, title: 'Endurance', powerLow: '56', powerHigh: '76' },
    { zone: 3, title: 'Tempo', powerLow: '76', powerHigh: '91' },
    { zone: 4, title: 'Threshold', powerLow: '91', powerHigh: '106' },
    { zone: 5, title: 'VO2max', powerLow: '106', powerHigh: '121' },
    {
      zone: 6,
      title: 'Anaerobic Capacity',
      powerLow: '121',
      powerHigh: null,
    },
  ]
  return zonesPercent.map(z => {
    return {
      ...z,
      powerLow: Math.round((Number(z.powerLow) / 100) * ftp),
      powerHigh: Math.round((Number(z.powerHigh) / 100) * ftp),
    }
  })
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

export const calcPedalBreakdown = (powers: number[]) => {
  const notPedaling = powers.filter(p => p === 0 || p === undefined)
  return {
    notPedaling: (notPedaling.length / powers.length).toFixed(2),
    pedaling: ((powers.length - notPedaling.length) / powers.length).toFixed(2),
  }
}

type timeInRedType = {
  powers: number[]
  ftp: number
}
export const timeInRed = ({ powers, ftp }: timeInRedType) => {
  let secsInRed = 0
  powers.map(p => (p > ftp ? (secsInRed += 1) : ''))
  return secsInRed
}

export const totalWattsOverFtp = ({ powers, ftp }: timeInRedType) => {
  let total = 0
  powers.map(p => (p > ftp ? (total += p - ftp) : ''))
  return total
}

export const calcPowerSlices = (powers: number[], length: number) => {
  const powerSums: number[] = []
  for (var i = 0; i < powers.length; i++) {
    const nums = powers.slice(i, i + length)
    if (nums.length === length) {
      powerSums.push(nums.reduce((pv, cv) => pv + cv, 0))
    }
  }
  powerSums.sort(function (a, b) {
    return a - b
  })
  return powerSums
}

export const calcMatchesBurned = (powers: number[], times: Date[]) => {
  let index = 0
  const matches = []
  do {
    let tempPowerIndex = -1
    const startIndex = index
    const tempPowers = powers.slice(index, powers.length)
    do {
      tempPowerIndex += 1
      index += 1
    } while (tempPowers[tempPowerIndex] > 280)
    if (tempPowerIndex > 2) {
      matches.push({
        startTime: times[startIndex],
        index: startIndex,
        vals: tempPowers.slice(0, tempPowerIndex),
      })
    }
  } while (index < powers.length)

  const formatted = matches.map(m => {
    const totalJoules = m.vals.reduce((partialSum, a) => partialSum + a, 0)
    return {
      totalJoules: totalJoules,
      vals: m.vals,
      averagePower: Number((totalJoules / m.vals.length).toFixed(0)),
      totalTime: m.vals.length,
      index: m.index,
      startTime: m.startTime,
    }
  })

  return formatted.sort((a, b) => b.totalJoules - a.totalJoules).slice(0, 20)
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

export const calcStoppage = (coordinates: Coordinate[], times: Array<Date>) => {
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
