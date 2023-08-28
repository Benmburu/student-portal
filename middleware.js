// // export { default } from "next-auth/middleware"
// // export const config = { matcher: ["/dashboard", "/admin/home/:path*", "/home/:path*"] }

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

// import { withAuth } from "next-auth/middleware"

// export default withAuth(
//   // `withAuth` augments your `Request` with the user's token.
//   function middleware(req) {
//     console.log(req.nextauth.token)
//   },
//   {
//     callbacks: {
//       authorized: ({ token }) => token?.role === "admin",
//     },
//   }
// )

// export const config = { matcher: ["/admin/home/:path*"] }

// // // middleware.ts
// // import { getToken } from "next-auth/jwt";
// // import { NextResponse } from "next/server";
// // export async function middleware(request, _next) {
// //   const { pathname } = request.nextUrl;
// //   const protectedPaths = ["/admin/home", "/dashboard", "/home"];
// //   const matchesProtectedPath = protectedPaths.some((path) =>
// //     pathname.startsWith(path)
// //   );
// //   if (matchesProtectedPath) {
// //     const token = await getToken({ req: request });
// //     console.log('token',token)
// //     if (!token) {
// //       const url = new URL(`/login`, request.url);
// //       url.searchParams.set("callbackUrl", encodeURI(request.url));
// //       return NextResponse.redirect(url);
// //     }
// //     if (token.role === "admin") {
// //       const url = new URL(`/admin/home/`, request.url);
// //       return NextResponse.rewrite(url);
// //     }
// //     else if (token.role === "student") {
// //         const url = new URL(`/dashboard`, request.url);
// //         return NextResponse.rewrite(url);
// //       }
// //   }
// //   return NextResponse.next();
// // }