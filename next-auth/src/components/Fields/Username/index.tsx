import { TextField } from '@/components/library/TextField';
import { ChangeEvent, ChangeEventHandler, useState } from 'react';

export const UsernameField = ({
	value,
	onChange,
}: {
	value: string;
	onChange: ChangeEventHandler<HTMLInputElement>;
}) => {
	const [username, setUsername] = useState(value);

	return (
		<TextField
			placeholder='Full name'
			type='text'
			name='username'
			value={username}
			onChangeEvent={onChange}
		/>
	);
};
