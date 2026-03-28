import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { locales } from './i18n/locales'

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // 1. Admin Protection
  // If the request is for an admin route (any locale)
  const isAdminRoute = pathname.includes('/admin');
  const isLoginPage = pathname.includes('/admin/login');

  if (isAdminRoute && !isLoginPage) {
    const adminSession = request.cookies.get('admin_session');
    
    if (!adminSession || adminSession.value !== 'authenticated') {
      // Find current locale to redirect back to login
      const currentLocale = locales.find(l => pathname.startsWith(`/${l}`)) || 'fr';
      const loginUrl = new URL(`/${currentLocale}/admin/login`, request.url);
      return NextResponse.redirect(loginUrl);
    }
  }

  // 2. Handle Locales
  const pathnameIsMissingLocale = locales.every(
    (locale) => !pathname.startsWith(`/${locale}/`) && pathname !== `/${locale}`
  );

  if (pathnameIsMissingLocale) {
    const locale = 'fr';
    const targetUrl = new URL(`/${locale}${pathname === '/' ? '' : pathname}`, request.url);
    return NextResponse.redirect(targetUrl, 308);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico|icon.svg|images|icons|site.webmanifest|favicon-eye.png|robots.txt|sitemap.xml|llms.txt).*)'],
}
