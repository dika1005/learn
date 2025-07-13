// app/api/education/list/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import { authMiddleware } from '@/lib/middleware/auth'; // Pastikan path ini benar

const prisma = new PrismaClient();

export async function GET(req: NextRequest) {
  // Panggil authMiddleware untuk memverifikasi token dan mendapatkan userId.
  const authResult = await authMiddleware(req);

  // Jika autentikasi gagal, kembalikan respons error.
  if (authResult instanceof NextResponse) {
    return authResult;
  }

  // Ambil userId dari hasil middleware.
  const { userId } = authResult;

  try {
    // Ambil semua entri pendidikan yang terkait dengan userId ini
    const educationList = await prisma.education.findMany({
      where: { userId: userId },
      orderBy: { startYear: 'desc' }, // Urutkan berdasarkan tahun mulai terbaru
    });

    return NextResponse.json({ message: 'Berhasil mengambil daftar pendidikan', data: educationList }, { status: 200 });
  } catch (err) {
    console.error('[GET EDUCATION LIST ERROR]', err);
    return NextResponse.json({ message: 'Gagal mengambil daftar pendidikan karena kesalahan server' }, { status: 500 });
  }
}