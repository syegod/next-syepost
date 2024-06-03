import { Exo_2 } from 'next/font/google';
import {FC} from 'react';

const logoFont = Exo_2({
    weight: ['900'],
    subsets: ['latin']
})

export const Logo: FC = ({
  
}) => {

  return (
    <div className={`${logoFont.className} text-xl bg-gradient-to-r from-sky-600 to-fuchsia-500 bg-clip-text text-transparent`}>
        syepost.com
    </div>
  )
}