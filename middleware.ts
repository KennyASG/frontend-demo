// middleware.ts
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  
  // Obtener token de las cookies
  const token = request.cookies.get('auth-token')?.value;
  
  // Rutas públicas que no requieren autenticación
  const publicRoutes = ['/login', '/register'];
  const isPublicRoute = publicRoutes.some(route => pathname.startsWith(route));
  
  // Rutas protegidas que requieren autenticación
  const protectedRoutes = ['/dashboard', '/admin', '/profile', '/settings', '/concerts/buy'];
  const isProtectedRoute = protectedRoutes.some(route => pathname.startsWith(route));
  
  // Rutas que requieren rol de admin
  const adminRoutes = ['/admin'];
  const isAdminRoute = adminRoutes.some(route => pathname.startsWith(route));
  
  // 1. Si intenta acceder a ruta protegida sin token → redirigir a login
  if (isProtectedRoute && !token) {
    const loginUrl = new URL('/login', request.url);
    loginUrl.searchParams.set('redirect', pathname);
    return NextResponse.redirect(loginUrl);
  }
  
  // 2. Si está en /login y tiene token → redirigir a dashboard
  //    (pero permitir /register para que pueda cerrar sesión y crear otra cuenta)
  if (pathname === '/login' && token) {
    return NextResponse.redirect(new URL('/dashboard', request.url));
  }
  
  // 3. Si intenta acceder a ruta de admin sin token → redirigir a login
  if (isAdminRoute && !token) {
    const loginUrl = new URL('/login', request.url);
    loginUrl.searchParams.set('redirect', pathname);
    loginUrl.searchParams.set('error', 'admin_required');
    return NextResponse.redirect(loginUrl);
  }
  
  // 4. Ruta raíz: redirigir según estado de autenticación
  if (pathname === '/') {
    if (token) {
      return NextResponse.redirect(new URL('/dashboard', request.url));
    } else {
      return NextResponse.redirect(new URL('/login', request.url));
    }
  }
  
  // 5. Permitir acceso a todas las demás rutas
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
     * - public files
     */
    '/((?!api|_next/static|_next/image|favicon.ico|.*\\..*|_next).*)',
  ],
};