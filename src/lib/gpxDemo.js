// const tj = require("@tmcw/togeojson")
// const fs = require("fs")
// // node doesn't have xml parsing or a dom. use xmldom
// const DOMParser = require("xmldom").DOMParser

// const gpx = new DOMParser().parseFromString(
//   fs.readFileSync("./RPI_Queen_Stage_3_Baked_.gpx", "utf8")
// )

const dateDiff = (dateFrom, dateTo) => {
  let seconds = -1
  if (dateFrom != undefined && dateTo != undefined) {
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

const downsampleElevation = (coordinates, rate) => {
  const downsampled = []
  coordinates.forEach((d, index) => {
    if (index % rate === 0 || index === 0) {
      downsampled.push({ x: index, y: (d[2] * 3.28084).toFixed(0) })
    }
  })

  return downsampled
}

const calcPowerSlices = (powers, length) => {
  const powerSums = []
  for (var i = 0; i < powers.length; i++) {
    powerSums.push(powers.slice(i, i + length).reduce((pv, cv) => pv + cv, 0))
  }
  powerSums.sort(function (a, b) {
    return a - b
  })
  return powerSums
}

const calcBestPowers = (times, powers) => {
  let initialValue = 0
  powers.reduce((previous, p) => {
    const val = p ? p : 0
    initialValue = initialValue + val
  })
  const averagePower = Math.round(initialValue / powers.length)

  const response = {}
  response["entire"] = averagePower

  times.forEach(time => {
    if (time > powers.length) return
    response[time] = Math.round(
      calcPowerSlices(powers, time).slice(-1)[0] / time
    )
  })
  return response
}

const calcElevationGain = coordinates => {
  let elevation = 0
  coordinates.forEach((coord, index) => {
    if (index === coordinates.length - 1) return // stop 1 point early since comparison requires 2 points
    const elevationDifference =
      coordinates[index + 1][2] - coordinates[index][2]
    if (elevationDifference > 0) elevation += elevationDifference
  })
  return elevation
}

const calcStoppage = (coordinates, times) => {
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

exports.calcBestPowers = calcBestPowers
exports.calcElevationGain = calcElevationGain
exports.calcStoppage = calcStoppage
exports.dateDiff = dateDiff
exports.downsampleElevation = downsampleElevation
