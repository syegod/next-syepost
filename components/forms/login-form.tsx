import {FC} from 'react';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Logo } from '../logo';
import { Button } from '../ui/button';
import Link from 'next/link';
import { Social } from './social';

interface LoginFormProps {
  
}

export const LoginForm: FC<LoginFormProps> = ({
  
}) => {

  return (
    <form className='p-4 border rounded-xl'>
        <div className='grid gap-4'>
            <div className='mx-auto w-max grid pb-2'>
                <Logo/>
                <span className='text-xs text-center text-muted-foreground'>Welcome back</span>
            </div>
            <div className='grid gap-2'>
                <Label htmlFor='email' className='px-1'>Email</Label>
                <Input id='email' placeholder='example@example.com' className='w-[35ch]' name='email' type='email'/>
            </div>
            <div className='grid gap-2'>
                <Label htmlFor='password' className='px-1'>Password</Label>
                <Input id='password' placeholder='***********' name='password' type='password'/>
            </div>
            <Button className='text-sm mt-4' type='submit'>
                Log in
            </Button>
            <Link href={'/auth/register'}>
                <Button className='w-full' type='button' variant={'outline'}>Dont have an account?</Button>
            </Link>
            <div className='my-2 relative'>
                <div className='h-[1px] rounded w-full bg-muted-foreground'/>
                <div className='absolute text-xs text-muted-foreground bg-background px-2 w-max left-1/2 -translate-x-1/2 -translate-y-2'>
                    Or log in using
                </div>
            </div>
            <Social/>
        </div>
    </form>
  )
}