import { FaMap, FaBook, FaComment, FaSchool } from "react-icons/fa";

export const NavLinks = [
	{ href: "/introduction", key: "Introduction", text: "Introduction" },
	{ href: "/zonasi", key: "Zonasi", text: "Zonasi" },
	{ href: "/sekolah", key: "Sekolah", text: "Sekolah" },
	{ href: "/conclusion", key: "Conclusion", text: "Conclusion" },
];

export const sidebarLinks = [
	{
		icon: FaComment,
		route: "/introduction",
		label: "Introduction",
	},
	{
		icon: FaMap,
		route: "/zonasi",
		label: "Zonasi",
	},
	{
		icon: FaSchool,
		route: "/sekolah",
		label: "Sekolah",
	},

	{
		icon: FaBook,
		route: "/conclusion",
		label: "Conclusion",
	},
];
