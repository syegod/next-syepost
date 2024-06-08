'use server'

import { db } from "@/lib/db";
import { revalidatePath } from "next/cache";

export const delete_comment = async (commentid: string) => {
    try {
        await db.comment.delete(
            {
                where: {
                    id: commentid
                }
            });
        revalidatePath('/post/');
        return {success: 'Comment deleted'}
    } catch (err) {
        console.log(err);
        return { error: 'Something went wrong!' }
    }
}