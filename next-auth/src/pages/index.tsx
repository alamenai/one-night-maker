import { AuthForm } from '@/features/auth';
import Image from 'next/image';
import AuthWalpaper from '../../public/auth-walpaper.jpg';
import { parseCookies } from 'nookies';
import { GetServerSidePropsContext } from 'next';
import { verifyJWT } from './api/utils/jwt';
import Head from 'next/head';

const Home = () => {
	return (
		<>
			<Head>
				<title>Next Authentication</title>
			</Head>
			<div className='flex flex-row h-screen'>
				<div className='w-1/2'>
					<Image
						src={AuthWalpaper}
						width={'1010'}
						height={'1010'}
						alt='Authentication Walpaper'
						className='w-full h-full'
						style={{ width: '100%', height: '100%' }}
					/>
				</div>
				<div className='flex flex-col align-middle items-center w-1/2'>
					<AuthForm />
				</div>
			</div>
		</>
	);
};

export async function getServerSideProps(context: GetServerSidePropsContext) {
	const cookies = parseCookies(context);
	const token = cookies['jwt'];

	// JWT cookie exists, verify it
	const user = await verifyJWT(token);

	if (user) {
		return {
			redirect: {
				destination: '/feed',
				permanent: false,
			},
		};
	}

	return {
		props: {
			user,
		},
	};
}

export default Home;
