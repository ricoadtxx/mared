"use client";

import { motion } from "framer-motion";

const HeaderIntroduction = () => {
	return (
		<div className="relative z-10 h-3/4 gap-20 flex justify-center items-center">
			<div className="absolute w-full h-full">
				<video
					autoPlay
					loop
					muted
					className="rotate-180 absolute top-[-400px] md:top-[-450px] lg:top-[-380px] w-full h-full left-0 z-0 object-cover"
				>
					<source src="/blackhole.webm" type="video/webm" />
				</video>
			</div>
			<div className="overflow-hidden z-[9999] flex flex-col justify-center items-center gap-5 py-24 mt-28">
				<div className= "overflow-hidden">
					<motion.h1
						initial={{ y: 100 }}
						animate={{ y: 0 }}
						transition={{ duration: 1.5 }}
						className="text-white text-7xl font-anton overflow-hidden"
					>
						DKI JAKARTA
					</motion.h1>
				</div>
				<p className="text-white text-lg font-sans w-1/3 text-center">
					Provinsi DKI Jakarta terbagi menjadi lima wilayah Kota Administrasi
					dan satu Kabupaten Administrasi dengan luas keseluruhan wilayah 662,33
					km²
				</p>
			</div>
		</div>
	);
};

export default HeaderIntroduction;
