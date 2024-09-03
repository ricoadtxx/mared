import React, { useEffect, useRef } from "react";
import mapboxgl from "mapbox-gl";

import "mapbox-gl/dist/mapbox-gl.css";

const Map3D = () => {
	const mapContainerRef: any = useRef();
	const mapRef: any = useRef();
	const rotateAnimationRef: any = useRef();

	useEffect(() => {
		mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_API_KEY as string;

		mapRef.current = new mapboxgl.Map({
			style: "mapbox://styles/mapbox/streets-v12",
			center: [106.82714821674968, -6.175291011452824],
			zoom: 15.6,
			pitch: 75,
			bearing: -40.6,
			container: "map",
			antialias: true,
		});

		mapRef.current.on("style.load", () => {
			const layers = mapRef.current.getStyle().layers;
			const labelLayerId = layers.find(
				(layer: any) => layer.type === "symbol" && layer.layout["text-field"]
			).id;

			mapRef.current.addLayer(
				{
					id: "add-3d-buildings",
					source: "composite",
					"source-layer": "building",
					filter: ["==", "extrude", "true"],
					type: "fill-extrusion",
					minzoom: 15,
					paint: {
						"fill-extrusion-color": "#aaa",
						"fill-extrusion-height": [
							"interpolate",
							["linear"],
							["zoom"],
							15,
							0,
							15.05,
							["get", "height"],
						],
						"fill-extrusion-base": [
							"interpolate",
							["linear"],
							["zoom"],
							15,
							0,
							15.05,
							["get", "min_height"],
						],
						"fill-extrusion-opacity": 0.6,
					},
				},
				labelLayerId
			);

			const rotateCamera = (timestamp: number) => {
				mapRef.current.rotateTo((timestamp / 1000) % 360, { duration: 0 });

				rotateAnimationRef.current = requestAnimationFrame(rotateCamera);
			};

			rotateAnimationRef.current = requestAnimationFrame(rotateCamera);
		});

		return () => {
			if (rotateAnimationRef.current) {
				cancelAnimationFrame(rotateAnimationRef.current);
			}
			mapRef.current.remove();
		};
	}, []);

	return <div id="map" ref={mapContainerRef} style={{ height: "100%" }}></div>;
};

export default Map3D;
