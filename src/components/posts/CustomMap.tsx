import React from "react";
import { Box } from "theme-ui";
import mapboxgl from "mapbox-gl";
// import 'mapbox-gl/dist/mapbox-gl.css'

// const MAPBOX_TOKEN = `${process.env.GATSBY_MAPBOX_TOKEN}`
interface MapProps {
	coordinates: Array<[number, number]>;
	markerCoordinates: [number, number] | null;
	token: string;
}

const Map = ({
	coordinates,
	markerCoordinates,
	token,
}: MapProps): JSX.Element => {
	const mapContainerRef = React.useRef(null);
	const map = React.useRef<mapboxgl.Map | null>(null);

	React.useEffect(() => {
		if (!map || !map.current) {
			return;
		}
		if (map.current !== undefined) {
			const geojsonSource = map.current.getSource("currentPosition") as mapboxgl.GeoJSONSource | undefined;
			if (!geojsonSource) {
				return;
			}

			geojsonSource.setData({
				type: "FeatureCollection",
				features: [
					{
						type: "Feature",
						properties: { name: "Null Island" },
						geometry: {
							type: "Point",
							coordinates: markerCoordinates || [0, 0],
						},
					},
				],
			});
		}
	});

	React.useEffect((): void => {
		if (map && map.current) return;
		map.current = new mapboxgl.Map({
			container: mapContainerRef.current!,
			accessToken: process.env.MAPBOX_TOKEN ? process.env.MAPBOX_TOKEN : token,
			style: "mapbox://styles/saegey/clkjy1fdl004x01oh25lhe0iz",
			// Empire State Building [lng, lat]
			center: coordinates[0],
			zoom: 14,
			scrollZoom: false,
			boxZoom: false,
			doubleClickZoom: false,
		});

		map.current.addControl(new mapboxgl.NavigationControl(), "top-right");

		map.current.on("load", () => {
			if (!map.current) return;
			map.current.addSource("route", {
				type: "geojson",
				data: {
					type: "Feature",
					properties: {},
					geometry: {
						type: "LineString",
						coordinates,
					},
				},
			});
			map.current.addSource("currentPosition", {
				type: "geojson",
				data: {
					type: "FeatureCollection",
					features: [],
				},
			});
			map.current.addLayer({
				id: "route",
				type: "line",
				source: "route",
				layout: {
					"line-join": "round",
					"line-cap": "round",
				},
				paint: {
					"line-color": "red",
					"line-width": 2,
				},
			});
			map.current.addLayer({
				id: "currentPosition",
				type: "circle",
				source: "currentPosition",
				layout: {
					visibility: "visible",
				},
				paint: {
					"circle-radius": 6,
					"circle-color": "black",
					"circle-stroke-color": "white",
					"circle-stroke-width": 2,
				},
			});
		});

		// Create a 'LngLatBounds' with both corners at the first coordinate.
		const bounds = new mapboxgl.LngLatBounds(coordinates[0], coordinates[0]);

		// Extend the 'LngLatBounds' to include every coordinate in the bounds result.
		// for (const coord of coordinates) {
		// 	bounds.extend(coord);
		// }

		coordinates.map((coord) => bounds.extend(coord))

		map.current.fitBounds(bounds, {
			padding: 50,
		});
		map.current.resize();

		// return () => map.current.remove();
	}, []);

	return (
		<Box
			ref={mapContainerRef}
			sx={{ width: "100%", height: ["300px", "450px", "450px"] }}
		/>
	);
};

export default Map;
