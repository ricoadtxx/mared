"use client";

import React, { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import ModalTutorial from "@/components/dashboard/introduction/modal/ModalTutorial";

const FooterIntroduction = () => {
	const { ref, inView } = useInView({
		triggerOnce: false,
		threshold: 0.1,
	});
	const [isModalOpen, setIsModalOpen] = useState(false);

	const openModal = () => setIsModalOpen(true);
	const closeModal = () => setIsModalOpen(false);

	return (
		<div className="relative overflow-hidden flex flex-col w-full h-[99.9vh] z-50">
			{/* Title */}
			<div className=" mt-14 mb-20">
				<motion.h1
					initial={{ y: -100 }}
					animate={{ y: 0 }}
					transition={{
						duration: 1.5,
						type: "spring",
						stiffness: 50,
						damping: 10,
					}}
					className="text-lime-400 text-center text-7xl font-bold font-anton tracking-wider"
				>
					Apa Itu JEDMap
				</motion.h1>
			</div>
			{/* Content */}
			<div className="overflow-hidden grid grid-cols-1 lg:grid-cols-2 gap-10 px-5 z-10">
				{/* Content Title */}
				<motion.div
					initial={{ x: -100 }}
					animate={{ x: 0 }}
					transition={{
						duration: 1.5,
						type: "spring",
						stiffness: 50,
						damping: 10,
					}}
					className="p-4 w-3/4 overflow-hidden"
				>
					<h1 className="text-4xl font-sans font-bold text-lime-400 tracking-widest text-center lg:text-left pb-2">
						Jakarta Education Data Map
					</h1>
					<motion.p className="text-white text-base font-sans text-justify md:text-xl lg:text-lg">
						Jakarta Education Data Map adalah sebuah platform 3D Webgis yang
						berfungsi untuk mengakses dan memahami data pendidikan di Jakarta.
						Disini memiliki fitur untuk mengatahui tentang lokasi anda serta
						data lokasi sekolah yang ingin anda lihat.
					</motion.p>
				</motion.div>
				{/* Sub Content with Click to Open Modal */}
				<motion.div
					initial={{ x: 100 }}
					animate={{ x: 0 }}
					transition={{
						duration: 1.5,
						type: "spring",
						stiffness: 50,
						damping: 10,
					}}
					className="p-4 w-3/4 ml-auto cursor-pointer"
					onClick={openModal}
				>
					<p className="text-white text-lg font-sans text-center">
						Click here for more information
					</p>
				</motion.div>
			</div>

			{/* Modal Component */}
			<ModalTutorial
				isOpen={isModalOpen}
				onClose={closeModal}
				title="More Information"
				content="This is additional information about the Jakarta Education Data Map. You can put more details here."
			/>

			<motion.div
				initial={{ y: 500 }}
				animate={{ y: 80 }}
				transition={{
					duration: 1.5,
					type: "spring",
					stiffness: 50,
					damping: 10,
				}}
				className="absolute z-0 w-full flex items-center justify-center "
			>
				<Image
					src="/think.png"
					alt="blackhole"
					width={600}
					height={600}
					className="w-full md:w-3/4 lg:w-[70%] xl:w-1/2 2xl:w-[45%] opacity-60 lg:opacity-100 pt-10"
				/>
			</motion.div>
		</div>
	);
};

export default FooterIntroduction;
