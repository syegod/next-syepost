import { notFound } from "next/navigation";
import { adminPrefix, apiAuthPrefix, authRoutes, DEFAULT_LOGIN_REDIRECT, protectedRoutes } from "./routes";
import { NextResponse } from "next/server";
import NextAuth from "next-auth";
import authConfig from "./auth.config";

const { auth } = NextAuth(authConfig);

export default auth((req) => {
    req.headers.set("x-pathname", req.nextUrl.pathname);
    
    const { nextUrl } = req;
    const isLoggedIn = !!req.auth;
    const userRole = req.auth?.user?.role;

    const isApiAuthRoute = nextUrl.pathname.startsWith(apiAuthPrefix);
    const isAuthRoute = authRoutes.includes(nextUrl.pathname);
    const isProtectedRoute = protectedRoutes.includes(nextUrl.pathname);
    const isAdminRoute = nextUrl.pathname.startsWith(adminPrefix)

    if(process.env.NODE_ENV === 'development'){
        if(isAdminRoute && userRole !== 'ADMIN') {
            return Response.redirect(new URL('/', nextUrl))
        }
    } else {
        return Response.redirect(new URL('/', nextUrl))
    }

    if (isApiAuthRoute) {
        return;
    }

    if (isAuthRoute) {
        if (isLoggedIn) {
            return Response.redirect(new URL(DEFAULT_LOGIN_REDIRECT, nextUrl));
        }
        return;
    }

    if (!isLoggedIn && isProtectedRoute) {
        return Response.redirect(new URL('/auth/login', nextUrl));
    }
    
    return NextResponse.next();
});

export const config = {
    matcher: ['/((?!.*\\..*|_next).*)', '/', '/(api|trpc)(.*)']
}