import { FC } from 'react';
import { ClientUser } from '@/types';
import { Input } from '../../ui/input';
import { Label } from '../../ui/label';
import { normalizeText } from '@/lib/normalize-text';
import { ChangeUsername } from './change-username';
import { ChangeAvatar } from './change-avatar';
import { ChangeEmail } from './change-email';
import { EmailVerification } from './verify-email';

interface ProfileSettingsFormProps {
    user: ClientUser;
}

export const ProfileSettingsForm: FC<ProfileSettingsFormProps> = ({
    user
}) => {

    return (
        <div className='border w-full rounded-xl p-2 sm:py-3 sm:px-5 grid gap-y-8'>
            <ChangeAvatar user={user} />
            <ChangeUsername user={user} />
            <ChangeEmail user={user} />
            <EmailVerification user={user}/>            
            <div className='grid gap-y-2'>
                <Label className='pl-1'>Role</Label>
                <div className='inline-flex items-center justify-between gap-x-4'>
                    <Input disabled={true} name='email' type='text' value={normalizeText(user.role)} className='w-52' />
                </div>
            </div>
        </div>
    )
}