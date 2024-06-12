'use client';
import { FC } from 'react';
import { Avatar } from '../user/avatar';
import { ClientUser } from '@/types';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { CheckIcon, Pencil1Icon } from '@radix-ui/react-icons';
import { normalizeText } from '@/lib/normalize-text';

interface ProfileSettingsFormProps {
    user: ClientUser;
}

export const ProfileSettingsForm: FC<ProfileSettingsFormProps> = ({
    user
}) => {

    return (
        <form className='border w-full rounded-xl p-2 sm:py-3 sm:px-5 grid gap-y-8'>
            <div className='inline-flex items-center justify-between gap-x-4'>
                <div className='w-16'>
                    <Avatar user={user} />
                </div>
                <Button type='button' size={'sm'} className='px-3 inline-flex items-center gap-x-4'>
                    Edit
                    <Pencil1Icon />
                </Button>
            </div>
            <div className='grid gap-y-2'>
                <Label className='pl-1'>Username</Label>
                <div className='inline-flex items-center justify-between gap-x-4'>
                    <Input disabled={true} value={user.name} className='w-52' />
                    <Button type='button' size={'sm'} className='px-3 inline-flex items-center gap-x-4'>
                        Edit
                        <Pencil1Icon />
                    </Button>
                </div>
            </div>
            <div className='grid gap-y-2'>
                <Label className='pl-1'>Email</Label>
                <div className='inline-flex items-center justify-between gap-x-4'>
                    <Input disabled={true} name='email' type='email' value={user.email} className='w-52' />
                    <Button type='button' size={'sm'} className='px-3 inline-flex items-center gap-x-4'>
                        Edit
                        <Pencil1Icon />
                    </Button>
                </div>
            </div>
            <div className='grid gap-y-2'>
                <Label className='pl-1'>Email verified</Label>
                <div className='inline-flex items-center justify-between gap-x-4'>
                    <Input disabled={true} name='email' type='text' value={user.emailVerified ? user.emailVerified.toLocaleDateString() : 'No'} className='w-52' />
                    {!user.emailVerified &&
                        <Button type='button' size={'sm'} className='px-3 inline-flex items-center gap-x-4'>
                            Confirm
                            <CheckIcon />
                        </Button>
                    }
                </div>
            </div>
            <div className='grid gap-y-2'>
                <Label className='pl-1'>Role</Label>
                <div className='inline-flex items-center justify-between gap-x-4'>
                    <Input disabled={true} name='email' type='text' value={normalizeText(user.role)} className='w-52' />
                </div>
            </div>
        </form>
    )
}