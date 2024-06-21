'use server'

import { auth } from "@/auth";
import { db } from "@/lib/db";
import { send_email } from "@/lib/nodemailer";
import crypto from 'crypto'

export const send_verification_email = async () => {
    try {
        const session = await auth();
        if (!session) return { error: 'User not found' }

        const token = crypto.randomBytes(20).toString('hex');

        const existingToken = await db.verificationToken.findUnique({
            where: { email: session.user.email! }
        });

        if (existingToken) {
            await db.verificationToken.delete({
                where: { email: session.user.email! }
            });
        }

        await db.verificationToken.create({
            data: {
                token,
                email: session.user.email!,
                expiresAt: new Date(Date.now() + 1800000)
            }
        });
        const subject = `Email confirmation for syepost`;
        const text = `Verify your email by clicking on this <a href="${process.env.BASE_URL}/auth/verify-email?token=${token}">link</a>. Verification token expires ${new Date(Date.now() + 1800000).toLocaleString()}.`
        await send_email(session?.user.email!, subject, text);
        return { success: 'Email sent' }
    } catch (err) {
        console.log(err);
        return { error: 'Something went wrong' }
    }
}
