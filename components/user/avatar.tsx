import Image from 'next/image';
import {FC} from 'react';

interface AvatarProps {
    src: string;
}

export const Avatar: FC<AvatarProps> = ({
    src,
}) => {

  return (
    <div className='relative aspect-square w-full'>
        <Image src={src} className='absolute rounded-full object-cover w-full h-full' width={1000} height={1000} sizes='100%' alt=''/>
    </div>
  )
}