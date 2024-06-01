import Link from 'next/link';
import { FC } from 'react';
import { IoIosArrowRoundBack } from 'react-icons/io';

interface NotFoundProps {

}

const NotFound: FC<NotFoundProps> = async ({

}) => {

  return (
    <div className='absolute left-1/2 -translate-x-1/2 top-1/3'>
      <div className='w-max pt-5 px-5 pb-2 border rounded-xl flex flex-col gap-4'>
        <div className='py-auto inline-flex items-end gap-5 text-lg font-semibold'>
          <span>404</span>
          <div className='h-7 w-[1px] bg-muted-foreground ' />
          <span>Page you looking for is not found.</span>
        </div>
        <Link href={'.'} className='w-max h-max mx-auto flex items-center gap-1 hover:underline underline-offset-2'>
          <IoIosArrowRoundBack size={25}/>
          <span>Get back</span>
        </Link>
      </div>
    </div>
  )
}
export default NotFound