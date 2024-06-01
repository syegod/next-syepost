import { FC } from 'react';
import { Logo } from '../logo';
import Link from 'next/link';
import { NavLink } from './nav-link';
import { auth } from '@/auth';
import { UserNav } from './user-nav';

interface HeaderProps {

}

export const Header: FC<HeaderProps> = async ({

}) => {
    const session = await auth();
    return (
        <div className='fixed border-b w-full top-0 h-14 overflow-hidden left-0 bg-background/50 z-50 backdrop-blur'>
            <div className='container mx-auto md:px-44 h-full'>
                <div className='inline-flex items-center h-full justify-between gap-10 w-full'>
                    <div className='inline-flex items-center gap-10'>
                        <Link href={'/'} className='pb-1'>
                            <Logo />
                        </Link>
                        <div className='items-center gap-10 hidden md:flex'>
                            <NavLink href='/posts'>
                                Posts
                            </NavLink>
                            <NavLink href='/communities'>
                                Communities
                            </NavLink>
                            <NavLink href='/users'>
                                Users
                            </NavLink>
                        </div>
                    </div>
                    {session ?
                        <UserNav avatarUrl={session.user?.image!}/>
                        :
                        <NavLink href='/auth/login'>
                            Sign in
                        </NavLink>
                    }
                </div>
            </div>
        </div>
    )
}