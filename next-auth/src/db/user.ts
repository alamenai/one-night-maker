import { hashPassword } from './../pages/api/utils/password';
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export const createNewUser = async (
	fullname: string,
	email: string,
	password: string
) => {
	try {
		const hashedPassword = await hashPassword(password);
		const newUser = await prisma.user.create({
			data: {
				fullname,
				email,
				password: hashedPassword,
			},
		});
		if (newUser) {
			return newUser;
		}
	} catch (error) {
		throw error;
	} finally {
		await prisma.$disconnect();
	}
};

export const findUserByEmail = async (email: string) => {
	const user = await prisma.user.findUnique({
		where: {
			email,
		},
	});
	return user;
};
