"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { sidebarLinks } from "@/constant";
import { usePathname } from "next/navigation";
import { PiXCircleFill } from "react-icons/pi";
import { GiHamburgerMenu } from "react-icons/gi";

const Sidebar = () => {
	const [expanded, setExpanded] = useState(false);
	const pathname = usePathname();

	return (
		<div className="relative z-50 ">
			<button
				className="md:hidden fixed top-4 right-4 z-50 p-2 bg-gray-800 text-white rounded-lg"
				onClick={() => setExpanded((curr) => !curr)}
			>
				{expanded ? <PiXCircleFill /> : <GiHamburgerMenu />}
			</button>
			<div
				className={`bg-[#150e3d55] fixed top-0 left-0 h-screen overflow-hidden md:w-72 dark:bg-gray-900 px-4 pt-10 transform transition-all duration-300 md:static ${
					expanded ? "w-64" : "w-[75px]"
				}`}
			>
				<div className="flex justify-between items-center mb-6 px-1">
					<Link
						href="/"
						className="items-center gap-3 flex text-xl font-extrabold tracking-wider text-white"
					>
						<Image
							src="/icons/logo.svg"
							alt="logo"
							width={32}
							height={32}
							className="rounded-full"
						/>
						<span
							className={`text-lime-700 overflow-hidden transition-all md:text-2xl duration-300 ${
								expanded ? "opacity-100" : "opacity-0 md:opacity-100"
							}`}
						>
							MARED
						</span>
					</Link>
				</div>
				<hr className="border-2" />
				<div className="mt-5 overflow-hidden">
					{sidebarLinks.map((item) => {
						const Icon = item.icon;
						const isActive = pathname === item.route;
						return (
							<Link
								key={item.label}
								href={item.route}
								className={`flex relative items-center px-1 gap-5 mb-4 py-2 rounded-lg transition-all duration-300 ${
									isActive
										? "bg-lime-700 text-white" // Active link styles
										: "hover:bg-gray-600 dark:hover:bg-gray-700"
								}`}
							>
								<Icon size={27} className="text-white mx-1 absolute" />
								<span
									className={`font-medium font-sans text-xl mx-11 text-white transition duration-300 ${
										expanded ? "opacity-100" : "opacity-0 md:opacity-100"
									}`}
								>
									{item.label}
								</span>
							</Link>
						);
					})}
				</div>
			</div>
		</div>
	);
};

export default Sidebar;
