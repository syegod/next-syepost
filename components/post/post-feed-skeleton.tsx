
import PostCardSkeleton from './post-card/post-card-skeleton/post-card-skeleton';



export const PostFeedSkeleton = async ({

}) => {

    return (
        <div className='mx-auto grid gap-y-5'>
            {[1,2,3,4,5,6].map((__, key) => (
                <PostCardSkeleton key={key}/>
            ))}
        </div>
    )
}