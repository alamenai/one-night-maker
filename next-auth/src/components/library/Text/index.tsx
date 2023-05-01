export const Text = ({
	content,
	className,
}: {
	content: string;
	className: string;
}) => {
	return <h1 className={className}>{content}</h1>;
};
