'use server'

import { delete_post_images } from "@/data/cloudinary";
import { db } from "@/lib/db";
import { revalidatePath } from "next/cache";

export const delete_post = async (postid: string) => {
    try {
        await db.post.delete(
            {
                where: {
                    id: postid
                }
            });
        const isImagesDeleted = await delete_post_images(postid);
        console.log(`Post Images Deleted: ${isImagesDeleted}`);
        revalidatePath('/post/');
        return {success: 'Post deleted'}
    } catch (err) {
        console.log(err);
        return {error: 'Something went wrong'}
    }
}