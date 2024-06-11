'use server'
        
import { db } from "@/lib/db";

export const get_user_data = async (id: string) => {
    try {
        const user = await db.user.findUnique({
            where: {id: id},
            include: {
                posts: true, 
                liked: true,
                comments: true
            }
        });
        if(!user){
            return null;
        }
        const {passwordHash, ...userData} = user;
        return userData;
    } catch (err) {
        console.log(err);
        return null;
    }
}