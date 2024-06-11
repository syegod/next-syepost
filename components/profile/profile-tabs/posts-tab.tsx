import { get_user_posts } from '@/actions/profile/get-user-posts';
import { PostFeed } from '@/components/post/post-feed';
import { Post } from '@prisma/client';
import { FC } from 'react';

interface PostsTabProps {
    userId: string;
}

const PostsTab: FC<PostsTabProps> = async ({
    userId
}) => {
    const userPosts = await get_user_posts(userId);

    return (
        <PostFeed posts={userPosts} />
    )
}
export default PostsTab