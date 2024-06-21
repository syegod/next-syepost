'use client'
import { verify_reset_password_token } from '@/actions/auth/verify-reset-password-token';
import { ResetPasswordForm } from '@/components/forms/reset-password-form';
import { notFound, useSearchParams } from 'next/navigation';
import { FC, useEffect, useState, useTransition } from 'react';
import { FaSpinner } from 'react-icons/fa';

interface ResetPasswordPageProps {

}

const ResetPasswordPage: FC<ResetPasswordPageProps> = ({

}) => {
    const [isPending, startTransition] = useTransition();
    const token = useSearchParams().get('token');
    const userId = useSearchParams().get('userid');

    useEffect(() => {
        if (!token || !userId) {
            return notFound();
        }

        startTransition(async () => {
            const res = await verify_reset_password_token(token);
            if (!res) {
                return notFound();
            }
        });
    }, [token, userId])

    return (
        <div className='relative mx-auto w-max mt-32 sm:mt-44'>
            {isPending ?
                <FaSpinner className='animate-spin text-primary' size={50} />
                :
                <ResetPasswordForm userId={userId!}/>
        }
        </div>
    )
}
export default ResetPasswordPage