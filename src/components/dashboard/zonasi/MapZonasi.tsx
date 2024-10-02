import { useEffect, useRef, useState } from "react";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import { TfiLayoutGrid2Alt } from "react-icons/tfi";
import { FaExpandArrowsAlt } from "react-icons/fa";
import ReactDOM from "react-dom/client";
import * as turf from "@turf/turf";
import Link from "next/link";
import InformationSchool from "./modal/InformationSchool";

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
	const popupRef = useRef<mapboxgl.Popup | null>(null);
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
	const [userLocation, setUserLocation] = useState<mapboxgl.LngLat | null>(
		null
	);
	const markerRef = useRef<mapboxgl.Marker | null>(null);
	const [geolocateUsed, setGeolocateUsed] = useState(false);

	const [cityName, setKecName] = useState<string>("");
	const [schoolList, setSchoolList] = useState<string[]>([]);
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [searchTerm, setSearchTerm] = useState("");

	const openModal = () => setIsModalOpen(true);
	const closeModal = () => setIsModalOpen(false);

	useEffect(() => {
		// Set access token Mapbox
		mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_API_KEY as string;

		// Inisialisasi Mapbox jika belum ada
		if (!mapRef.current) {
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

			// Event handler untuk geolokasi
			geolocate.on("geolocate", async (position: any) => {
				const { latitude, longitude } = position.coords;
				const userLngLat = new mapboxgl.LngLat(longitude, latitude);
				setUserLocation(userLngLat);

				try {
					const response = await fetch("/api/visitor", {
						method: "POST",
						headers: {
							"Content-Type": "application/json",
						},
						body: JSON.stringify({ latitude, longitude }),
					});

					if (!response.ok)
						throw new Error("Failed to send geolocation data to server");

					console.log("Geolocation data sent successfully");
					setGeolocateUsed(true);

					// Pusatkan peta pada lokasi pengguna
					if (mapRef.current) {
						mapRef.current.flyTo({
							center: userLngLat,
							zoom: 14,
							essential: true,
						});
					}
				} catch (error) {
					console.error("Error sending geolocation data:", error);
				}
			});
		}

		const fetchData = async () => {
			const controller = new AbortController();
			const { signal } = controller;

			try {
				const response = await fetch("/api/batas", { signal });
				if (!response.ok) throw new Error("Error fetching data");

				const data = await response.json();
				setPolygonData(data);

				const newColorMap: { [key: string]: string } = {};
				const newVisibilityMap: { [key: string]: boolean } = {};

				data.forEach((item: any) => {
					const color = getRandomColor();
					newColorMap[item.nama_kec] = color;
					newVisibilityMap[item.nama_kec] = true;

					item.koordinat_geom.coordinates = item.koordinat_geom.coordinates.map(
						(polygon: any) =>
							polygon.map((ring: any) => {
								if (ring.length >= 3 && ring[0] !== ring[ring.length - 1]) {
									ring.push(ring[0]);
								}
								return ring;
							})
					);
				});

				setColorMap(newColorMap);
				setVisibilityMap(newVisibilityMap);

				if (mapRef.current) {
					// Simpan state popup dan marker sebelum memperbarui sumber layer
					const savedPopup = popupRef.current
						? popupRef.current.getLngLat()
						: null;
					const savedPopupContent = popupRef.current
						? popupRef.current.getElement()
						: null;

					// Hapus sumber layer jika sudah ada sebelumnya
					if (mapRef.current.getSource("polygons")) {
						mapRef.current.removeLayer("polygons");
						mapRef.current.removeSource("polygons");
					}

					// Tambahkan sumber dan layer baru
					mapRef.current.addSource("polygons", {
						type: "geojson",
						data: {
							type: "FeatureCollection",
							features: data.map((item: any) => ({
								type: "Feature",
								geometry: {
									type: "MultiPolygon",
									coordinates: item.koordinat_geom.coordinates,
								},
								properties: {
									title: item.nama_kec,
									description: item.provinsi,
									total_sekolah: item.jumlah_sekolah,
									zona_pertama: item.zona_pertama,
									color: newColorMap[item.nama_kec],
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

					// Pulihkan popup jika sebelumnya ada
					if (savedPopup && savedPopupContent) {
						const container = document.createElement("div");
						container.appendChild(savedPopupContent);
						popupRef.current = new mapboxgl.Popup({
							closeButton: false,
							closeOnClick: false,
							className: "popup",
							offset: 25,
						})
							.setLngLat(savedPopup)
							.setDOMContent(container)
							.addTo(mapRef.current!);
					}
				}
			} catch (error: any) {
				if (error.name !== "AbortError") {
					console.error("Error fetching data:", error);
				}
			}

			return () => {
				controller.abort();
			};
		};

		fetchData();

		const handleStyleLoad = () => {
			if (mapRef.current && mapRef.current.getLayer("polygons")) {
				mapRef.current.setLayoutProperty(
					"polygons",
					"visibility",
					showPolygons ? "visible" : "none"
				);
			}
		};

		mapRef.current.on("style.load", handleStyleLoad);

		// Cleanup event listeners dan popup ketika komponen di-unmount
		return () => {
			if (mapRef.current) {
				mapRef.current.off("style.load", handleStyleLoad);
			}

			if (popupRef.current) {
				popupRef.current.remove();
				popupRef.current = null;
			}

			if (markerRef.current) {
				markerRef.current.remove();
				markerRef.current = null;
			}
		};
	}, [lng, lat, zoom, showPolygons]);

	// Geolocate user
	useEffect(() => {
		if (!mapRef.current || !userLocation) return;

		const userPoint = turf.point([userLocation.lng, userLocation.lat]);

		let containsKec = null;
		let schoolArray: any = { SMP: [], SMA: [] };

		// Cek apakah pengguna berada di dalam polygon
		polygonData.forEach((item: any) => {
			const polygon = turf.multiPolygon(item.koordinat_geom.coordinates);
			if (turf.booleanPointInPolygon(userPoint, polygon)) {
				containsKec = item.nama_kec;

				if (Array.isArray(item.zona_pertama)) {
					item.zona_pertama.forEach((zona: any) => {
						if (zona.SMP) {
							schoolArray.SMP = zona.SMP;
						}
						if (zona.SMA) {
							schoolArray.SMA = zona.SMA;
						}
					});
				}
				setSchoolList(schoolArray);
				setKecName(containsKec);
			}
		});

		if (
			containsKec &&
			(schoolArray.SMP.length > 0 || schoolArray.SMA.length > 0)
		) {
			openModal();
		} else {
			console.warn(
				"Data sekolah tidak tersedia atau tidak valid untuk kota:",
				containsKec
			);
		}

		// Membuat atau memperbarui marker dan popup
		const popupContent = containsKec ? (
			<div className="border flex flex-col gap-5 justify-center items-center">
				<button
					className="custom-close-btn"
					onClick={() => {
						if (popupRef.current) {
							popupRef.current.remove(); // Tutup popup tetapi jangan set ke null
						}
					}}
				>
					&times;
				</button>
				<h3 className="text-sm text-center font-bold">
					Anda Berada di Kecamatan {containsKec}
				</h3>
				<button
					onClick={openModal}
					className="cursor-pointer bg-gradient-to-r from-[#EB3349] to-[#F45C43] px-4 py-2 rounded text-white font-semibold shadow"
				>
					List Sekolah
				</button>
			</div>
		) : (
			<div className="border flex flex-col gap-5 justify-center items-center">
				<h3 className="text-sm text-center font-bold">
					Anda tidak berada di area yang terdaftar
				</h3>
				<button
					onClick={openModal}
					className="cursor-pointer bg-gradient-to-r from-[#EB3349] to-[#F45C43] px-4 py-2 rounded text-white font-semibold shadow"
				>
					List Sekolah
				</button>
			</div>
		);

		const popupContainer = document.createElement("div");
		const root = ReactDOM.createRoot(popupContainer);
		root.render(popupContent);

		// Hanya update marker dan popup jika userLocation berubah
		if (!markerRef.current) {
			const marker = new mapboxgl.Marker()
				.setLngLat(userLocation)
				.addTo(mapRef.current);
			markerRef.current = marker;

			const popup = new mapboxgl.Popup({
				closeButton: false,
				closeOnClick: false,
				className: "popup",
				offset: 25,
			})
				.setDOMContent(popupContainer)
				.setLngLat(userLocation);

			marker.setPopup(popup);
			popupRef.current = popup;
		} else {
			markerRef.current.setLngLat(userLocation);
			popupRef.current?.setLngLat(userLocation);
		}

		// Cleanup marker dan popup ketika komponen unmount atau userLocation berubah
		return () => {
			if (markerRef.current) {
				markerRef.current.remove();
				markerRef.current = null;
			}
			if (popupRef.current) {
				popupRef.current.remove(); // Tutup popup, tetapi tidak nullify
			}
			// Pastikan root juga dibersihkan
			root.unmount();
		};
	}, [polygonData, userLocation]);

	// Mengaktifkan dan Menonaktifkan Layer
	useEffect(() => {
		if (mapRef.current) {
			const visibleFeatures = polygonData
				? polygonData.filter((item: any) => visibilityMap[item.nama_kec])
				: [];

			if (mapRef.current.getSource("polygons")) {
				(
					mapRef.current.getSource("polygons") as mapboxgl.GeoJSONSource
				).setData({
					type: "FeatureCollection",
					features: visibleFeatures.map((item: any) => ({
						type: "Feature",
						geometry: item.koordinat_geom,
						properties: {
							title: item.nama_kec,
							description: item.provinsi,
							total_sekolah: item.jumlah_sekolah,
							color: colorMap[item.nama_kec],
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

	const filteredData = Array.isArray(polygonData)
		? polygonData.filter((item) =>
				item.nama_kec.toLowerCase().includes(searchTerm.toLowerCase())
		  )
		: []; // Jika polygonData bukan array, set filteredData ke array kosong

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
					{/* Bagian ini tidak akan ikut di-scroll */}
					<h1 className="text-2xl mb-3 font-semibold text-center">Legenda</h1>
					{polygonData && (
						<div className="w-full">
							<div className="flex justify-between items-center">
								<h2 className="text-lg font-semibold">Kecamatan</h2>

								{/* Input search */}
								<input
									type="text"
									placeholder="Cari Kecamatan..."
									value={searchTerm}
									onChange={(e) => setSearchTerm(e.target.value)} // Update state pencarian
									className="w-1/2 h-5 p-4 border border-gray-600 rounded"
								/>
							</div>

							{/* Bagian scrollable dimulai dari sini */}
							<div className="max-h-80 overflow-y-auto mt-2">
								<div className="grid grid-cols-2 gap-4">
									{filteredData.map((item: any, index: number) => (
										<div key={item.id || index} className="mb-2">
											<label className="flex items-center cursor-pointer">
												<input
													type="checkbox"
													className="mr-2"
													checked={visibilityMap[item.nama_kec]}
													onChange={() => handleCheckboxChange(item.nama_kec)}
												/>
												<div
													className="w-5 h-5 rounded mr-2"
													style={{ backgroundColor: colorMap[item.nama_kec] }}
												/>
												<span>{item.nama_kec}</span>
											</label>
										</div>
									))}
								</div>
							</div>
						</div>
					)}
				</div>
			)}

			<InformationSchool
				isOpen={isModalOpen}
				onClose={closeModal}
				title={`Daftar Sekolah di daerah anda`}
				daftarSekolah={schoolList} // Pastikan array valid dikirim
			/>
		</div>
	);
};

export default MapZonasi;
