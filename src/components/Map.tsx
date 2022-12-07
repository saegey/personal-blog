// map.js
import { useRef, useEffect, useState } from 'react'
import { Box } from 'theme-ui'
import mapboxgl from 'mapbox-gl'
import 'mapbox-gl/dist/mapbox-gl.css'

const MAPBOX_TOKEN =
  'pk.eyJ1Ijoic2FlZ2V5IiwiYSI6ImNsYmQxaGh1MzBvdHQzcHFnZ3E1YXF6cDUifQ.AUBHKU6jU79FjJn3vM-tfg'

const mapContainerStyle = {
  width: '100%',
  height: '450px',
}

const Map = ({ coordinates }) => {
  const mapContainerRef = useRef(null)

  const [map, setMap] = useState(null)

  useEffect(() => {
    const map = new mapboxgl.Map({
      container: mapContainerRef.current,
      accessToken: MAPBOX_TOKEN,
      style: 'mapbox://styles/mapbox/satellite-streets-v12',
      // Empire State Building [lng, lat]
      center: coordinates[0],
      zoom: 14,
    })

    map.addControl(new mapboxgl.NavigationControl(), 'top-right')

    map.on('load', () => {
      map.addSource('route', {
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
      map.addLayer({
        id: 'route',
        type: 'line',
        source: 'route',
        layout: {
          'line-join': 'round',
          'line-cap': 'round',
        },
        paint: {
          'line-color': '#eee',
          'line-width': 2,
        },
      })
    })

    setMap(map)

    const marker1 = new mapboxgl.Marker({ color: 'black' })
      .setLngLat(coordinates[0])
      .addTo(map)

    // const coordinates = coordinates;

    // Create a 'LngLatBounds' with both corners at the first coordinate.
    const bounds = new mapboxgl.LngLatBounds(coordinates[0], coordinates[0])

    // Extend the 'LngLatBounds' to include every coordinate in the bounds result.
    for (const coord of coordinates) {
      bounds.extend(coord)
    }

    map.fitBounds(bounds, {
      padding: 100,
    })
    map.resize()

    return () => map.remove()
  }, [])

  return (
    <Box
      sx={{ marginY: '20px', width: '100%' }}
      ref={mapContainerRef}
      style={mapContainerStyle}
    />
  )
}

export default Map
