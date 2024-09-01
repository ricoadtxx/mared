"use client";

import Image from "next/image";
import { motion } from "framer-motion";

const ContentIntroduction = () => {
	return (
		<div className="relative overflow-hidden flex flex-col w-full h-screen mt-16">
			<div className="flex justify-between px-5 items-center gap-10 z-10">
				<div className="w-1/2">
					<h1 className="text-white text-7xl font-anton tracking-widest">
						Introduction
					</h1>
				</div>
				<div className="w-1/2">
					<p className="text-white text-lg font-sans text-center">
						Provinsi DKI Jakarta terbagi menjadi lima wilayah Kota Administrasi
						dan satu Kabupaten Administrasi dengan luas keseluruhan wilayah
						662,33 km²
					</p>
				</div>
			</div>
			<motion.div
				initial={{ y: 200 }}
				whileInView={{ y: 40 }}
				transition={{
					duration: 1.5,
					type: "spring",
					stiffness: 50,
					damping: 10,
				}}
				className="relative w-full h-full flex items-center justify-center pt-20"
			>
				<Image
					src="/ide.png"
					alt="blackhole"
					width={800}
					height={800}
					className="absolute z-0 filter brightness-70"
				/>
			</motion.div>
		</div>
	);
};

export default ContentIntroduction;
