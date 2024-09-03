"use client";

import React from "react";
import { motion } from "framer-motion";

const ModalTutorial = ({ isOpen, onClose, title, content }: any) => {
	if (!isOpen) return null;

	return (
		<div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-[999]">
			<motion.div
				initial={{ opacity: 0, scale: 0.8 }}
				animate={{ opacity: 1, scale: 1 }}
				exit={{ opacity: 0, scale: 0.8 }}
				transition={{ duration: 0.3 }}
				className="bg-white p-6 rounded-lg w-3/4 max-w-lg"
			>
				<h2 className="text-xl font-bold mb-4">{title}</h2>
				<p className="mb-4">{content}</p>
				<button
					onClick={onClose}
					className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
				>
					Close
				</button>
			</motion.div>
		</div>
	);
};

export default ModalTutorial;
