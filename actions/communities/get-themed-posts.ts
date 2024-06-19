'use server'

import { db } from "@/lib/db";
import { revalidatePath } from "next/cache";

export const get_themed_posts = async (theme: string) => {
    try {
        const posts = db.post.findMany({
            where: {
                theme: theme
            },
            include: {
                author: true,
                likes: true,
                comments: true
            },
            orderBy: {
                createdAt: 'desc'
            }
        });
        revalidatePath('/communities');
        return posts;
    } catch (err) {
        console.log(err);
        return null;
    }
}