import { Text } from '@/components/library/Text';

export const Title = ({ title }: { title: string }) => {
	return <Text content={title} className='font-bold text-3xl my-4' />;
};
