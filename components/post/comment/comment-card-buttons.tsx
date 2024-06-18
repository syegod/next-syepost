'use client'
import { like_comment } from '@/actions/comment/like-comment';
import { ClientComment } from '@/types';
import { FC, useEffect, useState, useTransition } from 'react';
import { BiLoader } from 'react-icons/bi';
import { FaHeart, FaRegHeart } from 'react-icons/fa';
import { toast } from 'sonner';

interface CommentCardButtonsProps {
    comment: ClientComment;
    userId?: string | null;
}

export const CommentCardButtons: FC<CommentCardButtonsProps> = ({
    comment,
    userId
}) => {

    const [liked, setIsLiked] = useState<boolean>(false);
    const [isPending, startTransition] = useTransition();

    useEffect(() => {
        const isLiked = !!userId && comment.likes?.map((e: any) => e.id).includes(userId);

        setIsLiked(isLiked);
    }, [comment.likes, userId]);

    const handleLike = async () => {
        if (userId) {
            startTransition(async () => {
                const res = await like_comment(comment.id);
                if(res?.error){
                    toast.error(res.error);
                }
            });
        } else {
            toast.error('Sign in to like comments');
        }
    }


    return (
        <div>
            <button disabled={isPending} title='Like' className={`${liked ? `hover:bg-background hover:text-primary text-background bg-primary` : `hover:bg-primary hover:text-background bg-transparent`} px-4 py-1 border border-primary inline-flex gap-2 items-center text-sm rounded-full transition`} id='like' onClick={() => handleLike()}>
                {liked === true ? <FaHeart className='text-rose-500' /> : <FaRegHeart />}
                {isPending ? <BiLoader className='animate-spin' size={20} /> : <span>{comment.likes?.length | 0}</span>}
            </button>
        </div>
    )
}