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
  const matches = []
  data.features.forEach(feature => {
    if (
      feature.type &&
      feature.type === 'Feature' &&
      feature.properties &&
      feature.properties.name
    ) {
      const { powers, times } = feature.properties.coordinateProperties
    }
  })
} catch (err) {
  console.error(err)
}
