import React from 'react'
import mapboxgl from 'mapbox-gl'

interface MapProps {
  coordinates: Array<[number, number]>
  markerCoordinates: [number, number] | null
  token: string
}

const Map = ({
  coordinates,
  markerCoordinates,
  token,
}: MapProps): JSX.Element => {
  const mapContainerRef = React.useRef(null)
  const map = React.useRef<mapboxgl.Map | null>(null)

  React.useEffect(() => {
    if (!map.current) {
      return
    }
    const geojsonSource = map.current.getSource('currentPosition') as mapboxgl.GeoJSONSource | undefined
    if (!geojsonSource) return

    geojsonSource.setData({
      type: 'FeatureCollection',
      features: markerCoordinates ? [
        {
          type: 'Feature',
          properties: {},
          geometry: {
            type: 'Point',
            coordinates: markerCoordinates,
          },
        },
      ] : [],
    })
  }, [markerCoordinates])

  React.useEffect(() => {
    if (map.current || !coordinates.length) return
    map.current = new mapboxgl.Map({
      container: mapContainerRef.current!,
      accessToken: token,
      style: 'mapbox://styles/saegey/clkjy1fdl004x01oh25lhe0iz',
      center: coordinates[0],
      zoom: 14,
      scrollZoom: false,
      boxZoom: false,
      doubleClickZoom: false,
    })

    map.current.addControl(new mapboxgl.NavigationControl(), 'top-right')

    map.current.on('load', () => {
      if (!map.current) return
      map.current.addSource('route', {
        type: 'geojson',
        data: {
          type: 'Feature',
          properties: {},
          geometry: {
            type: 'LineString',
            coordinates,
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
          'line-color': '#141414',
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

    const bounds = new mapboxgl.LngLatBounds(coordinates[0], coordinates[0])

    coordinates.forEach(coord => bounds.extend(coord))

    map.current.fitBounds(bounds, {
      padding: 50,
    })
    map.current.resize()

    return () => {
      map.current?.remove()
      map.current = null
    }
  }, [coordinates, token])

  return <div ref={mapContainerRef} className="h-72 border border-line sm:h-[28rem]" />
}

export default Map
