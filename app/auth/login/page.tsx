import { LoginForm } from '@/components/forms/login-form';
import {FC} from 'react';

interface LoginPageProps {
  
}

const LoginPage: FC<LoginPageProps> = async ({
  
}) => {

  return (
    <div className='mx-auto w-max pt-10 sm:pt-28 pb-10'>
        <LoginForm/>
    </div>
  )
}
export default LoginPage