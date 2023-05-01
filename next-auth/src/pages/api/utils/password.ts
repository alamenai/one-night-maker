import argon2 from 'argon2';

export const hashPassword = async (password: string) => {
	try {
		const hashedPassword = await argon2.hash(password);

		return hashedPassword;
	} catch (error) {
		throw error;
	}
};

export const matchPassword = async (
	hashedPassword: string,
	password: string
) => {
	try {
		const isMatched = await argon2.verify(hashedPassword, password);

		return isMatched;
	} catch (error) {
		throw error;
	}
};
