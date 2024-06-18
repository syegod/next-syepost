'use server'

import { auth } from "@/auth";
import { getUserById } from "@/data/user";
import { db } from "@/lib/db";
import { revalidatePath } from "next/cache";

export const like_comment = async (commentId: string) => {
    try {
        const session = await auth();
        if (!session) {
            return { error: 'User not found.' }
        }
        const user = await getUserById(session.user.id!);
        const comment = await db.comment.findUnique({
            where: { id: commentId },
            include: { likes: true }
        });

        if (!comment || !user) {
            return { error: 'Something went wrong' }
        }
        const isLiked = !!comment.likes.filter(e => e.id === user.id)[0];
        if(!isLiked){
            await db.comment.update({
                where: {id: comment.id},
                data: {
                    likes: {
                        set: [...comment.likes, user]
                    }
                }
            })
        } else {
            await db.comment.update({
                where: {id: comment.id},
                data: {
                    likes: {
                        set: comment.likes.filter(e => e.id !== user.id)
                    }
                }
            })
        }
        revalidatePath('/post')
        return { success: 'Comment liked!' }
    } catch (err) {
        console.log(err);
        return { error: 'Something went wrong' }
    }
}