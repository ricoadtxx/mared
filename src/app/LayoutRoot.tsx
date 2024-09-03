"use client";

import { usePathname } from "next/navigation";
import Navbar from "./Navbar";

const disableNavbar = ["/introduction", "/sekolah"];

const LayoutRoot = ({ children }: Readonly<{ children: React.ReactNode }>) => {
	const pathname = usePathname();
	return (
		<>
			{!disableNavbar.includes(pathname) && <Navbar /> }
			{children}
		</>
	);
};

export default LayoutRoot;
