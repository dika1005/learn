// middleware.ts
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import jwt from 'jsonwebtoken'

export function middleware(request: NextRequest) {
  const token = request.cookies.get('token')?.value

  if (!token) {
    return NextResponse.redirect(new URL('/login', request.url)) // (A)
  }

  try {
    jwt.verify(token, process.env.JWT_SECRET!)
    return NextResponse.next() // (B)
  } catch {
    return NextResponse.redirect(new URL('/login', request.url)) // (C)
  }
}

export const config = {
  matcher: ['/dashboard/:path*', '/api/protected-route'], // (D)
}