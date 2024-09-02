"use client";

import { motion } from "framer-motion";

const HeaderIntroduction = () => {
	return (
		<div className="relative z-10 h-3/4 gap-20 flex justify-center items-center pt-28 pb-44 md:pt-14">
			<div className="overflow-hidden z-[9999] flex flex-col justify-center items-center gap-5 py-24 mt-28">
				{/* Title Animation */}
				<div className="overflow-hidden">
					<motion.h1
						initial={{ y: 100 }}
						animate={{ y: 0 }}
						transition={{
							duration: 1.5,
							ease: [0.6, 0.01, -0.05, 0.9],
						}}
						className="text-white text-5xl md:text-7xl font-anton"
					>
						DKI JAKARTA
					</motion.h1>
				</div>

				{/* Subtitle Animation */}
				<div className="w-3/4 md:w-1/2 overflow-hidden flex justify-center items-center">
					<motion.p
						initial={{ x: 1000 }}
						animate={{ x: 0 }}
						transition={{
							duration: 1.5,
							delay: 0.5,
							ease: "easeOut",
						}}
						className="text-white text-2xl md:text-lg font-sans text-center"
					>
						Provinsi DKI Jakarta terbagi menjadi lima wilayah Kota Administrasi
						dan satu Kabupaten Administrasi dengan luas keseluruhan wilayah
						662,33 km²
					</motion.p>
				</div>
			</div>
		</div>
	);
};

export default HeaderIntroduction;
