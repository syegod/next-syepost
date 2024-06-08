'use client';
import { ChangeEvent, FC, useState } from 'react';
import TextareaAutosize from 'react-textarea-autosize';

interface AutoSizeTextareaProps {
    classNames?: string;
    maxLength?: number;
    placeholder?: string;
    handleChange?: (e: string) => {};
    name?: string;
    disabled?: boolean;
}

export const AutoSizeTextarea: FC<AutoSizeTextareaProps> = ({
    classNames,
    maxLength,
    handleChange,
    placeholder,
    name,
    disabled = false
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
            <TextareaAutosize name={name} disabled={disabled} onChange={(e) => handleOnChange(e)} maxLength={maxLength} className={`${classNames} w-full text-primary bg-background border outline-none appearance-none rounded-lg scroll px-4 py-2 resize-none `} placeholder={placeholder} />
            <span className='pr-2 text-xs py-1'>{symbolsLeft}</span>
        </div>
    )
}