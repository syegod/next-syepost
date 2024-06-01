import { RegisterForm } from '@/components/forms/register-form';
import { FC } from 'react';

interface RegisterPageProps {

}

const RegisterPage: FC<RegisterPageProps> = async ({

}) => {

    return (
        <div className='mx-auto w-max pt-10 sm:pt-28 pb-10'>
            <RegisterForm />
        </div>
    )
}
export default RegisterPage