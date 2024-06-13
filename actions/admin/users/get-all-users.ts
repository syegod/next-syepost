'use server'

import { db } from "@/lib/db";

export const get_all_users = async () => {
    try {
        const users = await db.user.findMany();
        return users;
    } catch (err) {
        console.log(err)
        return null;
    }
}