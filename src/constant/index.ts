import {
	FaLandmark,
	FaMap,
	FaIndustry,
	FaBook,
	FaComment,
} from "react-icons/fa";

export const NavLinks = [
	{ href: "/introduction", key: "Introduction", text: "Introduction" },
	{ href: "/landuse", key: "Landuse", text: "Landuse" },
	{ href: "/planning", key: "Planning", text: "Planning" },
	{ href: "/realization", key: "Realization", text: "Realization" },
	{ href: "/conclusion", key: "Conclusion", text: "Conclusion" },
];

export const sidebarLinks = [
	{
		icon: FaComment,
		route: "/introduction",
		label: "Introduction",
	},
	{
		icon: FaLandmark,
		route: "/landuse",
		label: "Landuse",
	},
	{
		icon: FaMap,
		route: "/planning",
		label: "Planning",
	},
	{
		icon: FaIndustry,
		route: "/realization",
		label: "Realization",
	},
	{
		icon: FaBook,
		route: "/conclusion",
		label: "Conclusion",
	},
];
