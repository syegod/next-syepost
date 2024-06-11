import { get_posts } from "@/actions/post/get-posts";
import { PostFeed } from "@/components/post/post-feed";
import { PostFeedSkeleton } from "@/components/post/post-feed-skeleton";
import { Suspense } from "react";

export default async function PopularPosts() {
    const posts = await get_posts('popular');
    return (
        <div className="">
            <Suspense fallback={<PostFeedSkeleton />}>
                <PostFeed posts={posts} />
            </Suspense>
        </div>
    );
}
