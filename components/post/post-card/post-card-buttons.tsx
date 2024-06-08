'use client';
import { like_post } from '@/actions/post/like-post';
import { ClientPost } from '@/types';
import { EyeOpenIcon } from '@radix-ui/react-icons';
import Link from 'next/link';
import { FC, useEffect, useState, useTransition } from 'react';
import { BiLoader, BiLoaderCircle } from 'react-icons/bi';
import { FaRegHeart, FaRegComment } from 'react-icons/fa';
import { TbArrowBigDown, TbArrowBigDownFilled, TbArrowBigUpFilled, TbArrowBigUp } from "react-icons/tb";
import { toast } from 'sonner';

interface PostCardButtonsProps {
    asPage?: boolean,
    post: ClientPost
    userId: string;
}

export const PostCardButtons: FC<PostCardButtonsProps> = ({
    asPage = false,
    post,
    userId,
}) => {

    const [isPending, startTransition] = useTransition();
    const [commented, setIsCommented] = useState<boolean>(false);
    const [liked, setIsLiked] = useState<boolean>(false);

    useEffect(() => {
        const isCommented = !!userId && post.comments.map(e => e.authorId).includes(userId);
        const isLiked = !!userId && post.likes.map(e => e.id).includes(userId);

        setIsCommented(isCommented);
        setIsLiked(isLiked)
    }, [post.comments, post.likes, userId]);

    const handleLike = async () => {
        if (userId) {
            startTransition(async () => {
                await like_post(post.id);
            });
        } else {
            toast.error('Sign in to like posts')
        }
    }

    return (
        <div className={`flex items-center w-full justify-between gap-6 text-sm`}>
            <div className='flex items-center gap-6'>
                <button disabled={isPending} title='Like' className={`${liked ? `hover:bg-background hover:text-primary text-background bg-primary` : `hover:bg-primary hover:text-background bg-transparent`} px-4 py-1 border border-primary inline-flex gap-2 items-center text-sm rounded-full transition`} id='like' onClick={() => handleLike()}>
                    {liked === true ? <TbArrowBigUpFilled /> : <TbArrowBigUp />}
                    {isPending ? <BiLoader className='animate-spin' size={20}/> : <span>{post.likes?.length | 0}</span>}
                </button>
                {!asPage && <Link href={`/post/${post?.id}#comments`} title='Comments' className={`${commented ? `hover:bg-background hover:text-primary text-background bg-primary` : `hover:bg-primary hover:text-background bg-transparent`} px-4 py-1 border border-primary rounded-full transition flex gap-2 items-center`}>
                    <FaRegComment />
                    <span>{post.comments?.length || 0}</span>
                </Link>}
            </div>
            <div className='inline-flex items-center rounded-full gap-1 px-2 py-1' title='Views'>
                <EyeOpenIcon />
                <span>{post.views}</span>
            </div>
        </div>
    )
}