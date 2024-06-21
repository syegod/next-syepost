'use server'

import { auth } from "@/auth"
import { getUserById } from "@/data/user";
import { db } from "@/lib/db";
import { send_email } from "@/lib/nodemailer";
import crypto from "crypto"

export const send_reset_password_email = async () => {
    try {
        const session = await auth();
        if (!session) return { error: 'User not found' }

        const user = await getUserById(session.user.id!);

        if(!user?.emailVerified){
            return {error: 'Email is not verified'}
        }

        const token = crypto.randomBytes(20).toString('hex');

        const existingToken = await db.resetPasswordToken.findUnique({
            where: {userId: session.user.id!}
        })

        if(existingToken){
            await db.resetPasswordToken.delete({
                where: { userId: session.user.id! }
            });
        }

        await db.resetPasswordToken.create({
            data: {
                token,
                userId: session.user.id!,
                expiresAt: new Date(Date.now() + 1800000)
            }
        });

        const subject = `Password reset for syepost`;
        const text = `You can reset your password by clicking on this <a href="${process.env.BASE_URL}/auth/reset-password?token=${token}&userid=${session.user.id}">link</a>. Reset token expires ${new Date(Date.now() + 1800000).toLocaleString()}.`
        await send_email(session?.user.email!, subject, text);
        return {success: 'Email has been sent'}
    } catch (err) {
        console.log(err);
        return;
    }
}