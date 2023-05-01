export const isValidSignup = (
	fullname: string,
	email: string,
	password: string
) => {
	return (
		isValidUsername(fullname) &&
		isValidEmail(email) &&
		isValidPassword(password)
	);
};

export const isValidLogin = (email: string, password: string) => {
	return isValidEmail(email) && isValidPassword(password);
};

export const isValidUsername = (fullname: string) => {
	// Full name should be at least 10 characters long
	const isValidName = fullname.length >= 10 && /^[a-zA-Z\s]+$/.test(fullname);
	return isValidName;
};

export const isValidEmail = (email: string) => {
	// Email should contains @ and .
	const isValidEmail = /^\S+@\S+\.\S+$/.test(email);
	return isValidEmail;
};

export const isValidPassword = (password: string) => {
	const isValidPassword = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*]).{8,}$/.test(
		password
	);
	return isValidPassword;
};

export const normalizeUsername = (fullname: string) => {
	return fullname.trim().toLowerCase();
};

export const normalizeEmail = (email: string) => {
	return email.toLowerCase();
};
