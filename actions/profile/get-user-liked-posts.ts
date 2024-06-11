'use server'

import { db } from "@/lib/db";

export const get_user_liked_posts = async (userId: string) => {
    try {
        const user = await db.user.findUnique({
            where:{
                id: userId
            },
            include: {
                liked: {
                    include: {
                        author: true,
                        likes: true,
                        comments: true
                    }
                }
            }
        }); 
        if(user){
            return user.liked;
        }
        return null;
    } catch (err) {
        console.log(err);
        return null;
    }
}