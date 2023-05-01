import { GetServerSidePropsContext } from 'next';
import { parseCookies } from 'nookies';
import { verifyJWT } from './api/utils/jwt';
import Head from 'next/head';

const Feed = ({ welcome }: { welcome: string }) => {
	return (
		<>
			<Head>
				<title>Feed</title>
			</Head>
			<p>{welcome}</p>
		</>
	);
};

export async function getServerSideProps(context: GetServerSidePropsContext) {
	const cookies = parseCookies(context);
	const token = cookies['jwt'];

	// If the token does not exist
	if (!token) {
		return {
			redirect: {
				destination: '/',
				permanent: false,
			},
		};
	}
	// JWT cookie exists, verify it
	const user = await verifyJWT(token);

	if (!user) {
		return {
			redirect: {
				destination: '/',
				permanent: false,
			},
		};
	}

	return {
		props: {
			welcome: 'Welcome to you feed',
		},
	};
}
export default Feed;
