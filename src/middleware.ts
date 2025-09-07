import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Handle /new/ paths
  if (pathname.startsWith('/new')) {
    // If accessing /new root, redirect to /new/bg
    if (pathname === '/new' || pathname === '/new/') {
      return NextResponse.redirect(new URL('/new/bg', request.url));
    }

    // Handle /new/admin paths
    if (pathname.startsWith('/new/admin')) {
      // If it's exactly /new/admin, redirect to /new/admin/dashboard
      if (pathname === '/new/admin') {
        return NextResponse.redirect(
          new URL('/new/admin/dashboard', request.url)
        );
      }

      // If it's /new/admin/login, allow it to pass through
      if (pathname === '/new/admin/login') {
        return NextResponse.next();
      }

      // For all other admin routes, let client-side handle auth
      return NextResponse.next();
    }

    return NextResponse.next();
  }

  // Handle old /admin paths (redirect to new admin)
  if (pathname.startsWith('/admin')) {
    // If it's exactly /admin, redirect to /new/admin/dashboard
    if (pathname === '/admin') {
      return NextResponse.redirect(
        new URL('/new/admin/dashboard', request.url)
      );
    }

    // If it's /admin/login, redirect to /new/admin/login
    if (pathname === '/admin/login') {
      return NextResponse.redirect(new URL('/new/admin/login', request.url));
    }

    // For all other admin routes, redirect to new admin
    const newPath = pathname.replace('/admin', '/new/admin');
    return NextResponse.redirect(new URL(newPath, request.url));
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
