'use client';
import Link from 'next/link';
import { FC } from 'react';
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuItem } from '../ui/dropdown-menu';
import { Avatar } from '../user/avatar';
import { SignOut } from '@/actions/sign-out';

interface UserNavProps {
    avatarUrl: string;
}

export const UserNav: FC<UserNavProps> = ({
    avatarUrl
}) => {

    const handleLogout = async () => {
        await SignOut();
    }

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <button className='w-9 outline-none'>
                    <Avatar src={avatarUrl} />
                </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-40 mx-2">
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                    <Link href={'/profile'}>
                        Profile
                    </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                    <button className='w-full' onClick={() => handleLogout()}>
                        Logout
                    </button>
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}