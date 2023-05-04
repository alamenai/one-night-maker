import { NextApiRequest, NextApiResponse } from 'next';

const token = process.env.TOKEN;

export default async function handler(
	request: NextApiRequest,
	response: NextApiResponse
) {
	const { devname } = request.body;

	if (request.method == 'POST') {
		const query = `
  query($username: String!) {
    user(login: $username) {
      avatarUrl
    }
  }
`;
		const variables = {
			username: devname,
		};

		try {
			const res = await fetch('https://api.github.com/graphql', {
				method: 'POST',
				headers: {
					Authorization: `Bearer ${token}`,
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({ query, variables }),
			});
			if (res.ok) {
				const data = await res.json();
				if (data) {
					const { user } = data.data;
					if (user) {
						response.status(200).json({ avatarUrl: user.avatarUrl });
					} else {
						response.status(404).json({ message: 'This use does not exist' });
					}
				}
			}
		} catch (error) {
			console.error(error);
			response.status(500).json({ message: 'Internal server error' });
		}
	} else {
		response.status(405).json({ message: 'Method not allowed' });
	}
}
