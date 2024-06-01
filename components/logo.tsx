import { Exo_2 } from 'next/font/google';
import {FC} from 'react';

const logoFont = Exo_2({
    weight: ['700'],
    subsets: ['latin']
})

export const Logo: FC = ({
  
}) => {

  return (
    <div className={`${logoFont.className} text-xl`}>
        syepost.com
    </div>
  )
}