'use server'

import { db } from "@/lib/db";
import { revalidatePath } from "next/cache";

export const delete_post = async (postid: string) => {
    try {
        await db.post.delete(
            {
                where: {
                    id: postid
                }
            });
        revalidatePath('/post/');
        return {success: 'Post deleted'}
    } catch (err) {
        console.log(err);
        return {error: 'Something went wrong'}
    }
}