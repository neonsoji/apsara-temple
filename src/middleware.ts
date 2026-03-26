import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const defaultLocale = 'fr';
const locales = ['en', 'fr'];
const canonicalDomain = 'apsara-temple.com';

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const hostname = request.headers.get('host');

  // 1. REDIRECTION CANONIQUE (www -> non-www)
  if (hostname?.startsWith('www.')) {
    const newHostname = hostname.replace('www.', '');
    const url = request.nextUrl.clone();
    url.hostname = newHostname;
    return NextResponse.redirect(url, 301);
  }

  // 2. REDIRECTION LOCALE ( / -> /fr )
  if (pathname === '/') {
    return NextResponse.redirect(new URL(`/${defaultLocale}`, request.url), 301);
  }

  // Ignorer les fichiers statiques et les routes API
  if (
    pathname.startsWith('/_next') ||
    pathname.includes('.') ||
    pathname.startsWith('/api')
  ) {
    return NextResponse.next();
  }

  // 3. VÉRIFICATION DES LOCALES ( /abc -> /fr/abc si abc n'est pas une locale )
  const pathnameIsMissingLocale = locales.every(
    (locale) => !pathname.startsWith(`/${locale}/`) && pathname !== `/${locale}`
  );

  if (pathnameIsMissingLocale) {
    return NextResponse.redirect(
      new URL(`/${defaultLocale}${pathname}`, request.url),
      301
    );
  }

  return NextResponse.next();
}

export const config = {
  // On ne matche pas les dossiers internes ni les assets statiques
  matcher: ['/((?!_next|api|robots.txt|sitemap.xml|images|.*\\.).*)', '/'],
};
