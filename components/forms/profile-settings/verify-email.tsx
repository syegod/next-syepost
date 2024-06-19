'use client'

import { send_verification_email } from '@/actions/profile/send-verify-email';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { AlertDialogWrapper } from '@/components/wrappers/alert-dialog-wrapper';
import { ClientUser } from '@/types';
import { CheckIcon } from '@radix-ui/react-icons';
import { FC } from 'react';
import { toast } from 'sonner';

interface EmailVerificationProps {
    user: ClientUser;
}

export const EmailVerification: FC<EmailVerificationProps> = ({
    user
}) => {

    return (
        <div className='grid gap-y-2'>
            <Label className='pl-1'>Email verified</Label>
            <div className='inline-flex items-center justify-between gap-x-4'>
                <Input disabled={true} name='email' type='text' value={user.emailVerified ? user.emailVerified.toLocaleDateString() : 'No'} className='w-52' />
                {!user.emailVerified &&
                    <AlertDialogWrapper action={() => {
                        send_verification_email();
                        toast.success('Check your email!');
                    }} title='Email verification' description='Are you sure you want to verify your email address? Mail with confirmation link will be sent to your email address.'>
                        <Button type='button' size={'sm'} className='px-3 inline-flex items-center gap-x-4'>
                            Verify
                            <CheckIcon />
                        </Button>
                    </AlertDialogWrapper>
                }
            </div>
        </div>
    )
}