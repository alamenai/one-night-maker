import { ChangeEventHandler } from 'react';

export const TextField = ({
	type,
	placeholder,
	value,
	onChangeEvent,
}: {
	name: string;
	type: string;
	placeholder: string;
	value?: string | null;
	onChangeEvent?: ChangeEventHandler<HTMLInputElement>;
}) => {
	return (
		<input
			type={type}
			placeholder={placeholder}
			className='border block px-3 py-3 outline-1 my-1 rounded-sm text-md'
			onChange={onChangeEvent}
			autoComplete='false'
		/>
	);
};
