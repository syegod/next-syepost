'use client';
import { ChangeEvent, Dispatch, FC, ReactNode, SetStateAction, useRef } from 'react';
import { v4 as uid } from 'uuid';
import { Button } from '../ui/button';

interface AddImageProps {
    handleChange: (e: any) => void;
    buttonInner?: ReactNode;
    disabled?: boolean
}

export const AddImage: FC<AddImageProps> = ({
    handleChange,
    buttonInner,
    disabled = false
}) => {
    const inputRef = useRef<HTMLInputElement | null>(null);

    const toggleInput = () => {
        console.log(inputRef);
        inputRef.current?.click();
    }

    const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        handleChange((prev: any) => {
            if (prev instanceof Array) {
                if (e.target.files?.[0]) {
                    return [...prev, {
                        file: e.target.files[0],
                        uid: uid()
                    }]
                } else {
                    return prev;
                }
            } else {
                if (e.target.files?.[0]) {
                    return e.target.files[0];
                }
            }
        });
    }


    return (
        <div>
            <input ref={inputRef} hidden type='file' id='add_image' onChange={(e) => handleInputChange(e)} />

            <Button disabled={disabled} type='button' size={'sm'} className='w-max shadow' onClick={toggleInput}>
                {buttonInner || 'Add image'}
            </Button>
        </div>
    )
}