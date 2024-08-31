import { NavLinks } from "@/constant";
import { cn } from "@/lib/utils";
import { Alfa_Slab_One } from "next/font/google";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const alfa = Alfa_Slab_One({
	subsets: ["latin"],
	weight: ["400"],
	variable: "--font-alfa",
});

const Navbar = () => {
	return (
		<nav className="flex justify-between items-center py-5 px-10 fixed w-full">
			<div className="flex-1 flex items-center justify-start gap-4">
				<Link href="/">
					<Image src="/icons/logo.svg" width={32} height={30} alt="logo" />
				</Link>
				<h1
					className={cn(
						"tracking-widest text-white text-2xl font-sans",
						alfa.className
					)}
				>
					MARED
				</h1>
			</div>
			<div className= "flex items-center justify-start gap-4">
				<ul className="xl:flex hidden text-lg font-medium gap-7">
					{NavLinks.map((link) => (
						<Link href={link.href} key={link.text}>
							{link.text}
						</Link>
					))}
				</ul>
			</div>
		</nav>
	);
};

export default Navbar;
