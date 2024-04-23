import {NextRequest, NextResponse} from "next/server";
import {EnumTokens} from "@/services/auth-token.service";
import {DASHBOARD_PAGES} from "@/config/pages-url.config";


export async function middleware(
    request: NextRequest,
) {
    const {url, cookies} = request
    const securePages = [DASHBOARD_PAGES.PROFILE, DASHBOARD_PAGES.CREATE_RECIPE, DASHBOARD_PAGES.UPDATE_RECIPE]

    const accessToken = cookies.get(EnumTokens.ACCESS_TOKEN)?.value
    const isAuthPage = url.includes('/auth')
    const isPageWithAuth = securePages.includes(url)

    if (isAuthPage && accessToken) {
        return NextResponse.redirect(new URL(DASHBOARD_PAGES.HOME, url))
    }

    if (isAuthPage) {
        return NextResponse.next()
    }

    if (isPageWithAuth && !accessToken) {
        return NextResponse.redirect(new URL('/auth', request.url))
    }

    return
}

export const config = {
    matcher: ['/auth/:path*']
}
