import Link from 'next/link';
import {FC, ReactNode} from 'react';

interface NavLinkProps {
    children: ReactNode;
    href: string;
}

export const NavLink: FC<NavLinkProps> = ({
  children,
  href
}) => {

  return (
    <Link href={href} className='text-xs font-medium hover:underline underline-offset-4'>
        {children}
    </Link>
  )
}