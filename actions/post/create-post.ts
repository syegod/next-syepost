'use server';

import { auth } from "@/auth";
import { upload_post_images } from "@/data/cloudinary";
import { getUserById } from "@/data/user";
import { db } from "@/lib/db";
import { revalidatePath } from "next/cache";

export const create_post = async (formData: FormData) => {
    try {
        const body = formData.get('text') as string;
        const title = formData.get('title') as string;
        let theme = formData.get('theme') as string;
        const session = await auth();
        
        if (!session || !session.user?.id) {
            return { error: 'User not found.' }
            }
        console.log('reached');
        if (!body || !title) {
            return { error: 'Enter post body and title.' }
        } else if (body.length < 30) {
            return { error: 'Body length must be more than 30 symbols.' }
        } else if (title.length < 10) {
            return { error: "Title length must be more than 10 symbols." }
        }

        const post = await db.post.create({
            data: {
                title: title,
                text: body,
                authorId: session.user.id,
                theme: theme
            }
        });

        const images: File[] = [];

        formData.forEach((value, key) => {
            if (key.startsWith('image')) {
                images.push(value as File);
            }
        })

        if (images.length > 0) {
            const postImages = await upload_post_images(post.id, images);

            await db.post.update({
                where: {
                    id: post.id
                },
                data: {
                    images: postImages
                }
            });
        }

        revalidatePath('/');
        return { success: 'Post created.', postid: post.id }
    } catch (err) {
        console.log(err);
        return { error: 'Something went wrong.' }
    }
}