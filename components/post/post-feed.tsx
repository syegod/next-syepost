import { FC } from 'react';
import { PostCard } from './post-card/post-card';
import { get_posts } from '@/actions/post/get-posts';
import { ClientPost } from '@/types';
import { Post } from '@prisma/client';

interface PostFeedProps {
    orderBy: 'popular' | 'latest'
}

export const PostFeed: FC<PostFeedProps> = async ({
    orderBy
}) => {
    const posts = await get_posts(orderBy);

    if(!posts){
        return null;
    }

    return (
        <div className='mx-auto grid gap-y-5'>
            {posts.map((post, key) => (
                <PostCard key={key} post={post as unknown as ClientPost}/>
            ))}
        </div>
    )
}