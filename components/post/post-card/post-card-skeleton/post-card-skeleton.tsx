import { FC } from 'react';

interface PostCardSkeletonProps {

}

const PostCardSkeleton: FC<PostCardSkeletonProps> = async ({

}) => {

    return (
        <div className='w-full grid gap-4 rounded-lg p-3 transition '>
            <div className='inline-flex items-center justify-between gap-2'>
                <div className='inline-flex gap-4 items-center'>
                    <div className={`bg-primary/30 rounded-full w-10 h-10`} />
                    <div className='grid'>
                        <div className={`bg-primary/30 w-20 rounded-lg h-4`} />
                        <div className='flex items-center gap-1'>
                            <div className={`bg-primary/30 w-16 rounded-lg h-4`} />
                            <span>·</span>
                            <div className={`bg-primary/30 w-24 rounded-lg h-4`} />
                        </div>
                    </div>
                </div>
                <div className={`bg-primary/30 w-8 rounded-lg h-8`} />
            </div>
            <div className='space-y-6'>
                <div className={`bg-primary/30 w-[80%] rounded-lg h-10`} />
                <div className={`bg-primary/30 w-full rounded-lg h-96`} />
            </div>
        </div>
    )
}
export default PostCardSkeleton