import Sidebar from "@/components/sidebar/Sidebar";
import React from "react";

const RootLayout = ({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) => {
	return (
		<section className="bg-[#030014] flex">
			<Sidebar />
			{children}
		</section>
	);
};

export default RootLayout;
