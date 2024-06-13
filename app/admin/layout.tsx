import { MainContainer } from '@/components/containers/main-container';
import { SidebarContainer } from '@/components/containers/sidebar-container';
import { FC } from 'react';

interface AdminLayoutProps {
    children: React.ReactNode;
}

const AdminLayout: FC<AdminLayoutProps> = async ({
    children
}) => {

    return (
        <MainContainer>
            {children}
        </MainContainer>
    )
}
export default AdminLayout