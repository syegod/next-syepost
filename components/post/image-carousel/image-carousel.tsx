'use client';
import { Dispatch, FC, SetStateAction, useEffect, useState } from 'react';
import { v4 as uid } from 'uuid'
import Image from 'next/image';
import { IImage } from '@/components/forms/create-post-form';
import { ImageCarouselButton } from './image-carousel-button';
import { ArrowLeftIcon, ArrowRightIcon, Cross1Icon } from '@radix-ui/react-icons';
import { SlidesBtns } from './slides-btns';

interface ImageCarouselProps {
    images: IImage[];
    handleChange: Dispatch<SetStateAction<IImage[]>>
}

export const ImageCarousel: FC<ImageCarouselProps> = ({
    images,
    handleChange
}) => {
    const [image, setImage] = useState<IImage>();

    useEffect(() => {
        if (images) {
            setImage(images[images.length - 1]);
        }
    }, [images])

    if (!image) {
        return null;
    }

    const deleteImage = () => {
        handleChange(prev => prev.filter(e => e.uid !== image?.uid));
    }

    const handleNext = () => {
        if (images?.indexOf(image) === images?.length! - 1) {
            setImage(images[0]);
        } else {
            setImage(images[images.indexOf(image) + 1]);
        }
    }

    const handlePrevious = () => {
        if (images?.indexOf(image) === 0) {
            setImage(images[images.length - 1]);
        } else {
            setImage(images[images.indexOf(image) - 1]);
        }
    }

    return (
        <div className='relative h-[400px] bg-muted rounded-lg'>
            <Image src={URL.createObjectURL(image.file)} id={image.uid} alt='' sizes='100%' width={1000} height={1000} className='rounded-lg object-cover max-h-[400px] relative top-1/2 -translate-y-1/2 mx-auto' />
            <ImageCarouselButton icon={<Cross1Icon />} handleClick={deleteImage} classNames='top-3 right-3' />
            {images.length > 1 &&
                <>
                    <ImageCarouselButton icon={<ArrowLeftIcon />} handleClick={handlePrevious} classNames='top-1/2 -translate-y-1/2 left-3' />
                    <ImageCarouselButton icon={<ArrowRightIcon />} handleClick={handleNext} classNames='top-1/2 -translate-y-1/2 right-3' />
                    <SlidesBtns images={images} handleClick={setImage} currentImage={image} />
                </>
            }
        </div>
    )
}