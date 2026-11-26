import { NextResponse } from "next/server";
import { getSessionCookie } from "better-auth/cookies";

const isProtectedRoute = (pathname) => {
  if (pathname === "/dashboard" || pathname.startsWith("/dashboard/")) {
    return true;
  }

  if (pathname === "/pricing") {
    return true;
  }

  if (pathname === "/payment" || pathname.startsWith("/payment/")) {
    return true;
  }

  if (/^\/browse-tuitions\/[^/]+/.test(pathname)) {
    return true;
  }

  return false;
};

export function proxy(request) {
  const { pathname } = request.nextUrl;
  const session = getSessionCookie(request);

  // Logged-in user should not go to signin/signup
  if (session && (pathname === "/signin" || pathname === "/signup")) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  // Protected route without login
  if (isProtectedRoute(pathname) && !session) {
    return NextResponse.redirect(new URL("/signin", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/dashboard/:path*",
    "/pricing",
    "/payment/:path*",
    "/browse-tuitions/:path*",
    "/signin",
    "/signup",
  ],
};
