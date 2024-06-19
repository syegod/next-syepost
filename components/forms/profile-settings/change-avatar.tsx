'use client'
import { Button } from '@/components/ui/button';
import { Avatar } from '@/components/user/avatar';
import { ClientUser } from '@/types';
import { CheckCircledIcon, Cross1Icon, Pencil1Icon } from '@radix-ui/react-icons';
import { FC, useEffect, useState, useTransition } from 'react';
import { IImage } from '../create-post-form';
import { AddImage } from '../add-image';
import { change_avatar } from '@/actions/profile/change-avatar';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';

interface ChangeAvatarProps {
    user: ClientUser;
}

export const ChangeAvatar: FC<ChangeAvatarProps> = ({
    user
}) => {
    const [isPending, startTransition] = useTransition();
    const [image, setImage] = useState<File | undefined>(undefined);
    const router = useRouter();

    const handleSubmit = () => {
        if (image) {
            const formData = new FormData();
            formData.append('image', image);
            startTransition(async () => {
                const res = await change_avatar(formData);
                if(res.error){
                    toast.error(res.error);
                    return;
                } else {
                    toast.success(res.success);
                    setImage(undefined);
                    router.refresh();
                    return;
                }
            });
            return;
        } else {
            return;
        }
    }

    return (
        <div className='inline-flex items-center justify-between gap-x-4'>
            <div className='w-16'>
                {image ? <Avatar src={URL.createObjectURL(image)} /> : <Avatar user={user} />}
            </div>
            <div className='inline-flex items-center gap-x-2'>
                <AddImage disabled={isPending} handleChange={setImage} buttonInner={
                    <div className='inline-flex items-center gap-x-4'>
                        Change
                        <Pencil1Icon />
                    </div>
                } />
                {image &&
                    <>
                        <Button disabled={isPending} type='button' onClick={handleSubmit} size={'sm'} className='inline-flex items-center gap-x-4'>
                            Submit
                            <CheckCircledIcon className='scale-110' />
                        </Button>
                        <Button type='button' disabled={isPending} variant={'destructive'} onClick={() => setImage(undefined)} size={'sm'} className='inline-flex items-center gap-x-4'>
                            {/* Discard */}
                            <Cross1Icon className='scale-110' />
                        </Button>
                    </>
                }
            </div>
        </div>
    )
}