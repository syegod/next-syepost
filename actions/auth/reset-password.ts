'use server'

import { auth } from "@/auth";
import { getUserById } from "@/data/user";
import { db } from "@/lib/db";
import { ResetPasswordSchema } from "@/zod";
import { hash } from "bcryptjs";

export const reset_password = async (formData: FormData, userId: string) => {
    try {
        const password = formData.get('password') as string | null;
        const passwordConfirm = formData.get('passwordConfirm');
        if (!password || !passwordConfirm) {
            return { error: 'Fill all fields' }
        }
        
        const validatedPassword = ResetPasswordSchema.safeParse(password);
        if (validatedPassword.error) {
            return { error: validatedPassword.error.errors[0].message };
        }

        if (password !== passwordConfirm) {
            return { error: 'Passwords doesn\'t match' }
        }

        const user = await getUserById(userId);
        if (!user) {
            return { error: 'User not found' }
        }
        const newPassword = await hash(password, 10);
        await db.user.update({
            where: { id: user.id },
            data: {
                passwordHash: newPassword
            }
        });
        return { success: 'Password reseted successfully.' }
    } catch (err) {
        console.log(err);
        return { error: 'Something went wrong.' }
    }
}