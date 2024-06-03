'use server';

import { RegisterSchema } from '@/zod';
import * as z from 'zod';
import bcryptjs from 'bcryptjs';
import { getUserByEmail } from "@/data/user";
import { db } from '@/lib/db';


export const register = async (data: z.infer<typeof RegisterSchema>) => {
    const validatedFields = RegisterSchema.safeParse(data);

    if(!validatedFields.success){
        return {error: 'Invalid fields'};
    }
    const {email, name, password} = validatedFields.data;
    
    const existingUser = await getUserByEmail(email);
    if(existingUser){
        return {error: 'Email already in use!'}
    }
    
    const hashedPassword = await bcryptjs.hash(password, 10);
    
    try {
        await db.user.create({
            data: {
                name,
                email,
                passwordHash: hashedPassword
            }
        });

        // await signIn("credentials", {
        //     email, password, redirectTo: DEFAULT_LOGIN_REDIRECT
        // });
        return {success: 'User created!'}
        // return redirect('/auth/login');
    } catch (error) {
        console.log(error);
        return {error: 'Something went wrong. Try again'}
    }
}