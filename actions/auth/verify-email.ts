'use server'

import { db } from "@/lib/db";

export const verify_email = async (token: string, email: string) => {
    try {
        const existingToken = await db.verificationToken.findFirst({
            where: { token: token, email: email }
        });
        if (existingToken && existingToken.expiresAt > new Date()) {
            await db.user.update({
                where: { email: email },
                data: {
                    emailVerified: new Date()
                }
            });
            return { success: 'Email verified successfully' }
        } else {
            return { error: 'Invalid or expired verification token. Try again.' }
        }
    } catch (err) {
        console.log(err);
        return { error: 'Something went wrong' }
    }
}