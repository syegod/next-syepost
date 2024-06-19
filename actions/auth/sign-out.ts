'use server'
import { signOut } from "@/auth"
import { redirect } from "next/navigation";

export const SignOut = async () => {
    return await signOut();
}