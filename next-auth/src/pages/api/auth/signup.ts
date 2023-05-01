import { createNewUser, findUserByEmail } from '@/db/user';
import { NextApiRequest, NextApiResponse } from 'next';
import { setCookie } from 'nookies';
import { generateToken } from '../utils/jwt';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
	if (req.method === 'POST') {
		const { fullname, email, password } = req.body;

		const existingUser = await findUserByEmail(email);

		if (existingUser) {
			res.status(200).send({
				success: false,
				message: 'This email is taken by another user.',
				data: existingUser,
			});
		} else {
			try {
				const user = await createNewUser(fullname, email, password);
				// // Set JWT as cookie
				setCookie({ res }, 'jwt', generateToken(user ?? fullname), {
					maxAge: 30 * 24 * 60 * 60, // 30 days
					path: '/',
					httpOnly: true,
					sameSite: 'strict',
				});
				res.status(201).send({
					success: true,
					message: 'User created successfully',
					data: user,
				});
			} catch (error) {
				res.status(500).send({
					success: false,
					message:
						'Internal Server Error: An unexpected error occurred. Please try again later.',
					data: null,
				});

				console.error(error);
			}
		}
	}
};
export default handler;
