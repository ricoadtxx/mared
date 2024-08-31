import Sidebar from "@/components/sidebar/Sidebar";
import StarsCanvas from "@/components/star/StarBackground";
import React from "react";

const RootLayout = ({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) => {
	return (
		<section className="bg-[#030014] flex">
			<Sidebar />
			<StarsCanvas />
			{children}
		</section>
	);
};

export default RootLayout;
