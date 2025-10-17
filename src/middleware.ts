import { NextRequest, NextResponse } from "next/server"

function isProtectedRoute(request: NextRequest) {
    return request.nextUrl.pathname.startsWith("/dashboard")
}

export default async function middleware(request: NextRequest) {

    if (isProtectedRoute(request)) {
        try {
            const res = await fetch(`${process.env.API_URL}/auth/me`, {
                headers: {
                    cookie: request.headers.get("cookie") || "",
                },
                credentials: "include",
            })

            const data = await res.json()

            // If not authenticated, redirect to login
            if (!data?.data?.user) {
                const loginUrl = new URL("/auth/login", request.url)
                return NextResponse.redirect(loginUrl)
            }
        } catch (err) {
            console.error("Auth check failed:", err)
            const loginUrl = new URL("/auth/login", request.url)
            return NextResponse.redirect(loginUrl)
        }
    }

    if (request.nextUrl.pathname === "/auth/login" || request.nextUrl.pathname === "/auth/signup") {
        if (request.cookies.has(process.env.AUTH_SESSION_NAME as string)) {
            return NextResponse.redirect(new URL("/", request.url))
        }
    }

    return NextResponse.next()
}

export const config = {
    matcher: [
        // Skip Next.js internals and all static files, unless found in search params
        '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
        '/dashboard/:path*',
        '/auth/login',
        '/auth/signup',
    ],
}