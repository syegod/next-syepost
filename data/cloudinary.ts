import { v2 as cloudinary } from 'cloudinary';

export const upload_post_images = async (postid: string, images: File[]) => {
    try {
        const postImages = [];
        for (var i in images) {
            const arrayBuffer = await images[i].arrayBuffer();
            const buffer = Buffer.from(arrayBuffer);
            const res: any = await new Promise((resolve, reject) => {
                cloudinary.uploader.upload_stream({
                    public_id: `syepost/posts/${postid}/image_${i}`,
                    overwrite: true
                }, (error, result) => {
                    if (error) return reject(error);
                    else resolve(result);
                }).end(buffer);
            });
            postImages.push(res.url);
        }
        return postImages;
    } catch (err) {
        console.log(err);
        throw err;
    }
}

export const upload_user_avatar = async (userid: string, image: File) => {
    try {
        const arrayBuffer = await image.arrayBuffer();
        const buffer = Buffer.from(arrayBuffer);
        const res: any = await new Promise((resolve, reject) => {
            cloudinary.uploader.upload_stream({
                public_id: `syepost/users/${userid}/avatar`,
                overwrite: true
            }, (error, result) => {
                if (error) return reject(error);
                else resolve(result);
            }).end(buffer);
        });
        return res.url;
    } catch (err) {
        console.log(err);
        throw err;
    }
}

export const delete_post_images = async (postid: string) => {
    try {
        const resources = await cloudinary.api.resources({
            type: 'upload',
            prefix: `syepost/posts/${postid}`
        });

        for (const resource of resources.resources) {
            await cloudinary.uploader.destroy(resource.public_id);
        }

        await cloudinary.api.delete_folder(`syepost/posts/${postid}`);

        return true;
    } catch (err) {
        console.log(err);
        return false;
    }
}

export const delete_user_images = async (userid: string) => {
    try {
        const resources = await cloudinary.api.resources({
            type: 'upload',
            prefix: `syepost/users/${userid}`
        });

        for (const resource of resources.resources) {
            await cloudinary.uploader.destroy(resource.public_id);
        }

        await cloudinary.api.delete_folder(`syepost/users/${userid}`);

        return true;
    } catch (err) {
        console.log(err);
        return false;
    }
}