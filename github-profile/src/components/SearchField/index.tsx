import { ChangeEvent } from "react";

const SearchField = ({ value, onChange }: { value: string, onChange: (event: ChangeEvent<HTMLInputElement>) => void }) => {
	return (
		<input
			type='text'
			placeholder="Enter a developer's name ..."
			className='border px-4 py-2 my-4 bg-slate-100 '
			value={value}
			onChange={onChange}
		/>
	);
};
export default SearchField;
