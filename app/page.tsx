import { PostFeed } from "@/components/post/post-feed";
import Image from "next/image";

export default function Home() {
  return (
    <div className="py-5 px-2">
      <PostFeed/>
    </div>
  );
}
