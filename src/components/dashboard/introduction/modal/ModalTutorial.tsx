"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { IoIosCloseCircle } from "react-icons/io";

const tutorials = [
	{
		id: 1,
		text: "Tampilan Awal akan seperti ini untuk mencari lokasi anda",
		position: {
			desktop: { bottom: "10%", left: "35%" },
			mobile: { bottom: "16%", right: "20%" },
		},
		img: "/tutorial.png",
	},
	{
		id: 2,
		text: "Klik tombol Geolocate untuk mendeteksi lokasi anda",
		position: {
			desktop: { bottom: "40%", left: "50%" },
			mobile: { bottom: "40%", right: "5%" },
		},
		img: "/tutorial1.png",
	},
	{
		id: 3,
		text: "Klik list sekolah untuk melihat daftar sekolah di lokasi anda",
		position: {
			desktop: { bottom: "20%", right: "10%" },
			mobile: { bottom: "5%", right: "1%" },
		},
		img: "/tutorial2.png",
	},
	{
		id: 4,
		text: "Kemudian akan muncul list sekolah nya",
		position: {
			desktop: { bottom: "30%", left: "69%" },
			mobile: { bottom: "30%", right: "5%" },
		},
		img: "/tutorial3.png",
	},
];

const ModalTutorial = ({ isOpen, onClose }: any) => {
	const [currentStep, setCurrentStep] = useState(0);
	const [bubblePosition, setBubblePosition] = useState(
		tutorials[0].position.desktop
	);

	useEffect(() => {
		// Update bubble position based on the screen width
		const updateBubblePosition = () => {
			if (window.innerWidth < 640) {
				// Mobile breakpoint (sm)
				setBubblePosition(tutorials[currentStep].position.mobile);
			} else {
				setBubblePosition(tutorials[currentStep].position.desktop);
			}
		};

		updateBubblePosition();

		// Add resize listener
		window.addEventListener("resize", updateBubblePosition);

		// Add keyboard event listener for ESC key
		const handleKeyDown = (event: KeyboardEvent) => {
			if (event.key === "Escape") {
				onClose(); // Call onClose when ESC is pressed
			}
		};

		window.addEventListener("keydown", handleKeyDown);

		// Cleanup listeners on component unmount
		return () => {
			window.removeEventListener("resize", updateBubblePosition);
			window.removeEventListener("keydown", handleKeyDown);
		};
	}, [currentStep, onClose]); // Run effect when currentStep changes

	if (!isOpen) return null;

	const handleNext = () => {
		if (currentStep < tutorials.length - 1) {
			setCurrentStep(currentStep + 1);
		} else {
			onClose(); // Close modal when finished
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
					{/* Display the image based on the current step */}
					<Image
						src={tutorials[currentStep].img} // Use the image from the current tutorial step
						alt={`Tutorial Image ${currentStep + 1}`} // Descriptive alt text
						width={1000}
						height={1000}
						className="rounded-t-sm w-full"
					/>

					{/* Bubble Chat */}
					<motion.div
						className="absolute bg-blue-500 text-white p-3 rounded-lg shadow-lg max-w-[15rem] sm:max-w-sm md:max-w-md lg:max-w-lg"
						style={bubblePosition} // Use position based on screen size
						initial={{ opacity: 0, y: 20 }}
						animate={{ opacity: 1, y: 0 }}
						exit={{ opacity: 0, y: 20 }}
						transition={{ duration: 0.3 }}
					>
						<h2 className="text-base font-bold mb-2">Step {currentStep + 1}</h2>
						<p className="text-sm">{tutorials[currentStep].text}</p>

						{/* Navigation Buttons inside bubble */}
						<div className="flex justify-between mt-4">
							<motion.button
								onClick={handlePrevious}
								className="bg-gray-500 text-xs text-white px-4 py-1 rounded-lg shadow hover:bg-gray-600 transition duration-200 transform active:scale-95"
								whileHover={{ scale: 1.05 }}
								whileTap={{ scale: 0.95 }}
								disabled={currentStep === 0} // Disable if at first step
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
