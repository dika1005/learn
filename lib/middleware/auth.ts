// lib/middleware/auth.ts
import { NextRequest, NextResponse } from 'next/server';
import { jwtVerify } from 'jose';


// Define a clear type for the successful authentication result
interface AuthSuccessResult {
  userId: string;
}

export async function authMiddleware(req: NextRequest): Promise<NextResponse | AuthSuccessResult> {
  const token = req.cookies.get('token')?.value;

  if (!token) {
    console.log('[authMiddleware] Token tidak ditemukan di cookie.');
    return NextResponse.json({ message: 'Tidak terautentikasi: Token tidak ditemukan' }, { status: 401});
  }

  const secret = new TextEncoder().encode(process.env.JWT_SECRET!);

  try {
    const { payload } = await jwtVerify(token, secret);
    console.log('[authMiddleware] Token berhasil diverifikasi. Payload:', payload);
    
    const result: AuthSuccessResult = { userId: payload.id as string }; // Pastikan tipe kembalian
    console.log('[authMiddleware] Mengembalikan objek sukses:', result); // Log objek yang dikembalikan
    return result; 

  } catch (err) {
    console.error('[authMiddleware] Token tidak valid atau kadaluarsa:', err);
    return NextResponse.json({ message: 'Token tidak valid atau kadaluarsa' }, { status: 403});
  }
}