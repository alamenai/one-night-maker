import Image from 'next/image';

const ProfileImage = ({ src }: { src: string }) => {
	return <Image src={src} width={200} height={200} alt={'picture'} style={{ borderRadius: '50%' }} />;
};

export default ProfileImage;
