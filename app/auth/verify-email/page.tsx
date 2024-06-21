'use client'
import { verify_email } from '@/actions/auth/verify-email';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { IoIosArrowRoundBack } from "react-icons/io";
import { FC, useEffect, useState, useTransition } from 'react';
import { FaSpinner } from 'react-icons/fa';

interface VerifyEmailPageProps {

}

const VerifyEmailPage: FC<VerifyEmailPageProps> = ({

}) => {
    const [error, setError] = useState<string | undefined>();
    const [isPending, startTransition] = useTransition();
    const token = useSearchParams().get('token');

    useEffect(() => {
        startTransition(async () => {
            if (token) {
                const result = await verify_email(token);
                if (result.error) {
                    setError(result.error);
                } 
            }
        })
    }, [token])

    return (
        <div className='relative mx-auto w-max mt-44 '>
            {isPending ?
                <FaSpinner className='animate-spin text-primary' size={50} />
                :
                (!error ?
                    <div className='grid gap-y-2'>
                        <div className='border rounded-lg max-w-[50ch] p-3 text-center bg-green-600 border-green-800 text-background'>
                            Your email was successfully verified. You can now return to home page.
                        </div>
                        <Link href={'/'} className='w-max mx-auto mt-5 hover:border-b border-primary transition inline-flex gap-x-2 items-center'>
                            <IoIosArrowRoundBack size={25}/>
                            <span>Return to home page</span>
                        </Link>
                    </div>
                    :
                    <div className='grid gap-y-2'>
                        <div className='border rounded-lg max-w-[50ch] p-3 text-center bg-destructive text-background'>
                            {error}
                        </div>
                        <Link href={'/'} className='w-max mx-auto mt-5 hover:border-b border-primary transition inline-flex gap-x-2 items-center'>
                            <IoIosArrowRoundBack size={25}/>
                            <span>Return to home page</span>
                        </Link>
                    </div>
                )
            }
        </div>
    )
}
export default VerifyEmailPage