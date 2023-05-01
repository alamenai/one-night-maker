import { Error } from '@/components/Error';
import { EmailField } from '@/components/Fields/Email';
import { PasswordField } from '@/components/Fields/Password';
import { Form } from '@/components/Form';
import { Button } from '@/components/library/Button';
import { SignupLoginLayout } from '@/layouts/auth/singup';
import { isValidLogin, normalizeEmail } from '@/utils/auth';
import { useRouter } from 'next/router';
import { ChangeEvent, useState } from 'react';

export const Login = ({ visible }: { visible: boolean }) => {
	const router = useRouter();
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');

	const [isSubmiting, setIsSubmiting] = useState(false);
	const [error, setError] = useState('');

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

	const isValidForm = isValidLogin(email, password);

	const handleLogin = (event: React.SyntheticEvent<HTMLFormElement>) => {
		event.preventDefault();

		const data = {
			email: normalizeEmail(email),
			password,
		};

		setIsSubmiting(true);

		// Remove the error when the user reslogin again
		setError('');

		// Simulate the waiting pogress when the user creates the account
		setTimeout(() => {
			fetch('/api/auth/login', {
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
					console.log(data);
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
			<Form action='/' method='POST' onSubmit={handleLogin}>
				<EmailField value={email} onChange={onEmailChange} />
				<PasswordField
					forSignup={false}
					value={password}
					onChange={onPasswordChange}
				/>
				<Button
					type='submit'
					text={`${isSubmiting ? 'Signing in ...' : 'Login'}`}
					disabled={!isValidForm || isSubmiting}
				/>
				{isValidForm && error.length > 0 && <Error message={error} />}
			</Form>
		</SignupLoginLayout>
	) : null;
};
