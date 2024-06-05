'use client';
import { IImage } from '@/components/forms/create-post-form';
import {Dispatch, FC, SetStateAction} from 'react';

interface SlidesBtnsProps {
    images: IImage[];
    currentImage: IImage;
    handleClick: Dispatch<SetStateAction<IImage | undefined>>
}

export const SlidesBtns: FC<SlidesBtnsProps> = ({
  images,
  currentImage,
  handleClick
}) => {

  return (
    <div className='inline-flex items-center gap-2 absolute bottom-2 left-1/2 -translate-x-1/2'>
        {images.map((e) => (
            <button type='button' onClick={() => handleClick(images.filter(item => item.uid === e.uid)[0])} key={e.uid} className={`${currentImage.uid === e.uid && `bg-primary shadow-background`} p-1 bg-background shadow-sm shadow-primary hover:bg-background/60 transition rounded-full`} />
        ))}
    </div>
  )
}