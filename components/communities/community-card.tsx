import Link from 'next/link';
import {FC} from 'react';
import { IconType } from 'react-icons/lib';

interface CommunityCardProps {
    data: {
        label: string;
        href: string;
        Icon?: IconType;
    }
}

export const CommunityCard: FC<CommunityCardProps> = ({
    data
}) => {

  return (
    <Link href={data.href} className='rounded-lg bg-primary text-background items-center hover:bg-primary/90 px-10 py-10 grid gap-y-2 transition'>
        <div className='mx-auto'>
            {data.Icon && <data.Icon size={30}/>}
        </div>
        <div className=''>
            {data.label}
        </div>
    </Link>
  )
}