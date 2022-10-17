// const tj = require("@tmcw/togeojson")
// const fs = require("fs")
// // node doesn't have xml parsing or a dom. use xmldom
// const DOMParser = require("xmldom").DOMParser

// const gpx = new DOMParser().parseFromString(
//   fs.readFileSync("./RPI_Queen_Stage_3_Baked_.gpx", "utf8")
// )

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
    // console.log(p)
    const val = p ? p : 0
    initialValue = initialValue + val
  })
  const averagePower = Math.round(initialValue / powers.length)
  // const averagePower = Math.round(initialValue / powers.length)

  // console.log(initialValue)
  // console.log(`total values: ${powers.length}`)
  // console.log(`Average Power: ${averagePower}`)
  const response = {}
  response["entire"] = averagePower

  times.forEach(time => {
    response[time] = Math.round(
      calcPowerSlices(powers, time).slice(-1)[0] / time
    )
  })
  return response
}

export default calcBestPowers
