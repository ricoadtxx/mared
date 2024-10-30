"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { IoIosCloseCircle } from "react-icons/io";
import { tutorials } from "@/constant/tutor";

const ModalTutorial = ({ isOpen, onClose }: any) => {
	const [currentStep, setCurrentStep] = useState(0);
	const [bubblePosition, setBubblePosition] = useState(
		tutorials[0].position.desktop
	);

	useEffect(() => {
		const updateBubblePosition = () => {
			if (window.innerWidth < 640) {
				setBubblePosition(tutorials[currentStep].position.mobile);
			} else {
				setBubblePosition(tutorials[currentStep].position.desktop);
			}
		};

		updateBubblePosition();

		window.addEventListener("resize", updateBubblePosition);
		const handleKeyDown = (event: KeyboardEvent) => {
			if (event.key === "Escape") {
				onClose();
			}
		};

		window.addEventListener("keydown", handleKeyDown);

		return () => {
			window.removeEventListener("resize", updateBubblePosition);
			window.removeEventListener("keydown", handleKeyDown);
		};
	}, [currentStep, onClose]);

	if (!isOpen) return null;

	const handleNext = () => {
		if (currentStep < tutorials.length - 1) {
			setCurrentStep(currentStep + 1);
		} else {
			onClose();
		}
	};

	const handlePrevious = () => {
		if (currentStep > 0) {
			setCurrentStep(currentStep - 1);
		}
	};

	return (
		<div className="fixed inset-0 bg-black bg-opacity-50 flex flex-col items-center justify-center z-[9999]">
			<motion.div
				className="bg-white w-full mx-2 xl:w-[60%] rounded-lg shadow-lg z-[9999] overflow-hidden relative"
				initial={{ opacity: 0, scale: 0.8 }}
				animate={{ opacity: 1, scale: 1 }}
				exit={{ opacity: 0, scale: 0.8 }}
				transition={{ duration: 0.3 }}
			>
				{/* Content Tutorial Start */}
				<div className="relative w-full flex items-center justify-center">
					<Image
						src={tutorials[currentStep].img}
						alt={`Tutorial Image ${currentStep + 1}`}
						width={1000}
						height={1000}
						className="rounded-t-sm w-full"
					/>
					<motion.div
						className="absolute bg-blue-500 text-white p-3 rounded-lg shadow-lg max-w-[15rem] sm:max-w-sm md:max-w-md lg:max-w-lg"
						style={bubblePosition}
						initial={{ opacity: 0, y: 20 }}
						animate={{ opacity: 1, y: 0 }}
						exit={{ opacity: 0, y: 20 }}
						transition={{ duration: 0.3 }}
					>
						<h2 className="text-base font-bold mb-2">Step {currentStep + 1}</h2>
						<p className="text-sm">{tutorials[currentStep].text}</p>

						<div className="flex justify-between mt-4">
							<motion.button
								onClick={handlePrevious}
								className="bg-gray-500 text-xs text-white px-4 py-1 rounded-lg shadow hover:bg-gray-600 transition duration-200 transform active:scale-95"
								whileHover={{ scale: 1.05 }}
								whileTap={{ scale: 0.95 }}
								disabled={currentStep === 0}
							>
								Mundur
							</motion.button>

							<motion.button
								onClick={handleNext}
								className="bg-blue-600 text-xs text-white px-4 py-1 rounded-lg shadow hover:bg-blue-700 transition duration-200 transform active:scale-95"
								whileHover={{ scale: 1.05 }}
								whileTap={{ scale: 0.95 }}
							>
								{currentStep < tutorials.length - 1 ? "Maju" : "Selesai"}
							</motion.button>
						</div>
					</motion.div>
				</div>
			</motion.div>
			<IoIosCloseCircle
				color="white"
				size={40}
				onClick={onClose}
				className="mt-4 cursor-pointer"
			/>
		</div>
	);
};

export default ModalTutorial;
