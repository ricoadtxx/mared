type PropTypes = {
	type: string;
	placeholder: string;
	className?: string;
};

const Input = ({ type, placeholder, className = "" }: PropTypes) => {
	return (
		<div className="flex flex-col-reverse">
			<input
				placeholder={placeholder}
				className={`peer outline-none border pl-2 duration-500 border-black focus:border-dashed relative placeholder:duration-500 placeholder:absolute focus:placeholder:pt-10 focus:rounded-md ${className}`}
				type={type}
			/>
		</div>
	);
};

export default Input;
