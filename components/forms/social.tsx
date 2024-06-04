'use client'
import {FC} from 'react';
import { Button } from '../ui/button';
import { FaGithub, FaGoogle } from 'react-icons/fa';
import { SignIn } from '@/actions/auth/sign-in';

interface SocialProps {
  
}

export const Social: FC<SocialProps> = ({
  
}) => {

  const handleClick = async (provider: "google" | "github") => {
    await SignIn(provider);
  }

  return (
    <div className='inline-flex items-center gap-2'>
        <Button type='button' variant={'secondary'} className='w-full' onClick={() => handleClick('google')}><FaGoogle size={20}/></Button>
        <Button type='button' variant={'secondary'} className='w-full' onClick={() => handleClick('github')}><FaGithub size={20}/></Button>
    </div>
  )
}