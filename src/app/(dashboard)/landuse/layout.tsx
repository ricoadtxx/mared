const RootLayout = ({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) => {
	return (
		<section className="bg-[#030014]">
			{children}
		</section>
	);
};

export default RootLayout;
