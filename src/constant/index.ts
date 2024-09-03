import { FaMap, FaBook, FaComment } from "react-icons/fa";

export const NavLinks = [
	{ href: "/introduction", key: "Introduction", text: "Introduction" },
	{ href: "/sekolah", key: "Cek Sekolah", text: "Cek Sekolah" },
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
		route: "/sekolah",
		label: "Cek Sekolah",
	},

	{
		icon: FaBook,
		route: "/conclusion",
		label: "Conclusion",
	},
];
