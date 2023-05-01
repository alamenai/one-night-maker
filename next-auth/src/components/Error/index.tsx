import React from 'react';

export const Error = ({ message }: { message: string }) => {
	return (
		<div className='w-full bg-red-100 py-4 rounded-sm border-l-2 border-red-500 pl-4'>
			<p className='text-sm text-red-500'>{message}</p>
		</div>
	);
};
