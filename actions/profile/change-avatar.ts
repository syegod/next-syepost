'use server'

import { auth } from "@/auth";
import { upload_user_avatar } from "@/data/cloudinary";
import { db } from "@/lib/db";

export const change_avatar = async (formData: FormData) => {
    try {
        const session = await auth();
        if (!session) {
            return { error: 'User not found' }
        }
        const image = formData.get('image') as File;
        if (!image) return { error: 'Image wasn\'t provided.' }
        const imageUrl = await upload_user_avatar(session.user.id!, image);
        await db.user.update({
            where: { id: session.user.id! },
            data: {
                image: imageUrl
            }
        })
        return {success: 'Avatar image has been changed'}
    } catch (err) {
        console.log(err);
        return { error: 'Something went wrong' }
    }
}