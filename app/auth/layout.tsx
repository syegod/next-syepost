import { MainContainer } from '@/components/containers/main-container';
import {FC, ReactNode} from 'react';

interface AuthLayoutProps {
    children: ReactNode;
}

const AuthLayout: FC<AuthLayoutProps> = async ({
    children
}) => {

  return (
    <MainContainer>
        {children}
    </MainContainer>
)
}
export default AuthLayout