'use client'
import { ClientUser } from '@/types';
import { FC } from 'react';
import { Button } from '../ui/button';
import { Pencil1Icon } from '@radix-ui/react-icons';
import { Input } from '../ui/input';
import { MdLockReset } from "react-icons/md";
import { AlertDialogWrapper } from '../wrappers/alert-dialog-wrapper';
import { send_reset_password_email } from '@/actions/profile/send-reset-password-email';

interface PasswordSettingsFormProps {
    user: ClientUser;
}

export const PasswordSettingsForm: FC<PasswordSettingsFormProps> = ({
    user
}) => {

    return (
        <div className='p-3 border rounded-xl grid gap-y-6'>
            <div className='grid gap-y-2'>
                <div className='font-medium'>
                    Last time reseted
                </div>
                <div className='inline-flex items-center justify-between gap-x-10'>
                    <div className=''>
                        <Input disabled={true} type='text' value={'Never'} />
                    </div>
                    <AlertDialogWrapper danger title='Password reset' description='Are you sure you want to reset your password? Mail with a link will be sent to your email address. Reset token will be valid 30 minutes.' action={async () => {
                        // 'use server'
                        await send_reset_password_email();
                    }}>
                        <Button type='button' size={'sm'} className='px-5 inline-flex items-center gap-x-3'>
                            Reset password
                            <MdLockReset size={20} />
                        </Button>
                    </AlertDialogWrapper>
                </div>
            </div>
        </div>
    )
}