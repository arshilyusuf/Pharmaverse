import { NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";

export default async function middleware(req) {
  try {
    // Get the token and session data
    const token = await getToken({
      req,
      secret: process.env.NEXTAUTH_SECRET,
      secureCookie: process.env.NODE_ENV === "production",
    });

    // Protected routes configuration
    const protectedPaths = ["/dashboard", "/users", "/profile"];
    const isProtectedPath = protectedPaths.some((path) =>
      req.nextUrl.pathname.startsWith(path)
    );

    // Check if route requires protection
    if (isProtectedPath) {
      // No token/session exists
      if (!token) {
        const loginUrl = new URL("/login", req.url);
        loginUrl.searchParams.set("callbackUrl", req.url);
        return NextResponse.redirect(loginUrl);
      }

      // Check for specific role-based access (optional)
      if (req.nextUrl.pathname.startsWith("/users") && token.role !== "admin") {
        return NextResponse.redirect(new URL("/dashboard", req.url));
      }
    }

    // Allow access to route
    return NextResponse.next();
  } catch (error) {
    console.error("Middleware error:", error);
    // Redirect to login on error
    return NextResponse.redirect(new URL("/login", req.url));
  }
}

// Configure protected routes
export const config = {
  matcher: [
    "/dashboard/:path*",
    "/users/:path*",
    "/profile/:path*",
    // Add more protected routes as needed
  ],
};
