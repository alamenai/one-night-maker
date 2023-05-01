import jwt from 'jsonwebtoken';

export const generateToken = (fullname: string) => {
	const token = jwt.sign({ fullname }, process.env.JWT_SECRET as string, {
		expiresIn: '30d',
	});
	return token;
};

export const verifyJWT = async (token: string) => {
	try {
		const decoded = jwt.verify(token, process.env.JWT_SECRET as string);
		return decoded;
	} catch (err) {
		return null;
	}
};
