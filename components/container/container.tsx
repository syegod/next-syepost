import { FC, ReactNode } from 'react';
import { Header } from '../header/header';

interface ContainerProps {
    children: ReactNode;
}

export const Container: FC<ContainerProps> = ({
    children
}) => {

    return (
        <div>
            <Header/>
            <div className='sm:container mx-auto md:px-44 pt-16'>
                {children}
            </div>
        </div>
    )
}