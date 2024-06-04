'use client';
import { ChangeEvent, FC, useState } from 'react';
import TextareaAutosize from 'react-textarea-autosize';

interface AutoSizeTextareaProps {
    classNames?: string;
    maxLength?: number;
    placeholder?: string;
    handleChange?: (e: string) => {};
    name?: string;
}

export const AutoSizeTextarea: FC<AutoSizeTextareaProps> = ({
    classNames,
    maxLength,
    handleChange,
    placeholder,
    name
}) => {
    const [symbolsLeft, setSymbolsLeft] = useState(maxLength);

    const handleOnChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
        if (!!maxLength) {
            setSymbolsLeft(maxLength - e.currentTarget.value.length);
        }
        if (handleChange) {
            handleChange(e.currentTarget.value);
        }
    }

    return (
        <div className='w-full flex flex-col items-end'>
            <TextareaAutosize name={name} onChange={(e) => handleOnChange(e)} maxLength={maxLength} className={`w-full text-primary bg-background border-b outline-none appearance-none rounded scroll px-2 py-2 resize-none ${classNames}`} placeholder={placeholder} />
            <span className='pr-2'>{symbolsLeft}</span>
        </div>
    )
}