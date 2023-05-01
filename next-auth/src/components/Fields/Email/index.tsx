import { TextField } from '@/components/library/TextField';
import { ChangeEventHandler } from 'react';

export const EmailField = ({
	value,
	onChange,
}: {
	value: string;
	onChange: ChangeEventHandler<HTMLInputElement>;
}) => {
	return (
		<TextField
			placeholder='Work email'
			type='email'
			name='useremail'
			value={value}
			onChangeEvent={onChange}
			
		/>
	);
};
