import { get_themed_posts } from '@/actions/communities/get-themed-posts';
import { PostFeed } from '@/components/post/post-feed';
import { PostFeedSkeleton } from '@/components/post/post-feed-skeleton';
import { redirect } from 'next/navigation';
import { FC, Suspense } from 'react';

interface ThemePageProps {
    params: {
        theme: string;
    }
}

const ThemePage: FC<ThemePageProps> = async ({
    params
}) => {
    if(!params.theme){
        redirect('/');
    }

    const posts = await get_themed_posts(params.theme);
    return (
        <Suspense fallback={<PostFeedSkeleton />}>
            <PostFeed posts={posts} />
        </Suspense>
        
    )
}
export default ThemePage