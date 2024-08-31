import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import { Metadata } from "next";
import LayoutRoot from "./LayoutRoot";
import { cn } from "@/lib/utils";
import "boxicons/css/boxicons.min.css";

const fontSans = Plus_Jakarta_Sans({
	subsets: ["latin"],
	weight: ["300", "400", "500", "600", "700"],
	variable: "--font-sans",
});

export const metadata: Metadata = {
	title: "WEB GIS",
	description: "Joki Tugas Andalan Klean",
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en">
			<body
				className={cn(
					"min-h-screen bg-dark-300 font-sans antialiased",
					fontSans.variable
				)}
			>
				<main>
					<LayoutRoot>{children}</LayoutRoot>
				</main>
			</body>
		</html>
	);
}
