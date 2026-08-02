import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';


export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;


  if (pathname.startsWith('/dashboard')) {
    // Placeholder
    const authToken = request.cookies.get('auth-token')?.value;

    if (!authToken) {
      const loginUrl = new URL('/', request.url);
      loginUrl.searchParams.set('redirect', pathname);
      return NextResponse.redirect(loginUrl);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp|ico|woff2?)$).*)',
  ],
};
