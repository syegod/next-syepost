'use server'

import { auth } from "@/auth"
import { getUserById } from "@/data/user";
import { db } from "@/lib/db";
import { revalidatePath } from "next/cache";

export const like_post = async (postid: string) => {
    try {
        const session = await auth();
        if (!session) {
            return { error: 'User not found.' }
        }

        const user = await getUserById(session.user.id!);

        const post = await db.post.findUnique({
            where: { id: postid },
            include: { likes: true }
        });

        if (!!post && !!user) {
            const isLiked = !!post.likes.filter(e => e.id === user.id)[0];
            if (!isLiked) {
                await db.post.update({
                    where: { id: postid },
                    data: {
                        likes: {
                            set: [...post.likes, user]
                        }
                    }
                })
            } else {
                await db.post.update({
                    where: { id: postid },
                    data: {
                        likes: {
                            set: post.likes.filter(e => e.id !== user.id)
                        }
                    }
                })
            }
            revalidatePath('/')
            return { success: 'Post liked' }
        } else {
            return { error: 'Something went wrong' }
        }
    } catch (err) {
        console.log(err);
        return { error: 'Something went wrong' }
    }
}