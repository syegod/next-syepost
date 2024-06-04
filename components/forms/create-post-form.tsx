'use client';
import { FC, FormEvent, useState, useTransition } from 'react';
import { AutoSizeTextarea } from '../inputs/autosize-textarea';
import { Button } from '../ui/button';
import { ComboboxWrapper } from '../wrappers/combobox-wrapper';
import { post_themes } from '@/constants';
import { create_post } from '@/actions/post/create-post';
import { useRouter } from 'next/navigation';

interface CreatePostFormProps {

}

export const CreatePostForm: FC<CreatePostFormProps> = ({

}) => {
    const [theme, setTheme] = useState<string | null>(null);
    const [isPending, startTransition] = useTransition();

    const router = useRouter();

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        
        const formData = new FormData(e.currentTarget);
        formData.append('theme', theme || '');
        startTransition(async () => {
            const response = await create_post(formData);
            router.push('/');
        });
    }

    return (
        <form onSubmit={(e) => handleSubmit(e)} method='POST' className='grid gap-y-10'>
            <h1 className='text-2xl font-bold mb-4'>Create a new post</h1>
            <div className='grid gap-y-2'>
                <h1 className='text-xl font-bold'>Title</h1>
                <AutoSizeTextarea name='title' maxLength={250} placeholder='Enter post title here' />
            </div>
            <div className='grid gap-y-2'>
                <h1 className='text-xl font-bold'>Text</h1>
                <AutoSizeTextarea name='text' maxLength={750} placeholder='Enter post text here' />
            </div>
            <div className='grid gap-y-4'>
                <h1 className='text-xl font-bold'>Theme</h1>
                <ComboboxWrapper list={post_themes} placeholder='Select theme' />
            </div>
            <Button type='submit' className='mt-6'>
                Create a post
            </Button>
        </form>
    )
}