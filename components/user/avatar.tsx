import { User } from 'next-auth';
import Image from 'next/image';
import { FC } from 'react';

interface AvatarProps {
  user?: User;
  src?: string;
}

export const Avatar: FC<AvatarProps> = ({
  user,
  src
}) => {

  if (!user && !src) {
    return null;
  }

  if (user && !user?.image && !src) {
    return (
      <div className='relative aspect-square w-full rounded-full bg-primary text-background overflow-hidden'>
        <div className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 font-bold'>
          {user.name?.charAt(0).toLocaleUpperCase()! + user.name?.charAt(1).toLocaleUpperCase()!}
        </div>
      </div>
    )
  }

  if (user?.image) {
    return (
      <div className='relative aspect-square w-full rounded-full overflow-hidden'>
        <Image src={user.image} className='absolute object-cover w-full h-full' width={1000} height={1000} sizes='100%' alt='' />
      </div>
    )
  }

  if (src) {
    return (
      <div className='relative aspect-square w-full rounded-full transition overflow-hidden'>
        <Image src={src} className='absolute object-cover w-full h-full' width={1000} height={1000} sizes='100%' alt='' />
      </div>
    )
  }
}