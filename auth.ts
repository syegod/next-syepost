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
import authConfig from "./auth.config";

declare module "next-auth" {
    interface Session {
        user: {
            role: UserRole
        } & DefaultSession["user"]
    }
}

export const { auth, signIn, signOut, handlers } = NextAuth({
    pages: {
        signIn: '/auth/login',
        error: '/auth/error'
    },
    events: {
        async linkAccount({user}){
            await db.user.update({
                where: { id: user.id },
                data: { emailVerified: new Date() }
            })
        }
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
            if(token.picture && session.user){
                session.user.image = token.picture;
            }
            if(token.email && session.user){
                session.user.email = token.email;
            }
            if(token.name && session.user){
                session.user.name = token.name;
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
            token.email = existingUser.email;
            token.name = existingUser.name;
            token.role = existingUser.role;
            token.picture = existingUser.image;
            return token;
        }
    },
    ...authConfig,
    adapter: PrismaAdapter(db),
    session: { strategy: 'jwt' }
});