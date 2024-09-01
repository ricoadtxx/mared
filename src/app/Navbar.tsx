"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import { Alfa_Slab_One } from "next/font/google";
import Image from "next/image";
import Link from "next/link";
import { HiMenu, HiX } from "react-icons/hi";
import { NavLinks } from "@/constant";

const alfa = Alfa_Slab_One({
	subsets: ["latin"],
	weight: ["400"],
	variable: "--font-alfa",
});

const Navbar = () => {
	const [isMenuOpen, setIsMenuOpen] = useState(false);

	return (
		<nav className="flex justify-between items-center py-5 px-10 fixed w-full z-[9999] shadow-md">
			<div className="flex-1 flex items-center justify-start gap-4">
				<Link href="/">
					<Image src="/icons/logo.svg" width={32} height={30} alt="logo" />
				</Link>
				<h1
					className={cn(
						"tracking-widest text-gray-700 text-2xl font-sans",
						alfa.className
					)}
				>
					MARED
				</h1>
			</div>
			<div className="flex items-center gap-4">
				<ul className="hidden xl:flex text-lg font-extrabold tracking-wide gap-7 text-lime-500">
					{NavLinks.map((link) => (
						<Link href={link.href} key={link.text} className="cursor-pointer">
							{link.text}
						</Link>
					))}
				</ul>
				<button
					className="block xl:hidden text-2xl"
					onClick={() => setIsMenuOpen(!isMenuOpen)}
				>
					{isMenuOpen ? <HiX /> : <HiMenu />}
				</button>
			</div>
			<div
				className={`absolute top-full right-0 w-full shadow-md transition-transform duration-300 ease-in-out xl:hidden ${
					isMenuOpen ? "block" : "hidden"
				}`}
			>
				<ul className="flex flex-col text-lg font-bold gap-4 p-4 text-lime-500 bg-gray-100">
					{NavLinks.map((link) => (
						<li key={link.text} className="cursor-pointer">
							<Link href={link.href}>{link.text}</Link>
						</li>
					))}
				</ul>
			</div>
		</nav>
	);
};

export default Navbar;
