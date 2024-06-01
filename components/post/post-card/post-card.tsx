import { Avatar } from '@/components/user/avatar';
import { DotsHorizontalIcon } from '@radix-ui/react-icons';
import Link from 'next/link';
import { FC } from 'react';
import { BiRepost } from 'react-icons/bi';
import { FaRegComment, FaRegHeart } from 'react-icons/fa';
import { db } from '@/lib/db';

interface PostCardProps {

}

export const PostCard: FC<PostCardProps> = async ({

}) => {

    return (
        <div className='w-full grid gap-4 hover:bg-muted rounded-lg p-3 transition border'>
            <div className='flex items-center justify-between gap-2'>
                <div className='flex items-center gap-3'>
                    <div className='w-10'>
                        <Avatar src='/toji.jpg' />
                    </div>
                    <div className='grid'>
                        <Link href={'/users/123'} className='hover:underline text-sm'>
                            @syegod
                        </Link>
                        <div className='text-xs flex items-center gap-1 text-muted-foreground'>
                            <Link href={'/communities/games'} className='hover:underline'>Games</Link>
                            <span>·</span>
                            <span>11h ago</span>
                        </div>
                    </div>
                </div>
                <button className='p-2 hover:bg-muted-foreground hover:text-primary-foreground rounded-lg transition' type='button'>
                    <DotsHorizontalIcon />
                </button>
            </div>
            <div className='grid gap-4'>
                <div className='cursor-pointer'>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Tenetur minus laborum ea accusamus provident magnam iusto! Laborum, ab dolores! Fugit, labore minus! Distinctio officia repellendus vero animi porro assumenda quaerat incidunt fuga, nulla dolore ut est molestias eaque velit exercitationem quibusdam perferendis iste repudiandae tempore quas sequi vel cum! Adipisci enim id ratione labore asperiores dolores soluta assumenda fugiat facilis repellendus similique iusto, distinctio vitae in nostrum beatae, quis error vero temporibus rem sapiente totam! Doloribus voluptates magnam exercitationem porro officia, et minus repellendus aliquid amet corrupti iste enim, veniam eos reiciendis itaque maiores! Cum a reiciendis culpa ad harum.
                </div>
                <div className='flex items-center gap-4 px-1 text-sm'>
                    <button className='px-2 py-1 hover:bg-muted-foreground hover:text-primary-foreground rounded-lg transition flex gap-2 items-center'>
                        <FaRegHeart />
                        <span>941</span>
                    </button>
                    <button className='px-2 py-1 hover:bg-muted-foreground hover:text-primary-foreground rounded-lg transition flex gap-2 items-center'>
                        <FaRegComment />
                        <span>211</span>
                    </button>
                    <button className='px-2 py-1 hover:bg-muted-foreground hover:text-primary-foreground rounded-lg transition flex gap-2 items-center'>
                        <BiRepost size={24}/>
                        <span>941</span>
                    </button>
                </div>
            </div>
        </div>
    )
}