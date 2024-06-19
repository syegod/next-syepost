'use server'

import { auth } from "@/auth";
import { db } from "@/lib/db";
import { ChangeUsernameSchema } from "@/zod";
import { revalidatePath } from "next/cache";

export const change_username = async (username: string) => {
    try {
        const validated = ChangeUsernameSchema.safeParse(username);
        if(validated.error){
            return {error: validated.error.errors[0].message};
        }
        const session = await auth();
        if(!session){
            return {error: 'User not found'};
        }

        const candidate = await db.user.findFirst({
            where: {name: validated.data}
        });
        if(candidate) return {error: 'Username already taken!'}

        await db.user.update({
            where: {id: session.user.id!},
            data: {
                name: validated.data
            }
        });

        revalidatePath('/profile/settings')
        return {success: 'Username changed!'}
    } catch (err) {
        console.log(err);
        return {error: 'Something went wrong'}
    }
}