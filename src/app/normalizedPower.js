const fs = require('fs')
const { gpx } = require('@tmcw/togeojson')
const { DOMParser } = require('@xmldom/xmldom')

try {
  const content = fs.readFileSync(
    './content/posts/mfg-5-2022/Afternoon_Ride.gpx',
    'utf8'
  )
  const gpxData = new DOMParser().parseFromString(content)
  const data = gpx(gpxData)
  const segmentSums = []
  data.features.forEach(feature => {
    if (
      feature.type &&
      feature.type === 'Feature' &&
      feature.properties &&
      feature.properties.name
    ) {
      const { powers } = feature.properties.coordinateProperties
      const cleanPowers = powers.map(p => (p === null ? 0 : p))
      let index = 0
      // powers.map(p => (p === null ? 0 : p))
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
      console.log(Math.pow(average, 1 / 4))
    }
  })

  console.log(data)
} catch (err) {
  console.error(err)
}
