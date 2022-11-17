const fs = require('fs')
const { DOMParser } = require('@xmldom/xmldom')
const { gpx } = require('@tmcw/togeojson')

try {
  const content = fs.readFileSync(
    './content/posts/mfg-5-2022/Afternoon_Ride.gpx',
    'utf8'
  )
  const xmlDoc = new DOMParser().parseFromString(content)
  const gpxData = gpx(xmlDoc)

  console.log(JSON.parse(gpxData.features[0].properties.desc))
} catch (err) {
  console.error(err)
}
