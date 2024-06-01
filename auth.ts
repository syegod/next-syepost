import NextAuth from "next-auth";
import { PrismaAdapter } from "@auth/prisma-adapter"
import { db } from "./lib/db";
import Github from "next-auth/providers/github";
import Google from "next-auth/providers/google";
import Credentials from "next-auth/providers/credentials";

export const {auth, signIn, signOut, handlers} = NextAuth({
    providers: [Github, Google, Credentials],
    callbacks: {
    },
    adapter: PrismaAdapter(db),
    session: {strategy: 'jwt'}
});