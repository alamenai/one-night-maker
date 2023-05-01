export const Form = ({
	action,
	method,
	children,
	onSubmit,
}: {
	action: string;
	method: string;
	children: React.ReactNode;
	onSubmit: (event: React.SyntheticEvent<HTMLFormElement>) => void;
}) => {
	return (
		<form
			action={action}
			method={method}
			className='flex flex-col'
			onSubmit={onSubmit}
		>
			{children}
		</form>
	);
};
