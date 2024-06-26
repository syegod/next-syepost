import { FC, ReactNode } from 'react';
import { Header } from '../header/header';
import Sidebar from '../sidebar/sidebar';

interface MainContainerProps {
    children: ReactNode;
}

export const MainContainer: FC<MainContainerProps> = ({
    children
}) => {
    return (
        <div>
            <div className='container mx-auto px-2 lg:px-32'>
                {children}
            </div>
        </div>
    )
}
