import { MouseEventHandler } from 'react';

export const Button = ({
	type,
	text,
	onClickEvent,
	disabled,
}: {
	type: 'button' | 'submit' | 'reset' | undefined;
	text: string;
	onClickEvent?: MouseEventHandler<HTMLButtonElement>;
	disabled: boolean;
}) => {
	return (
		<button
			type={type}
			onClick={onClickEvent}
			className={`bg-blue-700 my-4 py-4 rounded-md text-lg text-white ${
				disabled
					? 'opacity-50'
					: 'opacity-100 active:bg-blue-800 hover:bg-blue-600 '
			}`}
			disabled={disabled}
		>
			{text}
		</button>
	);
};
