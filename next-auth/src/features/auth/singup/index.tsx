import { Error } from '@/components/Error';
import { EmailField } from '@/components/Fields/Email';
import { PasswordField } from '@/components/Fields/Password';
import { UsernameField } from '@/components/Fields/Username';
import { Form } from '@/components/Form';
import { Button } from '@/components/library/Button';
import { SignupLoginLayout } from '@/layouts/auth/singup';
import { isValidSignup, normalizeEmail, normalizeUsername } from '@/utils/auth';
import { useRouter } from 'next/router';

import React, { ChangeEvent, useState } from 'react';

export const Signup = ({ visible }: { visible: boolean }) => {
	const router = useRouter();
	const [fullname, setFullname] = useState('');
	const [email, setEmail] = useState('');

	const [password, setPassword] = useState('');

	const [isSubmiting, setIsSubmiting] = useState(false);
	const [error, setError] = useState('');

	const onUsernameChange = (event: ChangeEvent<HTMLInputElement>) => {
		const { value } = event.currentTarget;
		setFullname(value);
		setError('');
	};
	const onEmailChange = (event: ChangeEvent<HTMLInputElement>) => {
		const { value } = event.currentTarget;
		setEmail(value);
		setError('');
	};
	const onPasswordChange = (event: ChangeEvent<HTMLInputElement>) => {
		const { value } = event.currentTarget;
		setPassword(value);
		setError('');
	};

	const isValidForm = isValidSignup(fullname, email, password);

	const handleSubmit = (event: React.SyntheticEvent<HTMLFormElement>) => {
		event.preventDefault();

		const data = {
			fullname: normalizeUsername(fullname),
			email: normalizeEmail(email),
			password,
		};

		setIsSubmiting(true);

		// Remove the error when the user resignup again
		setError('');

		// Simulate the waiting pogress when the user creates the account
		setTimeout(() => {
			fetch('/api/auth/signup', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(data),
			})
				.then((response) => {
					return response.json();
				})
				.then((data) => {
					const { success } = data;
					if (success === false) {
						setError(data.message);
					} else {
						router.push('/feed');
						setError('');
					}
				})

				.catch((error) => {
					setError(error);
					console.error(error);
				})
				.finally(() => {
					setIsSubmiting(false);
				});
		}, 3000);
	};

	return visible ? (
		<SignupLoginLayout disabled={isSubmiting ? 'none' : 'auto'}>
			<Form action='/' method='POST' onSubmit={handleSubmit}>
				<UsernameField value={fullname} onChange={onUsernameChange} />
				<EmailField value={email} onChange={onEmailChange} />
				<PasswordField forSignup value={password} onChange={onPasswordChange} />
				<Button
					type='submit'
					text={`${isSubmiting ? 'Signing up ...' : 'Create account'}`}
					disabled={!isValidForm || isSubmiting}
				/>
				{isValidForm && error.length > 0 && <Error message={error} />}
			</Form>
		</SignupLoginLayout>
	) : null;
};
