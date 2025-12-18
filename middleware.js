import { NextResponse } from 'next/server'
import { i18n } from './get-dictionary'

let locales = i18n.locales

function getLocale(request) {
    // Simple locale detection based on accept-language header or default
    // For now, defaulting to 'en'
    return i18n.defaultLocale
}

export function middleware(request) {
    const pathname = request.nextUrl.pathname

    // Check if there is any supported locale in the pathname
    const pathnameIsMissingLocale = locales.every(
        (locale) => !pathname.startsWith(`/${locale}/`) && pathname !== `/${locale}`
    )

    if (pathnameIsMissingLocale) {
        const locale = getLocale(request)

        // Redirect if there is no locale
        return NextResponse.redirect(
            new URL(
                `/${locale}${pathname.startsWith('/') ? '' : '/'}${pathname}`,
                request.url
            )
        )
    }
}

export const config = {
    matcher: [
        // Skip all internal paths (_next)
        '/((?!_next|favicon.ico|api|.*\\..*).*)',
    ],
}
