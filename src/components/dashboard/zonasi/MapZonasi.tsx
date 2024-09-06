import { useEffect, useRef, useState } from "react";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import { TfiLayoutGrid2Alt } from "react-icons/tfi";
import { FaExpandArrowsAlt } from "react-icons/fa";
import ReactDOM from "react-dom/client";

const getRandomColor = () => {
	const letters = "0123456789ABCDEF";
	let color = "#";
	for (let i = 0; i < 6; i++) {
		color += letters[Math.floor(Math.random() * 16)];
	}
	return color;
};

const MapZonasi = () => {
	const mapContainerRef = useRef<HTMLDivElement>(null);
	const mapRef = useRef<mapboxgl.Map | null>(null);
	const popupRef = useRef<mapboxgl.Popup | null>(null); // Tambahkan ini
	const [lng, setLng] = useState(106.82714821674968);
	const [lat, setLat] = useState(-6.175291011452824);
	const [zoom, setZoom] = useState(9);
	const [showPolygons, setShowPolygons] = useState(true);
	const [legendVisible, setLegendVisible] = useState(true);
	const [polygonData, setPolygonData] = useState<any>(null);
	const [colorMap, setColorMap] = useState<{ [key: string]: string }>({});
	const [visibilityMap, setVisibilityMap] = useState<{
		[key: string]: boolean;
	}>({});

	useEffect(() => {
		mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_API_KEY as string;

		if (mapRef.current) return;

		mapRef.current = new mapboxgl.Map({
			container: mapContainerRef.current!,
			style: "mapbox://styles/mapbox/outdoors-v12",
			center: [lng, lat],
			zoom: zoom,
		});

		const geolocate = new mapboxgl.GeolocateControl({
			positionOptions: {
				enableHighAccuracy: true,
			},
			trackUserLocation: true,
		});
		mapRef.current.addControl(geolocate, "top-left");

		geolocate.on("geolocate", (position: any) => {
			const { latitude, longitude } = position.coords;
			setLng(longitude);
			setLat(latitude);

			console.log(`Latitude: ${latitude}, Longitude: ${longitude}`);
		});

		const fetchData = async () => {
			try {
				const response = await fetch("/api/batas");
				const data = await response.json();
				setPolygonData(data);

				const newColorMap: { [key: string]: string } = {};
				const newVisibilityMap: { [key: string]: boolean } = {};
				data.forEach((item: any) => {
					const color = getRandomColor();
					newColorMap[item.nama_kota] = color;
					newVisibilityMap[item.nama_kota] = true;
				});
				setColorMap(newColorMap);
				setVisibilityMap(newVisibilityMap);

				if (mapRef.current) {
					if (mapRef.current.getSource("polygons")) {
						mapRef.current.removeLayer("polygons");
						mapRef.current.removeSource("polygons");
					}

					mapRef.current.addSource("polygons", {
						type: "geojson",
						data: {
							type: "FeatureCollection",
							features: data.map((item: any) => ({
								type: "Feature",
								geometry: item.koordinat,
								properties: {
									title: item.nama_kota,
									description: item.provinsi,
									color: newColorMap[item.nama_kota],
								},
							})),
						},
					});

					mapRef.current.addLayer({
						id: "polygons",
						type: "fill",
						source: "polygons",
						paint: {
							"fill-color": ["get", "color"],
							"fill-opacity": 1,
						},
					});
				}
			} catch (error) {
				console.error("Error fetching data:", error);
			}
		};

		fetchData();

		mapRef.current.on("style.load", () => {
			const updateLayerVisibility = () => {
				if (mapRef.current) {
					if (mapRef.current.getLayer("polygons")) {
						mapRef.current.setLayoutProperty(
							"polygons",
							"visibility",
							showPolygons ? "visible" : "none"
						);
					}
				}
			};

			updateLayerVisibility();
		});

		mapRef.current?.on("click", "polygons", (e) => {
			const features = e.features as mapboxgl.MapboxGeoJSONFeature[];
			const feature = features[0];

			if (feature) {
				const { title, description } = feature.properties!;
				const coordinates = e.lngLat;

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
						<h3 className="text-sm text-center font-bold">{title}</h3>
						<p className="text-sm text-center">Provinsi: {description}</p>
					</>
				);

				const popupContainer = document.createElement("div");
				const root = ReactDOM.createRoot(popupContainer);
				root.render(popupContent);

				if (popupRef.current) {
					popupRef.current.remove();
				}

				popupRef.current = new mapboxgl.Popup({
					closeButton: false,
					closeOnClick: false,
					className: "popup",
					offset: 25,
				})
					.setLngLat(coordinates)
					.setDOMContent(popupContainer)
					.addTo(mapRef.current!);
			}
		});

		mapRef.current.on("mouseenter", "polygons", () => {
			mapRef.current!.getCanvas().style.cursor = "pointer";
		});

		mapRef.current.on("mouseleave", "polygons", () => {
			mapRef.current!.getCanvas().style.cursor = "";
		});
	}, [lng, lat, zoom, showPolygons]);

	useEffect(() => {
		if (mapRef.current) {
			const visibleFeatures = polygonData
				? polygonData.filter((item: any) => visibilityMap[item.nama_kota])
				: [];

			if (mapRef.current.getSource("polygons")) {
				(
					mapRef.current.getSource("polygons") as mapboxgl.GeoJSONSource
				).setData({
					type: "FeatureCollection",
					features: visibleFeatures.map((item: any) => ({
						type: "Feature",
						geometry: item.koordinat,
						properties: {
							title: item.nama_kota,
							description: item.provinsi,
							color: colorMap[item.nama_kota],
						},
					})),
				});
			}
		}
	}, [visibilityMap, polygonData, colorMap]);

	const handleCheckboxChange = (namaKota: string) => {
		setVisibilityMap((prev) => ({
			...prev,
			[namaKota]: !prev[namaKota],
		}));
	};

	return (
		<div className="relative pl-2 md:pl-0 w-full h-full">
			<div ref={mapContainerRef} className="w-full h-full" />
			{legendVisible ? (
				<div
					className="absolute top-12 left-6 md:left-4 cursor-pointer text-xl z-10"
					onClick={() => setLegendVisible(false)}
				>
					<FaExpandArrowsAlt />
				</div>
			) : (
				<div
					className="absolute top-12 left-6 md:left-4 cursor-pointer text-xl z-10"
					onClick={() => setLegendVisible(true)}
				>
					<TfiLayoutGrid2Alt />
				</div>
			)}
			{legendVisible && (
				<div className="absolute top-20 left-6 md:left-4 bg-white p-4 rounded shadow-md z-10">
					<h4 className="text-lg font-semibold">Legenda</h4>
					{polygonData && (
						<div>
							<h5 className="font-semibold">Kota</h5>
							{polygonData.map((item: any) => (
								<div key={item.id} className="mb-2">
									<label className="flex items-center cursor-pointer">
										<input
											type="checkbox"
											className="mr-2"
											checked={visibilityMap[item.nama_kota]}
											onChange={() => handleCheckboxChange(item.nama_kota)}
										/>
										<div
											className="w-5 h-5 rounded mr-2"
											style={{ backgroundColor: colorMap[item.nama_kota] }}
										/>
										<span>{item.nama_kota}</span>
									</label>
								</div>
							))}
						</div>
					)}
				</div>
			)}
		</div>
	);
};

export default MapZonasi;
