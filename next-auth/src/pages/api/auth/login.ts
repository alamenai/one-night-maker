import { findUserByEmail } from '@/db/user';
import { NextApiRequest, NextApiResponse } from 'next';
import { setCookie } from 'nookies';
import { generateToken } from '../utils/jwt';
import { matchPassword } from '../utils/password';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
	if (req.method === 'POST') {
		const { email, password } = req.body;

		const existingUser = await findUserByEmail(email);

		if (existingUser) {
			const hashedPassword = existingUser.password;
			const isMatched = await matchPassword(hashedPassword, password);

			if (isMatched) {
				res.status(200).send({
					success: true,
					message: 'User logged in successfully.',
					data: existingUser,
				});
				setCookie({ res }, 'jwt', generateToken(existingUser.fullname), {
					maxAge: 30 * 24 * 60 * 60, // 30 days
					path: '/',
					httpOnly: true,
					sameSite: 'strict',
				});
			} else {
				res.status(401).send({
					success: false,
					message: "Email and password don't match",
					data: existingUser,
				});
			}
		} else {
			try {
				res.status(404).send({
					success: false,
					message: 'User does not exist',
					data: existingUser,
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
