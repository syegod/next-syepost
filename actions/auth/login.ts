'use server';

import { signIn } from '@/auth';
import { getUserByEmail } from '@/data/user';
import { DEFAULT_LOGIN_REDIRECT } from '@/routes';
import { LoginSchema } from '@/zod';
import { AuthError } from 'next-auth';
import * as z from 'zod';

export const login = async (data: z.infer<typeof LoginSchema>) => {
    const validatedFields = LoginSchema.safeParse(data);

    if (!validatedFields.success) {
        return { error: 'Invalid fields!' }
    }

    const { email, password } = validatedFields.data;

    const existingUser = await getUserByEmail(email);

    if (!existingUser || !existingUser.email) {
        return { error: 'User does not exists' };
    }

    if (!existingUser.passwordHash) {
        return { error: 'Sign in using different provider.' };
    }

    try {
        await signIn("credentials", {
            email, password, redirectTo: DEFAULT_LOGIN_REDIRECT
        });
    } catch (error) {
        if (error instanceof AuthError) {
            switch (error.type) {
                case "CredentialsSignin":
                    return { error: "Invalid credentials!" }
                default:
                    return { error: "Something went wrong!" }
            }
        }
        throw error; 
    }
}