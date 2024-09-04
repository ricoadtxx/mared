import { useEffect, useRef } from "react";
import ReactDOM from "react-dom/client";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import MapboxGeocoder from "@mapbox/mapbox-gl-geocoder";
import "@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css";

const MapSekolah = () => {
	const mapContainerRef = useRef<HTMLDivElement>(null);
	const mapRef = useRef<mapboxgl.Map | null>(null);
	const previousPitch = useRef<number>(75);
	const previousBearing = useRef<number>(-40.6);
	const popupRef = useRef<mapboxgl.Popup | null>(null);
	const markerRef = useRef<mapboxgl.Marker | null>(null);

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
									"fill-extrusion-opacity": 1,
								},
							},
							labelLayerId
						);
					}
				}
			});

			if (mapRef.current) {
				const geocoder = new MapboxGeocoder({
					accessToken: mapboxgl.accessToken,
					placeholder: "Search for places",
					mapboxgl: mapboxgl,
				});
				mapRef.current.addControl(geocoder);

				geocoder.on("result", (event: any) => {
					const coordinates = event.result.geometry.coordinates;

					mapRef.current?.flyTo({
						center: coordinates,
						zoom: 18,
						speed: 0.8,
						curve: 1,
						pitch: previousPitch.current,
						bearing: previousBearing.current,
					});

					if (popupRef.current) {
						popupRef.current.getElement()?.classList.add("popup-fade-out");

						setTimeout(() => {
							if (popupRef.current) {
								popupRef.current.remove();
								popupRef.current = null;
							}
						}, 300);
					}

					if (markerRef.current) {
						markerRef.current.remove();
						markerRef.current = null;
					}

					mapRef.current?.once("moveend", () => {
						const marker = new mapboxgl.Marker()
							.setLngLat(coordinates)
							.addTo(mapRef.current!);
						const popupContent = (
							<>
								<button
									className="custom-close-btn"
									onClick={() => {
										if (popupRef.current) {
											popupRef.current
												.getElement()
												?.classList.add("popup-fade-out");
											setTimeout(() => {
												if (popupRef.current) {
													popupRef.current.remove();
													popupRef.current = null;
												}
											}, 300);
										}
									}}
								>
									&times;
								</button>
								<h3 className="text-lg font-bold">School Information</h3>
								<p className="text-sm">Name: {event.result.text}</p>
								<p className="text-sm">Address: {event.result.place_name}</p>
							</>
						);

						const popupContainer = document.createElement("div");
						const root = ReactDOM.createRoot(popupContainer);
						root.render(popupContent);

						popupRef.current = new mapboxgl.Popup({
							closeButton: false,
							closeOnClick: false,
							className: "popup-3d",
							offset: 25,
						})
							.setLngLat(coordinates)
							.setDOMContent(popupContainer)
							.addTo(mapRef.current!);

						marker.getElement().addEventListener("click", () => {
							if (popupRef.current) {
								popupRef.current.getElement()?.classList.add("popup-fade-out");
								setTimeout(() => {
									if (popupRef.current) {
										popupRef.current.remove();
										popupRef.current = null;
									}
								}, 300);
							} else {
								popupRef.current = new mapboxgl.Popup({
									closeButton: false,
									closeOnClick: false,
									className: "popup-3d",
									offset: 25,
								})
									.setLngLat(coordinates)
									.setDOMContent(popupContainer)
									.addTo(mapRef.current!);
							}
						});

						markerRef.current = marker;
					});
				});
			}
		}

		return () => {
			if (mapRef.current) {
				mapRef.current.remove();
				mapRef.current = null;
			}
		};
	}, []);

	return <div ref={mapContainerRef} className="h-full w-full" />;
};

export default MapSekolah;
