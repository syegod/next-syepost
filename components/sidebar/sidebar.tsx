'use client'
import { FC } from 'react';
import { SideBarItem } from './sidebar-item';
import { FaRegClock, FaFireAlt } from 'react-icons/fa';
import { sidebar_themes } from '@/constants';
import { IoMdPeople, IoMdPerson } from 'react-icons/io';
import { usePathname } from 'next/navigation';
import path from 'path';

interface SidebarProps {

}

const Sidebar: FC<SidebarProps> = ({

}) => {

    const pathname = usePathname();

    return (
        <section className='sticky top-20 overflow-x-hidden overflow-y-auto scroll w-full pr-2 border-r max-h-[80vh]'>
            <div className='grid gap-y-2 text-sm'>
                <SideBarItem isActive={pathname === '/'} href='/' label='Latest' Icon={FaRegClock} />
                <SideBarItem isActive={pathname === '/popular'} href='/popular' label='Popular' Icon={FaFireAlt} />
                <hr className='my-2' />
                <SideBarItem isActive={pathname === '/communities'} href='/communities' label='Communities' Icon={IoMdPeople} />
                <SideBarItem isActive={pathname.startsWith('/profile')} href='/users' label='Users' Icon={IoMdPerson} />
                <hr className='my-2' />
                <span className='text-muted-foreground text-sm ml-1'>
                    Themes
                </span>
                {sidebar_themes.map((item, key) => (
                    <SideBarItem isActive={pathname === item.href} href={item.href} label={item.label} Icon={item?.Icon} key={key} />
                ))}
            </div>
        </section>

    )
}
export default Sidebar