import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { locales } from './i18n/locales'

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // 1. Handle Locales only
  // Check if there is any supported locale in the pathname
  const pathnameIsMissingLocale = locales.every(
    (locale) => !pathname.startsWith(`/${locale}/`) && pathname !== `/${locale}`
  );

  if (pathnameIsMissingLocale) {
    // We force 'fr' as default for better indexing consistency
    const locale = 'fr';
    return NextResponse.redirect(
      new URL(`/${locale}${pathname.startsWith('/') ? '' : '/'}${pathname}`, request.url)
    );
  }

  return NextResponse.next();
}

export const config = {
  // Matcher ignoring system files, images and api
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico|icon.svg|images|favicon-eye.png|robots.txt|sitemap.xml).*)'],
}
