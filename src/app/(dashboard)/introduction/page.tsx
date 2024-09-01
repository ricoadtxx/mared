import ContentIntroduction from "@/components/dashboard/introduction/Content";
import HeaderIntroduction from "@/components/dashboard/introduction/Header";
import { motion } from "framer-motion";

const Introduction = () => {
	return (
		<div className="flex flex-col w-full h-full">
			<HeaderIntroduction />
			<ContentIntroduction />
		</div>
	);
};

export default Introduction;
