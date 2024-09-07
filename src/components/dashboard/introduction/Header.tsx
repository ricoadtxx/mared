"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { Bar } from "react-chartjs-2";
import {
	Chart as ChartJS,
	CategoryScale,
	LinearScale,
	BarElement,
	Title,
	Tooltip,
	Legend,
} from "chart.js";
import ChartDataLabels from "chartjs-plugin-datalabels";

ChartJS.register(
	CategoryScale,
	LinearScale,
	BarElement,
	Title,
	Tooltip,
	Legend,
	ChartDataLabels
);

const HeaderIntroduction = () => {
	const { ref, inView } = useInView({
		triggerOnce: false,
		threshold: 0.1,
	});

	const data = {
		labels: ["2019", "2020", "2021", "2022", "2023"],
		datasets: [
			{
				label: "Persentase Penduduk Miskin",
				data: [3.47, 4.53, 4.72, 4.69, 4.44],
				backgroundColor: "rgba(255, 99, 132, 1)",
				borderColor: "rgba(75, 192, 192, 1)",
				borderWidth: 1,
			},
		],
	};

	const options: any = {
		responsive: true,
		maintainAspectRatio: false,
		layout: {
			padding: {
				top: 20,
			},
		},
		scales: {
			y: {
				beginAtZero: true,
				ticks: {
					callback: function (value: any) {
						return value + "%";
					},
					color: "white",
				},
				title: {
					color: "white",
				},
			},
		},
		plugins: {
			legend: {
				labels: {
					color: "white",
				},
				position: "bottom",
			},
			tooltip: {
				callbacks: {
					labelTextColor: () => "white",
				},
			},
			datalabels: {
				color: "white",
				display: true,
				anchor: "end",
				align: "top",
				offset: 4,
				font: {
					size: 12,
				},
			},
		},
	};

	return (
		<div className="relative overflow-hidden flex flex-col w-full h-3/4 xl:h-screen py-10 mt-20 mb-20 xl:mb-0 xl:mt-0 z-50">
			<div className="grid grid-cols-1 xl:grid-cols-2 gap-10 px-5 z-10">
				{/* Title */}
				<div className="xl:w-[75%] p-4 overflow-hidden">
					<motion.h1
						initial={{ x: -500 }}
						animate={inView ? { x: 0 } : { x: -500 }}
						transition={{
							duration: 1.5,
							type: "spring",
							stiffness: 50,
							damping: 10,
						}}
						className="text-4xl font-sans font-bold text-lime-400 tracking-widest text-center xl:text-left pb-2"
					>
						About Disparities in Jakarta
					</motion.h1>
					<motion.p
						initial={{ x: -500 }}
						animate={inView ? { x: 0 } : { x: -500 }}
						transition={{
							duration: 1.5,
							type: "spring",
						}}
						className="text-white text-base font-sans text-justify md:text-xl xl:text-lg"
					>
						Jakarta sebagai pusat ekonomi utama masih mengalami ketimpangan yang
						signifikan dalam berbagai aspek kehidupan masyarakatnya. ketimpangan
						ini sering terlihat dalam hal akses terhadap layanan dasar seperti
						pendidikan, kesehatan, dan pekerjaan.
					</motion.p>
				</div>
				<div className="p-4 flex flex-col overflow-hidden z-[9999] w-full xl:w-[70%] ml-auto">
					<motion.h1
						initial={{ x: 500 }}
						animate={inView ? { x: 0 } : { x: 500 }}
						transition={{
							duration: 1.5,
							type: "spring",
							stiffness: 50,
							damping: 10,
						}}
						className="xl:w-3/4 text-xl font-sans font-bold text-white text-center mb-4"
					>
						Data Penduduk Miskin (%) <br />{" "}
						<p className="text-xs font-light">
							Sumber: Badan Pusat Statistik Jakarta
						</p>
					</motion.h1>
					<motion.div
						initial={{ x: 500 }}
						animate={inView ? { x: 0 } : { x: 500 }}
						transition={{
							duration: 1.5,
							type: "spring",
							stiffness: 50,
							damping: 10,
						}}
						className="h-[250px]"
					>
						<Bar data={data} options={options} />
					</motion.div>
				</div>
				<div className="xl:w-[75%] h-full p-4 overflow-hidden">
					<motion.p
						initial={{ x: -500 }}
						animate={inView ? { x: 0 } : { x: -500 }}
						transition={{
							duration: 1.5,
							type: "spring",
						}}
						className="text-white text-base font-sans text-justify md:text-xl xl:text-lg"
					>
						Pendidikan memiliki potensi besar untuk mengatasi ketimpangan ini
						dengan membuka peluang yang setara bagi semua individu untuk
						mengakses sumber daya dan kesempatan yang diperlukan. Dengan
						memperbaiki akses dan kualitas pendidikan, dapat meningkatkan
						kualitas hidup secara keseluruhan dan mendorong pemerataan
						pembangunan di berbagai daerah.
					</motion.p>
				</div>
				{/* Conclusion */}
				<div className="p-4 xl:w-[70%] ml-auto flex ">
					<motion.p
						initial={{ x: 500 }}
						animate={inView ? { x: 0 } : { x: 500 }}
						transition={{
							duration: 1.5,
							type: "spring",
						}}
						className="text-white text-base md:text-xl xl:text-lg font-sans text-justify"
					>
						Data persentase penduduk miskin di Jakarta dari 2019 hingga 2023
						menunjukkan fluktuasi yang signifikan. pada 2019 menyentuh angka
						3,47% kemudian menjadi 4,53% pada 2020 dan 4,72% pada 2021, angka
						tersebut sedikit menurun menjadi 4,69% pada 2022 dan 4,44% pada
						2023. Penurunan ini menunjukkan bahwa upaya untuk mengurangi
						kemiskinan mulai memberikan hasil.
					</motion.p>
				</div>
			</div>

			<motion.div
				ref={ref}
				initial={{ y: 100 }}
				animate={inView ? { y: -100 } : { y: 100 }}
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
					className="filter opacity-30 brightness-70 w-full xl:w-[65%]"
				/>
			</motion.div>
		</div>
	);
};

export default HeaderIntroduction;
