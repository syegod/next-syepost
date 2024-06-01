import { FC } from 'react';
import { PostCard } from './post-card/post-card';

interface PostFeedProps {

}

export const PostFeed: FC<PostFeedProps> = ({

}) => {

    return (
        <div className='max-w-screen-sm mx-auto grid gap-y-5'>
            <PostCard/>
            <PostCard/>
            <PostCard/>
            <PostCard/>
            <PostCard/>
        </div>
    )
}