'use client'
import { FC, FormEvent, useTransition } from 'react';
import { AutoSizeTextarea } from '../inputs/autosize-textarea';
import { Avatar } from '../user/avatar';
import { Button } from '../ui/button';
import Link from 'next/link';
import { create_comment } from '@/actions/comment/create-comment';
import { toast } from 'sonner';
import { normalizeText } from '@/lib/normalize-text';

interface CreateCommentFormProps {
    user: any | null | undefined;
    postid: string;
}

export const CreateCommentForm: FC<CreateCommentFormProps> = ({
    user,
    postid
}) => {
    const [isPending, startPending] = useTransition();

    if (!user) {
        return (
            <div className='text-lg font-medium text-center'>
                Log in to leave a comment
            </div>
        )
    }

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);

        startPending(async () => {
            const res = await create_comment(formData, postid);
            if (res.error) {
                toast.error(res.error);
            } else {
                toast.success(res.success);
            }
        });
        e.currentTarget.reset();
    }

    return (
        <form method='POST' onSubmit={(e) => handleSubmit(e)} className='grid gap-y-2'>
            <div className='inline-flex items-center gap-2 mb-2'>
                <Link href={'/profile/' + user.id} className='w-10 h-10'>
                    <Avatar user={user} src={user.image} />
                </Link>
                <div className='grid text-sm'>
                    <Link href={'/profile/' + user.id} className='font-medium hover:underline'>
                        @{user.name}
                    </Link>
                    <span className='text-xs text-muted-foreground'>
                        {normalizeText(user.role)}
                    </span>
                </div>
            </div>
            <AutoSizeTextarea name='body' disabled={isPending} classNames='mt-2' maxLength={1000} placeholder='Leave a comment' />
            <div className='inline-flex items-center justify-end w-full'>
                <Button type='submit' disabled={isPending}>
                    Comment
                </Button>
            </div>
        </form>
    )
}