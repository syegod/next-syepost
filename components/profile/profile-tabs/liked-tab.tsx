import { get_user_liked_posts } from '@/actions/profile/get-user-liked-posts';
import { PostFeed } from '@/components/post/post-feed';
import { FC } from 'react';

interface LikedTabProps {
    userId: string;
}

const LikedTab: FC<LikedTabProps> = async ({
    userId
}) => {

    const likedPosts = await get_user_liked_posts(userId);

    return (
        <PostFeed posts={likedPosts} />
    )
}
export default LikedTab