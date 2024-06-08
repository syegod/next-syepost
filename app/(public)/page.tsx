import { get_posts } from "@/actions/post/get-posts";
import { PostFeed } from "@/components/post/post-feed";
import { PostFeedSkeleton } from "@/components/post/post-feed-skeleton";
import { Suspense } from "react";

export default async function Home() {
  return (
    <div>
      <Suspense fallback={<PostFeedSkeleton />}>
        <PostFeed orderBy="latest"/>
      </Suspense>
    </div>
  );
}
