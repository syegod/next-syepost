import NextAuth, { DefaultSession } from "next-auth";
import { PrismaAdapter } from "@auth/prisma-adapter"
import { db } from "./lib/db";
import Github from "next-auth/providers/github";
import Google from "next-auth/providers/google";
import Credentials from "next-auth/providers/credentials";
import { LoginSchema } from "./zod";
import bcryptjs from 'bcryptjs';
import { getUserByEmail, getUserById } from "./data/user";
import { UserRole } from "@prisma/client";

declare module "next-auth" {
    interface Session {
        user: {
            role: UserRole
        } & DefaultSession["user"]
    }
}

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
    secret: process.env.AUTH_SECRET,
    callbacks: {
        async session({ token, session }) {
            if (token.sub && session.user) {
                session.user.id = token.sub;
            }
            if (token.role && session.user) {
                session.user.role = token.role as UserRole;
            }
            
            return session;
        },
        async jwt({ token }) {
            if (!token.sub) {
                return token
            }
            const existingUser = await getUserById(token.sub);
            if (!existingUser) {
                return token;
            }
            token.role = existingUser.role;
            return token;
        }
    },
    adapter: PrismaAdapter(db),
    session: { strategy: 'jwt' }
});