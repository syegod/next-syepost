'use server'

import { db } from "@/lib/db";
import { revalidatePath } from "next/cache";

export const get_post = async (id?: string) => {
    try {
        const post = await db.post.findUnique({
            where: { id }
        });
        if (post) {
            const post = db.post.update({
                where: { id },
                include: {
                    author: true,
                    comments: {
                        include: {
                            author: true,
                            likes: true
                        },
                        orderBy: {
                            createdAt: 'desc'
                        }
                    },
                    likes: true
                },
                data: {
                    views: { increment: 1 }
                },
            });
            return post;
        } else {
            return null;
        }
    } catch (err) {
        console.log(err);
        return null;
    }
}
