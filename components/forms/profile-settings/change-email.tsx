'use client'

import { change_email } from '@/actions/profile/change-email';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { ClientUser } from '@/types';
import { ChangeEmailSchema } from '@/zod';
import { CheckCircledIcon, Cross1Icon, Pencil1Icon } from '@radix-ui/react-icons';
import { ChangeEvent, FC, useState } from 'react';
import { toast } from 'sonner';

interface ChangeEmailProps {
    user: ClientUser;
}

export const ChangeEmail: FC<ChangeEmailProps> = ({
    user
}) => {
    const [email, setEmail] = useState({
        disabled: true,
        value: user.email
    });
    const [error, setError] = useState<string | undefined>(undefined);

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        setError(undefined);
        const value = e.currentTarget.value;
        setEmail({ ...email, value: value });
    }

    const handleSubmit = async () => {
        if (email.value === user.email) {
            setEmail({ ...email, disabled: true });
            return;
        }
        const validated = ChangeEmailSchema.safeParse(email.value);
        if (validated.error) {
            setError(validated.error.errors[0].message);
            return;
        }
        const res = await change_email(validated.data);
        if (res.error) {
            toast.error(res.error);
            return;
        }
        if (res.success) {
            toast.success(res.success);
            setEmail({ ...email, disabled: true });
        }
    }

    return (
        <div className='grid gap-y-1'>
            <Label className='pl-1 mb-1'>Email</Label>
            <div className='inline-flex items-center justify-between gap-x-4'>
                <Input disabled={email.disabled} value={email.value} onChange={(e) => handleChange(e)} className='w-52 disabled:ring-0 ring-1 ring-primary' maxLength={30} />
                {email.disabled ?
                    <Button onClick={() => setEmail({ ...email, disabled: false })} type='button' size={'sm'} className='px-3 inline-flex items-center gap-x-4'>
                        Edit
                        <Pencil1Icon />
                    </Button>
                    :
                    <div className='inline-flex items-center gap-x-2'>
                        <Button type='button' onClick={handleSubmit} size={'sm'} className='px-3 inline-flex items-center gap-x-4'>
                            Submit
                            <CheckCircledIcon className='scale-110' />
                        </Button>
                        <Button type='button' variant={'destructive'} onClick={() => setEmail({disabled: true, value: user.email})} size={'sm'} className='inline-flex items-center gap-x-4'>
                            <Cross1Icon className='scale-110' />
                        </Button>
                    </div>
                }
            </div>
            <div className='text-rose-500 text-xs px-1 max-w-52 line-clamp-3'>
                {error}
            </div>
        </div>
    )
}