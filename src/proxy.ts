import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { locales } from './i18n/locales'

export function proxy(request: NextRequest) {
  const url = request.nextUrl.clone();
  const hostname = request.headers.get('host') || '';

  // 1. Force Canonical Domain (non-www)
  // This avoids duplicate content and keeps SEO juice on the main domain
  if (hostname.startsWith('www.')) {
    url.hostname = hostname.replace('www.', '');
    return NextResponse.redirect(url, 301);
  }

  const { pathname } = request.nextUrl;

  // 2. Handle Locales
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
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico|images|favicon-eye.png|robots.txt|sitemap.xml).*)'],
}
