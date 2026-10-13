import { NextResponse } from "next/server";

export function middleware(request) {
    const { pathname } = request.nextUrl;

    // Check if user is navigating to any admin route (/admin, /admin/bookings, etc.)
    if (pathname.startsWith("/admin")) {
        const adminCookie = request.cookies.get("voltigo_admin_auth");

        // If not authenticated via cookie, redirect to /login
        if (!adminCookie || adminCookie.value !== "true") {
            const loginUrl = new URL("/login", request.url);
            return NextResponse.redirect(loginUrl);
        }
    }

    return NextResponse.next();
}

export const config = {
    matcher: ["/admin/:path*"],
};
