'use client'

import { FC, FormEvent, useState, useTransition } from 'react';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Button } from '../ui/button';
import { reset_password } from '@/actions/auth/reset-password';
import { toast } from 'sonner';
import { FormError } from './form-error';
import { FormSuccess } from './form-success';
import Link from 'next/link';

interface ResetPasswordFormProps {
    userId: string
}

export const ResetPasswordForm: FC<ResetPasswordFormProps> = ({
    userId
}) => {
    const [isPending, startTransition] = useTransition();
    const [error, setError] = useState<string | undefined>(undefined);
    const [success, setSuccess] = useState<string | undefined>(undefined);

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        startTransition(async () => {
            const res = await reset_password(formData, userId);
            if (res.error) {
                setError(res.error);
            } else {
                setSuccess(res.success);
            }
        });
    }

    if (success) {
        return (
            <div className='grid gap-y-2 items-center'>
                <FormSuccess message={success} />
                <Link href='/' className='w-max mx-auto underline'>Back to the main page</Link>
            </div>
        )
    } else {
        return (
            <form onSubmit={e => handleSubmit(e)} onChange={() => setError(undefined)} className='border p-3 rounded-lg grid gap-y-4'>
                <div className='grid text-center'>
                    <span className='text-lg font-medium'>
                        Create new password
                    </span>
                    <span className='text-muted-foreground text-sm'>
                        Enter new password here
                    </span>
                </div>
                <div className='grid gap-y-1'>
                    <Label>Password</Label>
                    <Input name='password' disabled={isPending} type='password' className='w-[30ch]' />
                </div>
                <div className='grid gap-y-1'>
                    <Label>Confirm password</Label>
                    <Input name='passwordConfirm' disabled={isPending} type='password' className='w-[30ch]' />
                </div>
                <FormError message={error} />
                <Button type='submit' disabled={isPending}>
                    Submit
                </Button>
            </form>
        )
    }
}