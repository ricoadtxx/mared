
const RootLayout = ({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) => {
	return (
		<section>
			{children}
		</section>
	);
};

export default RootLayout;
