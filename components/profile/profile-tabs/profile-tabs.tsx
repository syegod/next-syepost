import { FC, Suspense } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import PostCardSkeleton from '@/components/post/post-card/post-card-skeleton/post-card-skeleton';
import PostsTab from './posts-tab';
import LikedTab from './liked-tab';
import CommentsTab from './comments-tab';


interface ProfileTabsProps {
    userId: string;
}

export const ProfileTabs: FC<ProfileTabsProps> = async ({
    userId
}) => {
    return (
        <Tabs defaultValue="posts" className="w-full">
            <TabsList>
                <TabsTrigger value="posts">Posts</TabsTrigger>
                <TabsTrigger value="liked">Liked</TabsTrigger>
                <TabsTrigger value="comments">Comments</TabsTrigger>
            </TabsList>
            <TabsContent value="posts">
                <Suspense fallback={<PostCardSkeleton />}>
                    <PostsTab userId={userId} />
                </Suspense>
            </TabsContent>
            <TabsContent value="liked">
                <Suspense fallback={<PostCardSkeleton />}>
                    <LikedTab userId={userId} />
                </Suspense>
            </TabsContent>
            <TabsContent value="comments">
                <Suspense fallback={<PostCardSkeleton />}>
                    <CommentsTab userId={userId} />
                </Suspense>
            </TabsContent>
        </Tabs>
    )
}