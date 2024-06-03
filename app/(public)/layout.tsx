import { SidebarContainer } from '@/components/containers/sidebar-container';
import { FC } from 'react';

interface PublicLayoutProps {
    children: React.ReactNode;
}

const PublicLayout: FC<PublicLayoutProps> = async ({
    children
}) => {

    return (
        <SidebarContainer>
            {children}
        </SidebarContainer>
    )
}
export default PublicLayout