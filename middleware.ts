import { DEFAULT_REDIRECT, authRoutes, protectedRoutes } from '@/components/routes'

import { auth } from '@/auth'

export default auth((req) => {
    const { nextUrl } = req

    const isLoggedIn = !!req.auth
    const isProtectedRoutes = protectedRoutes.includes(nextUrl.pathname)
    const isAuthRoutes = authRoutes.includes(nextUrl.pathname)

    if (isProtectedRoutes) {
        if (!isLoggedIn) {
            return Response.redirect(new URL('/signin', nextUrl))
        }
    }

    if (isAuthRoutes) {
        if (isLoggedIn) {
            return Response.redirect(new URL(DEFAULT_REDIRECT, nextUrl))
        }
    }
})

export const config = {
    matcher: [
        // Skip Next.js internals and all static files, unless found in search params
        '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
        // Always run for API routes
        '/(api|trpc)(.*)',
    ],
}