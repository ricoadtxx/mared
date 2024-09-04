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
		</section>
	);
};

export default HeroSection;
