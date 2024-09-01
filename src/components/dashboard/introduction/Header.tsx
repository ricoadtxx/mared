"use client";

import { motion } from "framer-motion";

const HeaderIntroduction = () => {
	return (
		<div className="relative z-10 h-3/4 gap-20 flex justify-center items-center pt-28 pb-44 md:pt-14">
			<div className="overflow-hidden z-[9999] flex flex-col justify-center items-center gap-5 py-24 mt-28">
				<div className="overflow-hidden">
					<motion.h1
						initial={{ y: 100 }}
						animate={{ y: 0 }}
						transition={{ duration: 1.5 }}
						className="text-white text-5xl md:text-7xl font-anton overflow-hidden"
					>
						DKI JAKARTA
					</motion.h1>
				</div>
				<p className="text-white text-2xl md:text-lg font-sans w-3/4 md:w-1/2 text-center">
					Provinsi DKI Jakarta terbagi menjadi lima wilayah Kota Administrasi
					dan satu Kabupaten Administrasi dengan luas keseluruhan wilayah 662,33
					km²
				</p>
			</div>
		</div>
	);
};

export default HeaderIntroduction;
