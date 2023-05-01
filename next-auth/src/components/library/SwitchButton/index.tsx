import { MouseEventHandler } from 'react';

export const SwitchButton = ({
	text1,
	text2,
	active,
	clickEvent,
}: {
	text1: string;
	text2: string;
	active: boolean;
	clickEvent: MouseEventHandler<HTMLButtonElement>;
}) => {
	return (
		<div className='flex justify-between text-center rounded-sm mt-8 mb-8 border border-gray-900'>
			<button
				onClick={clickEvent}
				name='signup'
				className={`w-full border-none ${
					active ? `bg-blue-700 text-white font-bold` : ``
				}`}
			>
				{text1}
			</button>
			<button
				onClick={clickEvent}
				name='login'
				className={`w-full  border-none ${
					!active ? `bg-blue-700 text-white font-bold` : ``
				} leading-10`}
			>
				{text2}
			</button>
		</div>
	);
};
