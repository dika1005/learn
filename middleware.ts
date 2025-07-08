// middleware.ts
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
// import { authMiddleware } from './lib/middleware/auth'; // Tidak perlu lagi import di sini jika tidak digunakan global

export async function middleware(request: NextRequest) {
  console.log('--- START MIDDLEWARE REQUEST ---');
  console.log('[Global Middleware] Request Method:', request.method);
  console.log('[Global Middleware] Request Path:', request.nextUrl.pathname);
  console.log('[Global Middleware] Authorization Header received by global middleware:', request.headers.get('authorization'));
  console.log('--------------------------------');

  // HAPUS ATAU KOMENTARI BLOK INI
  // if (request.nextUrl.pathname.startsWith('/api/profile')) {
  //   console.log('[Global Middleware] Applying authMiddleware for /api/profile');
  //   const response = await authMiddleware(request); // authMiddleware ini yang menyebabkan error
  //   if (response) {
  //     return response;
  //   }
  //   return NextResponse.next();
  // }

  return NextResponse.next();
}

export const config = {
  // HAPUS MATCHER INI JIKA ANDA HANYA MELINDUNGI /api/profile DENGAN CARA LAIN
  // ATAU sesuaikan hanya untuk rute lain yang memerlukan middleware global non-kripto
  matcher: [
    // '/api/profile/:path*', // Komentari atau hapus ini
    // Contoh untuk rute lain jika ada: '/api/something-else/:path*'
  ],
};