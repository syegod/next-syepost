import { FC } from 'react';
import { SideBarItem } from './sidebar-item';
import { FaRegClock, FaFireAlt } from 'react-icons/fa';
import { sidebar_themes } from '@/constants';
import { IoMdPeople, IoMdPerson } from 'react-icons/io';

interface SidebarProps {

}

const Sidebar: FC<SidebarProps> = async ({

}) => {

    return (
        <div className='sticky top-20 overflow-x-hidden overflow-y-auto scroll w-full pr-2 border-r max-h-[70vh]'>
            <div className='grid gap-y-2 text-sm'>
                <SideBarItem href='/' label='Latest' Icon={FaRegClock} />
                <SideBarItem href='/popular' label='Popular' Icon={FaFireAlt} />
                <hr className='my-2' />
                <SideBarItem href='/communities' label='Communities' Icon={IoMdPeople} />
                <SideBarItem href='/users' label='Users' Icon={IoMdPerson} />
                <hr className='my-2' />
                <span className='text-muted-foreground text-sm ml-1'>
                    Themes
                </span>
                {sidebar_themes.map((item, key) => (
                    <SideBarItem href={item.href} label={item.label} Icon={item?.Icon} key={key} />
                ))}
            </div>
        </div>

    )
}
export default Sidebar