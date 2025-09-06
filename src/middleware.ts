import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Check if the path starts with /admin
  if (pathname.startsWith('/admin')) {
    // If it's exactly /admin, redirect to /admin/dashboard
    if (pathname === '/admin') {
      return NextResponse.redirect(new URL('/admin/dashboard', request.url));
    }

    // If it's /admin/login, allow it to pass through
    if (pathname === '/admin/login') {
      return NextResponse.next();
    }

    // For all other admin routes, we need to check authentication
    // Since we can't access cookies in middleware for admin auth,
    // we'll let the client-side handle the redirect logic
    // The useAdmin hook will handle the authentication check
    return NextResponse.next();
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
};
