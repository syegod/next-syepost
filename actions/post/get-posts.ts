'use server'

import { db } from "@/lib/db";
import { revalidatePath } from "next/cache";

export const get_posts = async (orderBy: 'popular' | 'latest' = 'latest') => {
    try {
        let posts
        switch (orderBy) {
            case 'popular': {
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
            case 'latest': {
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
        }

        revalidatePath('/')
        return posts;
    } catch (err) {
        console.log(err);
        return null;
    }
}