export const likePost = (liked) => {
	fetch('/', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify({ liked }),
	}).catch((error) => console.error(error));
};
