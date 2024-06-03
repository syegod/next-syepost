import Link from 'next/link';
import { FC } from 'react';
import { FaGoogle } from 'react-icons/fa';
import { IconType } from 'react-icons/lib';

interface SideBarItemProps {
    label: string;
    href: string;
    Icon?: IconType;
}

export const SideBarItem: FC<SideBarItemProps> = ({
    label,
    href,
    Icon
}) => {

    return (
        <Link href={href} className='hover:bg-muted-foreground transition py-1.5 px-2 rounded inline-flex items-center justify-between hover:text-background' title={label}>
            <span className='max-w-[12ch] truncate'>
                {label}
            </span>
            {Icon && <Icon />}
        </Link>
    )
}