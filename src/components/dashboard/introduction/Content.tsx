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

const ContentIntroduction = () => {
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
		<div className="relative lg:overflow-hidden flex flex-col w-full h-full py-28 mb-20">
			<div className="grid grid-cols-1 xl:grid-cols-2 gap-10 px-5 z-10">
				{/* Title */}
				<div className="xl:w-[75%] p-4">
					<h1 className="text-4xl font-sans font-bold text-lime-400 tracking-widest text-center xl:text-left">
						About Disparities in Jakarta
					</h1>
				</div>
				{/* Explanation */}
				<div className="p-4 xl:w-[70%] ml-auto">
					<p className="text-white text-base font-sans text-justify md:text-xl xl:text-lg">
						Perbedaan yang mencolok antar wilayah sering kali terlihat dari
						disparitas tingkat kemiskinan yang ada. Pendidikan punya peran
						penting dalam mengurangi ketimpangan ini, karena memberikan peluang
						yang diperlukan untuk meningkatkan kualitas hidup mereka.
					</p>
				</div>
				{/* Graphic Bar */}
				<div className="xl:w-3/4 h-[280px] p-4">
					<h1 className="text-xl font-sans font-bold text-white text-center mb-3">
						Data Penduduk Miskin (%)
					</h1>
					<Bar data={data} options={options} />
				</div>
				{/* Conclusion */}
				<div className="p-4 xl:w-[70%] ml-auto flex items-center">
					<p className="text-white text-base md:text-xl xl:text-lg font-sans text-justify">
						Data persentase penduduk miskin di Jakarta dari 2019 hingga 2023
						menunjukkan fluktuasi yang signifikan. Setelah meningkat dari 3,47%
						pada 2019 menjadi 4,53% pada 2020 dan 4,72% pada 2021, angka
						tersebut sedikit menurun menjadi 4,69% pada 2022 dan 4,44% pada
						2023. Penurunan ini menunjukkan bahwa upaya untuk mengurangi
						kemiskinan mulai memberikan hasil, namun masih diperlukan perhatian
						berkelanjutan untuk mencapai pengurangan yang lebih konsisten.
					</p>
				</div>
			</div>

			<motion.div
				ref={ref}
				initial={{ y: 100 }}
				animate={inView ? { y: -50 } : { y: 100 }}
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
					className="filter opacity-30 brightness-70"
				/>
			</motion.div>
		</div>
	);
};

export default ContentIntroduction;
