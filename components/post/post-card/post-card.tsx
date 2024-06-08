import { Avatar } from '@/components/user/avatar';
import Link from 'next/link';
import { FC } from 'react';
import Image from 'next/image';
import { PostCardButtons } from './post-card-buttons';
import { ClientPost } from '@/types';
import { post_themes } from '@/constants';
import { getTime } from '@/lib/convert-time';
import { ButtonDropdown } from '../button-dropdown';
import { auth } from '@/auth';
import { delete_post } from '@/actions/post/delete-post';
import { toast } from 'sonner';
import { redirect } from 'next/navigation';

interface PostCardProps {
    post: ClientPost;
}

export const PostCard: FC<PostCardProps> = async ({
    post,
}) => {

    const session = await auth();

    if (!post) {
        return null;
    }

    return (
        <div className='w-full grid gap-4 hover:bg-muted rounded-lg p-3 transition border '>
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
                                await delete_post(post.id)
                            }} />
                        }
            </div>
            <div className='grid gap-4 overflow-hidden'>
                <Link href={'/post/' + post.id} className='space-y-2 cursor-pointer'>
                    <div className='overflow-hidden relative'>
                        {post.images.length > 0 && <Image src={post.images[0]} alt='' sizes='100%' width={1000} height={1000} className='rounded-lg object-cover max-h-[350px]' />}
                    </div>
                    <div className='text-lg font-semibold tracking-tight leading-tight line-clamp-2 pt-2 overflow-hidden'>
                        {post.title}
                    </div>
                    <div className='text-sm line-clamp-4 overflow-hidden'>
                        {post.text}
                    </div>
                </Link>
                <PostCardButtons post={post} asPage={false} userId={session?.user.id!}/>
            </div>
        </div>
    )

}