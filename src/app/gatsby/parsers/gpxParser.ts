// Handles parsing and node field creation for GPX and octet-stream files
import { parseSegmentsFromXml } from '../../../lib/wkoHelper'
import { gpx } from '@tmcw/togeojson'
import { DOMParser } from '@xmldom/xmldom'
import length from '@turf/length'
import {
  calcBestPowers,
  timeInRed,
  calcElevationGain,
  calcNormalizedPower,
  calcStoppage,
  dateDiff,
  downsampleElevation,
  calcMatchesBurned,
  calcPowerZones,
  calcPowerZoneBuckets,
  totalWattsOverFtp,
} from '../../../lib/gpxHelper'
import { Feature } from 'geojson'

const defaultTimeWindows = [5, 10, 15, 30, 60, 120, 300, 600]

type Point = {
  x: number
  y: number
}

type Geometry = {
  type: string
  coordinates: [[number, number, number]]
}

export async function handleGpxNode({
  node,
  createNodeField,
  loadNodeContent,
}: {
  node: any
  createNodeField: (args: { name: string; node: any; value: any }) => void
  loadNodeContent: (node: any) => Promise<string>
}) {
  if (node.internal.mediaType === 'application/octet-stream') {
    const content = await loadNodeContent(node)
    const xmlDoc = new DOMParser().parseFromString(content, 'text/xml')
    const segments = parseSegmentsFromXml(xmlDoc as unknown as XMLDocument)
    createNodeField({
      name: `segments`,
      node,
      value: segments,
    })
    return
  }

  if (node.internal.mediaType === 'application/gpx+xml') {
    const content = await loadNodeContent(node)
    const gpxData = new DOMParser().parseFromString(content, 'text/xml')
    const data = gpx(gpxData)
    createNodeField({
      name: `distance`,
      node,
      value: length(data),
    })
    if (data.type && data.type === 'FeatureCollection') {
      if (data.features) {
        data.features.forEach((feature: Feature) => {
          if (
            feature.type &&
            feature.type === 'Feature' &&
            feature.properties &&
            feature.properties.name
          ) {
            const { powers, heart, times, atemps, cads } =
              feature.properties.coordinateProperties
            const { coordinates } = feature.geometry as Geometry
            const powerAnalysis =
              powers !== undefined
                ? calcBestPowers(
                    [
                      1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,20,25,30,35,40,45,50,55,60,70,80,90,100,110,120,180,240,300,360,420,480,540,600,660,720,780,840,900,960,1020,1080,1140,1200,1500,1800,2100,2400,2700,3000,3300,3600,4200,4800,5400,6000,6600,7200,7800,8400,9000,9600,10200,10800,12000,13200,14400,15600,16800,18000,19200,20400,21600,powers.length
                    ],
                    powers
                  )
                : null
            const points: Point[] = []
            if (powers !== undefined) {
              Object.keys(powerAnalysis as {}).forEach(key => {
                if (key === 'entire') return
                points.push({
                  x: Number(key),
                  y: powerAnalysis ? powerAnalysis[key] : 0,
                })
              })
            }
            createNodeField({
              name: `powerCurve`,
              node,
              value: points,
            })
            if (feature.properties.desc) {
              const ftp = JSON.parse(feature.properties.desc).ftp
              const zones = calcPowerZones(ftp)
              createNodeField({
                name: `currentFtp`,
                node,
                value: ftp,
              })
              createNodeField({
                name: `powerZones`,
                node,
                value: zones,
              })
              createNodeField({
                name: `timeInRed`,
                node,
                value: timeInRed({ powers, ftp }),
              })
              createNodeField({
                name: `totalWattsOverFtp`,
                node,
                value: totalWattsOverFtp({ powers, ftp }),
              })
              createNodeField({
                name: `powerZoneBuckets`,
                node,
                value: calcPowerZoneBuckets({ zones, powers }),
              })
            }
            createNodeField({
              name: `powerAnalysis`,
              node,
              value:
                powers !== undefined
                  ? calcBestPowers(defaultTimeWindows, powers)
                  : null,
            })
            createNodeField({
              name: `normalizedPower`,
              node,
              value: powers !== undefined ? calcNormalizedPower(powers) : null,
            })
            createNodeField({
              name: `matchesBurned`,
              node,
              value:
                powers !== undefined ? calcMatchesBurned(powers, times) : null,
            })
            createNodeField({
              name: `tempAnalysis`,
              node,
              value: calcBestPowers(defaultTimeWindows, atemps),
            })
            createNodeField({
              name: `heartAnalysis`,
              node,
              value: calcBestPowers(defaultTimeWindows, heart),
            })
            createNodeField({
              name: `cadenceAnalysis`,
              node,
              value:
                cads !== undefined
                  ? calcBestPowers(defaultTimeWindows, cads, true)
                  : null,
            })
            createNodeField({
              name: `elevationGain`,
              node,
              value: calcElevationGain(coordinates),
            })
            createNodeField({
              name: `stoppedTime`,
              node,
              value: calcStoppage(coordinates, times),
            })
            createNodeField({
              name: `times`,
              node,
              value: times,
            })
            createNodeField({
              name: `coordinates`,
              node,
              value: coordinates,
            })
            createNodeField({
              name: `elapsedTime`,
              node,
              value: dateDiff(new Date(times[0]), new Date(times.at(-1))),
            })
            createNodeField({
              name: `elevationData`,
              node,
              value: downsampleElevation(coordinates),
            })
            createNodeField({
              name: `powerData`,
              node,
              value: powers,
            })
            createNodeField({
              name: `heartRateData`,
              node,
              value: heart,
            })
            createNodeField({
              name: `gpx`,
              node,
              value: JSON.stringify(feature),
            })
          }
        })
      }
    }
  }
}
