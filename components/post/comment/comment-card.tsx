import { delete_comment } from '@/actions/comment/delete-comment';
import { Avatar } from '@/components/user/avatar';
import { getTime } from '@/lib/convert-time';
import { ClientComment } from '@/types';
import Link from 'next/link';
import { FC } from 'react';
import { ButtonDropdown } from '../button-dropdown';
import { auth } from '@/auth';
import { redirect } from 'next/navigation';
import { toast } from 'sonner';

interface CommentCardProps {
    comment: ClientComment
}

export const CommentCard: FC<CommentCardProps> = async ({
    comment
}) => {

    const session = await auth();

    if (!comment) {
        return null;
    }

    return (
        <div className='w-full grid gap-2 rounded-lg p-3 transition border '>
            <div className='flex items-center justify-between gap-2'>
                <div className='flex items-center gap-3'>
                    <Link href={'/profile/' + comment?.author.id} className='w-10'>
                        <Avatar src={comment.author.image} user={comment?.author} />
                    </Link>
                    <div className='grid'>
                        <Link href={'/profile/' + comment?.authorId} className='hover:underline text-sm font-medium'>
                            @{comment?.author.name}
                        </Link>
                        <div className='text-xs flex items-center gap-1 text-muted-foreground'>
                            <span>{comment && getTime(comment?.createdAt)}</span>
                        </div>
                    </div>
                </div>
                {session && (session?.user.id === comment.authorId || session?.user?.role === 'ADMIN') &&
                    <ButtonDropdown handleSubmit={async () => {
                        'use server'
                        await delete_comment(comment.id)
                    }} />
                }
            </div>
            <div className='text-sm line-clamp-4 overflow-hidden'>
                {comment?.text}
            </div>
        </div>
    )
}