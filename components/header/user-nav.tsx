'use client';
import Link from 'next/link';
import { FC } from 'react';
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuItem } from '../ui/dropdown-menu';
import { Avatar } from '../user/avatar';
import { SignOut } from '@/actions/auth/sign-out';
import { User } from 'next-auth';
import { AlertDialogWrapper } from '../wrappers/alert-dialog-wrapper';

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
                    <AlertDialogWrapper danger title='Log out from your account' description='Are you sure you want logout?' action={handleLogout}>
                        <button className='w-full text-start text-sm px-2 hover:bg-muted py-1.5 rounded'>
                            Logout
                        </button>
                    </AlertDialogWrapper>
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}