'use server'

import { auth } from "@/auth";
import { db } from "@/lib/db";
import { revalidateCurrentPath } from "@/lib/revalidate-current-path";
import { revalidatePath } from "next/cache";

export const create_comment = async (formData: FormData, postid: string) => {
    try {
        const text = formData.get('body') as string;
        if (!text || text?.length < 3) {
            return { error: 'More than 3 symbols required!' }
        }
        const session = await auth();
        if (!session) {
            return { error: 'Authorize before leave a comment!' }
        }
        const post = await db.post.findUnique({
            where: { id: postid }
        });
        if (!post) {
            return { error: 'Post not found.' }
        }

        await db.comment.create({
            data: {
                text: text,
                authorId: session.user.id!,
                postId: post.id
            }
        });

        revalidatePath('/post/');
        return { success: 'Comment created!' }
    } catch (err) {
        console.log(err);
        return { error: 'Something went wrong! Please try again.' }
    }
}