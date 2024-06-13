'use client'
import { useSearchParams } from 'next/navigation';
import { FC } from 'react';

interface AuthErrorPageProps {

}

const AuthErrorPage: FC<AuthErrorPageProps> = ({

}) => {
  const params = useSearchParams();
  return (
    <pre>
      {JSON.stringify(params)}
    </pre>
  )
}
export default AuthErrorPage