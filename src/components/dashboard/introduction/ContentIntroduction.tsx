"use client";

import React, { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import ModalTutorial from "@/components/dashboard/introduction/modal/ModalTutorial";

const ContentIntroduction = () => {
	const { ref, inView } = useInView({
		triggerOnce: true,
		threshold: 0.1,
	});
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [isHovered, setIsHovered] = useState(false);

	const openModal = () => setIsModalOpen(true);
	const closeModal = () => setIsModalOpen(false);

	if (!inView && isHovered) {
		setIsHovered(false);
	}

	return (
		<>
			<div className="relative overflow-hidden flex flex-col w-full h-screen z-50">
				<div className="mt-14 mb-20">
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
				<div className="overflow-hidden grid grid-cols-1 lg:grid-cols-2 gap-10 px-5 z-10">
					<motion.div
						initial={{ x: -100 }}
						animate={{ x: 0 }}
						transition={{
							duration: 1.5,
							type: "spring",
							stiffness: 50,
							damping: 10,
						}}
						className="p-4 xl:w-3/4 overflow-hidden"
					>
						<h1 className="text-2xl xl:text-4xl font-sans font-bold text-lime-400 tracking-widest text-center pb-2">
							Jakarta Education Data Map
						</h1>
						<motion.p className="text-white text-base font-sans text-justify md:text-xl lg:text-lg">
							Jakarta Education Data Map adalah sebuah platform 3D Webgis yang
							memiliki fitur-fitur yang beragam untuk mengakses sekolah-sekolah
							berdasarkan zonasi. Di platform ini anda dapat menemukan sekolah
							sesuai dengan lokasi anda dan mengetahui sekolah berdasarkan zona
							nya.
						</motion.p>
					</motion.div>
					<motion.div
						initial={{ x: 100 }}
						animate={{ x: 0 }}
						transition={{
							duration: 1.5,
							type: "spring",
							stiffness: 50,
							damping: 10,
						}}
						className="p-4 xl:w-[80%] xl:ml-auto cursor-pointer"
						onClick={openModal}
					>
						<motion.p
							whileHover={{
								scale: 1.05,
								transition: { duration: 0.3 },
							}}
							whileTap={{
								scale: 0.95,
							}}
							animate={{
								y: isHovered ? 0 : [0, -10, 0],
							}}
							transition={{
								y: {
									repeat: isHovered ? 0 : Infinity,
									repeatType: "reverse",
									duration: 1.5,
								},
							}}
							className="text-white text-xl lg:text-base xl:text-2xl font-anton tracking-wide text-center"
							onMouseEnter={() => setIsHovered(true)}
							onMouseLeave={() => setIsHovered(false)}
						>
							Click here for information about JedMap
						</motion.p>
					</motion.div>
				</div>

				<motion.div
					initial={{ y: 500 }}
					animate={{ y: 80 }}
					transition={{
						duration: 1.5,
						type: "spring",
						stiffness: 50,
						damping: 10,
					}}
					className="absolute z-0 w-full flex items-center justify-center"
				>
					<Image
						src="/think.png"
						alt="Icon Introduction"
						width={600}
						height={600}
						className="w-full lg:w-[70%] xl:w-1/2 2xl:w-[45%] opacity-60 lg:opacity-100 pt-32 sm:pt-10 md:pt-16"
					/>
				</motion.div>
			</div>

			{isModalOpen && (
				<ModalTutorial isOpen={isModalOpen} onClose={closeModal} />
			)}
		</>
	);
};

export default ContentIntroduction;
