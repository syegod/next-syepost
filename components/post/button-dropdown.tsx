'use client'
import { FC } from 'react';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem } from '../ui/dropdown-menu';
import { DropdownMenuTrigger } from '@radix-ui/react-dropdown-menu';
import { DotsHorizontalIcon } from '@radix-ui/react-icons';
import { Button } from '../ui/button';
import { AlertDialogWrapper } from '../wrappers/alert-dialog-wrapper';

interface ButtonDropdownProps {
    handleSubmit: any;
}

export const ButtonDropdown: FC<ButtonDropdownProps> = ({
    handleSubmit
}) => {

    const handleClick = async () => {
        if (handleSubmit) {
            await handleSubmit();
        }
    }

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant={'ghost'} className='hover:bg-primary/20' size={'icon'} type='button'>
                    <DotsHorizontalIcon />
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-40 mx-2">
                <DropdownMenuItem asChild className='cursor-pointer'>
                    <AlertDialogWrapper danger title='Comment deletion' description='Are you sure you want delete this comment?' action={handleClick}>
                        <button className='w-full text-start text-sm px-2 hover:bg-muted py-1.5 rounded'>
                            Delete
                        </button>
                    </AlertDialogWrapper>
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}