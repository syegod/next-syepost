import { SidebarContainer } from '@/components/containers/sidebar-container';
import { MainContainer } from '@/components/containers/main-container';
import { FC, ReactNode } from 'react';

interface ProtectedLayoutProps {
    children: ReactNode;
}

const ProtectedLayout: FC<ProtectedLayoutProps> = async ({
    children
}) => {

    return (
        <SidebarContainer>
            {children}
        </SidebarContainer>
    )
}
export default ProtectedLayout