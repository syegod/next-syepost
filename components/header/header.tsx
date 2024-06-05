import { FC } from 'react';
import { Logo } from '../logo';
import Link from 'next/link';
import { NavLink } from './nav-link';
import { auth } from '@/auth';
import { UserNav } from './user-nav';
import { SwitchTheme } from './switch-theme';
import { GoPlusCircle } from "react-icons/go";

interface HeaderProps {

}

export const Header: FC<HeaderProps> = async ({

}) => {
    const session = await auth();
    return (
        <div className='sticky border-b w-full top-0 h-14 overflow-hidden left-0 bg-background/50 z-50 backdrop-blur overflow-x-hidden'>
            <div className='container mx-auto lg:px-32 h-full'>
                <div className='inline-flex items-center h-full justify-between gap-10 w-full'>
                    <Link href={'/'} className='pb-1'>
                        <Logo />
                    </Link>
                    <div className='inline-flex items-center gap-10'>
                        <Link href={'/post/create'} title='Create new post'>
                            <GoPlusCircle size={20} />
                        </Link>
                        <SwitchTheme />
                        <div>
                            {session ?
                                <UserNav user={session.user!} />
                                :
                                <NavLink href='/auth/login'>
                                    Sign in
                                </NavLink>
                            }
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}