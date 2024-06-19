'use server'

import { auth } from "@/auth";
import { db } from "@/lib/db";
import { ChangeEmailSchema } from "@/zod";
import { revalidatePath } from "next/cache";

export const change_email = async (email: string) => {
    try {
        const validated = ChangeEmailSchema.safeParse(email);
        if(validated.error){
            return {error: validated.error.errors[0].message};
        }
        const session = await auth();
        if(!session){
            return {error: 'User not found'};
        }

        const candidate = await db.user.findFirst({
            where: {email: validated.data}
        });
        if(candidate) return {error: 'Email already exists!'}

        await db.user.update({
            where: {id: session.user.id!},
            data: {
                email: validated.data
            }
        });

        revalidatePath('/profile/settings');
        return {success: 'Email changed!'}
    } catch (err) {
        console.log(err);
        return {error: 'Something went wrong'}
    }
}