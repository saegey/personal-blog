const fs = require("fs")
const tj = require("@tmcw/togeojson")
const DOMParser = require("xmldom").DOMParser

const { calcBestPowers, calcElevationGain } = require("../lib/gpxDemo")

const gpx = new DOMParser().parseFromString(
  fs.readFileSync(
    "./src/posts/bwr-san-diego-2022/BWR_San_Diego_Waffle_Ride_.gpx",
    "utf8"
  )
)

const data = tj.gpx(gpx)

const { cads } = data.features[0].properties.coordinateProperties

// console.log(calcBestPowers([5, 10, 15, 30, 60, 120, 300, 600], cads, true))

console.log(calcElevationGain(data.features[0].geometry.coordinates))
