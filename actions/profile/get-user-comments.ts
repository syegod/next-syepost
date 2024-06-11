'use server'

import { db } from "@/lib/db";

export const get_user_comments = async (userId: string) => {
    try {
        const user = await db.user.findUnique({
            where: {
                id: userId
            },
            include: {
                comments: {
                    include: {
                        author: true,
                        likes: true,
                    }
                }
            }
        });
        if(user){
            return user.comments;
        }
        return null;
    } catch (err) {
        console.log(err);
        return null;
    }
}