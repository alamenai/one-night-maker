'use client';

import ProfileImage from '@/components/ProfileImage';
import Skeleton from '@/components/ProfileImage/skeleton';
import SearchField from '@/components/SearchField';
import React, { useMemo, useState } from 'react';

export default function Home() {

	const [path, setPath] = useState('');
	const [devName, setDevname] = useState('')
	const [isLoading, setIsLoading] = useState(false)

	const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		const { value } = event.target;
		setDevname(value)
	}

	const fetchProfile = async () => {

		setIsLoading(true);

		try {
			const response = await fetch('/api/profile', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({ devname: devName }),
				cache: 'force-cache',
			});
			const { avatarUrl } = await response.json();
			setIsLoading(false);
			return avatarUrl;
		} catch (error: any) {
			console.error(error.message);
			setIsLoading(false);
			return null;
		}

	}

	const handleSearch = (event: React.FormEvent) => {

		event.preventDefault();

		fetchProfile().then((avatarUrl) => {
			setPath(avatarUrl);
		});
	};

	return (
		<form className='inline-flex flex-col justify-center items-center mt-24 ' onSubmit={handleSearch}>
			<SearchField value={devName} onChange={onChange} />
			{isLoading ? <Skeleton /> : (path && path.length > 0) ? <ProfileImage src={path} /> : null}
		</form>
	);
}
