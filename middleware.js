import { NextRequest, NextResponse } from 'next/server';
import { includes } from "lodash";
import { getToken } from "next-auth/jwt";

const isAdminRoute = (pathname) => {
    return pathname.startsWith('/admin/home');
}

const isUserRoute = (pathname) => {
    return pathname.startsWith('/home');
}

export async function middleware(req) {
    const token = await getToken({ req });
    const role = token?.role;
    const { pathname } = req.nextUrl;

    if (isUserRoute(pathname) && !includes(["student"], role)) {
        return NextResponse.redirect(new URL('/login', req.url));
    }

    if (isAdminRoute(pathname) && role !== "admin") {
        return NextResponse.redirect(new URL('/login', req.url));
    }

    return NextResponse.next();
}

export const config = {
    matcher: ["/dashboard", "/admin/home/:path*", "/home/:path*"]
};
