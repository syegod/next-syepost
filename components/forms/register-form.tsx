'use client';
import { FC, useState, useTransition } from 'react';
import { zodResolver } from "@hookform/resolvers/zod";
import { Logo } from '../logo';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import Link from 'next/link';
import { Social } from './social';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { RegisterSchema } from '@/zod';
import { register } from '@/actions/auth/register';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '../ui/form';
import { FormSuccess } from './form-success';
import { FormError } from './form-error';

interface RegisterFormProps {

}

export const RegisterForm: FC<RegisterFormProps> = ({

}) => {
    const [isPending, startTransition] = useTransition();
    const [success, setSuccess] = useState<string | undefined>('');
    const [error, setError] = useState<string | undefined>('');
    const form = useForm<z.infer<typeof RegisterSchema>>({
        resolver: zodResolver(RegisterSchema),
        defaultValues: {
            email: '',
            password: '',
            name: ''
        }
    });

    const onSubmit = (values: z.infer<typeof RegisterSchema>) => {
        setError("");
        setSuccess("");
        startTransition(async () => {
            register(values).then((data: any) => {
                setError(data.error);
                setSuccess(data.success);
            });
            // const response = await register(values);
            // if(response.error){
            //     setError(response.error);
            // } else {
            //     setSuccess(response.success);
            // }
        });
    }

    return (
        <Form {...form}>
            <form method='POST' onSubmit={form.handleSubmit(onSubmit)} className='p-4 border rounded-xl grid gap-4'>
                <div className='mx-auto grid pb-2 text-center'>
                    <Logo />
                    <span className='text-xs text-center text-muted-foreground'>Create an account here</span>
                </div>
                <FormField control={form.control} name='name' render={({ field }) => (
                    <FormItem>
                        <FormLabel>Username</FormLabel>
                        <FormControl>
                            <Input {...field} placeholder="John Doe" className='w-[35ch]' type="text" disabled={isPending} />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                )} />
                <FormField control={form.control} name='email' render={({ field }) => (
                    <FormItem>
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                            <Input {...field} placeholder="example@example.com" type="email" disabled={isPending} />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                )} />
                <FormField control={form.control} name='password' render={({ field }) => (
                    <FormItem>
                        <FormLabel>Password</FormLabel>
                        <FormControl>
                            <Input {...field} placeholder="*********" type="password" disabled={isPending} />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                )} />
                <FormSuccess message={success}/>
                <FormError message={error}/>
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
            </form>
        </Form>

        // <form className='p-4 border rounded-xl'>
        //     <div className='grid gap-4'>
        //         <div className='mx-auto grid pb-2 text-center'>
        //             <Logo />
        //             <span className='text-xs text-center text-muted-foreground'>Create an account here</span>
        //         </div>
        //         <div className='grid gap-2'>
        //             <Label htmlFor='username' className='px-1'>Username</Label>
        //             <Input id='username' placeholder='johndoe185' className='w-[35ch]' name='username' type='text' />
        //         </div>
        //         <div className='grid gap-2'>
        //             <Label htmlFor='email' className='px-1'>Email</Label>
        //             <Input id='email' placeholder='example@example.com' className='w-[35ch]' name='email' type='email' />
        //         </div>
        //         <div className='grid gap-2'>
        //             <Label htmlFor='password' className='px-1'>Password</Label>
        //             <Input id='password' placeholder='***********' name='password' type='password' />
        //         </div>
        //         <div className='grid gap-2'>
        //             <Label htmlFor='passwordConfirm' className='px-1'>Confirm password</Label>
        //             <Input id='passwordConfirm' placeholder='***********' name='passwordConfirm' type='password' />
        //         </div>
        //         <Button className='text-sm mt-4' type='submit'>
        //             Create an account
        //         </Button>
        //         <Link href={'/auth/login'}>
        //             <Button className='w-full' type='button' variant={'outline'}>Already have an account?</Button>
        //         </Link>
        //         <div className='my-2 relative'>
        //             <div className='h-[1px] rounded w-full bg-muted-foreground' />
        //             <div className='absolute text-xs text-muted-foreground bg-background px-2 w-max left-1/2 -translate-x-1/2 -translate-y-2'>
        //                 Or log in using
        //             </div>
        //         </div>
        //         <Social />
        //     </div>
        // </form>
    )
}