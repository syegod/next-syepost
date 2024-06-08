'use server'

import { db } from "@/lib/db";
import { revalidatePath } from "next/cache";

export const get_posts = async (orderBy: 'popular' | 'latest' = 'latest') => {
    try {
        let posts
        if (orderBy === 'latest') {
            posts = db.post.findMany({
                include: {
                    author: true,
                    likes: true,
                    comments: true
                },
                orderBy: {
                    createdAt: 'desc'
                }
            });
        }
        if (orderBy === 'popular') {
            posts = db.post.findMany({
                include: {
                    author: true,
                    likes: true,
                    comments: true
                },
                orderBy: {
                    views: 'desc'
                }
            });
        }
        revalidatePath('/')
        return posts;
    } catch (err) {
        console.log(err);
        return null;
    }
}