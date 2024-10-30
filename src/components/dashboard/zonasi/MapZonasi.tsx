import { useEffect, useRef, useState } from "react";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import { TfiLayoutGrid2Alt } from "react-icons/tfi";
import { FaExpandArrowsAlt } from "react-icons/fa";
import ReactDOM from "react-dom/client";
import * as turf from "@turf/turf";
import Link from "next/link";
import InformationSchool from "./modal/InformationSchool";
import { Button } from "@/components/ui/button";

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
	const [locationInput, setLocationInput] = useState("");
	const markerRef = useRef<mapboxgl.Marker | null>(null);
	const [geolocateUsed, setGeolocateUsed] = useState(false);
	const [cityName, setKecName] = useState<string>("");
	const [schoolList, setSchoolList] = useState<string[]>([]);
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [searchTerm, setSearchTerm] = useState("");

	const openModal = () => setIsModalOpen(true);
	const closeModal = () => setIsModalOpen(false);

	useEffect(() => {
		mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_API_KEY as string;

		if (!mapRef.current) {
			mapRef.current = new mapboxgl.Map({
				container: mapContainerRef.current!,
				style: "mapbox://styles/mapbox/outdoors-v12",
				center: [lng, lat],
				zoom: zoom,
			});

			const geolocate = new mapboxgl.GeolocateControl({
				positionOptions: { enableHighAccuracy: true },
				trackUserLocation: true,
			});
			mapRef.current.addControl(geolocate, "top-left");

			geolocate.on("geolocate", async (position: any) => {
				const { latitude, longitude } = position.coords;
				const userLngLat = new mapboxgl.LngLat(longitude, latitude);
				setUserLocation(userLngLat);

				try {
					const response = await fetch("/api/visitor", {
						method: "POST",
						headers: { "Content-Type": "application/json" },
						body: JSON.stringify({ latitude, longitude }),
					});

					if (!response.ok) throw new Error("Failed to send geolocation data");

					setGeolocateUsed(true);
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
				const newColorMap: { [key: string]: string } = {};
				const newVisibilityMap: { [key: string]: boolean } = {};

				data.forEach((item: any) => {
					const color = getRandomColor();
					newColorMap[item.nama_kec] = color;
					newVisibilityMap[item.nama_kec] = true;
				});

				setColorMap(newColorMap);
				setVisibilityMap(newVisibilityMap);
				setPolygonData(data);
			} catch (error: any) {
				if (error.name !== "AbortError")
					console.error("Error fetching data:", error);
			}
			return () => controller.abort();
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

		return () => {
			if (mapRef.current) mapRef.current.off("style.load", handleStyleLoad);
		};
	}, [lng, lat, zoom, showPolygons]);

	useEffect(() => {
		if (!mapRef.current || !userLocation) return;

		const userPoint = turf.point([userLocation.lng, userLocation.lat]);

		let containsKec = null;
		const schoolArray: any = {
			zona_pertama: { SMP: [], SMA: [] },
			zona_kedua: { SMP: [], SMA: [] },
		};

		polygonData.forEach((item: any) => {
			const polygon = turf.multiPolygon(item.koordinat_geom.coordinates);
			if (turf.booleanPointInPolygon(userPoint, polygon)) {
				containsKec = item.nama_kec;

				["zona_pertama", "zona_kedua"].forEach((zonaKey) => {
					if (Array.isArray(item[zonaKey])) {
						item[zonaKey].forEach((zona: any) => {
							if (zona.SMP) {
								schoolArray[zonaKey].SMP.push(...zona.SMP);
							}
							if (zona.SMA) {
								schoolArray[zonaKey].SMA.push(...zona.SMA);
							}
						});
					}
				});

				setSchoolList(schoolArray);
				setKecName(containsKec);
			}
		});

		if (
			containsKec &&
			(schoolArray.zona_pertama.SMP.length > 0 ||
				schoolArray.zona_pertama.SMA.length > 0 ||
				schoolArray.zona_kedua.SMP.length > 0 ||
				schoolArray.zona_kedua.SMA.length > 0)
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

	useEffect(() => {
		if (mapRef.current && polygonData) {
			// Definisikan dan filter visibleFeatures berdasarkan visibilityMap
			const visibleFeatures = polygonData.filter(
				(item: any) => visibilityMap[item.nama_kec]
			);

			// Tambahkan sumber data GeoJSON ke peta jika belum ada
			if (!mapRef.current.getSource("polygons")) {
				mapRef.current.addSource("polygons", {
					type: "geojson",
					data: {
						type: "FeatureCollection",
						features: [], // Inisialisasi dengan array kosong
					},
				});
			}

			// Set data baru ke sumber GeoJSON
			(mapRef.current.getSource("polygons") as mapboxgl.GeoJSONSource).setData({
				type: "FeatureCollection",
				features: visibleFeatures.map((item: any) => ({
					type: "Feature",
					geometry: item.koordinat_geom, // Pastikan ini mengikuti format GeoJSON
					properties: {
						title: item.nama_kec,
						description: item.provinsi,
						total_sekolah: item.jumlah_sekolah,
						color: colorMap[item.nama_kec], // Ambil warna dari colorMap
					},
				})),
			});

			// Jika layer belum ada, tambahkan layer untuk menampilkan poligon
			if (!mapRef.current.getLayer("polygons")) {
				mapRef.current.addLayer({
					id: "polygons",
					type: "fill",
					source: "polygons", // Sumber yang baru saja kita tambahkan
					paint: {
						"fill-color": ["get", "color"], // Warna diambil dari properti 'color'
						"fill-opacity": 0.6, // Set opacity agar semi transparan
					},
				});
			} else {
				// Jika layer sudah ada, pastikan layer terlihat
				mapRef.current.setLayoutProperty("polygons", "visibility", "visible");
			}
		}
	}, [polygonData, colorMap, visibilityMap]);

	const handleCheckboxChange = (namaKota: string) => {
		setVisibilityMap((prev) => ({ ...prev, [namaKota]: !prev[namaKota] }));
	};

	const filteredData = Array.isArray(polygonData)
		? polygonData.filter((item) =>
				item.nama_kec.toLowerCase().includes(searchTerm.toLowerCase())
		  )
		: [];

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
					<h1 className="text-2xl mb-3 font-semibold text-center">Legenda</h1>
					{polygonData && (
						<div className="w-full">
							<div className="flex justify-between items-center">
								<h2 className="text-lg font-semibold">Kecamatan</h2>
								<input
									type="text"
									placeholder="Cari Kecamatan..."
									value={searchTerm}
									onChange={(e) => setSearchTerm(e.target.value)}
									className="w-1/2 h-5 p-4 border border-gray-600 rounded"
								/>
							</div>
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
				daftarSekolah={schoolList}
			/>
		</div>
	);
};

export default MapZonasi;
