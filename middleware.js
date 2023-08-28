export { default } from "next-auth/middleware"
export const config = { matcher: ["/dashboard", "/admin/home/:path*", "/home/:path*"] }

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

// middleware.ts
// import { getToken } from "next-auth/jwt";
// import { NextResponse } from "next/server";
// export async function middleware(request, _next) {
//   const { pathname } = request.nextUrl;
//   const protectedPaths = ["/admin/home", "/dashboard", "/home"];
//   const matchesProtectedPath = protectedPaths.some((path) =>
//     pathname.startsWith(path)
//   );
//   if (matchesProtectedPath) {
//     const token = await getToken({ req: request });
//     console.log('token',token)
//     if (!token) {
//       const url = new URL(`/login`, request.url);
//       url.searchParams.set("callbackUrl", encodeURI(request.url));
//       return NextResponse.redirect(url);
//     }
//     if (token.role === "admin") {
//       const url = new URL(`/admin/home/`, request.url);
//       return NextResponse.rewrite(url);
//     }
//     else if (token.role === "student") {
//         const url = new URL(`/dashboard`, request.url);
//         return NextResponse.rewrite(url);
//       }
//   }
//   return NextResponse.next();
// }