import { FC } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '../ui/dialog';

interface DialogWrapperProps {
    children: React.ReactNode;
    trigger: React.ReactNode;
    classNames?: string;
}

export const DialogWrapper: FC<DialogWrapperProps> = ({
    children,
    trigger,
    classNames
}) => {

    return (
        <Dialog>
            <DialogTrigger asChild className='cursor-pointer'>
                {trigger}
            </DialogTrigger>
            <DialogContent className={`${classNames}`}>
                {children}
            </DialogContent>
        </Dialog>
    )
}