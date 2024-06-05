import { CreatePostForm } from '@/components/forms/create-post-form';
import { AutoSizeTextarea } from '@/components/inputs/autosize-textarea';
import { Input } from '@/components/ui/input';
import { FC } from 'react';

interface CreatePostPageProps {

}

const CreatePostPage: FC<CreatePostPageProps> = async ({

}) => {

    return (
        <CreatePostForm/>
    )
}
export default CreatePostPage