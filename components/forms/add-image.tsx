'use client';
import { Dispatch, FC, SetStateAction } from 'react';
import { v4 as uid } from 'uuid';
import { Button } from '../ui/button';

interface AddImageProps {
    handleChange: (e: any) => void;
}

export const AddImage: FC<AddImageProps> = ({
    handleChange
}) => {

    const toggleInput = () => {
        const input = document.querySelector('#add_image') as HTMLInputElement;
        if(input){
            input.click();
        }
    }

    return (
        <div>
            <input hidden type='file' id='add_image' onChange={(e) => handleChange((prev: any) => {
                if (e.target.files?.[0]) {
                    return [...prev, {
                        src: URL.createObjectURL(e.target.files[0]),
                        uid: uid()
                    }]
                } else {
                    return prev;
                }
            })} />
            <Button type='button' className='w-max shadow' onClick={toggleInput}>
                Add post image
            </Button>
        </div>
    )
}