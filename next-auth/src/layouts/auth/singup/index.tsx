export const SignupLoginLayout = ({
	children,
	disabled,
}: {
	children: React.ReactNode;
	disabled: 'none' | 'auto';
}) => {
	return (
		<div className='grid grid-cols-1 gap-2' style={{ pointerEvents: disabled }}>
			{children}
		</div>
	);
};
