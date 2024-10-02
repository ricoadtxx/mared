import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import React from "react";
import { PiDownloadDuotone } from "react-icons/pi";
import * as XLSX from "xlsx";

const InformationSchool = ({ isOpen, onClose, title, daftarSekolah }: any) => {
	const [schools, setSchools] = useState<any>({});
	const [activeDiv, setActiveDiv] = useState<number | null>(1);
	const [schoolFilter, setSchoolFilter] = useState<string>("All");

	useEffect(() => {
		if (isOpen && daftarSekolah) {
			// Memastikan data diterima dan valid sebelum diproses
			setSchools(daftarSekolah);
		} else {
			setSchools({});
		}
	}, [isOpen, daftarSekolah]);

	// Listener untuk mendeteksi tombol 'Esc'
	useEffect(() => {
		const handleEsc = (event: KeyboardEvent) => {
			if (event.key === "Escape") {
				onClose();
			}
		};

		if (isOpen) {
			window.addEventListener("keydown", handleEsc);
		}

		// Cleanup listener saat modal ditutup
		return () => {
			window.removeEventListener("keydown", handleEsc);
		};
	}, [isOpen, onClose]);

	// Fungsi untuk menampilkan daftar sekolah dari JSON berdasarkan filter
	const renderSchoolList = (zonaData: any) => {
		return (
			<div className="p-4 max-h-3/4">
				<div className="flex gap-2 items-center pb-2 w-full">
					<PiDownloadDuotone
						width={150}
						height={150}
						onClick={downloadExcel}
						className="cursor-pointer"
					/>
					<p className="font-serif"> {"<"}--- Unduh Data Sekolah</p>
				</div>

				{/* Tampilkan SMP jika filter mengizinkan */}
				{schoolFilter !== "SMA" && zonaData.SMP && (
					<>
						<h3 className="text-lg font-semibold mb-2">
							Sekolah Menengah Pertama (SMP)
						</h3>
						<ul className="max-h-64 overflow-y-auto">
							{zonaData.SMP.map((school: string, index: number) => (
								<li key={index} className="p-2 border-b border-gray-200">
									{school}
								</li>
							))}
						</ul>
					</>
				)}

				{/* Tampilkan SMA jika filter mengizinkan */}
				{schoolFilter !== "SMP" && zonaData.SMA && (
					<>
						<h3 className="text-lg font-semibold mb-2">
							Sekolah Menengah Atas (SMA)
						</h3>
						<ul className="max-h-64 overflow-y-auto">
							{zonaData.SMA.map((school: string, index: number) => (
								<li key={index} className="p-2 border-b border-gray-200">
									{school}
								</li>
							))}
						</ul>
					</>
				)}
			</div>
		);
	};

	// Fungsi untuk mengunduh file Excel
	const downloadExcel = () => {
		const data = [];
		const maxLength = Math.max(
			schools.SMP ? schools.SMP.length : 0,
			schools.SMA ? schools.SMA.length : 0
		);

		for (let i = 0; i < maxLength; i++) {
			data.push({
				SMP: schools.SMP && schools.SMP[i] ? schools.SMP[i] : "",
				SMA: schools.SMA && schools.SMA[i] ? schools.SMA[i] : "",
			});
		}

		// Buat workheet Excel dan workbook
		const worksheet = XLSX.utils.json_to_sheet(data);
		const workbook = XLSX.utils.book_new();
		XLSX.utils.book_append_sheet(workbook, worksheet, "Daftar Sekolah");

		// Generate file Excel
		XLSX.writeFile(workbook, "Daftar_Sekolah.xlsx");
	};

	if (!isOpen) return null;

	return (
		<div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-[999] max-h-3/4">
			<motion.div
				initial={{ opacity: 0, scale: 0.8 }}
				animate={{ opacity: 1, scale: 1 }}
				exit={{ opacity: 0, scale: 0.8 }}
				transition={{ duration: 0.3 }}
				className="bg-white p-6 rounded-lg w-3/4 max-w-lg"
			>
				<h2 className="text-2xl font-bold text-center mb-3">{title}</h2>
				{/* Tombol untuk memilih div yang berbeda */}
				<div className="flex gap-2 mb-3 justify-center">
					<button
						onClick={() => setActiveDiv(1)}
						className={`px-4 py-2 rounded ${
							activeDiv === 1
								? "bg-blue-500 text-white"
								: "bg-gray-500 text-white"
						}`}
					>
						Zona Pertama
					</button>
					<button
						onClick={() => setActiveDiv(2)}
						className={`px-4 py-2 rounded ${
							activeDiv === 2
								? "bg-blue-500 text-white"
								: "bg-gray-500 text-white"
						}`}
					>
						Zona Kedua
					</button>
					<button
						onClick={() => setActiveDiv(3)}
						className={`px-4 py-2 rounded ${
							activeDiv === 3
								? "bg-blue-500 text-white"
								: "bg-gray-500 text-white"
						}`}
					>
						Non-zonasi
					</button>
				</div>
				{/* Tombol filter untuk memilih jenis sekolah */}
				<div className="flex gap-2 justify-center">
					<button
						onClick={() => setSchoolFilter("All")}
						className={`px-4 py-2 rounded ${
							schoolFilter === "All"
								? "bg-blue-500 text-white"
								: "bg-gray-500 text-white"
						}`}
					>
						Semua
					</button>
					<button
						onClick={() => setSchoolFilter("SMP")}
						className={`px-4 py-2 rounded ${
							schoolFilter === "SMP"
								? "bg-blue-500 text-white"
								: "bg-gray-500 text-white"
						}`}
					>
						SMP
					</button>
					<button
						onClick={() => setSchoolFilter("SMA")}
						className={`px-4 py-2 rounded ${
							schoolFilter === "SMA"
								? "bg-blue-500 text-white"
								: "bg-gray-500 text-white"
						}`}
					>
						SMA
					</button>
				</div>
				{/* Menampilkan daftar sekolah berdasarkan zona */}
				{activeDiv === 1 && renderSchoolList(schools)}
				{/* Tombol untuk menutup modal */}
				<button
					onClick={onClose}
					className="bg-red-500 text-white mx-4 px-4 py-2 rounded hover:bg-red-600 mt-4"
				>
					Tutup
				</button>
			</motion.div>
		</div>
	);
};

export default InformationSchool;
