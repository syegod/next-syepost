import { FC, ReactNode } from 'react';

interface ImageCarouselButtonProps {
    icon: ReactNode;
    classNames: string;
    handleClick?: () => void;
}

export const ImageCarouselButton: FC<ImageCarouselButtonProps> = ({
    icon,
    classNames,
    handleClick
}) => {

    const handleOnClick = () => {
        if (handleClick) {
            handleClick();
        }
    }

    return (
        <button type='button' onClick={() => handleOnClick()} className={`bg-background p-2 rounded-full absolute shadow-sm shadow-primary hover:bg-background/60 transition ${classNames}`}>
            {icon}
        </button>
    )
}