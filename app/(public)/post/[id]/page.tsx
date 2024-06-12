import { PostCardButtons } from '@/components/post/post-card/post-card-buttons';
import PostCardSkeleton from '@/components/post/post-card/post-card-skeleton/post-card-skeleton';
import { Avatar } from '@/components/user/avatar';
import { post_themes } from '@/constants';
import { get_post } from '@/actions/post/get-post';
import Link from 'next/link';
import { notFound, redirect } from 'next/navigation';
import { FC, Suspense } from 'react';
import Image from 'next/image';
import { getTime } from '@/lib/convert-time';
import { CreateCommentForm } from '@/components/forms/create-comment-form';
import { auth } from '@/auth';
import { CommentCard } from '@/components/post/comment/comment-card';
import { ClientComment, ClientPost } from '@/types';
import { ButtonDropdown } from '@/components/post/button-dropdown';
import { delete_post } from '@/actions/post/delete-post';

interface PostPageProps {
    params: any
}

const PostPage: FC<PostPageProps> = async ({
    params
}) => {
    const { id } = params;

    const session = await auth();
    const post = await get_post(id);

    if (!post) {
        notFound();
    }

    return (
        <Suspense fallback={<PostCardSkeleton />}>
            <div className='w-full grid gap-6 rounded-lg transition '>
                <div className='flex items-center justify-between gap-2'>
                    <div className='flex items-center gap-3'>
                        <Link href={'/profile/' + post.authorId} className='w-10'>
                            <Avatar src={post.author.image} user={post.author} />
                        </Link>
                        <div className='grid'>
                            <Link href={'/profile/' + post.authorId} className='hover:underline text-sm font-medium'>
                                @{post.author.name}
                            </Link>
                            <div className='text-xs flex items-center gap-1 text-muted-foreground'>
                                <Link href={'/communities/' + post.theme} className='hover:underline'>{post_themes.filter(e => e.value === post.theme).map(e => e.label)?.[0]}</Link>
                                <span>·</span>
                                <span>{getTime(post.createdAt)}</span>
                            </div>
                        </div>
                    </div>
                    {session && (session?.user.id === post.authorId || session?.user?.role === 'ADMIN') &&
                        <ButtonDropdown handleSubmit={async () => {
                            'use server'
                            const res = await delete_post(post.id)
                            if (res.success) {
                                redirect('/');
                            }
                        }} />
                    }
                </div>
                <div className='grid gap-4 overflow-hidden'>
                    <div className='space-y-2'>
                        {post.images.length > 0 && post.images.map((item, key) => (
                            <div key={key} className='overflow-hidden relative'>
                                <Image src={item} alt='' sizes='100%' width={1000} height={1000} className='rounded-lg object-cover max-h-[350px]' />
                            </div>
                        ))}
                        <div className='text-lg font-semibold tracking-tight leading-tight pt-2 overflow-hidden'>
                            {post.title}
                        </div>
                        <div className='overflow-hidden'>
                            {post.text}
                        </div>
                    </div>
                    {/* TODO: functional likes */}
                </div>
                <hr />
                <PostCardButtons userId={session?.user.id!} post={post as unknown as ClientPost} asPage={true} />
            </div>
            <div className='grid gap-y-4 mt-10'>
                <CreateCommentForm user={session?.user} postid={post.id} />
                <span className='text-lg font-medium'>{post.comments.length} comments</span>
                {post.comments.length > 0 ? (
                    post.comments.map((item, key) => (
                        <CommentCard key={key} comment={item as unknown as ClientComment} />
                    ))
                ) : (
                    <div className='text-lg font-semibold text-muted-foreground text-center mt-5'>
                        No comments yet
                    </div>
                )}
            </div>
        </Suspense>

    )
}
export default PostPage