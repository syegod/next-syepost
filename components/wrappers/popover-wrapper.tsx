'use client';
import { FC, ReactNode } from 'react';
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover';

interface PopoverWrapperProps {
    children: ReactNode;
    trigger: ReactNode;
}

export const PopoverWrapper: FC<PopoverWrapperProps> = ({
    children,
    trigger
}) => {

    return (
        <Popover>
      <PopoverTrigger asChild>
        {
            trigger
        }
      </PopoverTrigger>
      <PopoverContent className="max-w-full sm:max-w-[600px] scroll max-h-[300px] overflow-auto">
        {children}
      </PopoverContent>
    </Popover>

    )
}