'use server'

import { db } from "@/lib/db";

export const verify_reset_password_token = async (token: string) => {
    try {
        const existingToken = await db.resetPasswordToken.findFirst({
            where: {token: token}
        });
        if(!existingToken || existingToken.expiresAt < new Date()){
            return false;
        }
        return true;
    } catch (err) {
        console.log(err);
        return false;
    }
}