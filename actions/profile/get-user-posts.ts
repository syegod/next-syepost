'use server'

import { db } from "@/lib/db";

export const get_user_posts = async (userId: string) => {
    try {
        const user = await db.user.findUnique({
            where: {
                id: userId
            },
            include: {
                posts: {
                    include: {
                        author: true,
                        likes: true,
                        comments: true
                    }
                }
            }
        });
        if(user){
            return user.posts;
        }
        return null;
    } catch (err) {
        console.log(err);
        return null;
    }
}