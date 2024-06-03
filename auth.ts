import NextAuth from "next-auth";
import { PrismaAdapter } from "@auth/prisma-adapter"
import { db } from "./lib/db";
import Github from "next-auth/providers/github";
import Google from "next-auth/providers/google";
import Credentials from "next-auth/providers/credentials";
import { LoginSchema } from "./zod";
import bcryptjs from 'bcryptjs';
import { getUserByEmail } from "./data/user";

export const { auth, signIn, signOut, handlers } = NextAuth({
    providers: [
        Github,
        Google,
        Credentials({
            async authorize(credentials) {
                const validatedFields = LoginSchema.safeParse(credentials);
                if (validatedFields.success) {
                    const { email, password } = validatedFields.data;
                    const user = await getUserByEmail(email);
                    if (!user || !user.passwordHash) return null;
                    const passwordMatch = await bcryptjs.compare(password, user.passwordHash);
                    if (passwordMatch) return user;
                }
                return null;
            }
        })],
    pages: {
        signIn: '/auth/login',
        error: '/auth/error'
    },
    callbacks: {
    },
    adapter: PrismaAdapter(db),
    session: { strategy: 'jwt' }
});