import { get_user_comments } from '@/actions/profile/get-user-comments';
import { CommentCard } from '@/components/post/comment/comment-card';
import { PostFeed } from '@/components/post/post-feed';
import { ClientComment } from '@/types';
import Link from 'next/link';
import { FC } from 'react';

interface CommentsTabProps {
    userId: string
}

const CommentsTab: FC<CommentsTabProps> = async ({
    userId
}) => {

    const comments = await get_user_comments(userId);

    if (!comments || comments.length === 0) {
        return (
            <div className='text-muted-foreground w-full text-center'>
                No comments found
            </div>
        )
    }

    return (
        <div className='mx-auto grid gap-y-6'>
            {comments.map((item, key) => (
                <div key={key} className='grid gap-y-2 rounded-lg border p-3'>
                    <Link href={`/post/${item.postId}`} className='font-medium underline px-2'>To post</Link>
                    <CommentCard comment={item as unknown as ClientComment} />
                </div>
            ))}
        </div>
    )
}
export default CommentsTab