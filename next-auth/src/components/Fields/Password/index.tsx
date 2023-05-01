import { TextField } from '@/components/library/TextField';
import { ChangeEventHandler, useState } from 'react';

export const PasswordField = ({
	value,
	forSignup,
	onChange,
}: {
	value: string;
	forSignup: boolean;
	onChange: ChangeEventHandler<HTMLInputElement>;
}) => {
	return (
		<>
			<TextField
				placeholder='Password'
				type='password'
				name='password'
				value={value}
				onChangeEvent={onChange}
			/>
			{forSignup && <PasswordRequirements value={value} />}
		</>
	);
};

const PasswordRequirements = ({ value }: { value: string }) => {
	const length = value.length;
	const hasMinLength = () => length >= 8;
	const hasCapitalLetter = () => /[A-Z]/.test(value);
	const hasSmallLetter = () => /[a-z]/.test(value);
	const hasSpecialLetter = () => /[^a-zA-Z0-9]/.test(value);

	return (
		<div className='grid grid-cols-2 grid-rows-2 text-base '>
			<div className='my-3'>
				<input type='checkbox' checked={hasMinLength()} disabled />
				<label
					htmlFor=''
					className={`ml-2  ${hasMinLength() ? 'text-blue-700' : ''}`}
				>
					At least 8 characters
				</label>
			</div>
			<div className='my-3'>
				<input type='checkbox' checked={hasCapitalLetter()} disabled />
				<label
					htmlFor=''
					className={`ml-2  ${hasCapitalLetter() ? 'text-blue-700' : ''}`}
				>
					One capital letter
				</label>
			</div>
			<div className='my-3'>
				<input type='checkbox' checked={hasSmallLetter()} disabled />
				<label
					htmlFor=''
					className={`ml-2  ${hasSmallLetter() ? 'text-blue-700' : ''}`}
				>
					One small letter
				</label>
			</div>
			<div className='my-3'>
				<input type='checkbox' checked={hasSpecialLetter()} disabled />
				<label
					htmlFor=''
					className={`ml-2  ${hasSpecialLetter() ? 'text-blue-700' : ''}`}
				>
					One special character
				</label>
			</div>
		</div>
	);
};
