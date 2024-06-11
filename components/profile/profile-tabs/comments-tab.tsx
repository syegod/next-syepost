import { get_user_comments } from '@/actions/profile/get-user-comments';
import { CommentCard } from '@/components/post/comment/comment-card';
import { PostFeed } from '@/components/post/post-feed';
import { ClientComment } from '@/types';
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
                <CommentCard key={key} comment={item as unknown as ClientComment} />
            ))}
        </div>
    )
}
export default CommentsTab