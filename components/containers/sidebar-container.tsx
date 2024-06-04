import { FC, ReactNode } from 'react';
import { Header } from '../header/header';
import Sidebar from '../sidebar/sidebar';

interface SidebarContainerProps {
    children: ReactNode;
}

export const SidebarContainer: FC<SidebarContainerProps> = ({
    children
}) => {
    return (
        <div>
            <div className='container mx-auto px-2 lg:px-32 mt-6'>
                <div className='flex flex-row gap-10'>
                    <div className='hidden md:block min-w-[20ch] w-[20%]'>
                        <Sidebar />
                    </div>
                    <div className='w-full md:w-[65%]'>
                        {children}
                    </div>
                </div>
            </div>
        </div>
    )
}
