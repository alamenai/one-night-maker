import { Login } from './login';
import { Signup } from './singup';
import { useState } from 'react';
import { AuthLayout } from '@/layouts/auth';
import { Title } from './Title';
import { SwitchButton } from '@/components/library/SwitchButton';

export const AuthForm = () => {
	const [visibleSingup, setIsVisibleSignup] = useState(true);
	const [visibleLogin, setIsVisibleLogin] = useState(false);
	const [active, setActive] = useState(true);

	const toggleAuth = (event: React.SyntheticEvent) => {
		const name = event.currentTarget.getAttribute('name');
		switch (name) {
			case 'login':
				setIsVisibleLogin(true);
				setIsVisibleSignup(false);
				break;
			case 'signup':
				setIsVisibleSignup(true);
				setIsVisibleLogin(false);
				break;
			default:
				break;
		}
		setActive(!active);
	};
	return (
		<AuthLayout>
			<Title title='Sign up for free or login' />
			<SwitchButton
				text1='Sign up'
				text2='Login'
				clickEvent={toggleAuth}
				active={active}
			/>
			<Signup visible={visibleSingup} />
			<Login visible={visibleLogin} />
		</AuthLayout>
	);
};
