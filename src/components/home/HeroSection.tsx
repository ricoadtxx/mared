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
		<section className="relative w-screen h-screen flex items-center justify-center overflow-hidden border">
			<div className="absolute inset-0 -z-10">
				<Map3D />
			</div>
			<div className="relative flex flex-col items-center text-center px-5 py-10">
				<h1
					className={cn(
						"text-3xl md:text-5xl tracking-wide font-bold text-black",
						alfa.className
					)}
				>
					Welcome to{" "}
					<span className="text-lime-100 bg-black px-2 rounded-xl tracking-wider">MARED</span>
				</h1>
				<p className="font-sans text-xl font-extrabold text-black mt-4 px-4 md:w-3/4 xl:w-[40%] text-justify py-5">
					MARED atau Mapping And Regional Education Disparities. 3D WebGIS yang
					fokus pada identifikasi dan pengukuran ketimpangan pendidikan untuk
					perencanaan yang lebih baik.
				</p>
				<button
					className={cn(
						"flex items-center bg-lime-100 gap-2 p-4 mt-6 text-gray-500 font-semibold tracking-widest rounded-md hover:bg-blue-400 hover:text-gray-800 duration-300",
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
							strokeLinecap="round"
							strokeLinejoin="round"
						></path>
					</svg>
				</button>
			</div>
		</section>
	);
};

export default HeroSection;
