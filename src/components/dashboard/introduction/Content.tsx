"use client";

import Image from "next/image";
import { motion } from "framer-motion";

const ContentIntroduction = () => {
	return (
		<div className="relative lg:overflow-hidden flex flex-col w-full h-screen mt-16 mb-20">
			<div className="grid grid-cols-1 lg:grid-cols-2 gap-10 px-5 z-10">
				<div className="w-[80%] p-4 flex items-center">
					<h1 className="text-4xl font-sans font-bold text-lime-400 tracking-widest">
						About Education Disparities in Jakarta
					</h1>
				</div>
				<div className="p-4 w-[65%] ml-auto">
					<p className="text-white text-lg font-sans text-justify">
						Perbedaan kualitas dan akses pendidikan yang terjadi di berbagai
						wilayah di Jakarta. Ketimpangan ini disebabkan oleh berbagai faktor,
						seperti perbedaan ekonomi, infrastruktur, dan ketersediaan tenaga
						pengajar yang berkualitas.
					</p>
				</div>
				<div className="w-3/4 p-4">
					<p className="text-white text-lg font-sans text-justify">
						Perbedaan kualitas dan akses pendidikan yang terjadi di berbagai
						wilayah di Jakarta. Ketimpangan ini disebabkan oleh berbagai faktor,
						seperti perbedaan ekonomi, infrastruktur, dan ketersediaan tenaga
						pengajar yang berkualitas.
					</p>
				</div>
				<div className="p-4 w-2/3 ml-auto">
					<p className="text-white text-lg font-sans text-center">
						Provinsi DKI Jakarta terbagi menjadi lima wilayah Kota Administrasi
						dan satu Kabupaten Administrasi dengan luas keseluruhan wilayah
						662,33 km²
					</p>
				</div>
			</div>

			<motion.div
				initial={{ y: 100 }}
				whileInView={{ y: 10 }}
				transition={{
					duration: 1.5,
					type: "spring",
					stiffness: 50,
					damping: 10,
				}}
				className="absolute z-0 w-full h-full flex items-center justify-center pt-20"
			>
				<Image
					src="/ide.png"
					alt="blackhole"
					width={800}
					height={800}
					className="filter opacity-30 brightness-70"
				/>
			</motion.div>
		</div>
	);
};

export default ContentIntroduction;
