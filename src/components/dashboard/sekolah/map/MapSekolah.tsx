"use client";

import React, { useEffect, useRef } from "react";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import MapboxGeocoder from "@mapbox/mapbox-gl-geocoder";
import "@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css";

const MapSekolah = () => {
	const mapContainerRef = useRef<HTMLDivElement>(null);
	const mapRef = useRef<mapboxgl.Map | null>(null);
	const previousPitch = useRef<number>(75);
	const previousBearing = useRef<number>(-40.6);

	useEffect(() => {
		mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_API_KEY as string;

		if (mapContainerRef.current && !mapRef.current) {
			mapRef.current = new mapboxgl.Map({
				container: mapContainerRef.current,
				style: "mapbox://styles/mapbox/streets-v12",
				center: [106.82714821674968, -6.175291011452824],
				zoom: 15.6,
				pitch: previousPitch.current,
				bearing: previousBearing.current,
				antialias: true,
			});

			mapRef.current.on("style.load", () => {
				const layers = mapRef.current?.getStyle().layers;
				if (layers) {
					const labelLayerId = layers.find(
						(layer) => layer.type === "symbol" && layer.layout?.["text-field"]
					)?.id;

					if (labelLayerId) {
						mapRef.current?.addLayer(
							{
								id: "add-3d-buildings",
								source: "composite",
								"source-layer": "building",
								filter: ["==", "extrude", "true"],
								type: "fill-extrusion",
								minzoom: 15,
								paint: {
									"fill-extrusion-color": "#fff",
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
									"fill-extrusion-opacity": 1,
								},
							},
							labelLayerId
						);
					}
				}
			});

			if (mapRef.current) {
				const geolocateControl = new mapboxgl.GeolocateControl({
					positionOptions: {
						enableHighAccuracy: true,
					},
					trackUserLocation: true,
					showUserHeading: true,
				});

				mapRef.current.addControl(geolocateControl);

				mapRef.current.on("geolocate", (event) => {
					if (mapRef.current) {
						const { longitude, latitude } = event.coords;
						mapRef.current.setCenter([longitude, latitude]);
						mapRef.current.setZoom(15);
						mapRef.current.setPitch(previousPitch.current);
						mapRef.current.setBearing(previousBearing.current);
					}
				});
				const geocoder = new MapboxGeocoder({
					accessToken: mapboxgl.accessToken,
					placeholder: "Search for places",
					mapboxgl: mapboxgl,
				});
				mapRef.current.addControl(geocoder);
				geocoder.on("result", (event: any) => {
					console.log("Selected place:", event.result);
				});
			}
		}

		// Cleanup function
		return () => {
			if (mapRef.current) {
				mapRef.current.remove();
				mapRef.current = null;
			}
		};
	}, []);

	return (
		<div ref={mapContainerRef} style={{ height: "100%", width: "100%" }} />
	);
};

export default MapSekolah;
