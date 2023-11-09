import { NextRequest, NextResponse } from "next/server";
import acceptLanguage from 'accept-language'
import { fallbackLng, languages } from '@/i18n/settings'

acceptLanguage.languages(languages)

const cookieName = 'i18next'

export function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;
  let lang
  if (request.cookies.has(cookieName)) {
    /* @ts-ignore */
    lang = acceptLanguage.get(request.cookies.get(cookieName).value)
}
  if (!lang) lang = acceptLanguage.get(request.headers.get('Accept-Language'))
  if (!lang) lang = fallbackLng

  const pathnameIsMissingValidLocale = languages.every((l) => {
      return !pathname.startsWith(`/${l}`);
    });

  if (pathnameIsMissingValidLocale) {
    return NextResponse.redirect(new URL(`/${lang}${pathname}`, request.url))
  }

  if (request.headers.has('referer')) {
      /* @ts-ignore */
    const refererUrl = new URL(request.headers.get('referer'))
    const langInReferer = languages.find((l) => refererUrl.pathname.startsWith(`/${l}`))
    const response = NextResponse.next()
    if (langInReferer) response.cookies.set(cookieName, langInReferer)
    return response
  }

  return NextResponse.next()
}

export const config = {
  // do not localize next.js paths
  matcher: ["/((?!api|types|js|_next/static|_next/image|favicon.ico|global.css|polyfill-focus.js).*)",],
};
