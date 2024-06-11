import { FC } from 'react';
import { PostCard } from './post-card/post-card';
import { get_posts } from '@/actions/post/get-posts';
import { ClientPost } from '@/types';
import { Post } from '@prisma/client';

interface PostFeedProps {
    posts?: Post[] | null
}

export const PostFeed: FC<PostFeedProps> = async ({
    posts
}) => {
    if (!posts || posts.length === 0) {
        return (
            <div className='text-muted-foreground w-full text-center'>
                No posts found
            </div>
        )
    }

    return (
        <div className='mx-auto grid gap-y-5'>
            {posts.map((post, key) => (
                <PostCard key={key} post={post as unknown as ClientPost} />
            ))}
        </div>
    )
}