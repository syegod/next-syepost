'use client';
import Link from 'next/link';
import { FC, useState } from 'react';
import { BiRepost } from 'react-icons/bi';
import { FaRegHeart, FaRegComment } from 'react-icons/fa';
import { TbArrowBigDown, TbArrowBigDownFilled, TbArrowBigUpFilled, TbArrowBigUp } from "react-icons/tb";

interface PostCardButtonsProps {

}

export const PostCardButtons: FC<PostCardButtonsProps> = ({

}) => {
    const [liked, setLiked] = useState<boolean | undefined>(undefined);

    const handleLike = (id: string) => {
        if(id === 'like'){
            if(liked === true){
                setLiked(undefined);
            } else {
                setLiked(true);
            }
        } else {
            if(liked === false){
                setLiked(undefined);
            } else {
                setLiked(false);
            }
        }
    }

    return (
        <div className='flex items-center gap-6 text-sm'>
            <div className='rounded-full border border-muted-foreground/60 divide-x divide-muted-foreground/60'>
                <button className='hover:bg-primary hover:text-background bg-tranparent px-2 pr-2 py-1 inline-flex gap-2 items-center text-sm rounded-l-full transition' id='like' onClick={(e) => handleLike(e.currentTarget.id)}>
                    {liked === true ? <TbArrowBigUpFilled /> : <TbArrowBigUp />}
                    <span>9534</span>
                </button>
                <button className='hover:bg-primary hover:text-background bg-tranparent pl-2 pr-4 py-1 inline-flex gap-2 items-center text-sm rounded-r-full transition' id='dislike' onClick={(e) => handleLike(e.currentTarget.id)}>
                    {liked === false ? <TbArrowBigDownFilled /> : <TbArrowBigDown />}
                    <span>71</span>
                </button>
            </div>
            <Link href={'/post/123'} className='px-2 py-1 hover:bg-primary hover:text-primary-foreground rounded-full transition flex gap-2 items-center border border-primary/40 '>
                <FaRegComment />
                <span>211</span>
            </Link>
            {/* <button className='px-2 py-1 hover:bg-muted-foreground hover:text-primary-foreground rounded-lg transition flex gap-2 items-center'>
                <BiRepost size={24} />
                <span>431</span>
            </button> */}
        </div>
    )
}