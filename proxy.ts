import { NextRequest, NextResponse } from 'next/server';

export default function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  
  // Check if it's an admin route (except login)
  const isAdminRoute = pathname.startsWith('/admin');
  const isLoginPage = pathname === '/admin/login';
  
  // Get the session token from cookies
  const sessionToken = request.cookies.get('authjs.session-token') || request.cookies.get('__Secure-authjs.session-token');
  const isLoggedIn = !!sessionToken;

  // Redirect to login if accessing admin routes without authentication
  if (isAdminRoute && !isLoginPage && !isLoggedIn) {
    const loginUrl = new URL('/admin/login', request.url);
    return NextResponse.redirect(loginUrl);
  }

  // Redirect to admin dashboard if already logged in and trying to access login
  if (isLoginPage && isLoggedIn) {
    const adminUrl = new URL('/admin', request.url);
    return NextResponse.redirect(adminUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/admin/:path*'],
};

