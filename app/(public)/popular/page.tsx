import { PostFeed } from "@/components/post/post-feed";
import { PostFeedSkeleton } from "@/components/post/post-feed-skeleton";
import { Suspense } from "react";

export default function PopularPosts() {

    return (
        <div className="">
            <Suspense fallback={<PostFeedSkeleton />}>
                <PostFeed orderBy="popular" />
            </Suspense>
        </div>
    );
}
