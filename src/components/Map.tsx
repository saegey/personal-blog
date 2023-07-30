// map.js
import { useRef, useEffect, useState } from 'react'
import { Box } from 'theme-ui'
import mapboxgl from 'mapbox-gl'
import 'mapbox-gl/dist/mapbox-gl.css'

const MAPBOX_TOKEN = `${process.env.GATSBY_MAPBOX_TOKEN}`

const Map = ({ coordinates, markerCoordinates }) => {
  const mapContainerRef = useRef(null)
  const map = useRef(null)
  // const marker = useRef(null)

  useEffect(() => {
    if (!map || !map.current) {
      return
    }
    if (map.current !== undefined) {
      // console.log(map.current)
      const geojsonSource = map.current.getSource('currentPosition')
      if (!geojsonSource) {
        return
      }
      // if (!markerCoordinates) {
      //   geojsonSource
      // }
      // Update the data after the GeoJSON source was created
      geojsonSource.setData({
        type: 'FeatureCollection',
        features: [
          {
            type: 'Feature',
            properties: { name: 'Null Island' },
            geometry: {
              type: 'Point',
              coordinates: markerCoordinates ? markerCoordinates : [0, 0],
            },
          },
        ],
      })
    }
  })

  useEffect(() => {
    if (map && map.current) return
    // console.log('redraw map', map.current)
    map.current = new mapboxgl.Map({
      container: mapContainerRef.current,
      accessToken: MAPBOX_TOKEN,
      style: 'mapbox://styles/saegey/clkjy1fdl004x01oh25lhe0iz',
      // Empire State Building [lng, lat]
      center: coordinates[0],
      zoom: 14,
      scrollZoom: false,
      boxZoom: false,
      doubleClickZoom: false,
    })

    map.current.addControl(new mapboxgl.NavigationControl(), 'top-right')

    map.current.on('load', () => {
      map.current.addSource('route', {
        type: 'geojson',
        data: {
          type: 'Feature',
          properties: {},
          geometry: {
            type: 'LineString',
            coordinates: coordinates,
          },
        },
      })
      map.current.addSource('currentPosition', {
        type: 'geojson',
        data: {
          type: 'FeatureCollection',
          features: [],
        },
      })
      map.current.addLayer({
        id: 'route',
        type: 'line',
        source: 'route',
        layout: {
          'line-join': 'round',
          'line-cap': 'round',
        },
        paint: {
          'line-color': 'red',
          'line-width': 2,
        },
      })
      map.current.addLayer({
        id: 'currentPosition',
        type: 'circle',
        source: 'currentPosition',
        layout: {
          visibility: 'visible',
        },
        paint: {
          'circle-radius': 6,
          'circle-color': 'black',
          'circle-stroke-color': 'white',
          'circle-stroke-width': 2,
        },
      })
    })

    // Create a 'LngLatBounds' with both corners at the first coordinate.
    const bounds = new mapboxgl.LngLatBounds(coordinates[0], coordinates[0])

    // Extend the 'LngLatBounds' to include every coordinate in the bounds result.
    for (const coord of coordinates) {
      bounds.extend(coord)
    }

    map.current.fitBounds(bounds, {
      padding: 50,
    })
    map.current.resize()

    return () => map.current.remove()
  }, [])

  return (
    <Box
      sx={{ width: '100%' }}
      ref={mapContainerRef}
      sx={{ width: '100%', height: ['300px', '450px', '450px'] }}
    />
  )
}

export default Map
