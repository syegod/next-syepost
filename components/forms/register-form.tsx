import { FC } from 'react';
import { Logo } from '../logo';
import { Label } from '../ui/label';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import Link from 'next/link';
import { Social } from './social';

interface RegisterFormProps {

}

export const RegisterForm: FC<RegisterFormProps> = ({

}) => {

    return (
        <form className='p-4 border rounded-xl'>
            <div className='grid gap-4'>
                <div className='mx-auto grid pb-2 text-center'>
                    <Logo />
                    <span className='text-xs text-center text-muted-foreground'>Create an account here</span>
                </div>
                <div className='grid gap-2'>
                    <Label htmlFor='username' className='px-1'>Username</Label>
                    <Input id='username' placeholder='johndoe185' className='w-[35ch]' name='username' type='text' />
                </div>
                <div className='grid gap-2'>
                    <Label htmlFor='email' className='px-1'>Email</Label>
                    <Input id='email' placeholder='example@example.com' className='w-[35ch]' name='email' type='email' />
                </div>
                <div className='grid gap-2'>
                    <Label htmlFor='password' className='px-1'>Password</Label>
                    <Input id='password' placeholder='***********' name='password' type='password' />
                </div>
                <div className='grid gap-2'>
                    <Label htmlFor='passwordConfirm' className='px-1'>Confirm password</Label>
                    <Input id='passwordConfirm' placeholder='***********' name='passwordConfirm' type='password' />
                </div>
                <Button className='text-sm mt-4' type='submit'>
                    Create an account
                </Button>
                <Link href={'/auth/login'}>
                    <Button className='w-full' type='button' variant={'outline'}>Already have an account?</Button>
                </Link>
                <div className='my-2 relative'>
                    <div className='h-[1px] rounded w-full bg-muted-foreground' />
                    <div className='absolute text-xs text-muted-foreground bg-background px-2 w-max left-1/2 -translate-x-1/2 -translate-y-2'>
                        Or log in using
                    </div>
                </div>
                <Social />
            </div>
        </form>
    )
}