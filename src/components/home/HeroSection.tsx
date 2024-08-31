"use client";

import { cn } from "@/lib/utils";
import { Alfa_Slab_One } from "next/font/google";
import Link from "next/link";
import Map3D from "../map3D/map3D";

const alfa = Alfa_Slab_One({
	subsets: ["latin"],
	weight: ["400"],
	variable: "--font-alfa",
});

const HeroSection = () => {
	return (
		<section className="w-screen h-screen flex">
			<div className="flex flex-col md:flex-row px-10 gap-10 mb-10 justify-center items-center overflow-hidden w-3/4">
				<div
					className="absolute inset-0 -z-10 bg-cover bg-center"
					style={{ backgroundImage: "url('/wave.svg')" }}
				></div>
				{/* Background wave end */}
				<div className="flex w-full flex-col gap-10 justify-start pt-16 items-start md:items-start">
					<h1
						className={cn(
							"text-2xl lg:text-5xl tracking-wide text-center md:text-left text-white",
							alfa.className
						)}
					>
						Welcome to{" "}
						<span className="text-lime-500 tracking-widest">MARED</span>
					</h1>
					<p className="font-sans w-3/4 text-lg text-justify tracking-wide text-white">
						MARED atau Mapping And Regional Education Disparities. 3D WebGIS
						yang fokus pada identifikasi dan pengukuran ketimpangan pendidikan
						untuk perencanaan yang lebih baik.
					</p>
					<button
						className={cn(
							"flex items-center bg-lime-100 gap-1 px-4 py-2 cursor-pointer text-gray-500 font-semibold tracking-widest rounded-md hover:bg-blue-400 hover:text-gray-800 duration-300 hover:gap-2 hover:translate-x-3",
							alfa.className
						)}
					>
						<Link href="/introduction">Explore</Link>
						<svg
							className="w-5 h-5"
							stroke="currentColor"
							strokeWidth="1.5"
							viewBox="0 0 24 24"
							fill="none"
							xmlns="http://www.w3.org/2000/svg"
						>
							<path
								d="M6 12 3.269 3.125A59.769 59.769 0 0 1 21.485 12 59.768 59.768 0 0 1 3.27 20.875L5.999 12Zm0 0h7.5"
								stroke-linejoin="round"
								stroke-linecap="round"
							></path>
						</svg>
					</button>
				</div>
			</div>

			<div className="w-full -z-[9999]">
				<Map3D />
			</div>
		</section>
	);
};

export default HeroSection;
