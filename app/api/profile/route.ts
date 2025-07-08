// app/api/profile/route.ts
import { NextRequest, NextResponse } from 'next/server';
import jwt from 'jsonwebtoken'; // Tetap gunakan jsonwebtoken di sini

export async function GET(req: NextRequest) {
  const authHeader = req.headers.get('authorization');

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return NextResponse.json({ message: 'Token tidak ditemukan atau format salah' }, { status: 401 });
  }

  const token = authHeader.split(' ')[1];

  try {
    // Ini akan berjalan di Node.js Runtime secara default, jadi crypto akan tersedia
    const decoded = jwt.verify(token, process.env.JWT_SECRET!);
    console.log('[API/PROFILE] Token valid:', decoded);

    // Jika valid, kembalikan data profil
    return NextResponse.json({ message: 'Ini data profil yang dilindungi!', data: decoded });
  } catch (err) {
    console.error('[API/PROFILE] Token error:', err);
    // Tangani error spesifik JWT (misal expired, invalid signature)
    if (err instanceof jwt.TokenExpiredError) {
      return NextResponse.json({ message: 'Token kadaluarsa' }, { status: 401 });
    }
    if (err instanceof jwt.JsonWebTokenError) {
      return NextResponse.json({ message: 'Token tidak valid' }, { status: 401 });
    }
    return NextResponse.json({ message: 'Gagal mengautentikasi token' }, { status: 401 });
  }
}