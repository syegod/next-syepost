'use client';
import Link from 'next/link';
import { FC } from 'react';
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuItem } from '../ui/dropdown-menu';
import { Avatar } from '../user/avatar';
import { SignOut } from '@/actions/sign-out';
import { User } from 'next-auth';

interface UserNavProps {
    user: User;
}

export const UserNav: FC<UserNavProps> = ({
    user
}) => {

    const handleLogout = async () => {
        await SignOut();
    }

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <button className='w-9 outline-none'>
                    <Avatar user={user} />
                </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-40 mx-2">
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild className='cursor-pointer'>
                    <Link href={'/profile'}>
                        Profile
                    </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild className='cursor-pointer'>
                    <button className='w-full' onClick={() => handleLogout()}>
                        Logout
                    </button>
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}