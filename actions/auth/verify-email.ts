'use server'

import { db } from "@/lib/db";

export const verify_email = async (token: string) => {
    try {
        const existingToken = await db.verificationToken.findFirst({
            where: { token: token }
        });
        if (existingToken && existingToken.expiresAt > new Date()) {
            await db.user.update({
                where: { email: existingToken.email },
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