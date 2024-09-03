import FooterIntroduction from "@/components/dashboard/introduction/Footer";
import HeaderIntroduction from "@/components/dashboard/introduction/Header";

const IntroductionPage = () => {
	return (
		<div className="flex flex-col w-full h-full">
			<HeaderIntroduction />
			<FooterIntroduction />
		</div>
	);
};

export default IntroductionPage;
